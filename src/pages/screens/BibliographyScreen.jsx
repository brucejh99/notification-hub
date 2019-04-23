/* global chrome */
import React, { Component } from 'react';
import request from 'request';
import uuid from 'uuid/v4';
import { observer, inject } from 'mobx-react';
import BibliographyView from '../views/BibliographyView';
import {
  formatForConverter, toAPA, toMLA, toChicago, toHarvard,
} from '../../services/Converter';
import { getCorrectedCurrentDate } from '../../services/Utils';

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {Function} updateStyle Method to update selected style globally
 */
class BibliographyPage extends Component {
  metascraper = null;

  addCitation = async () => {
    const { store } = this.props;
    const { bibliography } = store;
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const { url } = tabs[0];
      let metadata;
      request({ uri: url, timeout: 5000 }, async (err, res, html) => {
        if (html === undefined || err) {
          metadata = { url };
        } else {
          if (!this.metascraper) {
            this.metascraper = require('metascraper')([
              require('metascraper-author')(),
              require('metascraper-date')(),
              require('metascraper-publisher')(),
              require('metascraper-title')(),
              require('metascraper-url')()
            ]);
          }
          metadata = await this.metascraper({ html, url });
        }
        let dateString = metadata.date;
        if (dateString) dateString = new Date(dateString);

        const authors = [];
        authors.push(metadata.author ? metadata.author : '');

        const citation = {
          url: metadata.url || null,
          article: metadata.title || null,
          authors,
          website: metadata.publisher || null,
          publisher: null,
          datePublished: dateString || null,
          dateRetrieved: getCorrectedCurrentDate(),
          id: uuid(),
        };
        const formattedCitation = formatForConverter(citation);
        citation.apa = toAPA(formattedCitation);
        citation.mla = toMLA(formattedCitation);
        citation.chicago = toChicago(formattedCitation);
        citation.harvard = toHarvard(formattedCitation);
        bibliography.addCitation(citation);
      });
    });
  }

  copyCitations = () => {
    const { store } = this.props;
    const { bibliography } = store;
    const copyArea = document.getElementById('copyArea');
    const copyValue = bibliography.renderCitations.map(item => item.citation);
    copyArea.innerHTML = copyValue.join('\n');
    copyArea.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  editCitation = (citationObject) => {
    const { store } = this.props;
    const { navigation, citation, bibliography } = store;
    const editValue = bibliography.bibCitations.find(value => value.id === citationObject.id);
    citation.setCitation(editValue);
    navigation.navigate('Citation');
  }

  render() {
    const { store } = this.props;
    const { bibliography } = store;
    return (
      <BibliographyView
        bibStyle={bibliography.bibStyle}
        updateStyle={bibliography.updateStyle}
        bibliographyName={bibliography.activeBibName}
        bibliography={bibliography.renderCitations}
        bibliographyList={bibliography.bibList}
        onSelectBibliography={bibliography.selectBibliography}
        addCitation={this.addCitation}
        copy={this.copyCitations}
        editItem={this.editCitation}
        deleteItem={bibliography.deleteCitation}
        addBibliography={bibliography.addBibliography}
        deleteBibliography={bibliography.deleteBibliography}
      />
    );
  }
}

export default inject('store')(observer(BibliographyPage));
