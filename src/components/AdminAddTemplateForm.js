import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTemplate, clearMessage } from '../actions';

// components
import FormInput from './FormComponents/FormInput';
import FormSubmitButton from './FormComponents/FormSubmitButton';

const AdminAddTemplateForm = () => {

  const [templateName, setTemplateName] = useState('');
  const [templateVersion, setTemplateVersion] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTemplate({ templateName, templateVersion }))
  }

  return (
    <div className="pb-4 addForm">
      <form onSubmit={handleSubmit} >
        <FormInput type="text" placeholder="template name" value={templateName} handleChange={e => setTemplateName(e.target.value)} required="required" />
        <FormInput type="text" placeholder="template version" value={templateVersion} handleChange={e => setTemplateVersion(e.target.value)} required="required" />
        <FormSubmitButton additionalStyle="addButton"> ADD TEMPLATE </FormSubmitButton>
      </form>
    </div>
  )
}

export default AdminAddTemplateForm;