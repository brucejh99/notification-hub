import React, { Component } from 'react';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import './BibliographyList.css';
import { getState } from '../services/Storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
    this.state.bibliographyList = [];
  }

  selectBibliography(bibliographyName) {
    // Update the current bibliography and open "home"
  }

  render() {
    return (
      <div className="body">
        <div className="display">
          <div className="list-container">
            <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
              {this.state.bibliographyList.map(item => (
                <ListItem divider className="list-item">
                  <div dangerouslySetInnerHTML={{ __html: 'test' }} className="list-text" />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        // set current bib
                      }}
                    >
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            </List>
          </div>
        </div>
      </div>
    );
  }
}
