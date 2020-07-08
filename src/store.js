import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducers
import templateReducer from './reducers/templateReducer';
import deploymentReducer from './reducers/deploymentReducer';
import messageReducer from './reducers/messageReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    deployment: deploymentReducer,
    template: templateReducer,
    message: messageReducer
});

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));


export default store;