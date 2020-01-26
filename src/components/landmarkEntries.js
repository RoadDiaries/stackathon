import React from "react";
import Landmark from "./singleLandmark";

const landmarkEntries = props => {
  const { entry, handleMouseEnter, handleMouseLeave } = props;

  return (
    <li
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      className="list-group-item"
      key={entry.id}
    >
      <a href={entry.url} className="row">
        {entry.picture && (
          <div className="col-3">
            <p>LANDMARK</p>
          </div>
        )}
        <div className="col-8">
          <div>{Landmark.address}</div>
        </div>
      </a>
    </li>
  );
};

export default landmarkEntries;
