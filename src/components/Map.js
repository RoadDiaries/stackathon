import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { accessToken } from './token';
import MapPopup from './Pin';
const MapBoxMap = ReactMapboxGl({ accessToken });

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-73.93, 40.73],
      pinEntry: [],
      entries: [],
      zoom: [11],
      selectedPin: null,
      hasLoaded: false
    };
    this.onPinCLick = this.onPinCLick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { coordinates, landmark, hoverItem } = nextProps;
    if (hoverItem) {
      return {
        ...prevState,
        selectedPin: hoverItem,
        center: [Number(hoverItem.longitude), Number(hoverItem.latitude)],
        zoom: [14]
      };
    }
    if (landmark) {
      return {
        ...prevState,
        pinLandmark: landmark,
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
    console.log('IN MAP', this.state, 'PROPS', this.props);
    const { entries } = this.props;
    return (
      <MapBoxMap
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/dark-v10"
        center={this.state.center}
        zoom={this.state.zoom}
      >
        {this.state.selectedPin && <MapPopup entry={this.state.selectedPin} />}
        <Layer
          type="symbol"
          layout={{
            'icon-image': 'marker-15',

            'icon-allow-overlap': true,
            'icon-size': 2
          }}
        >
          {entries &&
            entries.map(landmark => (
              <Feature
                coordinates={[
                  Number(landmark.coordinates[1]),
                  Number(landmark.coordinates[0])
                ]}
                key={landmark.id}
                onClick={() => this.onPinCLick(landmark)}
              />
            ))}
        </Layer>
      </MapBoxMap>
    );
  }
}

export default Map;
