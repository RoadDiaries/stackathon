import React, { Component } from "react";
import { firestore, storage } from "../firebase";

class Picture extends Component {
  state = {
    img: "",
    urlArray: [],
    pictureNames: []
  };

  componentDidMount = async () => {
    const images = storage.ref().child(this.props.address);
    let newArray = [];
    let pictureNames = this.props.pictureNames;
    pictureNames.forEach(async pictureName => {
      let image = images.child(pictureName);
      let url = await image.getDownloadURL();
      newArray.push(url);
    });
    this.setState({ pictureNames: newArray });

    const image = images.child(this.props.pictureNames[0]);
    const url = await image.getDownloadURL();

    this.setState({ img: url });
  };

  render() {
    const { pictureNames, img } = this.state;

    return (
      <div>
        {pictureNames.map((pictureUrl, index) => {
          return (
            <img
              className="single-pic"
              src={pictureUrl}
              key={index}
              alt="land-pic"
            />
          );
        })}
      </div>
    );
  }
}

export default Picture;
