import React, { Component } from 'react';
import SingleEntry from './singleEntry';
import LandmarkContainer from './landmarkContainer';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../components/utilities';

class Landmarks extends Component {
  state = { entry: null, landmarks: [], pictureNames: [] };

  get entryRef() {
    return firestore.doc(`entries/${this.props.city}`);
  }
  get landmarksRef() {
    return this.entryRef.collection('landmarks');
  }
  unsubscribeFromEntry = null;
  unsubscribeFromLandmarks = null;
  componentDidMount = async () => {
    this.unsubscribeFromEntry = this.entryRef.onSnapshot(snapshot => {
      const entry = collectIdsAndDocs(snapshot);
      this.setState({ entry });
    });
    this.unsubscribeFromLandmarks = this.landmarksRef.onSnapshot(snapshot => {
      const landmarks = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ landmarks });
    });
    this.unsubscribeFromPictureNames = this.landmarksRef.onSnapshot(
      snapshot => {
        const pictureNames = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ pictureNames });
      }
    );
  };
  componentWillUnmount = () => {
    this.unsubscribeFromEntry();
    this.unsubscribeFromLandmarks();
    this.unsubscribeFromPictureNames();
  };
  createLandmark = landmark => {
    this.landmarksRef.add({
      ...landmark
    });
  };
  render() {
    const { entry, landmarks, pictureNames } = this.state;
    return (
      <section>
        {entry && <SingleEntry {...entry} />}
        <LandmarkContainer
          city={this.props.city}
          landmarks={landmarks}
          pictureNames={pictureNames}
          onCreate={this.createLandmark}
        />
      </section>
    );
  }
}

export default Landmarks;
