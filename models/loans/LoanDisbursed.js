module.exports = (sequelize, DataTypes)=>{
    const LoanDisbursed = sequelize.define('loan_disbursed',{
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        loan_account: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        disbursal_ref: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        disbursal_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        amount_approved: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        amount_disbursed: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        interest_charged: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        processing_fees_charged: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        taxes_charged: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        tenure: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        disbursal_mode: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        disbursal_account: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        disbursal_account_ifsc: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        product_segment: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        product_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        processing_fee: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        interest_rate_monthly: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        offer_details: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        tableName: "loan_disbursed",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })
    
    return LoanDisbursed;    
}