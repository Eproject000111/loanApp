module.exports = (sequelize, DataTypes)=>{
    const role = sequelize.define('role',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.STRING,    // 3:"borrower", 2:"lender", 1:"admin"
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        paranoid: true
    }
    )
    
    return role;    
}