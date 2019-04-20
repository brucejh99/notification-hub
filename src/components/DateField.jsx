import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StyledCalendar from './StyledCalendar';

const styles = {
  tr: {
    display: 'table-row',
    borderBottom: '15px solid transparent',
    position: 'relative',
  },
  td: {
    display: 'table-cell',
    position: 'relative',
  },
  tableName: {
    width: '90px',
    paddingRight: '20px',
    extAlign: 'left',
  },
  textbox: {
    width: '150px',
    padding: '5px',
    border: '1px solid #FFE455',
    borderRadius: '0px 10px 0px 10px',
  },
  dimmed: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: '2',
  },
};

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {Date} date Date object, updates the date
 * @prop {Func} onChange Handler for when date changes
 */
export default class DateField extends PureComponent {
  constructor(props) {
    super(props);

    const { date } = this.props;
    this.state = {
      showCalendar: false,
      date: date || new Date(),
    };
  }

  onClickDay = (newDate) => {
    const { onDateChange, fieldName } = this.props;
    onDateChange(fieldName, newDate);
    this.setState({
      date: newDate,
      showCalendar: false,
    });
  }

  dismissCalendar = () => {
    this.setState({ showCalendar: false });
  }

  render() {
    const { fieldName } = this.props;
    const { date, showCalendar } = this.state;

    const calendarDisplay = (
      <div>
        <StyledCalendar onClickDay={this.onClickDay} />
        <div
          style={styles.dimmed}
          role="presentation"
          onClick={this.dismissCalendar}
          onKeyPress={this.dismissCalendar}
        />
      </div>
    );

    return (
      <label htmlFor={fieldName} style={styles.tr}>
        <span style={{ ...styles.td, ...styles.tableName }}>{fieldName}</span>
        <span
          style={{ ...styles.td, ...styles.tableField }}
          role="presentation"
          onClick={e => e.preventDefault()}
        >
          <input
            id={fieldName}
            type="text"
            name={fieldName}
            placeholder={fieldName}
            value={new Date(date).toISOString().split('T')[0]}
            readOnly
            onClick={() => this.setState({ showCalendar: true })}
            style={styles.textbox}
          />
          { showCalendar ? calendarDisplay : null }
        </span>
      </label>
    );
  }
}

DateField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
