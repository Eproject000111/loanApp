module.exports = (sequelize, DataTypes)=>{
    const KycRules = sequelize.define('kyc_rules',{
        rule_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        rule_description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        applicable_role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        entity_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        kyc_mandatory: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        effective_from: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        expiry_validation: {
            type: DataTypes.ENUM('1','0'),
            defaultValue: '0'
        }
    },
    {
        paranoid: true
    }
    )

    KycRules.afterSync(async () => {
        const count = await KycRules.count();

        if (count === 0) {
            await KycRules.bulkCreate([
                {
                    rule_name: "BASIC_USER_KYC",
                    rule_description: "",
                    applicable_role: "2,3",
                    entity_type: "P",
                    kyc_mandatory: "1,2"
                }
            ]);
        }
    });
    
    return KycRules;    
}