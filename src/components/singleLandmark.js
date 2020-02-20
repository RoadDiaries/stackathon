import React from 'react';
import Picture from './picture';

const Landmark = ({
  name,
  address,
  content,
  picture,
  coordinates,
  pictureNames
}) => {
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
        </div>
        <div />
      </div>
    </li>
  );
};

export default Landmark;
