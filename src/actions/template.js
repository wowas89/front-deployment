import * as actionTypes from './actionTypes';
import axios from '../utils/axios';


export const getTemplates = () => async(dispatch)=>{
    const {data} = await axios.get('/admin/templates')

    if(data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.GET_TEMPLATES,
        payload: data
    })

       // clear message
       dispatch({
        type:actionTypes.CLEAR_MESSAGE,
        payload: ""
    })
}

export const addTemplate = ({templateName, templateVersion}) => async(dispatch)=>{
    const {data} = await axios.post('/admin/template', {templateName, templateVersion})

    if(data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.ADD_TEMPLATE,
        payload: data
    })

      // add success message
      sendMessage(dispatch, "Template successfully added.")
}


export const addTemplateVersion = ({name, version}) => async(dispatch)=>{
    const {data} = await axios.post('/admin/templateVersion', {name,version});

    if(data.message) return sendMessage(dispatch, data.message);

    dispatch({
        type: actionTypes.ADD_TEMPLATE_VERSION,
        payload: {version, name}
    })

      // add success message
      sendMessage(dispatch, "Template version successfully added.")
}


const sendMessage = (dispatch, message) => {
    dispatch({
        type: actionTypes.ADD_MESSAGE,
        payload:message
    })
}