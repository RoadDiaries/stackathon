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
    // const snapshot = await firestore.collection('entries').get()
    // const entries = snapshot.docs.map(collectIdandData)
    // this.setState({entries})
    // this.unsubscribe = firestore.collection('entries').onSnapshot(snapshot => {
    //   const entries = snapshot.docs.map(doc => {
    //     return {id: doc.id, ...doc.data()}
    //   })
    //   console.log('STATE', entries)
    //   this.setState({entries})
    // })
    const testEntries = await firestore
      .collection('entries')
      .doc('NEW YORK')
      .onSnapshot(doc => {
        console.log(doc.data());
      });
    console.log('BEFORE ENTIRES', testEntries);
    this.unsubscribe = firestore.collection('entries').onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      console.log('STATE', entries);
      this.setState({ entries });
      console.log('AFTER ENTIRES', testEntries);
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  // handleCreate = async entry => {
  //   const docRef = await firestore.collection('entries').add(entry)
  //   // const doc = await docRef.get()

  //   // const newEntry = {
  //   //   id: doc.id,
  //   //   ...doc.data()
  //   // }

  //   // const {entries} = this.state
  //   // this.setState({entries: [newEntry, ...entries]})
  // }

  // handleRemove = async id => {
  //   // const allEntries = this.state.entries

  //   // const entries = allEntries.filter(entry => id !== entry.id)
  //   // const DBdeletion = await firestore.doc(`entries/${id}`).delete()
  //   // console.log(id, await firestore.doc(`entries/${id}`))
  //   // console.log(DBdeletion)
  //   try {
  //     console.log("IN HOME DELETE")
  //     await firestore
  //       .collection('entries')
  //       .doc(id)
  //       .delete()
  //     // this.setState({entries})
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    const { entries } = this.state;

    return (
      <main className="main">
        <aside className="sidebar">
          <nav className="nav">
            <ul className="side-menu">
              <Entries
                entries={entries}
                // onCreate={this.handleCreate}
                // onRemove={this.handleRemove}
              />
            </ul>
          </nav>
        </aside>
        <section className="twitter">
          <div className="container">
            <img
              className="main-map"
              src="https://media.nationalgeographic.org/assets/photos/000/276/27666.jpg"
            />
          </div>
        </section>
      </main>
    );
  }
}

export default App;
