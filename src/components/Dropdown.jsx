import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import Title from './Title';

const caret = require('../assets/caret.svg');

const styles = {
  body: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    width: '317px',
  },
  headerContainer: {
    height: '30px',
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  dropdown: {
    maxHeight: '600px',
    width: '100%',
    overflowY: 'auto',
  },
  icon: {
    verticalAlign: 'center',
  },
  option: {
    width: '100%',
    padding: '2.5px 2.5px',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
  },
};

export default class Dropdown extends Component {
  state = {
    active: false,
  }

  onClick = (option) => {
    this.props.onSelectBibliography(option);
    this.setState({ active: false });
  }

  render() {
    const {
      value,
      options,
      onAdd,
      onDelete
    } = this.props;
    const { active } = this.state;
    return (
      <div
        onClick={() => this.setState({ active: !active })}
        style={{ ...styles.body, ...this.props.style }}
      >
        <div style={styles.headerContainer}>
          <Title style={styles.title}>
            {value}
          </Title>
          <img
            src={caret}
            alt="Dropdown"
            style={styles.icon}
          />
        </div>
        {active ? (
          <div style={styles.dropdown}>
            {options.map(option => (
              <DropdownItem
                value={option}
                onClick={() => this.onClick(option)}
                onDelete={() => onDelete(option)}
              />
            ))}
            {/* <DropdownItem
              value={}
            /> */}
          </div>
        )
          : null
        }
      </div>
    );
  }
}
