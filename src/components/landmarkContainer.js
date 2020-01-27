import React from 'react';
import SingleLandmark from './singleLandmark';
import AddLandmark from './addLandmark';

const LandmarkContainer = ({ landmarks, onCreate, city, pictureNames }) => {
  return (
    <section className="Landmarks">
      <AddLandmark onCreate={onCreate} city={city} />
      {landmarks.map(landmark => (
        <SingleLandmark
          {...landmark}
          //   pictureNames={pictureNames}
          key={landmark.id}
          pictureNames={landmark.pictures}
        />
      ))}
    </section>
  );
};

export default LandmarkContainer;
