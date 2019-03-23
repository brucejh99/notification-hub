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
      showCalendar: false,
      date: newDate,
    });
  }

  render() {
    const {
      date,
      onDateChange
    } = this.props;

    return (
        <label style={styles.tr}>
          <span style={{...styles.td, ...styles.tableName}}>{this.props.fieldName}</span>
          <span style={styles.td}>
            <input
              type="text"
              name={this.props.name}
              placeholder={this.props.fieldName}
              value={new Date(this.state.date).toISOString().split("T")[0]}
              disabled
              style={styles.textbox}
            />
            <Button
              onClick={() => this.setState(prevState => ({ showCalendar: !prevState.showCalendar }))}
              style={styles.button}
            >
            C
            </Button>
            { this.state.showCalendar ? <StyledCalendar onClickDay={this.onClickDay}/> : null }
          </span>
        </label>

    )
  }
}

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
  button: {
    height: '30px',
    width: '30px',
    backgroundColor: 'white',
    color: '#F69970',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    border: '1px solid #F69970',
  }
}
