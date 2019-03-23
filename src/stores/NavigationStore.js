/* global localStorage */
import { types } from 'mobx-state-tree';

const NavigationModel = types
  .model('Navigation', {
    bibliographyListPage: types.boolean,
    bibliographyPage: types.boolean,
    citationPage: types.boolean,
  })
  .actions(self => ({
    navigate(pageName) {
      switch (pageName) {
        case 'BibliographyList':
          self.bibliographyListPage = true;
          self.bibliographyPage = false;
          self.citationPage = false;
          break;
        case 'Citation':
          self.bibliographyListPage = false;
          self.bibliographyPage = false;
          self.citationPage = true;
          break;
        case 'Bibliography':
          self.bibliographyListPage = false;
          self.bibliographyPage = true;
          self.citationPage = false;
          break;
        default:
          self.bibliographyListPage = true;
          self.bibliographyPage = false;
          self.citationPage = false;
      }
      const newState = {
        bibliographyListPage: self.bibliographyListPage,
        bibliographyPage: self.bibliographyPage,
        citationPage: self.citationPage,
      };
      localStorage.setItem('PersistentState', JSON.stringify(newState));
    },
  }))
  .views(self => ({
    get page() {
      const { bibliographyListPage, bibliographyPage, citationPage } = self;
      return { bibliographyListPage, bibliographyPage, citationPage };
    },
  }));

export const defaultView = {
  bibliographyListPage: true,
  bibliographyPage: false,
  citationPage: false,
};

export default NavigationModel;
