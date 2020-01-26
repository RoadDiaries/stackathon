import * as React from "react";
import { Popup } from "react-mapbox-gl";
import { css, StyleSheet } from "aphrodite";

const MapPopup = props => {
  console.log("here in pin", props);
  const { landmark } = props;
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
  return (
    <Popup
      coordinates={[landmark.coordinates[1], landmark.coordinates[0]]}
      anchor="bottom"
      offset={[0, -15]}
    >
      <div className={css(styles.container)}>
        {landmark.user.photoURL && (
          <img
            className={css(styles.image)}
            src={landmark.user.photoURL}
            alt={"altpic"}
          />
        )}
        <div className={css(styles.footer)}>
          <h1 style={{ fontSize: 15 }}>{landmark.address}</h1>
        </div>
      </div>
    </Popup>
  );
};
export default MapPopup;
