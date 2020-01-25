import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../components/utilities';

export const EntriesContext = createContext();

class EntriesProvider extends Component {
  state = { entries: [] };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection('entries')
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs);
        console.log('IN PROVIDER', entries);
        this.setState({ entries });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { entries } = this.state;
    const { children } = this.props;

    return (
      <EntriesContext.Provider value={entries}>
        {children}
      </EntriesContext.Provider>
    );
  }
}

export default EntriesProvider;
