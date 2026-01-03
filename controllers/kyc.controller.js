const userCtrl = require('./user.controller');
const {validate} = require('../helper/validation');
const AppError = require('../utils/appError');
const { literal,Op } = require('sequelize');

const documentList = async (req,res, next)=>{
    let db = res['dbContainer']['Ed_Fin_app'];

    // let validator =  validate(req['body'],
    //     {
    //         ruleName: ['required', 'string'],
    //         effectiveFrom: ['string'],
    //         mobile: ['numeric'],
    //         userId: ['numeric']
    //     },
    //     { 
    //         defaultValues: {
    //             effectiveFrom: '',
    //             mobile: '8081147196',
    //             userId: '114190'
    //         }
    //     }
    // )

    if(!req['body'] || !req['body']['ruleName']){
        return res.loanResponse({
            resp: 0,
            actCode: null,
            msg: 'Parameter Missing !',
            data: null
        })
    }

    let {
        ruleName, 
        effectiveFrom = '', 
        userId = req['user']['id'], 
        mobile = req['user']['mobile']
    } = req['body'];

    try{
        if(!db) throw new Error('DB Not Found #GAU1!');

        let userEntityType = req['user']['entity_type'];
        let ownUserId = userId;
        let ownUserRoleId = req['user']['role'];


        let kycRule = await db['kyc_rules'].findOne({
            where:{
                rule_name: ruleName,
                effective_from: {
                    [Op.lte]: new Date()
                },
                [Op.and]: [
                    literal(`FIND_IN_SET('${userEntityType}', entity_type) > 0`),
                    literal(`FIND_IN_SET('${ownUserRoleId}', applicable_role) > 0`)
                ]
            },
            raw: true
        })

        if(kycRule){
            if(kycRule['kyc_mandatory'] == null || kycRule['kyc_mandatory'] == ''){
                return res.loanResponse({
                    resp: 1,
                    actCode: 'CheckpointCompleted',
                    msg: '',
                    data: []
                })
            }

            if(kycRule['kyc_mandatory'] == '-1' ){
                return res.loanResponse({
                    resp: 1,
                    actCode: 'ServiceNotEligible',
                    msg: 'This service is not available for this account. Please write to help@instantpay.in to get more details.',
                    data: []
                })
            }

            // making logic here for fututre kyc

            // check KYC approved
            let uhkr = await db['user_has_kyc_rule'].findAll({
                where:{
                    'user_id': ownUserId,
                    'kyc_rule_id': kycRule['id']
                }
            })

             /* return res.loanResponse({
                resp: 1,
                actCode: null,
                msg: 'testing',
                data: uhkr
            }) */

            let docList = await getKycDocument(db,kycRule['kyc_mandatory']);

            let checkCloseToExpiry = await checkKycNearByExpiry(db,{kycRule: kycRule, userId: req['user']['id']});

            if(uhkr.length == 0){

                let splitDocID = kycRule['kyc_mandatory'].replace('|',',');

                let userKyc = await db['user_kyc'].findAll({
                    where:{
                        user_id: ownUserId,
                        is_active: 1,
                        doc_type: {
                            [Op.in]: splitDocID.split(',')
                        }
                    }
                })

                if(kycRule['expiry_validation'] == '1'){
                    userKyc = await db['user_kyc'].findAll({
                        where:{
                            user_id: ownUserId,
                            is_active: 1,
                            doc_type: {
                                [Op.in]: splitDocID.split(',')
                            },
                            [Op.or]:[
                                {expiry_date: null},
                                literal('expiry_date > CURRENT_TIMESTAMP')
                            ]
                        }
                    })
                }

                // No User Kyc Found
                if(userKyc.length == 0){

                    let unverifiedDocNoUserKyc = [];

                    docList = docList.map((item)=>{
                        item['status'] = 'REQUIRED'
                        unverifiedDocNoUserKyc.push(item['kycId'])

                        item['effectiveFrom'] = item['effective_from']

                        item['allowSkip'] = false;

                        item['skipPair'] = '';

                        


                        return item;
                    })

                    if(unverifiedDocNoUserKyc.length == 0){
                        let param = {
                            user_id: ownUserId,
                            kyc_rule_id: kycRule['id'],
                            expires_at: ''
                        }
                        let addUserHasKycRule = await db['user_has_kyc_rule'].create(param);

                        if(!addUserHasKycRule){
                            return res.loanResponse({
                                resp: 0,
                                actCode: null,
                                msg: 'Kyc Rule insertion failed!',
                                data: null,
                            })
                        }
                    }


                    return res.loanResponse({
                        resp: 1,
                        actCode: unverifiedDocNoUserKyc.length > 0?'CheckpointRequired':'CheckpointCompleted',
                        msg: 'Success',
                        data: unverifiedDocNoUserKyc.length > 0?docList:[],
                    })

                }

                let userKycDoc = [];
                let verifiedDoc = [];
                let approvalPendingDoc = [];
                let docWithoutexpiryDate = [];

                userKyc.forEach((item) => {
                    userKycDoc.push(item['doc_type']);

                    if(item['verified_by'] > 0){
                        verifiedDoc.push(item['doc_type'])
                    }

                    if(item['verified_by'] == 0 || item['verified_by'] == null){
                        approvalPendingDoc.push(item['doc_type'])
                    }

                    if(item['expiry_date'] == null || item['expiry_date'] == ''){
                        docWithoutexpiryDate.push(item['doc_type'])
                    }

                })

                let unVerifiedDoc = [];

                docList = docList.map((docList)=>{
                    if(!userKycDoc.includes(docList['kycId'].toString())){
                        docList['status'] = 'REQUIRED';

                        unVerifiedDoc.push(docList['kycId']);

                    }

                    if(verifiedDoc.includes(docList['kycId'])){
                        docList['status'] = 'APPROVED';
                    }

                    if(approvalPendingDoc.includes(docList['kycId'].toString())){
                        docList['status'] = 'APPROVAL_PENDING';
                        unVerifiedDoc.push(docList['kycId']);
                    }

                    docList['effectiveFrom'] = docList['effective_from']

                    docList['allowSkip'] = false;

                    docList['skipPair'] = '';

                    return docList;
                })

            }

            return res.loanResponse({
                resp: 1,
                actCode: null,
                msg: 'Data fetched successfully!',
                data: docList,
                // data: checkCloseToExpiry
            })

        }




    }
    catch(err){
        console.log(err.stack)
        next(new AppError(err.message));
    }

}

const getKycRuleList = async (req,res, next)=>{
    let db = res['dbContainer']['Ed_Fin_app'];

    const search = req.query.search || "";
    let page = req.query['page'] || 1;
    let limit = req.query['limit'] || 10;

    let offset = (page - 1)*limit;

     // Get all column names dynamically
    const attributes = Object.keys(db.KycRules.rawAttributes);

    const searchableColumns = attributes.filter(col => {
        const type = db.KycRules.rawAttributes[col].type;
        return (
            type instanceof DataTypes.STRING ||
            type instanceof DataTypes.TEXT ||
            type instanceof DataTypes.CHAR ||
            type instanceof DataTypes.UUID ||
            type instanceof DataTypes.ENUM
        );
    });

    let where = {};

    if (search) {
        where[Op.or] = searchableColumns.map(column => ({
            [column]: { [Op.like]: `%${search}%` }
        }));
    }

    try{
        if(!db) throw new Error('DB Not Found #GAU1!');

        let {count, rows} = await db['KycRules'].findAndCountAll({
            attributes: 
            [
                // 'id',
                // "name",
                // "email",
                // "role",
                // "mobile",
                // "avatar",
                // "kyc_verify",
                // "mobile_verify",
                // "email_verify",
                // "isVerified",
                // "token",
                // "added_by",
                // "createdAt",
                // "updatedAt",
            ],
            where,
            limit: limit,
            offset: offset
        });

        if(!rows) throw new Error('User Not Found #GAU2!');

        return res.loanResponse({
            resp: 1,
            actCode: null,
            msg: 'Data fetched successfully!',
            records:{
                metaData: {
                    pagination:{
                        totalRecords: count.toString(),
                        currentPage: page.toString(),
                        totalPage: (Math.ceil(count / limit)).toString(),
                        limit: limit.toString()
                    }
                },
                data: rows
            }
        })

    }
    catch(err){
        next(new AppError(err.message));
    }

}


const getKycDocument = async (db,userId) => {
    // let docsId = docId.replace(',','|');

    try{
        let docsList = await db['docs_kyc'].findAll({
            where:{
                id:{
                    [Op.in]: docId.split(',')
                }
            },
            attributes: [['id', 'kycId'], ['doc_name', 'name'],['kyc_action', 'type']],
            raw: true
        })

        return docsList
    }
    catch(err){
        throw new Error(err);
    }

}

const isEmailVerifiedDocs = async (db,docId) => {
    // let docsId = docId.replace(',','|');

    try{
        let isVerified = await db['user'].findOne({
            where:{
                id: userId,
                email_verify: '1'
            },
            raw: true
        })

        if(isVerified['email']){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        throw new Error(err);
    }

}

const checkKycNearByExpiry = async (db,data = {kycRule:'', userId: ''}) => {
    let docID = data.kycRule['kyc_mandatory'];

    try{
        let kycDocList = [];
        let kycDoc = await db['user_kyc'].findAll({
            where: {
                user_id: data.userId,
                is_active: 1,

                doc_type: {
                [Op.in]: docID.split(',')
                },

                expiry_date: {
                [Op.ne]: null
                },

                [Op.and]: [
                    literal('DATE(expiry_date) > CURRENT_DATE'),
                    literal('DATE(expiry_date) BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY)')
                ]
            },

            /* attributes: [
                ['doc_type', 'docId'],
                [literal('DATE(expiry_date)'), 'expiryDate']
            ], */

            raw: true
        })

        kycDocList = kycDoc;

        if(data['kycRule'] && !data['kycRule']['expiry_validation']){
            kycDocList = [];
        }

        return kycDocList;
    }
    catch(err){
        // console.log(err.stack)
        throw new Error(err);
    }

}




module.exports = {
    documentList,
    getKycRuleList
}