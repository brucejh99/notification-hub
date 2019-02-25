/* global chrome */
import React, { Component } from 'react';
import './BibliographyScreen.css';
import request from 'request';
import uuid from 'uuid/v4';
import { observer, inject } from 'mobx-react';
import BibliographyView from '../views/BibliographyView';
import { toAPA, toMLA, toChicago, toHarvard } from '../../services/Converter';
import { getCorrectedCurrentDate, } from '../../services/Utils';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {Function} updateStyle Method to update selected style globally
 */
class BibliographyPage extends Component {
  addCitation = async () => {
    const { bibliography } = this.props.store;
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const url = tabs[0].url;
      let metadata;
      request({ uri: url, timeout: 5000 }, async (err, res, html) => {
        if(html === undefined || err) {
          metadata = { url };
        } else {
          metadata = await metascraper({ html, url });
        }
        let dateString = metadata.date;
        console.log(dateString);
        if(dateString) dateString = new Date(dateString);
        const citation = {
          url: metadata.url || null,
          article: metadata.title || null,
          author: metadata.author || null,
          website: metadata.publisher || null,
          publisher: null,
          datePublished: dateString || null,
          dateRetrieved: getCorrectedCurrentDate(),
          id: uuid()
        };
        citation.apa = toAPA(citation);
        citation.mla = toMLA(citation);
        citation.chicago = toChicago(citation);
        citation.harvard = toHarvard(citation);
        bibliography.addCitation(citation);
      });
    });
  }

  copyCitations = () => {
    const { bibliography } = this.props.store;
    const copyArea = document.getElementById('copyArea');
    const copyValue = bibliography.renderCitations.map(item => item.citation);
    copyArea.innerHTML = copyValue.join('\n');
    copyArea.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  editCitation = (item) => {
    const { navigation, citation, bibliography } = this.props.store;
    const editValue = bibliography.bibCitations.find(value => value.id === item.id);
    citation.setCitation(editValue);
    navigation.navigate('Citation');
  }

  render() {
    const { bibliography } = this.props.store;
    return (
      <BibliographyView
        style={bibliography.bibStyle}
        updateStyle={bibliography.updateStyle}
        bibliography={bibliography.renderCitations}
        add={this.addCitation}
        copy={this.copyCitations}
        edit={this.editCitation}
        deleteItem={bibliography.deleteCitation}
      />
    );
  }
}

export default inject('store')(observer(BibliographyPage));