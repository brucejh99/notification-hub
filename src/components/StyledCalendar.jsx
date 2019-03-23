import './StyledCalendar.css';
import React, { PureComponent } from 'react';
import Calendar from 'react-calendar';

export default class StyledCalendar extends PureComponent {
  render() {
    const {
      onClickDay,
    } = this.props;

    return (
      <div>
        <Calendar onClickDay={this.props.onClickDay}/>
      </div>
    )
  }
}
