const MongoClient = require('mongodb').MongoClient;

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'zoomy';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect();
    return collection = db.collection(collectionName);
    // console.log("17", collection);
    //  collection;
}

async function connect() {
    
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        // console.log(client);
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




