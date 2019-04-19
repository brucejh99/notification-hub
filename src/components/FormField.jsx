import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  tr: {
    display: 'table-row',
    borderBottom: '15px solid transparent',
  },
  td: {
    display: 'table-cell',
  },
  tableName: {
    width: '90px',
    paddingRight: '20px',
    textAlign: 'left',
  },
  textbox: {
    padding: '5px',
    border: '1px solid #FFE455',
    borderRadius: '0px 10px 0px 10px',
  },
};

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 * @prop {String} name Name of the variable
 * @prop {String} value Value of the variable, updates the field
 * @prop {Func} onChange Handler for when value changes
 */
export default class FormField extends Component {
    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      const { onChange } = this.props;
      onChange(fieldName, fieldValue);
    }

    render() {
      const {
        fieldName, inputType, name, value,
      } = this.props;

      return (
        <label htmlFor="formFieldInput" style={styles.tr}>
          <span style={{ ...styles.td, ...styles.tableName }}>{fieldName}</span>
          <span style={styles.td}>
            <input
              id="formFieldInput"
              type={inputType}
              name={name}
              placeholder={fieldName}
              value={value}
              onChange={this.onFieldChange}
              style={styles.textbox}
            />
          </span>
        </label>
      );
    }
}

FormField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
