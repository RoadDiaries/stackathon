import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { accessToken } from "./token";
const MapBoxMap = ReactMapboxGl({ accessToken });

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-73.93, 40.73],
      pinEvent: [],
      zoom: [11],
      selectedPin: null
    };
    // this.onPinCLick = this.onPinCLick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { coordinates, event, hoverItem } = nextProps;
    if (hoverItem) {
      return {
        ...prevState,
        selectedPin: hoverItem,
        center: [Number(hoverItem.longitude), Number(hoverItem.latitude)],
        zoom: [14]
      };
    }
    if (event) {
      return {
        ...prevState,
        pinEvent: event,
        zoom: [12]
      };
    }
    if (coordinates.length) {
      return {
        ...prevState,
        center: [Number(coordinates[1]), Number(coordinates[0])]
      };
    }

    return { ...prevState };
  }

  render() {
    return (
      <MapBoxMap
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/light-v10"
        center={this.state.center}
        zoom={this.state.zoom}
        containerStyle={{
          height: "70vh",
          width: "70vw"
        }}
      ></MapBoxMap>
    );
  }
}

export default Map;
