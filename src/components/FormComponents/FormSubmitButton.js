import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({ children, additionalStyle }) => (
    <div className="form-group">
        <button className={`form-control ${additionalStyle ? additionalStyle : ''}`}>
            {children}
        </button>
    </div>
)

FormButton.propTypes = {
    additionalStyle: PropTypes.string
}

export default FormButton;