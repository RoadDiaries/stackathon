/*global google*/

import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { firestore, storage } from '../firebase';
import { MyDropzone } from './dropZone';

class AddLandmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      content: '',
      date: new Date(),
      pictures: [],
      coordinates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLandmark = this.createLandmark.bind(this);
  }
  get entryRef() {
    return firestore.doc(`entries/${this.props.city}`);
  }
  get landmarksRef() {
    return this.entryRef.collection('landmarks');
  }
  createLandmark = landmark => {
    this.landmarksRef.doc(this.state.address).set({
      ...landmark
    });
  };
  storePictures = pictures => {
    pictures.forEach(picture => {
      storage
        .ref()
        .child(this.state.address)
        .child(picture.name)
        .put(picture);
    });
  };
  handleChangeSearch = address => {
    this.setState({ address });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = file => {
    this.setState({ pictures: [...this.state.pictures, file] });
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
    const content = this.state.content;
    const address = this.state.address;
    const pictures = this.state.pictures;
    this.createLandmark({ content, address, pictures });
    this.storePictures(this.state.pictures);
  };

  render() {
    const searchOptions = {
      location: new google.maps.LatLng(
        this.state.coordinates[0],
        this.state.coordinates[1]
      ),
      radius: 2000
    };
    const { content, date } = this.state;
    return (
      <div>
        {this.props.updateCoordinates ? (
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
              <div>
                <input
                  className="land-search"
                  {...getInputProps({
                    placeholder: 'Search For Landmarks...',
                    className: 'location-search-input'
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
        ) : (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChangeSearch}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div className="landmard-src">
                <input
                  {...getInputProps({
                    placeholder: 'Search For Landmarks...',
                    className: 'location-search-input'
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
        )}

        <form onSubmit={this.handleSubmit} className="AddLandmark">
          <input
            className="add-desc"
            type="text"
            name="content"
            placeholder="Share some details about your trip"
            value={content}
            onChange={this.handleChange}
          />
          <input
            className="create-date"
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />

          <MyDropzone
            multiple={true}
            handleFileChange={this.handleFileChange}
            state={this.state}
          />
          <input
            className="create-land"
            type="submit"
            value="Create Landmark"
          />
        </form>
      </div>
    );
  }
}

export default AddLandmark;
