import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeployment, addMessage, clearMessage } from '../actions';
import validator from 'validator';

import {selectTemplates} from '../selectors/templateSelectors';
import {selectMessage} from '../selectors/messageSelectors';

// components
import {MemoFormInput} from './FormComponents/FormInput';
import {MemoFormSelect} from './FormComponents/FormSelect';
import FormSubmitButton from './FormComponents/FormSubmitButton';
import Message from './Message';
import Timer from './Timer';

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
  const [miliseconds, setMiliseconds] = useState(null);
  const [intervalID, setIntervalID] = useState(null);

  // template reducer
  const [state, dispatch] = useReducer(templateReducer, initialState);

  // states from redux
  const templates = useSelector(state => selectTemplates(state));
  const message = useSelector(state => selectMessage(state));

  // dispatch (redux)
  const dispatchRedux = useDispatch();

  // set current template 
  useEffect(() => {
    if (templates.length > 0) dispatch({ type: "GET_CURRENT_TEMPLATE", payload: { name: templates[0].name, templates } })
  }, [templates])

  // clear message and interval when component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalID);
      dispatchRedux(clearMessage())
    };
  }, [dispatchRedux, intervalID])


  // help function to add deployment 
  const submitDeployment = () => {
    if (!validator.isURL(url)) return dispatchRedux(addMessage('invalid url'));
    dispatchRedux(addDeployment({ url, templateName: state.currentTemplate, version: state.currentTemplateVersion }));
    setUrl('');
  }

  // Add deployment 
  const handleSubmit = e => {
    e.preventDefault();
    submitDeployment();
  }

  // schedule deployment
  const handleSchedule = () => {
    if (!validator.isURL(url)) return dispatchRedux(addMessage('invalid url'));
    const triggerTime = new Date().getTime() + (Math.floor(Math.random() * 26 + 5) * 1000); // add deployment after random 5-30 seconds
    let timeLeft = triggerTime - new Date().getTime();

    // timer
    const tick = () => {
      if (timeLeft > 0) {
        timeLeft -= 100;  
        setMiliseconds(timeLeft)
      } else {
        clearInterval(id);
        setMiliseconds(null);
        submitDeployment();
      }
    }

    const id = setInterval(tick, 100);
    setIntervalID(id); 
  }


  // handle change
  const handleInputChange = useCallback(e =>{
    setUrl(e.target.value)
  }, [])

  const handleTemplateChange = useCallback(e=>{
      dispatch({ type: "GET_CURRENT_TEMPLATE", payload: { name: e.target.value, templates } })
  }, [dispatch, templates])

  const handleTemplateVersionChange = useCallback(e=>{
    dispatch({ type: "CHANGE_CURRENT_VERSION", payload: e.target.value })
  }, [dispatch])
  

  // memo selects options
  const templatesOptions = useMemo(()=>{
    return templates.map(template => <option key={template._id}  value={template.name}> {template.name}</option>)
  }, [templates])

  const templateVersionsOptions = useMemo(()=>{
    return state.currentTemplateVersions.map(version => <option key={version} > {version} </option>)
  }, [state.currentTemplateVersions])

  
  return (
    <div className="pb-4 addForm">
      {message && <Message message={message} />}
      <form onSubmit={handleSubmit}>

        <MemoFormSelect value={state.currentTemplate} handleChange={handleTemplateChange}>
          {templatesOptions}
        </MemoFormSelect>

        <MemoFormSelect value={state.currentTemplateVersion}  handleChange={handleTemplateVersionChange}>
          {templateVersionsOptions}
        </MemoFormSelect>

        <MemoFormInput type="text" placeholder="url" value={url} handleChange={handleInputChange} required="required" />

        <FormSubmitButton additionalStyle="addButton"> ADD DEPLOYMENT </FormSubmitButton>

      </form>
      <div><button className="btn scheduleButton" disabled={miliseconds > 0} onClick={handleSchedule}>  SCHEDULE DEPLOYMENT </button></div>
    
       {miliseconds > 0 && <Timer miliseconds={miliseconds} />} 
    </div>)
}

export default AddDeploymentForm;