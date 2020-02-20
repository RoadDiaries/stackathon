import React from 'react';
import { Link } from 'react-router-dom';

import { firestore } from '../firebase';

const Entry = ({ id, address, coordinates, updateCoordinates }) => {
  return (
    <li>
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
                .collection('entries')
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

export default Entry;
