import * as React from 'react';
import { Component } from 'react';
import { Popup } from 'react-mapbox-gl';
import { css, StyleSheet } from 'aphrodite';
import { firestore, storage } from '../firebase';
import { collectIdsAndDocs } from './utilities';
import { Link } from 'react-router-dom';

class MapPopup extends Component {
  state = {
    entry: '',
    landmarks: [],
    landmarksWithPictures: {},
    pictureNameArray: [],
    pictureName: '',
    landmarks: [],
    urlArray: [],
    imgUrl: ''
  };

  get entryRef() {
    return firestore.doc(`entries/${this.props.entry.address}`);
  }
  get landmarksRef() {
    return this.entryRef.collection('landmarks');
  }
  unsubscribeFromEntry = null;
  unsubscribeFromLandmarks = null;
  componentDidMount = async () => {
    if (this.props.entry && this.props.entry.address) {
      this.setState({ entry: this.props.entry.address });

      this.unsubscribeFromLandmarks = this.landmarksRef.onSnapshot(
        async snapshot => {
          const landmarks = snapshot.docs.map(collectIdsAndDocs);
          this.setState({ landmarks, pictureName: landmarks[0].pictures[0] });

          let pictureNameArr = [];
          this.state.landmarks.forEach(landmark => {
            pictureNameArr.push(landmark.pictures[0]);
          });
          this.setState({ pictureNameArray: pictureNameArr });

          // PHOTO URL FOR PIN
          let images = storage.ref().child(this.state.landmarks[0].address);
          let image = images.child(this.state.pictureNameArray[0]);
          let url = await image.getDownloadURL();
          this.setState({ imgUrl: url });
        }
      );
    }
  };
  componentWillUnmount = () => {
    this.unsubscribeFromLandmarks();
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        maxWidth: 250,
        minWidth: 180,
        borderRadius: 5
      },
      image: {
        margin: 'auto',
        display: 'block',
        borderRadius: 5
      },
      footer: {
        padding: '8px 12px',
        fontFamily: 'Fjalla One'
      }
    });
    const { entry } = this.props;

    let popUp = <h5>Loading...</h5>;
    if (this.state.imgUrl.length) {
      popUp = (
        <img className="pop-up-pic" src={this.state.imgUrl} alt={'altpic'} />
      );
    }

    return (
      <Popup
        coordinates={[entry.coordinates[1], entry.coordinates[0]]}
        anchor="bottom"
        offset={[0, -15]}
      >
        <div className={css(styles.container)}>
          {popUp}
          <div className={css(styles.footer)}>
            <Link to={`/entries/${entry.address}`}>
              <h1 style={{ fontSize: 15 }}>{entry.address}</h1>
            </Link>
          </div>
        </div>
      </Popup>
    );
  }
}

export default MapPopup;
