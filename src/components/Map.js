import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { accessToken } from "./token";
import MapPopup from "./Pin";
const MapBoxMap = ReactMapboxGl({ accessToken });

export class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log("props are", this.props);
    this.state = {
      center: [-73.93, 40.73],
      landmarkPin: [],
      entries: [],
      zoom: [11],
      selectedPin: null
    };
    this.onPinCLick = this.onPinCLick.bind(this);
  }

  componentDidMount() {
    this.setState({ entries: this.props.entries });
    console.log("nre state", this.state);
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
  onPinCLick(landmark) {
    this.setState({
      selectedPin: landmark,
      center: [Number(landmark.longitude), Number(landmark.latitude)]
    });
    setTimeout(() => {
      this.setState({ selectedPin: null });
    }, 5000);
  }

  render() {
    const { pinLandmark } = this.state;
    console.log(this.state);

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
      >
        {this.state.selectedPin && (
          <MapPopup landmark={this.state.selectedPin} />
        )}
        <Layer
          type="symbol"
          layout={{
            "icon-image": "marker-15",
            "icon-allow-overlap": true,
            "icon-size": 2
          }}
        >
          {pinLandmark &&
            pinLandmark.map(landmark => (
              <Feature
                coordinates={[
                  Number(landmark.longitude),
                  Number(landmark.latitude)
                ]}
                key={landmark.id}
                onClick={this.onPinCLick.bind(null, landmark)}
              />
            ))}
        </Layer>
      </MapBoxMap>
    );
  }
}

export default Map;
