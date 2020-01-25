import React from 'react';
import SingleLandmark from './singleLandmark';
import AddLandmark from './addLandmark';

const LandmarkContainer = ({ landmarks, onCreate }) => {
  return (
    <section className="Landmarks">
      <AddLandmark onCreate={onCreate} />
      {landmarks.map(landmark => (
        <SingleLandmark {...landmark} key={landmark.id} />
      ))}
    </section>
  );
};

export default LandmarkContainer;
