module.exports = (sequelize, DataTypes)=>{
    const perms = sequelize.define('perms',{
        parent_perm_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.ENUM(['0','1']),
            defaultValue: '0'
        }
    },
    {
        paranoid: true
    }
    )
    
    return perms;    
}