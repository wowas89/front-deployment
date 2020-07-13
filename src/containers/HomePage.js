import React from 'react';

// components 
import AddDeploymentForm from '../components/AddDeploymentForm';
import DeploymentList from '../components/DeploymentList';

const HomePage = () => (
    <div className="row  d-flex  align-items-center justify-content-center homePage">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4 p-3 shadow-lg  homePageForm">
            <AddDeploymentForm />
            <DeploymentList />
        </div>
    </div>
)

export default HomePage;