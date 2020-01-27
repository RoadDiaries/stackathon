import React, { Component } from 'react';

import SingleEntry from './singleEntry';
import LandmarkContainer from './landmarkContainer';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../components/utilities';

// import { withRouter } from 'react-router-dom';
// import Landmark from './singleLandmark';
// import withUser from './withUser';

class Landmarks extends Component {
  state = { entry: null, landmarks: [], pictureNames: [] };

  get entryRef() {
    return firestore.doc(`entries/${this.props.city}`);
    // return firestore.doc(`entries/${this.props.match.params.id}`);
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
    // const { user } = this.props;
    this.landmarksRef.add({
      ...landmark
      //   user
    });
  };
  render() {
    const { entry, landmarks, pictureNames } = this.state;
    console.log('IN LANDMARKS', this.props, landmarks);
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

// export default withRouter(withUser(PostPage));
export default Landmarks;
