import React from 'react';
import {useSelector} from 'react-redux';

// components 
import AddDeploymentForm from '../components/AddDeploymentForm';
import DeploymentList from '../components/DeploymentList';
import Message from '../components/Message';


const HomePage = () => {
    const addMessage = useSelector(state => state.message.message);

    return(
    <div className="row  d-flex  align-items-center justify-content-center homePage">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4 p-3 shadow-lg  homePageForm">
        {addMessage && <Message message={addMessage} />}
            <AddDeploymentForm />
            <DeploymentList />
        </div>
    </div>
    )
}

export default HomePage;