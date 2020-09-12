
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const COLLECTION_NAME = 'board';

module.exports = {
    query,
    update,

}

async function query() {

    // try {
    //     const collection = await dbService.getCollection(COLLECTION_NAME);
    //     console.log(collection);
    //     // const board = await collection.find({}).toArray();
    //     return collection;
    // } catch (err) {
    //     console.log('ERROR: cannot find board')
    //     throw err;
    // }

    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const board = await collection.findOne({ 'name': 'zoomyBoard' })
        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    console.log("UPDATING");
    const collection = await dbService.getCollection(COLLECTION_NAME)
    board._id = ObjectId(board._id);
    console.log(board._id);
    try {
        await collection.replaceOne({ "_id": board._id }, { $set: board })
        return board;
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}
