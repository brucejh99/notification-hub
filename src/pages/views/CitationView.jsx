import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AuthorField, DateField, FormField, Button, Title,
} from '../../components';


const backIcon = require('../../assets/back-icon.svg');

const styles = {
  header: {
    width: '400px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
  },
  backButtonDiv: {
    height: '18.5px',
    width: '22px',
    marginLeft: '17px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  backButton: {
    height: '18.5px',
    width: '22px',
  },
  table: {
    display: 'table',
    margin: '0 30px',
    marginTop: '25px',
    borderCollapse: 'collapse',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0px',
  },
  button: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: '#F69970',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    border: '1px solid #F69970',
  },
};

/**
 * UI Clase for a Citation
 * @prop {String} website
 * @prop {String} article,
 * @prop {Array} authors Array of author Strings
 * @prop {String} publisher,
 * @prop {Date} datePublished,
 * @prop {Date} dateRetrieved,
 * @prop {String} url,
 * @prop {Func} updateWebsite Update website String in store
 * @prop {Func} updateArticle Update article String in store
 * @prop {Func} addAuthor Adds a new empty author String in store
 * @prop {Func} subtractAuthor Removes last author String in store
 * @prop {Func} updateAuthor Update author String in store
 * @prop {Func} updatePublisher Update publisher String in store
 * @prop {Func} updateDatePublished Update date published Date in store
 * @prop {Func} updateDateRetrieved Update date retrieved Date in store
 * @prop {Func} updateURL Update url String in store
 * @prop {Func} toHTMLDate Convert date to readable HTML text
 * @prop {Func} updateBibliography Update bibliography Object in store
 * @prop {Func} navigateBack Function that navigates to previous screen
 */
export default class CitationView extends PureComponent {
  render() {
    const {
      website,
      article,
      authors,
      publisher,
      datePublished,
      dateRetrieved,
      url,
      updateWebsite,
      updateArticle,
      addAuthor,
      subtractAuthor,
      updateAuthor,
      updatePublisher,
      updateDatePublished,
      updateDateRetrieved,
      updateURL,
      toHTMLDate,
      updateBibliography,
      navigateBack,
    } = this.props;

    return (
      <div>
        <div style={styles.header}>
          <div
            role="button"
            tabIndex="0"
            onClick={navigateBack}
            onKeyPress={navigateBack}
            style={styles.backButtonDiv}
          >
            <img
              src={backIcon}
              alt="Back"
              style={styles.backButton}
            />
          </div>

          <Title>
            Edit Citation
          </Title>
        </div>
        <div style={styles.table}>
          <FormField
            fieldName="Website"
            value={website}
            onChange={(field, value) => updateWebsite(value)}
          />
          <FormField
            fieldName="Article"
            value={article}
            onChange={(field, value) => updateArticle(value)}
          />
          { authors.map((author, index) => (
            <AuthorField
              fieldName="Author"
              value={author}
              firstAuthor={index === 0}
              lastAuthor={index !== 0 && index === authors.length - 1}
              onChange={(field, value) => updateAuthor(value, index)}
              addAuthor={addAuthor}
              subtractAuthor={subtractAuthor}
            />
          )) }
          <FormField
            fieldName="Publisher"
            value={publisher}
            onChange={(field, value) => updatePublisher(value)}
          />
          <DateField
            fieldName="Date Published"
            date={toHTMLDate(datePublished)}
            onDateChange={(field, value) => updateDatePublished(value)}
          />
          <DateField
            fieldName="Date Retrieved"
            value={toHTMLDate(dateRetrieved)}
            onDateChange={(field, value) => updateDateRetrieved(value)}
          />
          <FormField
            fieldName="URL"
            value={url}
            onChange={(field, value) => updateURL(value)}
          />
        </div>
        <div style={styles.buttonContainer}>
          <Button
            onClick={updateBibliography}
            style={styles.button}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }
}

CitationView.propTypes = {
  website: PropTypes.string.isRequired,
  article: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(String).isRequired,
  publisher: PropTypes.string.isRequired,
  datePublished: PropTypes.isInstanceOf(Date).isRequired,
  dateRetrieved: PropTypes.isInstanceOf(Date).isRequired,
  url: PropTypes.string.isRequired,
  updateWebsite: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  subtractAuthor: PropTypes.func.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  updatePublisher: PropTypes.func.isRequired,
  updateDatePublished: PropTypes.func.isRequired,
  updateDateRetrieved: PropTypes.func.isRequired,
  updateURL: PropTypes.func.isRequired,
  toHTMLDate: PropTypes.func.isRequired,
  updateBibliography: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
};
