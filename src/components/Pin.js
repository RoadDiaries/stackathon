import * as React from 'react';
import { Popup } from 'react-mapbox-gl';
import { css, StyleSheet } from 'aphrodite';
import { firestore, storage } from '../firebase';
import { collectIdsAndDocs } from './utilities';

const MapPopup = props => {
  console.log('here in pin', props);
  const { entry } = props;
  let landmarks = [];
  const entryRef = firestore
    .collection('entries')
    .doc(entry.address)
    .collection('landmarks')
    .onSnapshot(snapshot => {
      landmarks.push(snapshot.docs.map(collectIdsAndDocs));

      console.log('AFTER ENTIRES', landmarks);
    });

  //////
  let URL;
  async function test() {
    let images = storage.ref().child('Testing');

    let imageObj = await images.listAll();
    let pictureName = imageObj.items[0].name;
    console.log('PICTURE NAME', pictureName);
    let image = images.child(pictureName);

    let pictureURL = await image.getDownloadURL();
    console.log('TESTINGNGMNG<KGKJN', pictureURL);
    URL = pictureURL;
    return pictureURL;
  }

  test();
  ///////

  // let landmarksWithPictures = [];
  // landmarks.forEach(async function(landmark) {
  //   let images = storage.ref().child(landmark.address);
  //   console.log('IMAGES', images);
  //   let pictureName = await images.listAll().items[0].name;
  //   let image = images.child(pictureName);

  //   let pictureURL = await image.getDownloadURL();
  //   landmarksWithPictures.push(pictureURL);
  // });

  // console.log('HEEEEEEY', landmarksWithPictures);

  console.log('LANDMARKS!!!', landmarks);
  console.log('URL', URL);
  const styles = StyleSheet.create({
    container: {
      maxWidth: 200,
      minWidth: 120,
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
  // console.log("this is the entry", entry);
  return (
    <Popup
      coordinates={[entry.coordinates[1], entry.coordinates[0]]}
      anchor="bottom"
      offset={[0, -15]}
    >
      <div className={css(styles.container)}>
        <img
          className={css(styles.image)}
          src={URL}
          // src={`https://firebasestorage.googleapis.com/v0/b/roaddiaries-24a93.appspot.com/o/Testing%2FScreen%20Shot%202020-01-25%20at%2012.40.27%20PM.png?alt=media&token=a776dc57-d069-41a6-9e08-73694619bb74`}
          alt={'altpic'}
        />
        {/* {entry.user.photoURL && (
          <div>
            <div>
              <img
                className={css(styles.image)}
                src={entry.user.photoURL}
                alt={'altpic'}
              />
            </div>
            <div>
              <img
                className={css(styles.image)}
                src={entry.user.photoURL}
                alt={'altpic'}
              />
            </div>
          </div>
        )} */}
        <div className={css(styles.footer)}>
          <h1 style={{ fontSize: 15 }}>{entry.address}</h1>
        </div>
      </div>
    </Popup>
  );
};
export default MapPopup;
