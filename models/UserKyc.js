module.exports = (sequelize, DataTypes)=>{
    const UserKyc = sequelize.define('user_kyc',{
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        doc_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        kyc_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        kyc_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        doc_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        unique_key: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        added_by: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        added_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        added_ip: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        checked_by: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        checked_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        checked_ip: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        verified_by: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        verified_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        verified_ip: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
    },
    {
        tableName: "user_kyc",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })
    
    return UserKyc;    
}