import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTemplateVersion, clearMessage } from '../actions';

import {selectTemplates} from '../selectors/templateSelectors';
import {selectMessage} from '../selectors/messageSelectors';

// components
import FormSelect from './FormComponents/FormSelect';
import FormInput from './FormComponents/FormInput';
import FormSubmitButton from './FormComponents/FormSubmitButton';
import Message from './Message';

const AdminAddTemplateVersionForm = () => {

  const [templateName, setTemplateName] = useState('');
  const [templateVersion, setTemplateVersion] = useState('');

  // states from redux
  const templates = useSelector(state => selectTemplates(state));
  const message = useSelector(state => selectMessage(state));

  const dispatch = useDispatch();

  // when we get templates we need to set the initial template name
  useEffect(() => {
    if (templates.length > 0) setTemplateName(templates[0].name);
  }, [templates]);

   // clear message when component unmount
   useEffect(() => {
    return () => dispatch(clearMessage());
  }, [dispatch]);

  // add version to template
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTemplateVersion({ name: templateName, version: templateVersion }));
    setTemplateVersion('');
  }

  return (
    <div className="pb-4 addForm">
    {message && <Message message={message} />}
      <form onSubmit={handleSubmit}>
        <FormSelect value={templateName} handleChange={e => setTemplateName(e.target.value)}>
          {templates.map(template => <option key={template._id} value={template.name}> {template.name}</option>)}
        </FormSelect>

        <FormInput placeholder="template version" value={templateVersion} handleChange={e => setTemplateVersion(e.target.value)} required="required" />
        <FormSubmitButton additionalStyle="addButton"> ADD TEMPLATE VERSION </FormSubmitButton>
      </form>
    </div>
  )
}

export default AdminAddTemplateVersionForm;
