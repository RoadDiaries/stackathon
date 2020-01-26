// import React, { Component } from "react";
// import { firestore } from "../firebase";
// import LocationSearchInput from "./locationSearch";

// class AddEntry extends Component {
//   state = {
//     city: "",
//     search: "",
//     location: "",
//     content: "",
//     date: new Date(),
//     picture: []
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     console.log("this is our state, ", this.state);

//     const { city, location, content, date, picture, search } = this.state;
//     // const { uid, displayName, email, photoURL } = auth.currentUser || {};

//     const entry = {
//       // id: new Date().toString(),
//       city,
//       location,
//       content,
//       date,
//       picture,
//       search,
//       // title,
//       // city,
//       // country,
//       // dateVisited,
//       user: {
//         uid: "1111",
//         displayName: "John Doe",
//         email: "John@gmail.com",
//         photoURL: "http://placekitten.com/g/200/200"
//       },
//       coordinates: [-477, 544],
//       visitDate: new Date()
//     };

//     firestore
//       .collection("entries")
//       .doc(entry.city)
//       .set(entry);

//     const entryref = firestore.doc(`entries/${entry.city}`);
//     console.log(entryref);

//     this.setState({
//       city: "",
//       location: "",
//       content: "",
//       date: new Date(),
//       picture: []
//     });
//   };

//   render() {
//     const { city, location, content, date, picture } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit} className="AddEntry">
//         <LocationSearchInput
//           type="text"
//           className="input-field"
//           name="search"
//           value={this.state.search}
//           onChange={this.handleChange}
//         />
//         <input
//           id="city-search"
//           type="text"
//           name="city"
//           placeholder="City"
//           value={city}
//           onChange={this.handleChange}
//         />
//         <input
//           className="input-field"
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={location}
//           onChange={this.handleChange}
//         />
//         <input
//           className="input-field"
//           type="date"
//           name="date"
//           value={date}
//           onChange={this.handleChange}
//         />
//         <input
//           className="input-field"
//           type="text"
//           name="content"
//           placeholder="content"
//           value={content}
//           onChange={this.handleChange}
//         />
//         <input
//           className="input-field"
//           type="file"
//           name="pictures"
//           value={picture}
//           accept="image/png, image/jpeg"
//           multiple={true}
//           onChange={this.handleChange}
//         />
//         <input className="create" type="submit" value="Create Entry" />
//       </form>
//     );
//   }
// }

// export default AddEntry;