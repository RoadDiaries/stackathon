import React, { Component } from "react";
import { storage } from "../firebase";

class Picture extends Component {
  state = {
    img: "",
    pictureUrl: []
  };

  componentDidMount = async () => {
    const images = storage.ref().child(this.props.address);
    let newUrlArray = [];
    let pictureUrl = this.props.pictureNames;
    pictureUrl.forEach(async pictureName => {
      let image = images.child(pictureName);
      let url = await image.getDownloadURL();
      newUrlArray.push(url);
    });
    this.setState({ pictureUrl: newUrlArray });

    const image = images.child(this.props.pictureNames[0]);
    const url = await image.getDownloadURL();

    this.setState({ img: url });
  };

  render() {
    const { pictureUrl } = this.state;

    return (
      <div>
        {pictureUrl.map((pictureUrl, index) => {
          return (
            <img
              className="single-pic"
              src={pictureUrl}
              key={index}
              alt="random"
            />
          );
        })}
      </div>
    );
  }
}

export default Picture;
