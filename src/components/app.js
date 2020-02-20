import React, { Component } from 'react';
import { firestore } from '../firebase';
import Entries from './allEntries';
import { collectIdsAndDocs } from './utilities';

class App extends Component {
  state = {
    entries: []
  };

  unsubscribe = null;
  componentDidMount = async () => {
    const testEntries = await firestore
      .collection('entries')
      .doc('NEW YORK')
      .onSnapshot(doc => {});
    this.unsubscribe = firestore.collection('entries').onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ entries });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const { entries } = this.state;

    return (
      <main className="main">
        <aside className="sidebar">
          <nav className="nav">
            <ul className="side-menu">
              <Entries entries={entries} />
            </ul>
          </nav>
        </aside>
        <map id="map"></map>
        <div className="map-container"></div>
      </main>
    );
  }
}

export default App;
