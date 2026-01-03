module.exports = (sequelize, DataTypes)=>{
    const LoanCategory = sequelize.define('loan_category',{
        category_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        category_icon: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        tableName: "loan_category",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })
    
    return LoanCategory;    
}