/* global chrome */

import React, { Component } from 'react';
import './Citation.css';
import request from 'request';
import LoadingPage from './Loading';
import { getOrSetBibliography, updateBibliography } from '../services/Storage';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

export default class Citation extends Component {
  constructor() {
    super();
    this.addToBibliography = this.addToBibliography.bind(this);
    this.state = {
      complete: false,
      success: false,
      article: null,
      author: null,
      publisher: null,
      datePublished: null,
      dateRetrieved: new Date(),
      url: null,
      added: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      const url = tabs[0].url;
      request({ uri: url, timeout: 5000 }, async function(err, res, html) {
        if(html === undefined || err) {
          console.log('Could not read the page! We should display this somewhere.');
          self.setState({
            url: url,
            complete: true
          });
        } else {
          const metadata = await metascraper({ html, url });
          metadata.success = true;
          let dateString = metadata.date;
          if(dateString) dateString = new Date(dateString);
          console.log(metadata);
          self.setState({
            complete: true,
            success: true,
            article: metadata.title,
            author: metadata.author,
            website: metadata.publisher,
            datePublished: dateString,
            url: url
          });
        }
      });
    });
  }

  onChange(field, value) {
    this.setState({
      [field]: value
    }, function () {
      console.log(field + ": " + this.state[field]);
    });
  }

  toHTMLDate(date) {
    let dateString;
    try {
      dateString = date.toISOString().split("T")[0];
    } catch {
      dateString = '';
    }
    return dateString;
  }

  addToBibliography(e) {
    e.preventDefault();
    var bibliography = getOrSetBibliography();
    const metadata = {
      article: this.state.article,
      author: this.state.author,
      website: this.state.website,
      datePublished: this.state.datePublished,
      dateRetrieved: this.state.dateRetrieved,
      publisher: this.state.publisher,
      url: this.state.url
    }
    bibliography.push(metadata); // for testing
    updateBibliography(bibliography); // for testing
    if(this.state.author) {
      // insert into to bibliography by order of last name alphabetically
    } else if(this.state.article) {
      // add with same rules but using article first name vs. other things' first letters
    } else {
      // no author or article name? Just add to the end I guess
    }
    this.setState({ added: 'Added to bibliography!' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Format: {this.state.style}</h1>
        </header>

        <div className="body">
        { this.state.complete ?
          <form onSubmit={this.addToBibliography}>
            <div className="table">
              <FormField fieldName="Source" inputType="text" name="website"
                value = {this.state.website} onChange={this.onChange} />
              <FormField fieldName="Article" inputType="text" name="article"
                value={this.state.article} onChange={this.onChange} />
              <FormField fieldName="Author" inputType="text" name="author"
                value={this.state.author} onChange={this.onChange} />
              <FormField fieldName="Date Published" inputType="date" name="datePublished"
                value={this.toHTMLDate(this.state.datePublished)} onChange={this.onChange} />
              <FormField fieldName="Date Retrieved" inputType="date" name="dateRetrieved"
                value={this.toHTMLDate(this.state.dateRetrieved)} onChange={this.onChange} />
              <FormField fieldName="URL" inputType="text" name="url"
                value={this.state.url} onChange={this.onChange} />
            </div>
            <div className="add-citation"><input type="submit" value="Add Citation" /><br />
            {this.state.added} </div>
          </form>
          :
        <LoadingPage /> }
        </div>
      </div>
    );
  }
}

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 */
class FormField extends Component {
  constructor(props) {
    super(props);

    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    const fieldName = event.target.name;
    var fieldValue = event.target.value;

    console.log(fieldValue);
    if (fieldName == "datePublished" || fieldName == "dateRetrieved") {
      fieldValue = new Date(fieldValue);
    }
    console.log(fieldValue);

    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    return (
      <label className="tr">
        <span className="td table-name">{this.props.fieldName}</span>
        <span className="td table-field">
          <input className={this.props.fieldName} type={this.props.inputType}
            name={this.props.name} placeholder={this.props.fieldName}
            value={this.props.value} onChange={this.onFieldChange}/>
        </span>
      </label>
    )
  }
}
