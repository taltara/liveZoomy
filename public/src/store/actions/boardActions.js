import boardService from '../../services/boardService';
import socketService from '../../services/socketService';

export function loadBoard() {
  console.log("YOYO");
  return dispatch => {
    return boardService.query()
      .then(board => dispatch({ type: 'SET_BOARD', board }));
  }
}

export function save(board) {
  return dispatch => {
    dispatch({ type: 'SET_BOARD', board });
    socketService.emit('updateBoard', board);
    boardService.save(board);
  }
}
export function setBoard(board) {
  console.log("SETTING BOARD", board);
  return dispatch => dispatch({ type: 'SET_BOARD', board });
}