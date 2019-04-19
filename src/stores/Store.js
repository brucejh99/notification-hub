import NavigationStoreModel, { defaultView } from './NavigationStore';
import BibliographyStoreModel, { emptyBibliography } from './BibliographyStore';
import CitationStoreModel, { emptyCitation } from './CitationStore';

class StoreModel {
    navigation = NavigationStoreModel.create(defaultView);

    bibliography = BibliographyStoreModel.create(emptyBibliography);

    citation = CitationStoreModel.create(emptyCitation);

    init = () => {
      const storedPage = localStorage.getItem('PersistentState');
      const storedBib = localStorage.getItem('Bibliographies');
      const storedCitation = localStorage.getItem('CurrentCitation');

      if (storedPage) this.navigation = NavigationStoreModel.create(JSON.parse(storedPage));
      if (storedBib) {
        const bibliographies = JSON.parse(storedBib);
        const activeBib = JSON.parse(localStorage.getItem(bibliographies.name));
        this.bibliography = BibliographyStoreModel.create({
          name: bibliographies.name,
          list: bibliographies.list,
          style: activeBib ? activeBib.style : null,
          citations: activeBib ? activeBib.citations : [],
        });
      }
      if (storedCitation) {
        this.citation.setCitation(JSON.parse(storedCitation));
      }
    }
}

const Store = new StoreModel();
Store.init();
export default Store;
