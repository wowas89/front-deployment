import * as actionTypes from '../actions/actionTypes';

const initState = {
    deployments: [],
    loadingData:false
}

const getDeployments = (state, action) => ({
        ...state,
        deployments: action.payload
    })

const addDeployment = (state, action) => ({
        ...state,
        deployments: state.deployments.concat(action.payload)
    })

const deleteDeployment = (state, action) => ({
        ...state,
        deployments: state.deployments.filter(dep => dep._id !== action.payload)
    })

    const startLoadingData = (state, action) => ({ 
        ...state,
        loadingData: true
    })

    const endLoadingData = (state, action) => ({ 
        ...state,
        loadingData: false
    })
      
    
const deploymentReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_DEPLOYMENTS: return getDeployments(state, action);
        case actionTypes.ADD_DEPLOYMENT: return addDeployment(state, action);
        case actionTypes.DELETE_DEPLOYMENT: return deleteDeployment(state, action);
        case actionTypes.START_LOADING_DATA: return startLoadingData(state,action);
        case actionTypes.END_LOADING_DATA: return endLoadingData(state,action);
        default: return state;
    }
}

export default deploymentReducer;