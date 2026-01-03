module.exports = (sequelize, DataTypes)=>{
    const LoanType = sequelize.define('loan_type',{
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
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
        max_amount_offer: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        roi: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        processing_fee: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        disclaimer_text: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        application_required: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        eligibility_pincode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        eligibility_constitution: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        eligibility_age: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        eligibility_business_vintage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        /* eligibility_ipay_vintage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        } */
        eligibility_turnover: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        eligibility_gstin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    },
    {
        tableName: "loan_type",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    }
    )
    
    return LoanType;    
}