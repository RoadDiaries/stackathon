// import "react-dates/initialize";
import React, { Component } from "react";
import LocationSearch from "./locationSearch";
import { firestore, auth } from "../firebase";
import { collectIdsAndDocs } from "./utilities";
import Entries from "./allEntries";
import { Map } from "./Map";
import MapPopup from "./Pin";
import { accessToken } from "./token";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Authentication from "./Authentication";

const MapBoxMap = ReactMapboxGl({ accessToken });

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      coordinates: [],
      zoom: [10],
      center: [],
      hoverItem: null,
      entries: [],
      landmarks: []
    };
    this.onChange = this.onChange.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  unsubscribe = null;
  unsubscribeFromAuth = null;
  async componentDidMount() {
    this.unsubscribe = firestore.collection("entries").onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ entries });
      console.log("AFTER ENTIRES", this.state);
    });
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user });
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
    return (
      <div className="main-container">
        <Authentication user={this.state.user} />
        <aside className="sidebar">
          <Entries
            entries={entries}
            updateCoordinates={this.submitCoordinates}
            handleClick={this.handleClick}
            // onCreate={this.handleCreate}
            // onRemove={this.handleRemove}
          />
        </aside>
        <nav className="nav">
          <form onSubmit={this.onSubmit}>
            <LocationSearch updateCoordinates={this.submitCoordinates} />
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
          <div>
            <Map
              // landmark={this.state.landmarks && this.state.landmarks.landmark}

              // {...this.props}
              // {...this.state}
              entries={entries}
              coordinates={this.state.coordinates}
              selectedPin={this.selectedPin}
            />
          </div>
        </nav>
      </div>
    );
  }
}
export default HomePage;
