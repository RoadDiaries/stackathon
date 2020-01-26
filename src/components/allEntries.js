import React, { useContext } from "react";
import Entry from "./singleEntry";
// import AddEntry from "./addEntry";
import AddEntry from "./addEntry";

import Picture from "./picture";
import { EntriesContext } from "../providers/entriesProvider";
import { firestore, storage } from "../firebase";

// const Entries = () => {
const Entries = ({ entries, onCreate, onRemove, updateCoordinates }) => {
  // const entries = useContext(EntriesContext);
  // console.log("HERE", entries);
  return (
    <section className="Posts">
      <AddEntry updateCoordinates={updateCoordinates} />
      <Picture />
      {/* <AddEntry onCreate={onCreate} /> */}

      {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
      <ul className="entry-list">
        {entries.map(entry => (
          <Entry {...entry} key={entry.id} />
        ))}
      </ul>
    </section>
  );
};
export default Entries;
