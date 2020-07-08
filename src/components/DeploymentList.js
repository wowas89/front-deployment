import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDeployments, deleteDeployment } from '../actions';
import moment from 'moment';
import { MdDelete } from "react-icons/md";

// components
import Loading from '../components/UI/Loading';

const DeploymentList = () => {
    const deployments = useSelector(state => state.deployment.deployments);
    const loading = useSelector(state => state.deployment.loadingData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeployments())
    }, [dispatch])
    
    return (
        <div>
           <p className="text-center pb-2 pt-2 mb-2 deploymentListTitle">LIST OF DEPLOYMENTS</p> 
                {loading && <Loading />}
            <div className="row p-1 m-1">
                <div className="col-3">Name</div>
                <div className="col-2">Version</div>
                <div className="col-2"></div>
                <div className="col-3">DATE</div>
                <div className="col-2"></div>
            </div>
                {deployments.map(deployment =>
                    (
                    <div className="row listOfDeployments p-1 m-1" key={deployment._id}> 
                        <div className="col-3"> {deployment.templateName}  </div>
                        <div className="col-2"> {deployment.version} </div>
                        <div className="col-2"> <a href={deployment.url} target="_blank" rel="noopener noreferrer">LINK</a>  </div>
                        <div className="col-3"> {moment(deployment.deployedAt).format("YYYY-MM-DD")} </div>
                        <div className="col-2"> <button className="deleteButton float-right" onClick={()=> dispatch(deleteDeployment(deployment._id))}> <MdDelete /> </button>  </div>
                    </div>
                    )
                )}
        </div>
    )
}

export default DeploymentList;