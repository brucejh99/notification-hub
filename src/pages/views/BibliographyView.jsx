import React, { PureComponent } from 'react';
import {
  Button,
  Dropdown,
  SelectableButton,
  ScrollableArea,
  CitationListItem,
} from '../../components';
import { LIGHT_THEME, RED, YELLOW } from '../../assets/colors';

export default class BibliographyView extends PureComponent {
  render() {
    const {
      bibliographyName,
      bibliography,
      bibliographyList,
      onSelectBibliography,
      addCitation,
      copy,
      deleteItem,
      editItem,
      bibStyle,
      updateStyle,
      addBibliography,
      deleteBibliography,
      parsing
    } = this.props;

    return (
      <div style={styles.body}>
        <Dropdown
          value={bibliographyName}
          options={bibliographyList}
          onAdd={addBibliography}
          onDelete={deleteBibliography}
          onSelectBibliography={onSelectBibliography}
          style={styles.dropdown}
        />
        <div style={styles.listHeader}>
          <div>
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
          {parsing ? <div style={styles.activityIndicator} /> : null}
        </div>
        <div style={styles.listContainer}>
          <ScrollableArea
            width={345}
            height={300}
            backgroundColor={LIGHT_THEME}
            borderColor={YELLOW}
            borderWidth={1}
            curved
          >
            {bibliography.map(item => (
              <CitationListItem
                citationObject={item}
                deleteCitation={() => deleteItem(item)}
                editCitation={() => editItem(item)}
              />
            ))
            }
          </ScrollableArea>
        </div>
        <div style={{ ...styles.buttonContainer, ...styles.bottom }}>
          <Button
            onClick={addCitation}
            style={styles.bottomButton}
          >
              Add
          </Button>
          {document.queryCommandSupported('copy')
            ? (
              <Button
                onClick={copy}
                style={styles.bottomButton}
              >
                  Copy
              </Button>
            )
            : null}
        </div>
        <div id='copyArea' contentEditable='true' style={styles.copyArea} />
      </div>
    );
  }
}

const styles = {
  body: {
    width: '400px',
    background: 'white',
    padding: 0,
    margin: 0
  },
  dropdown: {
    width: '340px',
    height: '50px',
    padding: '10px 30px',
    marginTop: '2px',
    border: 'none'
  },
  listHeader: {
    width: '344px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 28px'
  },
  buttonContainer: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'left'
  },
  styleButton: {
    height: '34px',
    width: '75px',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '900',
    color: YELLOW,
    backgroundColor: 'white',
    marginLeft: '-1px',
    border: '1px solid ' + YELLOW,
    borderRadius: '0px 10px 0px 0px',
  },
  activityIndicator: {
    height: '20px',
    width: '20px',
    alignSelf: 'center',
    backgroundColor: 'red',
    margin: '0px 14px'
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '-1px',
    marginLeft: '1px',
    justifyContent: 'center',
    border: 'none',
  },
  copyArea: {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '12pt',
    lineHeight: 2,
    position: 'fixed',
    left: '-10000px',
    top: '10000px',
    whiteSpace: 'pre',
  },
  bottom: {
    height: '40px',
    justifyContent: 'center',
    margin: '20px 0px',
  },
  bottomButton: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: RED,
    fontSize: '14px',
    margin: '0px 3px',
    border: '1px solid ' + RED,
  },
};
