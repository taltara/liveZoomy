const boardService = require('./board.service');

async function getBoard(req, res) {
    let board = await boardService.query(req.query)
    console.log(board);

    res.send(board)
    // res.status(200).send(board);
}

async function updateBoard(req, res) {
    // console.log("UPDATING2");
    const board = req.body;
    await boardService.update(board);
    res.send(board);
}

async function socketUpdateBoard(board) {
    const updatedBoard = await boardService.update(board);
    return updatedBoard;
}

module.exports = {
    getBoard,
    updateBoard,
    socketUpdateBoard
}