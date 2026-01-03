module.exports = (sequelize, DataTypes)=>{
    const user_meta = sequelize.define('user_meta',{
        
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
    
    return user_meta;    
}