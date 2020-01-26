/*global google*/

import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import { firestore } from "../firebase";

class AddLandmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      content: "",
      date: new Date(),
      picture: [],
      coordinates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLandmark = this.createLandmark.bind(this);
  }
  get entryRef() {
    console.log(
      this.state,
      "this is the state passing down",
      this.props,
      "this is props"
    );
    return firestore.doc(`entries/${this.props.city}`);
  }
  get landmarksRef() {
    return this.entryRef.collection("landmarks");
  }
  handleChangeSearch = address => {
    this.setState({ address });
  };
  createLandmark = landmark => {
    // const { user } = this.props;
    this.landmarksRef.add({
      ...landmark
      //   user
    });
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
      .catch(error => console.error("Error", error));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.createLandmark(this.state);

    this.setState({
      name: "",
      address: "",
      content: "",
      date: new Date(),
      picture: [],
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
    const { name, content, date, picture } = this.state;
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
                  placeholder: "Search For Landmarks...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
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
            value={picture}
            accept="image/png, image/jpeg"
            multiple={true}
            onChange={this.handleChange}
          />
          <input className="create" type="submit" value="Create Landmark" />
        </form>
      </div>
    );
  }
}

export default AddLandmark;
