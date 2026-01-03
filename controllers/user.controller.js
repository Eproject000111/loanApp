const AppError = require('../utils/appError');
const {Op,DataTypes} = require('sequelize');

const getAllUsers = async (req,res, next)=>{
    let db = res['dbContainer']['Ed_Fin_app'];

    const search = req.query.search || "";
    let page = req.query['page'] || 1;
    let limit = req.query['limit'] || 10;

    let offset = (page - 1)*limit;

     // Get all column names dynamically
    const attributes = Object.keys(db.user.rawAttributes);

    const searchableColumns = attributes.filter(col => {
        const type = db.user.rawAttributes[col].type;
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

        let {count, rows} = await db['user'].findAndCountAll({
            attributes: 
            [
                'id',
                "name",
                "email",
                "role",
                "mobile",
                "avatar",
                "kyc_verify",
                "mobile_verify",
                "email_verify",
                "isVerified",
                "token",
                "added_by",
                "createdAt",
                "updatedAt",
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

const getUserById = async (req,res, next)=>{
    let db = res['dbContainer']['Ed_Fin_app'];

    try{
        if(!db) throw new Error('DB Not Found #GUBYID1!');

        if(!req['body']['userId']) throw new Error('User ID Not Found #GUBYID2!')

        let getUser = await db['user'].findAll({
            where:{id: req['body']['userId']},
            attributes: 
            [
                'id',
                "name",
                "email",
                "role",
                "mobile",
                "avatar",
                "kyc_verify",
                "mobile_verify",
                "email_verify",
                "otp_verify",
                "token",
                "createdAt",
                "updatedAt",
            ]
        });

        if(!getUser) throw new Error('User Not Found #GUBYID3!');

        return res.loanResponse({
            resp: 1,
            actCode: null,
            msg: 'Data fetched successfully!',
            records:{
                data: getUser
            }
        })

    }
    catch(err){
        next(new AppError(err.message));
    }

}

const deleteUserById = async (req,res, next)=>{
    let db = res['dbContainer']['Ed_Fin_app'];

    try{
        if(!db) throw new Error('DB Not Found #GUBYID1!');

        if(!req['body']['userId']) throw new Error('User ID Not Found #GUBYID2!')

        let getUser = await db['user'].destroy({
            where:{id: req['body']['userId']},
            // force: true       // uncomment when hard delete
        });

        if(!getUser) throw new Error('User Not Found #GUBYID3!');

        return res.loanResponse({
            resp: 1,
            actCode: null,
            msg: 'Data fetched successfully!',
            records:{
                data: getUser
            }
        })

    }
    catch(err){
        next(new AppError(err.message));
    }

}

const updateUser = async (req, res, next) => {
    let db = res['dbContainer']['Ed_Fin_app'];
    try{
        

    }
    catch(err){
        next(new AppError(err.message));
    }
}






module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
}