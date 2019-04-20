import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '.';

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
  authorButton: {
    height: '25px',
    width: '25px',
    backgroundColor: 'white',
    color: '#F69970',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    border: '1px solid #F69970',
  },
};

/**
 * Field class to enter author name
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} value Value of the variable, updates the field
 * @prop {Number} index Index of author in authors array
 * @prop {Number} authorsLength Length of authors array
 * @prop {Func} onChange Handler for when value changes
 * @prop {Func} addAuthor Adds a new empty author String in store
 * @prop {Func} subtractAuthor Removes last author String in store
 */
export default class AuthorField extends Component {
    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      const { onChange } = this.props;
      onChange(fieldName, fieldValue);
    }

    render() {
      const {
        fieldName, value, index, authorsLength, addAuthor, subtractAuthor,
      } = this.props;

      return (
        <label htmlFor={`fieldName ${index}`} style={styles.tr}>
          <span style={{ ...styles.td, ...styles.tableName }}>{index === 0 ? 'Author' : ''}</span>
          <span style={styles.td}>
            <input
              id={`fieldName ${index}`}
              type="text"
              name={fieldName}
              placeholder={fieldName}
              value={value}
              onChange={this.onFieldChange}
              style={styles.textbox}
            />
            { index === 0
              ? <Button onClick={addAuthor} style={styles.authorButton}>+</Button>
              : null }
            { index !== 0 && index === authorsLength - 1
              ? <Button onClick={subtractAuthor} style={styles.authorButton}>-</Button>
              : null }
          </span>
        </label>
      );
    }
}

AuthorField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  authorsLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  subtractAuthor: PropTypes.func.isRequired,
};
