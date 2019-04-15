import React, { PureComponent } from 'react';
import {
  DateField,
  FormField,
  Button,
  Title
} from '../../components';

const backIcon = require('../../assets/back-icon.svg');

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
      updateAuthor,
      updatePublisher,
      updateDatePublished,
      updateDateRetrieved,
      updateURL,
      toHTMLDate,
      updateBibliography,
      navigateBack
    } = this.props;

    return (
      <div>
        <div style={styles.header}>
          <img
            src={backIcon}
            alt='Back'
            onClick={navigateBack}
            style={styles.backButton} />
          <Title>
            Edit Citation
          </Title>
        </div>
        <div style={styles.table}>
          <FormField
            fieldName="Website"
            inputType="text"
            name="website"
            value={website}
            onChange={(field, value) => updateWebsite(value)}
          />
          <FormField
            fieldName="Article"
            inputType="text"
            name="article"
            value={article}
            onChange={(field, value) => updateArticle(value)}
          />
          <FormField
            fieldName="Author"
            inputType="text"
            name="author"
            value={authors[0]}
            onChange={(field, value) => updateAuthor(value)}
          />
          <FormField
            fieldName="Publisher"
            inputType="text"
            name="publisher"
            value={publisher}
            onChange={(field, value) => updatePublisher(value)}
          />
          <DateField
            fieldName="Date Published"
            name="datePublished"
            date={toHTMLDate(datePublished)}
            onDateChange={(field, value) => updateDatePublished(value)}
          />
          <DateField
            fieldName="Date Retrieved"
            name="dateRetrieved"
            value={toHTMLDate(dateRetrieved)}
            onDateChange={(field, value) => updateDateRetrieved(value)}
          />
          <FormField
            fieldName="URL"
            inputType="text"
            name="url"
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

const styles = {
  header: {
    width: '400px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    height: '18.5px',
    width: '22px',
    marginLeft: '17px',
    marginRight: '10px',
    cursor: 'pointer',
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
  }
}
