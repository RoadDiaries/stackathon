import React, { Component } from "react";
import { firestore, storage } from "../firebase";

class Picture extends Component {
  state = {
    img: ""
  };

  componentDidMount = async () => {
    const images = storage.ref().child("Testing");
    const image = images.child("IMG_7772.jpeg");
    const url = await image.getDownloadURL();

    //
    const imageObj = await images.listAll();
    // console.log('HERE IN CDM', imageObj.items[1].name);
    this.setState({ img: url });
  };

  render() {
    const { img } = this.state;
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
