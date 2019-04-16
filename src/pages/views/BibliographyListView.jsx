import React, { Component } from 'react';
import { Button, ScrollableArea, ExpandableButton, FormField } from '../../components';

export default class BibliographyListView extends Component {
  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    const {
      bibliography,
      selectBib,
      deleteBib,
      started,
      name,
      onChange,
      submitName
    } = this.props;

    return (
      <div style={styles.body}>
        <h1 style={styles.header}>inCite</h1>
        { started ? (
          <div style={styles.createBibliographyDiv}>
            <input
              type="text"
              name="name"
              placeholder="Name your bibliography"
              value={name}
              onChange={this.onFieldChange}
              style={styles.bibliographyNameField}
            />
            <br />
            <Button
              onClick={submitName}
              style={styles.createButton}
            >
              Create
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => onChange('started', true)}
            style={styles.startButton}
          >
            Start a new citation
          </Button>
        )}


        <ScrollableArea
          width={250}
          height={240}
          borderWidth={0}
        >
          <div style={styles.container}>
            {bibliography.map(bib => (
              <ExpandableButton
                width={200}
                  height={34}
                fontSize={14}
                margin={10}
                hoverable
                onClick={() => selectBib(bib)}
                style={styles.button}
              >
                {bib}
              </ExpandableButton>
            ))}
          </div>
        </ScrollableArea>
      </div>
    );
  }
}

const styles = {
  body: {
    width: '400px',
    height: '550px',
    background: 'linear-gradient(191.76deg, rgba(255, 168, 0, 0) 15.19%, rgba(232, 39, 186, 0.615317) 104.2%, #8F00FF 152.47%), #FFE455',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  header: {
    width: '100%',
    margin: 0,
    marginTop: '150px',
    textAlign: 'center',
    fontFamily: 'Oleo Script',
    color: 'white',
    fontSize: '64pt',
  },
  startButton: {
    height: '34px',
    width: '200px',
    backgroundColor: '#C3790B69',
    color: 'white',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    border: 'none',
  },
  createBibliographyDiv: {
    textAlign: 'center',
  },
  createButton: {
    height: '34px',
    width: '80px',
    backgroundColor: '#C3790B69',
    color: 'white',
    fontSize: '14px',
    margin: '10px 3px 0px',
    fontFamily: 'Nunito Sans',
    border: 'none',
  },
  bibliographyNameField: {
    width: '200px',
    padding: '5px',
    color: '#C3790B',
    backgroundColor: '#0000',
    border: 'none',
    borderBottom: '3px solid #C3790B69',
  },
  container: {
    width: '250px',
    height: '240px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start'
  },
  button: {
    backgroundColor: '#e5ac34',
    color: 'white',
    fontFamily: 'Nunito Sans',
    border: 'none'
  },
}
