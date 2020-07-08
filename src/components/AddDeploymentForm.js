import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates, addDeployment, addMessage } from '../actions';
import validator from 'validator';

// components
import FormInput from './FormComponents/FormInput';
import FormSelect from './FormComponents/FormSelect';
import FormSubmitButton from './FormComponents/FormSubmitButton';


// reducer
const initialState = {
  currentTemplate: "",
  currentTemplateVersions: [],
  currentTemplateVersion: ""
};

const templateReducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_TEMPLATE":
      const templateName = action.payload.name;
      const template = action.payload.templates.find(temp => temp.name === templateName);
      return {
        ...state,
        currentTemplate: templateName,
        currentTemplateVersions: template.versions,
        currentTemplateVersion: template.versions[0]
      }

    case "CHANGE_CURRENT_VERSION":
      return {
        ...state,
        currentTemplateVersion: action.payload
      }

    default: return state;
  }
}

const AddDeploymentForm = () => {

  // url
  const [url, setUrl] = useState('');

  // template reducer
  const [state, dispatch] = useReducer(templateReducer, initialState);

  // states from redux
  const templates = useSelector(state => state.template.templates);

  // dispatch (redux)
  const dispatchRedux = useDispatch();

  // get templates
  useEffect(() => {
    dispatchRedux(getTemplates())
  }, [dispatchRedux])

  // set current template when templates updates
  useEffect(() => {
    if (templates.length > 0) dispatch({ type: "GET_CURRENT_TEMPLATE", payload: { name: templates[0].name, templates } })
  }, [templates])


  // Add template 
  const handleSubmit = e => {
    e.preventDefault();
    if (!validator.isURL(url)) return dispatchRedux(addMessage('invalid url'));
    dispatchRedux(addDeployment({ url, templateName: state.currentTemplate, version: state.currentTemplateVersion }));
    setUrl('');
  }

  return (
    <div className="pb-4 addForm">
      <form onSubmit={handleSubmit}>
        <FormSelect value={state.currentTemplate} handleChange={e => dispatch({ type: "GET_CURRENT_TEMPLATE", payload: { name: e.target.value, templates } })}>
          {templates.map(template => <option key={template._id} value={template.name}> {template.name}</option>
          )}
        </FormSelect>

        <FormSelect value={state.currentTemplateVersion} handleChange={e => dispatch({ type: "CHANGE_CURRENT_VERSION", payload: e.target.value })}>
          {state.currentTemplateVersions.map(version => <option key={version}> {version} </option>)}
        </FormSelect>

        <FormInput type="text" placeholder="url" value={url} handleChange={e => setUrl(e.target.value)} required="required" />
          
        <FormSubmitButton additionalStyle="addButton"> ADD DEPLOYMENT </FormSubmitButton>
      </form>
    </div>)
}

export default AddDeploymentForm;