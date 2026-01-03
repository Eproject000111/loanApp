module.exports = (sequelize, DataTypes)=>{
    const RoleHasPerms = sequelize.define('role_has_perms',{
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        perm_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    },
    {
        paranoid: true
    }

    )
    
    return RoleHasPerms;    
}