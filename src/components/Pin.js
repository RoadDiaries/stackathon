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
    url: []
  };

  // console.log('here in pin', props);
  // const { entry } = props;
  // componentDidUpdate = async () => {
  myFunc = async () => {
    let newArr = [];
    let landmarksArr = [];
    const entryRef = await firestore
      .collection("entries")
      .doc(this.props.entry.address)
      .collection("landmarks")
      .onSnapshot(async snapshot => {
        // landmarksArr.push(snapshot.docs.map(collectIdsAndDocs));
        let newArr = [...this.state.landmarks];
        let urlarr = [...this.state.url];
        newArr.push(snapshot.docs.map(collectIdsAndDocs));
        let landmarkObj = snapshot.docs.map(collectIdsAndDocs);
        console.log("LANDMARK OBJ", landmarkObj);
        landmarkObj.forEach(async landmark => {
          let images = storage.ref().child(landmark.address);
          let imageObj = await images.listAll();
          let pictureName = imageObj.items[0].name;
          let image = images.child(pictureName);
          let pictureurl = await image.getDownloadURL();
          console.log("PICTURE url", pictureurl);
          urlarr.push(pictureurl);
        });
        this.setState({
          landmarks: newArr,
          url: urlarr
        });
        // let landmarkNamE = newArr[0].
        // [...landmarksArr, snapshot.docs.map(collectIdsAndDocs)];
        // this.setState({ landmarks: landmarksArr[0] });
        console.log("AFTER ENTRIES", newArr);
        this.props.setLoaded();
      });

    // this.setState({ landmarks: landmarksArr[0] });
    return newArr;
  };
  // };

  componentDidMount = async () => {
    let newArr = await this.myFunc();
  };

  // componentDidUpdate = () => {
  //   console.log('IN CDU', this.state.landmarks[0]);
  //   let newArr = this.state.landmarks[0];
  //   let urlarr = [];
  //   newArr.forEach(async landmarkObj => {
  //     let images = storage.ref().child(landmarkObj.address);
  //     let imageObj = await images.listAll();
  //     let pictureName = imageObj.items[0].name;
  //     let image = images.child(pictureName);
  //     let pictureurl = await image.getDownloadurl();
  //     console.log('PICTURE url', pictureurl);
  //     urlarr.push(pictureurl);
  //     // urlarr.push('TESTING');
  //   });
  //   this.setState({ url: urlarr });
  // };

  // let landmarksWithPictures = [];
  // landmarks.forEach(async function(landmark) {
  //   let images = storage.ref().child(landmark.address);
  //   console.log('IMAGES', images);
  //   let pictureName = await images.listAll().items[0].name;
  //   let image = images.child(pictureName);

  //   let pictureurl = await image.getDownloadurl();
  //   landmarksWithPictures.push(pictureurl);
  // });

  // console.log('HEEEEEEY', landmarksWithPictures);

  // console.log('LANDMARKS!!!', landmarks);

  // console.log("this is the entry", entry);
  render() {
    console.log("THIS STATE", this.state, this.state.url);
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

    let popUp = <h1>Loading</h1>;
    if (this.state.url.length > 0) {
      popUp = (
        <img
          className={css(styles.image)}
          src={this.state.url[0]}
          // src={`https://firebasestorage.googleapis.com/v0/b/roaddiaries-24a93.appspot.com/o/Testing%2FScreen%20Shot%202020-01-25%20at%2012.40.27%20PM.png?alt=media&token=a776dc57-d069-41a6-9e08-73694619bb74`}
          alt={"altpic"}
        />
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
          {/* {entry.user.photourl && (
          <div>
            <div>
              <img
                className={css(styles.image)}
                src={entry.user.photourl}
                alt={'altpic'}
              />
            </div>
            <div>
              <img
                className={css(styles.image)}
                src={entry.user.photourl}
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
//   let url = [];
//   async function test() {
//     let images = storage.ref().child('Testing');

//     let imageObj = await images.listAll();
//     let pictureName = imageObj.items[0].name;
//     console.log('PICTURE NAME', pictureName);
//     let image = images.child(pictureName);

//     let pictureurl = await image.getDownloadurl();
//     console.log('TESTINGNGMNG<KGKJN', pictureurl);
//     url.push(pictureurl);
//     return url;
//   }

//   test();
//   console.log(
//     'IN FUNCTION!!!!!',
//     url
//     // test().then(() => url)
//   );

//   // let landmarksWithPictures = [];
//   // landmarks.forEach(async function(landmark) {
//   //   let images = storage.ref().child(landmark.address);
//   //   console.log('IMAGES', images);
//   //   let pictureName = await images.listAll().items[0].name;
//   //   let image = images.child(pictureName);

//   //   let pictureurl = await image.getDownloadurl();
//   //   landmarksWithPictures.push(pictureurl);
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
//           src={`${url[0]}`}
//           // src={`https://firebasestorage.googleapis.com/v0/b/roaddiaries-24a93.appspot.com/o/Testing%2FScreen%20Shot%202020-01-25%20at%2012.40.27%20PM.png?alt=media&token=a776dc57-d069-41a6-9e08-73694619bb74`}
//           alt={'altpic'}
//         />
//         {/* {entry.user.photourl && (
//           <div>
//             <div>
//               <img
//                 className={css(styles.image)}
//                 src={entry.user.photourl}
//                 alt={'altpic'}
//               />
//             </div>
//             <div>
//               <img
//                 className={css(styles.image)}
//                 src={entry.user.photourl}
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
