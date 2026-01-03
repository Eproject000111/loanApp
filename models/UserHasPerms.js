module.exports = (sequelize, DataTypes)=>{
    const UserHasPerms = sequelize.define('user_has_perms',{
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        perm_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        allow_ip: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        public_access: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        paranoid: true
    }

    )
    
    return UserHasPerms;    
}