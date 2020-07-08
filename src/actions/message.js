import * as actionTypes from './actionTypes';

export const addMessage = message =>({
    type: actionTypes.ADD_MESSAGE,
    payload: message
})

export const clearMessage = () =>({
    type: actionTypes.CLEAR_MESSAGE
})
