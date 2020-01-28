import React from "react";
import { Link } from "react-router-dom";

import { firestore } from "../firebase";

const Entry = ({ id, address, coordinates, updateCoordinates }) => {
  //   const postRef = firestore.doc(`posts/${id}`); //
  //   const remove = () => postRef.delete(); //

  return (
    <li>
      {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
      <div className="Post--content">
        <Link className="main-name" to={`/entries/${id}`}>
          <h3 className="main-name">{address}</h3>
        </Link>
      </div>
      <div className="Entry--meta">
        <div className="buttons">
          <button
            className="show-btn"
            type="submit"
            onClick={() => updateCoordinates(coordinates)}
          >
            Show In Map
          </button>
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
            X
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
