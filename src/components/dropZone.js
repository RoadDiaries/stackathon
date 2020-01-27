import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { firestore, storage } from "../firebase";
import { ConsoleWriter } from "istanbul-lib-report";
import { removePropertiesDeep } from "@babel/types";

export function MyDropzone(props) {
  const onDrop = useCallback(
    pictures => {
      alert("Got Your Picture");
      pictures.forEach(picture => {
        props.handleFileChange(picture.name);
        console.log(props, picture);
        storage
          .ref()
          .child(props.state.address)
          .child(picture.name)
          .put(picture);
      });
    },
    [props.state.address]
  );
  // const picName = props.handleFileChange(pictures => {
  //   pictures.forEach(picture => {
  //     console.log(picture)
  //   })
  // },[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="drop-zone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop pictures here, or click to select files</p>
      )}
    </div>
  );
}
