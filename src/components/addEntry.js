/*global google*/

import React, { Component } from 'react';
import { firestore } from '../firebase';
import AddLandmark from './addLandmark';
import { AddedToMap } from './toasts';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      coordinates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeSearch = address => {
    this.setState({ address });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(latLng => {
        this.setState({
          address: address,
          coordinates: [latLng.lat, latLng.lng]
        });
      })
      .then(() => {
        this.props.updateCoordinates(this.state.coordinates);
      })
      .catch(error => console.error('Error', error));
  };
  handleSubmit = event => {
    event.preventDefault();
    const { address, coordinates } = this.state;
    const entry = {
      address,
      coordinates,

      user: {
        uid: '1111',
        displayName: 'John Doe',
        email: 'John@gmail.com',
        photoURL: 'http://placekitten.com/g/200/200'
      }
    };

    firestore
      .collection('entries')
      .doc(entry.address)
      .set(entry);

    const entryref = firestore.doc(`entries/${entry.address}`);

    this.setState({
      coordinates: []
    });
  };

  render() {
    const searchOptions = {
      location: new google.maps.LatLng(
        this.state.coordinates[0],
        this.state.coordinates[1]
      ),
      radius: 2000
    };

    return (
      <div
        className="entry-form-container
      "
      >
        <div className="testing">
          <div className="both-forms">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChangeSearch}
              onSelect={this.handleSelect}
              searchOptions={searchOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div className="search-box">
                  <input
                    className="location-search-input"
                    {...getInputProps({
                      placeholder: 'Search for Cities ...'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <form onSubmit={this.handleSubmit} className="AddEntry">
              <AddedToMap />
            </form>

            <AddLandmark
              updateCoordinates={this.props.updateCoordinates}
              city={this.state.address}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddEntry;
