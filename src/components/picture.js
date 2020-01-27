import React, { Component } from 'react';
import { firestore, storage } from '../firebase';

class Picture extends Component {
  state = {
    img: '',
    urlArray: []
  };

  componentDidMount = async () => {
    let newArr = [];
    const images = storage.ref().child(this.props.address);
    const imageObj = await images.listAll();
    const imageObjArr = imageObj.items;
    imageObjArr.forEach(image => {
      newArr.push(image);
    });
    this.setState({ urlArray: newArr });

    const image = images.child('IMG_7772.jpeg');
    const url = await image.getDownloadURL();

    console.log('HERE IN CDM', imageObj.items[0].name); //, imageObj.items[1].name);
    this.setState({ img: url });
  };

  render() {
    const { img } = this.state;
    console.log('STATE', this.state);
    // console.log('IMG URL', this.state);
    return (
      <div>
        <img src={img} />
        {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
      </div>
    );
  }
}

export default Picture;
