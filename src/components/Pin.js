import * as React from "react";
import { Component } from "react";
import { Popup } from "react-mapbox-gl";
import { css, StyleSheet } from "aphrodite";
import { firestore, storage } from "../firebase";
import { collectIdsAndDocs } from "./utilities";

// const MapPopup = props => {
class MapPopup extends Component {
  state = {
    landmarks: [],
    landmarksWithPictures: {},
    URL: []
  };

  // console.log('here in pin', props);
  // const { entry } = props;
  componentDidMount = async () => {
    let landmarksArr = [];
    const entryRef = firestore
      .collection("entries")
      .doc(this.props.entry.address)
      .collection("landmarks")
      .onSnapshot(snapshot => {
        landmarksArr.push(snapshot.docs.map(collectIdsAndDocs));
        // [...landmarksArr, snapshot.docs.map(collectIdsAndDocs)];
        // console.log('AFTER ENTIRES', landmarks);
      });

    await console.log("AJKAHKJAHDJKHJKD", landmarksArr);
    // console.log('!!!!!!', landmarksArr[0]);
    let URLarr = [];
    landmarksArr.forEach(landmarkObj => {
      // let images = storage.ref().child(landmarkObj.address);
      // let imageObj = await images.listAll();
      // let pictureName = imageObj.items[0].name;
      // let image = images.child(pictureName);
      // let pictureURL = await image.getDownloadURL();
      // console.log('PICTURE URL', pictureURL);
      // URLarr.push(pictureURL);
      URLarr.push("TESTING");
    });

    this.setState({ landmarks: landmarksArr, URL: URLarr });
  };

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

  // console.log('LANDMARKS!!!', landmarks);

  // console.log("this is the entry", entry);
  render() {
    console.log("THIS STATE", this.state);
    const styles = StyleSheet.create({
      container: {
        maxWidth: 200,
        minWidth: 120,
        borderRadius: 5
      },
      image: {
        margin: "auto",
        display: "block",
        borderRadius: 5
      },
      footer: {
        padding: "8px 12px",
        fontFamily: "Fjalla One"
      }
    });
    const { entry } = this.props;
    return (
      <Popup
        coordinates={[entry.coordinates[1], entry.coordinates[0]]}
        anchor="bottom"
        offset={[0, -15]}
      >
        <div className={css(styles.container)}>
          <img
            className={css(styles.image)}
            src={this.state.URL[0]}
            // src={`https://firebasestorage.googleapis.com/v0/b/roaddiaries-24a93.appspot.com/o/Testing%2FScreen%20Shot%202020-01-25%20at%2012.40.27%20PM.png?alt=media&token=a776dc57-d069-41a6-9e08-73694619bb74`}
            alt={"altpic"}
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
  }
}

export default MapPopup;

// const MapPopup = props => {
//   console.log('here in pin', props);
//   const { entry } = props;
//   let landmarks = [];
//   const entryRef = firestore
//     .collection('entries')
//     .doc(entry.address)
//     .collection('landmarks')
//     .onSnapshot(snapshot => {
//       landmarks.push(snapshot.docs.map(collectIdsAndDocs));

//       console.log('AFTER ENTIRES', landmarks);
//     });

//   //////
//   let URL = [];
//   async function test() {
//     let images = storage.ref().child('Testing');

//     let imageObj = await images.listAll();
//     let pictureName = imageObj.items[0].name;
//     console.log('PICTURE NAME', pictureName);
//     let image = images.child(pictureName);

//     let pictureURL = await image.getDownloadURL();
//     console.log('TESTINGNGMNG<KGKJN', pictureURL);
//     URL.push(pictureURL);
//     return URL;
//   }

//   test();
//   console.log(
//     'IN FUNCTION!!!!!',
//     URL
//     // test().then(() => URL)
//   );

//   // let landmarksWithPictures = [];
//   // landmarks.forEach(async function(landmark) {
//   //   let images = storage.ref().child(landmark.address);
//   //   console.log('IMAGES', images);
//   //   let pictureName = await images.listAll().items[0].name;
//   //   let image = images.child(pictureName);

//   //   let pictureURL = await image.getDownloadURL();
//   //   landmarksWithPictures.push(pictureURL);
//   // });

//   // console.log('HEEEEEEY', landmarksWithPictures);

//   // console.log('LANDMARKS!!!', landmarks);

//   const styles = StyleSheet.create({
//     container: {
//       maxWidth: 200,
//       minWidth: 120,
//       borderRadius: 5
//     },
//     image: {
//       margin: 'auto',
//       display: 'block',
//       borderRadius: 5
//     },
//     footer: {
//       padding: '8px 12px',
//       fontFamily: 'Fjalla One'
//     }
//   });
//   // console.log("this is the entry", entry);
//   return (
//     <Popup
//       coordinates={[entry.coordinates[1], entry.coordinates[0]]}
//       anchor="bottom"
//       offset={[0, -15]}
//     >
//       <div className={css(styles.container)}>
//         <img
//           className={css(styles.image)}
//           src={`${URL[0]}`}
//           // src={`https://firebasestorage.googleapis.com/v0/b/roaddiaries-24a93.appspot.com/o/Testing%2FScreen%20Shot%202020-01-25%20at%2012.40.27%20PM.png?alt=media&token=a776dc57-d069-41a6-9e08-73694619bb74`}
//           alt={'altpic'}
//         />
//         {/* {entry.user.photoURL && (
//           <div>
//             <div>
//               <img
//                 className={css(styles.image)}
//                 src={entry.user.photoURL}
//                 alt={'altpic'}
//               />
//             </div>
//             <div>
//               <img
//                 className={css(styles.image)}
//                 src={entry.user.photoURL}
//                 alt={'altpic'}
//               />
//             </div>
//           </div>
//         )} */}
//         <div className={css(styles.footer)}>
//           <h1 style={{ fontSize: 15 }}>{entry.address}</h1>
//         </div>
//       </div>
//     </Popup>
//   );
// };
