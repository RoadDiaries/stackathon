import React, { Component } from "react";
import { firestore } from "../firebase";
import Map from "./Map";
import Entries from "./allEntries";
import { collectIdsAndDocs } from "./utilities";

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
      .collection("entries")
      .doc("NEW YORK")
      .onSnapshot(doc => {
        console.log(doc.data());
      });
    console.log("BEFORE ENTIRES", testEntries);
    this.unsubscribe = firestore.collection("entries").onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      console.log("STATE", entries);
      this.setState({ entries });
      console.log("AFTER ENTIRES", testEntries);
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
        <map id="map"></map>
        <div className="map-container"></div>
      </main>
    );
  }
}

export default App;

// <div id="map">
// <div id="menu">
//   <input
//     id="streets-v11"
//     type="radio"
//     name="rtoggle"
//     value="streets"
//     checked="checked"
//   />
//   <label for="streets">streets</label>
//   <input id="light-v10" type="radio" name="rtoggle" value="light" />
//   <label for="light">light</label>
//   <input id="dark-v10" type="radio" name="rtoggle" value="dark" />
//   <label for="dark">dark</label>
//   <input
//     id="outdoors-v11"
//     type="radio"
//     name="rtoggle"
//     value="outdoors"
//   />
//   <label for="outdoors">outdoors</label>
//   <input
//     id="satellite-v9"
//     type="radio"
//     name="rtoggle"
//     value="satellite"
//   />
//   <label for="satellite">satellite</label>
// </div>
// <div className="container"></div>
// </div>
