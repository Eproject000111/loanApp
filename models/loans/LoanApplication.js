module.exports = (sequelize, DataTypes)=>{
    const LoanApplication = sequelize.define('loan_application',{
        application_id: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        applied_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        offered_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        modified_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        status: {
            type: DataTypes.ENUM(['OFFERED', 'INITIATED', 'REJECTED', 'DISBURSED', 'CLOSED']),
            allowNull: false,
            defaultValue: 'INITIATED'
        },
        product_segment: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        product_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        tenure: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        amount_offered: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        amount_offered_description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        processing_fee: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        interest_rate_monthly: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        kyc_status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        validity: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        loan_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        failure_reason: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        offer_details: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        tableName: "loan_application",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })
    
    return LoanApplication;    
}