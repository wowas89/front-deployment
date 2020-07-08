import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({handleChange, value, children}) => (
  <div className="input-group">
    <select className="form-control" onChange={handleChange} value={value} >
      {children}
    </select>
  </div>
)

FormSelect.propTypes = {
  handleChange: PropTypes.func
}

export default FormSelect;