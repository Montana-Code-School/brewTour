import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({value, label, errorText, onFieldChanged, type, showError}) => (
  <div className="InputGroup">
    <h4>{label}</h4>
    <input
      type={type}
      placeholder = {label}
      value = {value}
      onChange = {onFieldChanged}
      />
      {showError &&
        <div>
          {errorText}
        </div>
      }
  </div>
)

TextField.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  type: PropTypes.string,
  showError: PropTypes.bool,
  onFieldChanged:PropTypes.func
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;
