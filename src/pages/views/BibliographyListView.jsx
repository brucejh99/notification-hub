import React, { PureComponent } from 'react';
import { ScrollableArea, ExpandableButton } from '../../components';

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
    textAlign: 'center',
    fontFamily: 'Oleo Script',
    color: 'white',
    fontSize: '64pt'
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
  }
}

export default class BibliographyListView extends PureComponent {
  render() {
    const {
      bibliography,
      selectBib,
      deleteBib,
      name,
      editName,
      submitName
    } = this.props;
    
    return (
      <div style={styles.body}>
        <h1 style={styles.header}>inCite</h1>
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
        <form onSubmit={submitName}>
          Name:
          <input type="text" name="name" value={name} onChange={editName}/>
          <br />
          <input type="submit" value="Create New Bibliography" />
        </form>
      </div>
    );
  }
}
