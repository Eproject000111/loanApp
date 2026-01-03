module.exports = (options)=>{
    return (error, req, res, next) =>{
        error.statusCode = error.statusCode || 500;
        error.status = error.status || 'error';
        return res.loanResponse({
            resp: 0,
            status: error.status,
            statusCode: error.statusCode,
            msg: error.message
        })

    }
}