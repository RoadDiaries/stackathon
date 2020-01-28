import React from "react";
import Picture from "./picture";
import { firestore } from "../firebase";

const Landmark = ({
  name,
  address,
  content,
  user,
  date,
  picture,
  visitDate,
  coordinates,
  pictureNames
}) => {
  //   const postRef = firestore.doc(`posts/${id}`); //
  //   const remove = () => postRef.delete(); //

  return (
    <li className="page-entry">
      <div className="Landmarl--content">
        <div className="land-info">
          <h3>{name}</h3>
          <h2>{address}</h2>
          <div>{content}</div>
        </div>
        <div className="picture-container">
          <Picture address={address} pictureNames={pictureNames} />
        </div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star" />
            {coordinates}
          </p>
          <p>
            <span role="img" aria-label="picture" />
            {picture}
          </p>
          {/* <p>Posted by {user.displayName}</p> */}
          {/* <p>Trip Date: {date}</p> */}
          {/* <img src={picture} /> */}
        </div>

        <div />
        <div>
          {/* <button
            type="button"
            className="delete"
            onClick={function() {
              return firestore
                .collection('entries')
                .doc(city)
                .delete();
            }}
          >
            Delete
          </button> */}
        </div>
      </div>
    </li>
  );
};

export default Landmark;
