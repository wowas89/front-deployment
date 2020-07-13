import React from 'react';
import PropTypes from 'prop-types';

const FormSubmitButton = ({ children, additionalStyle }) => (
    <div className="form-group">
        <button className={`form-control btn ${additionalStyle ? additionalStyle : ''}`}>
            {children}
        </button>
    </div>
)

FormSubmitButton.propTypes = {
    additionalStyle: PropTypes.string
}

export default FormSubmitButton;