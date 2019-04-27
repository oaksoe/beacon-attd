var mongoClient = require('mongodb').MongoClient;
var dbConfig;
var dbConnection;

var connect = async () => {
    var dbUrl = 'mongodb://' + dbConfig.mongo.host + ':' + dbConfig.mongo.port + '/' + dbConfig.mongo.dbMain;
    var mongo = await mongoClient.connect(dbUrl, { useNewUrlParser: true });
    dbConnection = mongo.db(dbConfig.mongo.dbMain);
}

exports.disconnect = () => {
    if (dbConnection) {
        dbConnection.close();
    }
}

exports.collection = (name) => {
    return dbConnection ? dbConnection.collection(name) : null;
}

exports.init = (config) => {
    console.log('db module initialized.');
    dbConfig = config;

    connect().then(() => {
        console.log('mongodb connected and listening on address ' +  
        dbConfig.mongo.host + ':'+ dbConfig.mongo.port);
    }).catch(err => {
        console.log('DB Error. Details: ', err);
    });
}
