/*global google*/

import { Route } from "react-router-dom";
import React, { Component } from "react";
import { firestore } from "../firebase";
import AddLandmark from "./addLandmark";
// import LocationSearchInput from "./locationSearch";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
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
        // console.log("result arer", results);
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
    // console.log("this is our state, ", this.state);

    const { address, coordinates } = this.state;
    // const { uid, displayName, email, photoURL } = auth.currentUser || {};

    const entry = {
      address,
      coordinates,

      user: {
        uid: "1111",
        displayName: "John Doe",
        email: "John@gmail.com",
        photoURL: "http://placekitten.com/g/200/200"
      }
    };

    firestore
      .collection("entries")
      .doc(entry.address)
      .set(entry);

    const entryref = firestore.doc(`entries/${entry.address}`);
    // console.log(entryref);

    this.setState({
      // address: "",
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
            <div className="search-box">
              <input
                className="location-search-input"
                {...getInputProps({
                  placeholder: "Search for Cities ..."
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

        <form onSubmit={this.handleSubmit} className="AddEntry">
          <input className="create" type="submit" value="Create Entry" />
        </form>
        <AddLandmark
          updateCoordinates={this.props.updateCoordinates}
          city={this.state.address}
        />
      </div>
    );
  }
}

export default AddEntry;

//  <input
//     id="city-search"
//     type="text"
//     name="city"
//     placeholder="City"
//     value={city}
//     onChange={this.handleChange}
//   />
