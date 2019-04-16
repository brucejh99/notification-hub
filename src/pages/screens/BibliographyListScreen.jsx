import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BibliographyListView from '../views/BibliographyListView';

class BibliographyListPage extends Component {
  state = {
    started: false,
    name: '',
  }

  onChange = (field, value) => {
    this.setState({ [field]: value });
  }

  createBibliography = (event) => {
    event.preventDefault();
    const { navigation, bibliography } = this.props.store;
    const { name } = this.state;
    bibliography.addBibliography(name, 'MLA');
    navigation.navigate('Bibliography');
  }

  selectBibliography = (name) => {
    const { bibliography, navigation } = this.props.store;
    bibliography.selectBibliography(name);
    navigation.navigate('Bibliography');
  }

  render() {
    const { bibliography } = this.props.store;
    return (
      <BibliographyListView
        bibliography={bibliography.bibList}
        selectBib={this.selectBibliography}
        deleteBib={bibliography.deleteBibliography}
        started={this.state.started}
        name={this.state.name}
        onChange={this.onChange}
        submitName={this.createBibliography}
      />
    );
  }
}

export default inject('store')(observer(BibliographyListPage));
