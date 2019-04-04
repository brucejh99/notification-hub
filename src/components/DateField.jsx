import React, { PureComponent } from 'react';
import StyledCalendar from './StyledCalendar';
import Button from './Button';

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 */
export default class DateField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
      date: this.props.date || new Date(),
     };
  }

  onClickDay = (newDate) => {
    this.props.onDateChange(this.props.fieldName, newDate);
    this.setState({
      date: newDate,
      showCalendar: false,
    });
  }

  render() {
    return (
        <label style={styles.tr}>
          <span style={{...styles.td, ...styles.tableName}}>{this.props.fieldName}</span>
          <span style={{...styles.td, ...styles.tableField}}
                onClick={e => e.preventDefault()}
          >
            <input
              type="text"
              name={this.props.name}
              placeholder={this.props.fieldName}
              value={new Date(this.state.date).toISOString().split("T")[0]}
              readonly
              onClick={() => this.setState(prevState => ({ showCalendar: !prevState.showCalendar}))}
              style={styles.textbox}
            />
            { this.state.showCalendar ? <StyledCalendar onClickDay={this.onClickDay} /> : null }
          </span>
        </label>

    )
  }
}

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
    textAlign: 'left',
  },
  textbox: {
    padding: '5px',
    border: '1px solid #FFE455',
    borderRadius: '0px 10px 0px 10px',
  },
}
