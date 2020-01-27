import React, { Component } from 'react';
import { firestore, storage } from '../firebase';

class Picture extends Component {
  state = {
    img: '',
    urlArray: [],
    pictureNames: []
  };

  componentDidMount = async () => {
    this.setState({ pictureNames: this.props.pictureNames });
    //     let newArr = [];
    //     const images = storage.ref().child(this.props.address);
    //     //DOC trial
    //     // let str = '';
    //     // storage
    //     //   .ref()
    //     //   .child('Testing')
    //     //   .getDownloadURL()
    //     //   .then(function(url) {
    //     //     // `url` is the download URL for 'images/stars.jpg'
    //     //     str = url;
    //     //     // // This can be downloaded directly:
    //     //     // var xhr = new XMLHttpRequest();
    //     //     // xhr.responseType = 'blob';
    //     //     // xhr.onload = function(event) {
    //     //     //   var blob = xhr.response;
    //     //     // };
    //     //     // xhr.open('GET', url);
    //     //     // xhr.send();
    //     //     // Or inserted into an <img> element:
    //     //     // var img = document.getElementById('myimg');
    //     //     // img.src = url;
    //     //   })
    //     //   .catch(function(error) {
    //     //     // Handle any errors
    //     //     console.log(error);
    //     //   });
    //     // this.setState({ img: str });
    //     //DOC trial up
    //     // let url = images
    //     //   .child('IMG_7772.jpeg')
    //     //   .then(response => response.ref.getDownloadURL());
    //     // images
    //     //   .listAll()
    //     //   .then(function(result) {
    //     //     result.items.forEach(function(imageRef) {
    //     //       // And finally display them
    //     //       displayImage(imageRef);
    //     //     });
    //     //   })
    //     //   .catch(function(error) {
    //     //     // Handle any errors
    //     //     console.log('error');
    //     //   });
    //     // function displayImage(imageRef) {
    //     //   let urlNew = imageRef
    //     //     .getDownloadURL()
    //     //     .then(function(url) {
    //     //       // TODO: Display the image on the UI
    //     //       console.log('URL', url);
    //     //       newArr.push(url);
    //     //     })
    //     //     .catch(function(error) {
    //     //       // Handle any errors
    //     //       console.log('error');
    //     //     });
    //     //   console.log('URL NEW', urlNew);
    //     // }
    //     //my test working
    //     // const imageObj = await images.listAll();
    //     // const imageObjArr = imageObj.items[0];
    //     // console.log(imageObjArr);
    //     // console.log('IMAGE OBJ ARRAY', imageObjArr);
    //     // imageObjArr.forEach(image => {
    //     //   newArr.push(image.get());
    //     // });
    //     // console.log('NEW ARRAY', newArr[0]);
    //     // this.setState({ urlArray: newArr });
    //     //test
    // const images = storage.ref().child('Testing');
    const images = storage.ref().child(this.props.address);
    const image = images.child(this.props.pictureNames[0]);
    const url = await image.getDownloadURL();

    console.log('HERE IN CDM', url); //, imageObj.items[1].name);
    this.setState({ img: url });
  };

  render() {
    const { img, urlArray } = this.state;
    console.log('STATE', this.state, 'PROPS', this.props);
    // console.log('IMG URL', this.state);
    return (
      <div>
        {/* <img src={urlArray[0]} /> */}
        <img src={img} />
        {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
      </div>
    );
  }
}

export default Picture;
