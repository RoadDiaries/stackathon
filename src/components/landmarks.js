import React, { Component } from 'react';

import SingleEntry from './singleEntry';
import LandmarkContainer from './landmarkContainer';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../components/utilities';

// import { withRouter } from 'react-router-dom';
// import Landmark from './singleLandmark';
// import withUser from './withUser';

class Landmarks extends Component {
  state = { entry: null, landmarks: [] };
  get enrtyId() {
    return this.props.match.params.id; //?
  }
  get entryRef() {
    return firestore.doc(`entries/${this.entryId}`);
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
  };
  componentWillUnmount = () => {
    this.unsubscribeFromEntry();
    this.unsubscribeFromLandmarks();
  };
  createLandmark = landmark => {
    // const { user } = this.props;
    this.landmarksRef.add({
      ...landmark
      //   user
    });
  };
  render() {
    const { entry, landmarks } = this.state;
    console.log(this.props);
    return (
      <section>
        {entry && <SingleEntry {...entry} />}
        <LandmarkContainer
          landmarks={landmarks}
          onCreate={this.createLandmark}
        />
      </section>
    );
  }

  //   render() {
  //     return <div>LANDMARKS</div>;
  //   }
}

// export default withRouter(withUser(PostPage));
export default Landmarks;
