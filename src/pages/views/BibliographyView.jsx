import React, { PureComponent } from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import SelectableButton from '../../components/SelectableButton';
import ScrollableArea from '../../components/ScrollableArea';
import CitationListItem from '../../components/CitationListItem';

export default class BibliographyView extends PureComponent {
  render() {
    const { bibliographyName, bibliography, deleteItem, editItem, bibStyle, updateStyle } = this.props;

    return (
      <div style={styles.body}>
        <div style={styles.header}>
          <Title>
            {bibliographyName}
          </Title>
          <Dropdown buttonStyle={styles.dropdownButton} />
        </div>
        <div style={{...styles.buttonContainer, padding: '0px 28px'}}>
          <SelectableButton
            selected={bibStyle === 'MLA'}
            onClick={() => updateStyle('MLA')}
            style={styles.styleButton}
          >
            MLA
          </SelectableButton>
          <SelectableButton
            selected={bibStyle === 'APA'}
            onClick={() => updateStyle('APA')}
            style={styles.styleButton}
          >
            APA
          </SelectableButton>
          <SelectableButton
            selected={bibStyle === 'Chicago'}
            onClick={() => updateStyle('Chicago')}
            style={styles.styleButton}
          >
            Chicago
          </SelectableButton>
          <SelectableButton
            selected={bibStyle === 'Harvard'}
            onClick={() => updateStyle('Harvard')}
            style={styles.styleButton}
          >
            Harvard
          </SelectableButton>
        </div>
        <div style={styles.listContainer}>
          <ScrollableArea
            width={345}
            height={300}
            backgroundColor='white'
            borderColor='#FFE455'
            borderWidth={1}
            curved={true}
          >
            {bibliography.map(item => (
              <CitationListItem
                citationObject={item}
                deleteCitation={() => deleteItem(item)}
                editCitation={() => editItem(item)} />
            ))
            }
          </ScrollableArea>
        </div>
          <div style={{...styles.buttonContainer, ...styles.bottom}}>
            <Button
              onClick={this.props.add}
              style={styles.bottomButton}>
                Add
            </Button>
            {document.queryCommandSupported('copy')
              ? <Button
                  onClick={this.props.copy}
                  style={styles.bottomButton}>
                    Copy
                </Button>
              : null}
          </div>
        <div id="copyArea" contentEditable="true" style={styles.copyArea} />
      </div>
    );
  }
}

const styles = {
  header: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 30px'
  },
  body: {
    width: '400px',
    background: 'white',
    padding: 0,
    margin: 0
  },
  dropdownButton: {
    height: '22px',
    width: '18.5px',
    margin: '0px 8px'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'left'
  },
  styleButton: {
    height: '34px',
    width: '75px',
    fontSize: '14px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    color: '#FFE455',
    backgroundColor: 'white',
    marginLeft: '-1px',
    border: '1px solid #FFE455',
    borderRadius: '0px 10px 0px 0px'
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '-1px',
    justifyContent: 'center',
    border: 'none'
  },
  copyArea: {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '12pt',
    lineHeight: 2,
    position: 'fixed',
    left: '-10000px',
    top: '10000px',
    whiteSpace: 'pre'
  },
  bottom: {
    height: '40px',
    justifyContent: 'center',
    margin: '20px 0px'
  },
  bottomButton: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: '#F69970',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    border: '1px solid #F69970'
  }
}
