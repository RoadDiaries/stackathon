import React from 'react';
import SingleLandmark from './singleLandmark';
import AddLandmark from './addLandmark';

const LandmarkContainer = ({ landmarks, onCreate, city }) => {
  return (
    <section className="Landmarks">
      <AddLandmark onCreate={onCreate} city={city} />
      {landmarks.map(landmark => (
        <SingleLandmark {...landmark} key={landmark.id} />
      ))}
    </section>
  );
};

export default LandmarkContainer;
