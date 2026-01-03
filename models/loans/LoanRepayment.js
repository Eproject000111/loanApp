module.exports = (sequelize, DataTypes)=>{
    const LoanRepayment = sequelize.define('loan_repayment',{
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
        status: {
            type: DataTypes.ENUM(['NULL', 'DUE', 'PAID', 'PAIMENT-FAILED', 'ACCOUNT NOT FOUND']),
            allowNull: true,
            defaultValue: null
        },
        status_description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        installment_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        repayment_dt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        repayment_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        amount_outstanding: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        amount_penality: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        amount_received: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        repayment_Ipay_id: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        wallet_debit_dt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        added_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        attempted_dt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
    },
    {
        tableName: "loan_repayment",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })
    
    return LoanRepayment;    
}