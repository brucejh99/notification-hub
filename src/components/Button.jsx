import React, { Component } from 'react';

export default class Button extends Component {
  state = {
    hovered: false,
  }

  styles = {
    button: {
      textDecoration: 'none',
      textAlign: 'center',
      borderRadius: '0px 10px',
      outline: 'none',
      cursor: 'pointer',
      ...this.props.style
    },
    hovered: {
      backgroundColor: this.props.style.color,
      color: this.props.style.backgroundColor,
    }
  }
  
  render() {
    const {
      onClick,
      children,
    } = this.props;
    const { hovered } = this.state;
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        style={ hovered 
          ? { ...this.styles.button, ...this.styles.hovered }
          : this.styles.button}>
          {children}
        </button>
    );
  }
}
