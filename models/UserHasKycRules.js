module.exports = (sequelize, DataTypes)=>{
    const UserHasKycRule = sequelize.define('user_has_kyc_rule',{
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        kyc_rule_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
    },
    {
        paranoid: true
    }
    )
    
    return UserHasKycRule;    
}