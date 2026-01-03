module.exports = (sequelize, DataTypes)=>{
    const user = sequelize.define('user',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        otp: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        otp_expired_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        role : {
            type: DataTypes.ENUM("1", "2", "3"), 
            allowNull: true, 
            defaultValue: '3'
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isVerified: {
            type: DataTypes.ENUM, 
            values: ['0','1'],
            defaultValue: '0',
        },
        mobile_verify: {
            type: DataTypes.ENUM, 
            values: ['0','1'],
            defaultValue: '0',
        },
        email_verify: {
            type: DataTypes.ENUM, 
            values: ['0','1'],
            defaultValue: '0'
        },
        mobile_verified_at: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        email_verified_at: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        avatar: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        kyc_status: { 
            type: DataTypes.ENUM, 
            values: ['0','1'],
            defaultValue: '0'
        },
        entity_type: { 
            type: DataTypes.STRING(1), 
            defaultValue: 'P',
            allowNull: false
        },
        tax_identity: {
            type: DataTypes.STRING(15), 
            defaultValue: '',
        },
        pan_verified_by: {
            type: DataTypes.STRING(50), 
            defaultValue: '',
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        added_by: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        deleted_by: {
            type: DataTypes.STRING,
            defaultValue: null
        },
    },
    {
        paranoid: true
    })

   /*  Category.associate = (models) => {
        Category.hasMany(models.Categories, {
            as: 'children',
            foreignKey: 'parentCategory_Id'
          });
      
        // One category belongs to one parent category
        Category.belongsTo(models.Categories, {
            as: 'parent',
            foreignKey: 'parentCategory_Id'
        });
    }; */

     user.afterSync(async () => {
        const count = await user.count();

        if (count === 0) {
            await user.bulkCreate([
                {
                    name: "Ajay",
                    email: "ajay@gmail.com",
                    role: '3',
                    mobile: '8081147196'
                }
            ]);
        }
    });
    
    return user;    
}