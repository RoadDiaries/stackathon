import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { firestore, storage } from "../firebase";

export function MyDropzone(props) {
  const onDrop = useCallback(
    pictures => {
      pictures.forEach(picture => {
        storage
          .ref()
          .child(props.state.address)
          .child(picture.name)
          .put(picture);
      });
    },
    [props.state.address]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop pictures here, or click to select files</p>
      )}
    </div>
  );
}
