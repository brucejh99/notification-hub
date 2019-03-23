import React, { Component } from 'react';

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 */
export default class FormField extends Component {
    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      this.props.onChange(fieldName, fieldValue);
    }

    render() {
      return (
        <label style={styles.tr}>
          <span style={{...styles.td, ...styles.tableName}}>{this.props.fieldName}</span>
          <span style={styles.td}>
            <input
              type={this.props.inputType}
              name={this.props.name}
              placeholder={this.props.fieldName}
              value={this.props.value}
              onChange={this.onFieldChange}
              style={styles.textbox}
            />
          </span>
        </label>
      )
    }
}

const styles = {
  tr: {
    display: 'table-row',
    borderBottom: '15px solid transparent'
  },
  td: {
    display: 'table-cell'
  },
  tableName: {
    width: '90px',
    paddingRight: '20px',
    textAlign: 'left'
  },
  textbox: {
    padding: '5px',
    border: '1px solid #FFE455',
    borderRadius: '0px 10px 0px 10px'
  }
}
