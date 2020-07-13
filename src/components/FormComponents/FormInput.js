import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ handleChange, ...otherProps }) => (
   <div className="form-group">
      <input className="form-control" onChange={handleChange} {...otherProps} />
   </div>
)

FormInput.propTypes = {
   handleChange: PropTypes.func
}

export default FormInput;

export const MemoFormInput = React.memo(FormInput);