import React from 'react';
import { Link } from 'react-router-dom';

import { firestore } from '../firebase';

const Entry = ({
  id,
  city,
  location,
  content,
  user,
  date,
  picture,
  visitDate,
  coordinates,
  photos
}) => {
  //   const postRef = firestore.doc(`posts/${id}`); //
  //   const remove = () => postRef.delete(); //

  return (
    <li>
      {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
      <div className="Post--content">
        <Link to={`/entries/${id}`}>
          <h3>{city}</h3>
        </Link>
        {/* <h3>{city}</h3> */}
        <h2>{location}</h2>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star" />
            {coordinates}
          </p>
          <p>
            <span role="img" aria-label="photos" />
            {photos}
          </p>
          {/* <p>Posted by {user.displayName}</p> */}
          <p>Trip Date: {date}</p>
          <img src={picture} />
        </div>
        <div />
        <div>
          <button
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
