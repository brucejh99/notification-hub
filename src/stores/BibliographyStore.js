/* global localStorage */
import { types } from 'mobx-state-tree';
import Store from './Store';
import {
  MLASort, APASort, ChicagoSort, HarvardSort,
} from '../services/Sorter';

const Citation = types.model({
  article: types.maybeNull(types.string),
  authors: types.optional(types.array(types.string), []),
  publisher: types.maybeNull(types.string),
  website: types.maybeNull(types.string),
  datePublished: types.maybeNull(types.Date),
  dateRetrieved: types.maybeNull(types.Date),
  url: types.maybeNull(types.string),
  id: types.string,
  apa: types.string,
  mla: types.string,
  chicago: types.string,
  harvard: types.string
});

const BibliographyStoreModel = types
  .model('Bibliography', {
    name: types.string,
    list: types.array(types.string),
    style: types.maybeNull(types.string),
    citations: types.array(Citation),
    latestId: types.maybeNull(types.string),
    isDuplicate: types.boolean
  })
  .actions(self => ({
    addBibliography(name, style = null) {
      if (self.list.includes(name)) return false;
      self.name = `__${name}`;
      self.style = style || 'MLA';
      self.citations = [];
      self.list.push(name);
      localStorage.setItem(`__${name}`, JSON.stringify({
        style: self.style,
        citations: [],
      }));
      localStorage.setItem('Bibliographies', JSON.stringify({ name: self.name, list: self.list }));
      return true;
    },
    deleteBibliography(name) {
      localStorage.removeItem(`__${name}`);
      self.list.replace(self.list.filter(bibName => bibName !== name));
      if (self.list.length === 0) {
        self.name = '';
        self.citations.replace([]);
        localStorage.clear();
        Store.navigation.navigate('BibliographyList');
      } else if (self.name === `__${name}`) {
        self.name = `__${self.list[0]}`;
        const bibliography = JSON.parse(localStorage.getItem(self.name));
        self.style = bibliography.style;
        self.citations.replace(bibliography.citations);
        localStorage.setItem('Bibliographies', JSON.stringify({ name: self.name, list: self.list }));
      } else {
        localStorage.setItem('Bibliographies', JSON.stringify({ name: self.name, list: self.list }));
      }
    },
    selectBibliography(name) {
      localStorage.setItem('Bibliographies', JSON.stringify({ name: `__${name}`, list: self.list }));
      const { style, citations } = JSON.parse(localStorage.getItem(`__${name}`));
      self.name = `__${name}`;
      self.style = style;
      self.citations.replace(citations);
      self.latestId = null;
    },
    updateName(name) {
      localStorage.removeItem(self.name);
      self.list.filter(item => item !== self.name);
      self.name = `__${name}`;
      self.list.push(self.name);
      localStorage.setItem(self.name, JSON.stringify({
        style: self.style,
        citations: self.citations,
      }));
      localStorage.setItem('Bibliographies', JSON.stringify({ name: self.name, list: self.list }));
    },
    updateStyle(styleName) {
      self.style = styleName;
      localStorage.setItem(self.name, JSON.stringify({
        style: self.style,
        citations: self.citations,
      }));
    },
    addCitation(newCitation) {
      const isDuplicate = self.citations.filter(citation => citation.url === newCitation.url).length > 0;
      if(isDuplicate) {
        self.isDuplicate = true;
      } else {
        self.citations.push(newCitation);
        self.latestId = newCitation.id;
        localStorage.setItem(self.name, JSON.stringify({
          style: self.style,
          citations: self.citations,
        }));
      }
    },
    replaceCitation(newCitation) {
      self.citations.replace(self.citations.filter(citation => citation.id !== newCitation.id));
      self.citations.push(newCitation);
      localStorage.setItem(self.name, JSON.stringify({
        style: self.style,
        citations: self.citations,
      }));
    },
    deleteCitation(toDelete) {
      self.citations.replace(self.citations.filter(citation => citation.id !== toDelete.id));
      localStorage.setItem(self.name, JSON.stringify({
        style: self.style,
        citations: self.citations,
      }));
    },
    setLatestId(id) {
      self.latestId = id;
    },
    resolveDuplicate(res, newCitation) {
      if(res === 'update') {
        self.citations.replace(self.citations.filter(citation => citation.url !== newCitation.url));
        self.citations.push(newCitation);
        localStorage.setItem(self.name, JSON.stringify({
          style: self.style,
          citations: self.citations,
        }));
      }
      self.isDuplicate = false;
    }
  }))
  .views(self => ({
    get activeBibName() {
      if (self.name) return self.name.substr(2);
      const bibs = localStorage.getItem('Bibliographies');
      if (bibs === null) return null;
      return JSON.parse(bibs).name.substr(2);
    },
    get bibList() {
      return self.list.toJS();
    },
    get bibStyle() {
      return self.style;
    },
    get bibCitations() {
      return self.citations.toJS();
    },
    get bibLatestId() {
      return self.latestId;
    },
    get renderCitations() {
      let sortedBibliography = [];
      const jsBib = self.citations.toJS();
      if (jsBib.length === 0) return [];
      switch (self.style) {
        case 'APA':
          jsBib.sort(APASort);
          sortedBibliography = jsBib.map(item => ({
            citation: item.apa,
            id: item.id,
          }));
          break;
        case 'MLA':
          jsBib.sort(MLASort);
          sortedBibliography = jsBib.map(item => ({
            citation: item.mla,
            id: item.id,
          }));
          break;
        case 'Chicago':
          jsBib.sort(ChicagoSort);
          sortedBibliography = jsBib.map(item => ({
            citation: item.chicago,
            id: item.id,
          }));
          break;
        case 'Harvard':
          jsBib.sort(HarvardSort);
          sortedBibliography = jsBib.map(item => ({
            citation: item.harvard,
            id: item.id,
          }));
          break;
        default:
          sortedBibliography = ['Error: select a valid style'];
      }
      return sortedBibliography;
    },
    get duplicate() {
      return self.isDuplicate;
    }
  }));

export const emptyBibliography = {
  name: 'Untitled',
  style: null,
  citations: [],
  list: [],
  isDuplicate: false
};

export default BibliographyStoreModel;
