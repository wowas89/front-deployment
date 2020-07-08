import * as actionTypes from '../actions/actionTypes';

const initState = {
    templates: []
}


const getTemplates = (state, action) => ({
    ...state,
    templates: action.payload
});

const addTemplate = (state, action) => ({
    ...state,
    templates: state.templates.concat(action.payload)
})

const addTemplateVersion = (state, action) => {
    const updateTemplates = [...state.templates];
    const templateIndex = updateTemplates.findIndex(temp => temp.name === action.payload.name);
    updateTemplates[templateIndex].versions.push(action.payload.version)
    return {
        ...state,
        templates: updateTemplates
    }
}

const templateReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TEMPLATES: return getTemplates(state, action);
        case actionTypes.ADD_TEMPLATE: return addTemplate(state, action);
        case actionTypes.ADD_TEMPLATE_VERSION: return addTemplateVersion(state, action);
        default: return state;
    }
}

export default templateReducer;