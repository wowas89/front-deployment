import * as actionTypes from '../actions/actionTypes';

const initState = {
    message: null
}


const addMessage = (state, action) => ({
    ...state,
    message: action.payload
})

const clearMessage = (state, action) => ({
    ...state,
    message: null
})

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE: return addMessage(state, action);
        case actionTypes.CLEAR_MESSAGE: return clearMessage(state, action);
        default: return state;
    }
}

export default messageReducer;