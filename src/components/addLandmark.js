/*global google*/

import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
import { firestore, storage } from '../firebase';

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
    // console.log(
    //   this.state,
    //   "this is the state passing down",
    //   this.props,
    //   "this is props"
    // );
    return firestore.doc(`entries/${this.props.city}`);
  }
  get landmarksRef() {
    return this.entryRef.collection('landmarks');
  }
  createLandmark = landmark => {
    // const { user } = this.props;
    this.landmarksRef.doc(this.state.address).set({
      ...landmark
      //   user
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
    // console.log('EVENT TAGRET IN HANDLE CHANGE', event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log('STATE OTHER', this.state);
  };

  handleFileChange = event => {
    // console.log('EVENT TAGRET', event.target.files[0]);
    let file = event.target.files[0];
    this.setState({ pictures: [...this.state.pictures, file] });
    console.log('STATE FILE', this.state.pictures);
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
    // console.log('HANDLE SUBMIT', this.state);
    this.createLandmark(this.state);

    this.setState({
      name: '',
      address: '',
      content: '',
      date: new Date(),
      pictures: [],
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
    const { name, content, date, pictures } = this.state;
    return (
      <div>
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

        <form onSubmit={this.handleSubmit} className="AddLandmark">
          <input
            type="text"
            name="content"
            placeholder="content"
            value={content}
            onChange={this.handleChange}
          />
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          <input
            type="file"
            name="pictures"
            // value={pictures}
            accept="image/png, image/jpeg"
            multiple={true}
            onChange={this.handleFileChange}
          />
          <input className="create" type="submit" value="Create Landmark" />
        </form>
      </div>
    );
  }
}

export default AddLandmark;
