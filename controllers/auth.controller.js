// const db = require("../models/index");
const lib = require("../libraries/library")
// const { sendEmail} = require("../helper/email");
const {sendSms} = require("../helper/mobile");
const AppError = require('../utils/appError');
const {Op, where} = require('sequelize');

exports.signup = async (req, res, next) => {
    let db = res['dbContainer']['Ed_Fin_app'];

    try {
        let {
            name, 
            mobile, 
            email, 
            role = 'admin'

        } = req['body'];

        if(!name|| !mobile||!email){
            throw new Error('Something went wrong!');
        }
        
        const findUser = await db['user'].findOne({
            where: {
                [Op.or]: {
                    email: req.body.email,
                    mobile: req.body.mobile
                }
            },
        });

        if(findUser){
            if(findUser['isVerified'] == '1' || findUser['added_by'] != null){
                return res.loanResponse({
                    resp: 0,
                    msg: 'User Already Registered!'
                })
            }
        }

        if(role == 'admin'){

            let params = {
                name: name,
                email: email,
                mobile: mobile,
                added_by: 'admin'
            }

            let userData = await db['user'].create(params);

            return res.loanResponse({
                resp: 1,
                actCode: null,
                msg: 'User Created Successfully!',
                records: {
                    data: userData
                }
            })

        }
        else{
            let otpData = await sendOTP(req, res, next);
            let userData = '';
            if(!findUser){
                let params = {
                    name: name,
                    email: email,
                    mobile: mobile,
                    otp: otpData['data']['otp'],     
                    otp_expired_at: otpData['data']['otp_expired_at']
                }
                userData = await db['user'].create(params);
            }
            else{
                let params = {
                    otp: otpData['data']['otp'],     
                    otp_expired_at: otpData['data']['otp_expired_at']
                }
                userData = await db['user'].update(params, {where: {email}});
            }
    
            if (!userData) {
                return res.loanResponse({
                    resp: 0,
                    msg: 'Something went wrong in signUp!'
                })
            }
    
            return res.loanResponse({
                resp:1,
                actCode: "OTP",
                msg: 'Otp send successfully!',
                data: null
            })

        }
    } 
    catch (error) {
        next(new AppError(error.stack, 400));
    }
};

exports.login = async (req, res, next) => {
    let db = res['dbContainer']['Ed_Fin_app'];

    try {
        let {mobile} = req['body'];

        const user = await db['user'].findOne({
            where: {
                mobile: mobile
            },
        });

        if (!user) {
            return res.loanResponse({
                resp: 0,
                msg: 'User not exits!'
            })
        }
        
        req['body']['name'] = user['name'];
        req['body']['email'] = user['email'];

        let otpData = await sendOTP(req, res, next);

        let params = {
            otp: otpData['data']['otp'],     
            otp_expired_at: otpData['data']['otp_expired_at']
        }

        let updatedData = await db['user'].update(params, {where: {mobile}});

        if(!updatedData){
            return res.loanResponse({ 
                resp: 0, 
                msg: isDataUpdate+'#LOG'
            });
        }

        console.log(params);

        return res.loanResponse({
            resp:1,
            actCode: "OTP",
            msg: 'Otp send successfully!',
            data: null
        })

    } 
    catch (err) {
        next(new AppError(err.message, 400));
    }
};

const sendOTP = async (req, res, next) => {
    try {
        const { name,mobile,email } = req.body;
        const otp = lib.generateOTP();
        const expiry = Date.now() + 1 * 60 * 1000; // valid for 1 minutes

        let msgBody = `Hello ${name},OTP : ${otp}, only valid for 1 min`;

        let smsResp = await sendSms(req,msgBody);

        // await sendEmail(
        //     email,
        //     "Your OTP Code",
        //     `Your OTP is: ${otp}. It is valid for 1 minutes.`
        // );
        
        if(!smsResp['resp']) {
            return res.loanResponse({
                resp: 0,
                msg: smsResp['msg']
            })
        }       

        smsResp['data'] = {
            otp: otp,
            otp_expired_at: expiry
        }

        return smsResp;

    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

exports.verifyOTP = async (req, res) => {
    let db = res['dbContainer']['Ed_Fin_app'];
    try {

        const { email, otp } = req.body;

        if(!email || !otp){
            return res.loanResponse({ 
                resp: 0, 
                msg: "Something went wrong!" 
            });
        }
    
        const user = await db.user.findOne({ where: { email } });
    
        if (!user) {
            return res.loanResponse({ 
                resp: 0, 
                msg: "User not found!" 
            });
        }

        if (user.otp !== otp) {
            return res.loanResponse({ 
                resp: 0,
                msg: "Invalid OTP" 
            });
        }
    
        if (Date.now() > user.otp_expired_at) {
            return res.loanResponse({ 
                resp: 0, 
                msg: "OTP expired" 
            });
        }

        let dataToUpdate = {};

        if(user['isVerified'] != '1'){
            dataToUpdate = {
                isVerified: "1",
                otp: null,
                otp_expired_at: null,
                mobile_verify: "1",
                mobile_verified_at: Date.now(),
            }
        }
        else{
            dataToUpdate = {
                otp: null,
                otp_expired_at: null,
            }
        }

        let isDataUpdate = await db.user.update(dataToUpdate,{ where: { email } });

        if(!isDataUpdate){
            return res.loanResponse({ 
                resp: 0, 
                msg: isDataUpdate+'#VF'
            });
        }

        let updatedData = await db.user.findOne({ where: { email },raw: true });

        let tokenPayload = {
            ...updatedData,
            exp: Date.now() + (24*60*60*1000) // 24h
        }

        const token = lib.generateToken(tokenPayload);

        let responseData = { 
            id: updatedData.id,
            name: updatedData.name,
            email: updatedData.email,
            mobile: updatedData.mobile,
            isUserVerify: updatedData.isVerified,
            role: updatedData.role,
            token: token
        };
  
        return res.loanResponse({
            resp: 1,
            msg: "OTP verified successfully",
            data: responseData
        });
    } 
    catch (err) {
        next(new AppError(err.message, 400));
    }
};