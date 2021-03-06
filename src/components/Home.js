// import "react-dates/initialize";
import React, { Component } from 'react';
import LocationSearch from './locationSearch';
import { firestore, auth } from '../firebase';
import { collectIdsAndDocs } from './utilities';
import Entries from './allEntries';
import { Map } from './Map';
import { accessToken } from './token';

import ReactMapboxGl from 'react-mapbox-gl';
import Authentication from './Authentication';

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
    this.unsubscribe = firestore.collection('entries').onSnapshot(snapshot => {
      const entries = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ entries });
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
    this.unsubscribeFromAuth();
  };

  render() {
    const { entries } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} className="main-form">
          <LocationSearch updateCoordinates={this.submitCoordinates} />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
        <div className="main-container">
          <aside className="sidebar">
            <Authentication user={this.state.user} />
            <Entries
              entries={entries}
              updateCoordinates={this.submitCoordinates}
              handleClick={this.handleClick}
            />
          </aside>
          <nav className="nav">
            <div>
              <Map
                entries={entries}
                coordinates={this.state.coordinates}
                selectedPin={this.selectedPin}
              />
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
export default HomePage;
