const initialState = {
    board: null,
}

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            console.log(action);
            return {
                ...state,
                board: action.board
            }
        default:
            return state;
    }
}