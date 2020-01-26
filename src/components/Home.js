// import "react-dates/initialize";
import React, { Component } from 'react';
import LocationSearch from './locationSearch';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from './utilities';
import Entries from './allEntries';

<<<<<<< HEAD
import { Map } from './Map';
=======
import { Map } from "./Map";
import MapPopup from "./Pin";
>>>>>>> e4ea49ca7afb5230670c35e4806048cded5d4102

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: [],
      zoom: [10],
      center: [],
      hoverItem: null,
      entries: []
    };
    this.onChange = this.onChange.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  unsubscribe = null;

  async componentDidMount() {
    const testEntries = await firestore
      .collection('entries')
      .doc('NEW YORK')
      .onSnapshot(doc => {
        // console.log(doc.data());
      });
<<<<<<< HEAD
    console.log('BEFORE ENTIRES', testEntries);
    this.unsubscribe = firestore.collection('entries').onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      console.log('STATE', entries);

      this.setState({ entries });
      console.log('AFTER ENTIRES', testEntries);
=======
    // console.log("BEFORE ENTIRES", testEntries);
    this.unsubscribe = firestore.collection("entries").onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      // console.log("STATE", entries);

      this.setState({ entries });
      // console.log("AFTER ENTIRES", testEntries);
>>>>>>> e4ea49ca7afb5230670c35e4806048cded5d4102
    });
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  submitCoordinates(coordinates) {
    this.setState({ coordinates });
  }

  handleMouseEnter(event) {
    this.setState({
      hoverItem: event
    });
  }

  handleMouseLeave() {
    this.setState({
      hoverItem: null
    });
  }
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const { entries } = this.state;
    console.log(this.state.entries);
    return (
      <div>
        <aside className="sidebar">
          <nav className="nav">
            <form onSubmit={this.onSubmit}>
              <LocationSearch updateCoordinates={this.submitCoordinates} />
              <button type="submit">Serach</button>
            </form>
            <div className="main-container">
              <Map
                // landmark={this.state.landmarks && this.state.landmarks.landmark}

                // {...this.props}
                // {...this.state}
                entries={entries}
                coordinates={this.state.coordinates}
                selectedPin={this.selectedPin}
              />
              <Entries
                entries={entries}
                updateCoordinates={this.submitCoordinates}
                // onCreate={this.handleCreate}
                // onRemove={this.handleRemove}
              />
            </div>
          </nav>
        </aside>
      </div>
    );
  }
}
export default HomePage;
