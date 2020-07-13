import {createSelector} from 'reselect';

const selectMsg = state => state.message;

export const selectMessage = createSelector(
    [selectMsg],
    message => message.message
)