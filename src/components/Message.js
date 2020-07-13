import React from 'react';
import {useDispatch} from 'react-redux';
import {clearMessage} from '../actions';
import PropTypes from 'prop-types';

const Message = ({message}) =>{

    const dispatch = useDispatch();

    const handleClearMessage = ()=> dispatch(clearMessage());
    
    return(
    <div className="message mb-2 p-1 text-center" onClick={handleClearMessage}>
        {message}
    </div>
    )
}

Message.propTypes = {
    message:PropTypes.string
}

export default Message;