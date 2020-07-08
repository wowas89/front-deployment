import * as actionTypes from './actionTypes';
import axios from '../utils/axios';

export const getDeployments = () => async (dispatch) => {
    startLoadingData(dispatch);
    const { data } = await axios.get('/deployments')

    if (data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.GET_DEPLOYMENTS,
        payload: data
    })

    endLoadingData(dispatch);

    // clear message
    dispatch({
        type: actionTypes.CLEAR_MESSAGE,
        payload: ""
    })
}

export const addDeployment = ({ url, templateName, version }) => async (dispatch) => {
    const { data } = await axios.post('/deployment', { url, templateName, version })

    if (data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.ADD_DEPLOYMENT,
        payload: data
    })

    // add success message
    sendMessage(dispatch, "Deployment successfully added.")
}

export const deleteDeployment = id => async (dispatch) => {
    const { data } = await axios.delete(`/deployment/${id}`)
    if (data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.DELETE_DEPLOYMENT,
        payload: id
    })

    // add success message
    sendMessage(dispatch, "Deployment successfully deleted.")
}


const startLoadingData = (dispatch) => {
    return dispatch({
        type: actionTypes.START_LOADING_DATA
    })
}

const endLoadingData = (dispatch) => {
    return dispatch({
        type: actionTypes.END_LOADING_DATA
    })
}

const sendMessage = (dispatch, message) => {
    dispatch({
        type: actionTypes.ADD_MESSAGE,
        payload: message
    })
}