import React, { Component } from 'react';
import deleteIcon from '../assets/delete-icon.svg';

const styles = {
  container: {
    width: '325px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
  },
  containerHovered: {
    backgroundColor: '#fff1aa',
  },
  citation: {
    width: '295px',
    wordWrap: 'break-word',
  },
  buttonContainer: {
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '15px',
    transition: 'height 0.25s',
  },
  iconHovered: {
    height: '20px',
  },
};

export default class CitationListIem extends Component {
  state = {
    allHovered: false,
    deleteHovered: false,
  }

  render() {
    const { citationObject, deleteCitation, editCitation } = this.props;
    const { allHovered, deleteHovered } = this.state;
    return (
      <div
        onMouseEnter={() => this.setState({ allHovered: true })}
        onMouseLeave={() => this.setState({ allHovered: false })}
        style={allHovered ? { ...styles.container, ...styles.containerHovered } : styles.container}
      >
        <div
          dangerouslySetInnerHTML={{ __html: citationObject.citation }}
          onClick={editCitation}
          style={styles.citation}
        />
        <div style={styles.buttonContainer}>
          <img
            src={deleteIcon}
            alt='Delete'
            onMouseEnter={() => this.setState({ deleteHovered: true })} 
            onMouseLeave={() => this.setState({ deleteHovered: false })}
            onClick={deleteCitation}
            style={deleteHovered ? {...styles.icon, ...styles.iconHovered} : styles.icon}
          />
        </div>
      </div>
    );
  }
}
