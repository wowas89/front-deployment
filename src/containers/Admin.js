import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// components
import AdminAddTemplateForm from '../components/AdminAddTemplateForm';
import AdminAddTemplateVersionForm from '../components/AdminAddTemplateVersionForm';
import Message from '../components/Message';

const Admin = () => {
    const [formName, setFormName] = useState('AddTemplate');
    const addMessage = useSelector(state => state.message.message);

    const changeForm = () =>{
    (formName === "AddTemplate")? setFormName("AddTemplateVersion") : setFormName('AddTemplate');
    }

    return(
       
      <div className="row  d-flex  align-items-center justify-content-center homePage">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4 p-3 shadow-lg  homePageForm">
            <div className="mb-3 mt-3 text-center changeForm">
            {(formName === "AddTemplate") ?  <button onClick={changeForm}> Change to add template version form</button> :  <button onClick={changeForm}>Change to add template</button>} 
            </div>
            {addMessage && <Message message={addMessage} />}
           {(formName === "AddTemplate") ? <AdminAddTemplateForm /> :  <AdminAddTemplateVersionForm />} 
        </div>
    </div>
    )
}

export default Admin;