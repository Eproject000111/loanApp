const Sequelize = require('sequelize');
const mysqlDbConfig = config.get('databaseSettings.mySqlConnectionString');
const fs = require('fs');
const path = require('path');
const db = {};

module.exports = async (databaseName, modelConfig = {}) => {

    if(!modelConfig['fileName'] || !modelConfig['dirName']){
        throw new Error('------->fileName or dirName Not Found For Conn <-----------')
    }

    const baseFileName = path.basename(__filename);

    const sequelize = new Sequelize(
        databaseName,
        mysqlDbConfig['user'],
        mysqlDbConfig['password'],
        {
            host: mysqlDbConfig['host'],
            dialect: 'mysql',
            logging: false,
            pool:{
                max: mysqlDbConfig['pool']['max'],       // maximum number of connections
                min: mysqlDbConfig['pool']['min'],        // minimum number of connections
                acquire: mysqlDbConfig['pool']['acquire'], // maximum time (ms) Sequelize will try to get a connection before throwing error
                idle: mysqlDbConfig['pool']['idle'],
            },
            retry:{
                max: 3
            }
        }
    )

    db.sequelize = sequelize;
	db.Sequelize = Sequelize;

    fs
        .readdirSync(modelConfig['dirName'])
        .filter(file => {
            return (
            file.indexOf('.') !== 0 &&
            file !== baseFileName &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
            );
        })
        .forEach(file => {
            const model = require(path.join(modelConfig['dirName'], file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });
    
        Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    try{
        await sequelize.authenticate();
    
        if(process.env['NODE_ENV'] != 'production'){
            sequelize.sync({force: false});
            // sequelize.sync({force: true});
        }
    
        console.log(`✅ ======= connected to ${databaseName} Server  =======`);
    }
    catch(error) {
        console.log(`❌ Failed to connect ${databaseName} server =======>>>:`, error);
    };

    return db;

}