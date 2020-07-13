import {createSelector} from 'reselect';


const selectTemplate = state => state.template;

export const selectTemplates = createSelector(
    [selectTemplate],
    template => template.templates
)
