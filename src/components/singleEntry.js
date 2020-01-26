import React from "react";
import { Link } from "react-router-dom";

import { firestore } from "../firebase";

const Entry = ({ id, address, coordinates }) => {
  //   const postRef = firestore.doc(`posts/${id}`); //
  //   const remove = () => postRef.delete(); //

  return (
    <li>
      {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
<<<<<<< HEAD
      <div className="Entry--content">
        <Link to={`/entries/${id}`}>
          <h3>{address}</h3>
=======
      <div className="Post--content">
        <Link className="Post--content" to={`/entries/${id}`}>
          <h3 className="Post--content">{address}</h3>
>>>>>>> cc71fe1d9d366c51a4d29c1dc55a607555c10c0b
        </Link>
      </div>
      <div className="Entry--meta">
        <div>
          {/* <p>
            <span role="img" aria-label="star" />
            {coordinates}
          </p>
          <p>
            <span role="img" aria-label="photos" />
            {photos}
          </p> */}
          {/* <p>Posted by {user.displayName}</p> */}
          {/* <p>Trip Date: {date}</p>
          <img src={picture} /> */}
        </div>
        <div />
        <div>
          <button
            type="button"
            className="delete"
            onClick={function() {
              return firestore
                .collection("entries")
                .doc(address)
                .delete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

// Entry.defaultProps = {
//   city: 'Barcelona',
//   location: 'El Raval',
//   content: 'Lorem ipsum ',
//   user: {
//     id: '123',
//     displayName: 'Chris P. Bacon',
//     email: 'chrisp@gmail.com',
//     photoURL: 'https://www.fillmurray.com/300/300'
//   },
//   visitDate: new Date(),
//   coordinates: [-377, -250],
//   photos: 0,
//   picture: 'https://www.fillmurray.com/300/300'
// };

export default Entry;
