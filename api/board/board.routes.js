const express = require('express');

const { requireAuth } = require('../../middlewares/requireAuth.middleware');

const { getBoard, updateBoard } = require('./board.controller');
const router = express.Router();

router.get('/', getBoard);
router.put('/', updateBoard);

module.exports = router;