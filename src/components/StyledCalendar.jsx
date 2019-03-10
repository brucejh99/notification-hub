import './StyledCalendar.css';
import React, { PureComponent } from 'react';
import Calendar from 'react-calendar';

export default class StyledCalendar extends PureComponent {
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <Calendar />
    )
  }
}
