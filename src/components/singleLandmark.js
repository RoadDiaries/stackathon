import React from 'react';

import { firestore } from '../firebase';

const Landmark = ({
  name,
  address,
  content,
  user,
  date,
  picture,
  visitDate,
  coordinates
}) => {
  //   const postRef = firestore.doc(`posts/${id}`); //
  //   const remove = () => postRef.delete(); //

  return (
    <li>
      <div className="Landmarl--content">
        <h3>{name}</h3>
        <h2>{address}</h2>
        <div>{content}</div>
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
          <p>Trip Date: {date}</p>
          <img src={picture} />
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
