/* global localStorage */
import { types } from 'mobx-state-tree';
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
  harvard: types.string,
});

const BibliographyStoreModel = types
  .model('Bibliography', {
    name: types.string,
    list: types.array(types.string),
    style: types.maybeNull(types.string),
    citations: types.array(Citation),
  })
  .actions(self => ({
    addBibliography(name, style) {
      self.name = `__${name}`;
      self.style = style || null;
      self.citations = [];
      self.list.push(name);
      localStorage.setItem(`__${name}`, JSON.stringify({
        style,
        citations: [],
      }));
      localStorage.setItem('Bibliographies', JSON.stringify({ name: `__${name}`, list: self.list }));
    },
    deleteBibliography(name) {
      localStorage.removeItem(`__${name}`);
      self.list.replace(self.list.filter(bibName => bibName !== name));
      self.name = '';
      self.citations.replace([]);
      localStorage.setItem('Bibliographies', JSON.stringify({ name: '', list: self.list }));
    },
    selectBibliography(name) {
      localStorage.setItem('Bibliographies', JSON.stringify({ name: `__${name}`, list: self.list }));
      const { style, citations } = JSON.parse(localStorage.getItem(`__${name}`));
      self.name = `__${name}`;
      self.style = style;
      self.citations.replace(citations);
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
      self.citations.push(newCitation);
      localStorage.setItem(self.name, JSON.stringify({
        style: self.style,
        citations: self.citations,
      }));
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
  }))
  .views(self => ({
    get activeBibName() {
      if(self.name) return self.name.substr(2);
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
  }));

export const emptyBibliography = {
  name: 'Untitled',
  style: null,
  citations: [],
  list: [],
};

export default BibliographyStoreModel;
