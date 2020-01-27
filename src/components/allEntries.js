import React, { useContext } from "react";
import Entry from "./singleEntry";
// import AddEntry from "./addEntry";
import AddEntry from "./addEntry";

import Picture from "./picture";
import { EntriesContext } from "../providers/entriesProvider";
import { firestore, storage } from "../firebase";
import { tsPropertySignature } from "@babel/types";

// const Entries = () => {
const Entries = ({
  entries,
  onCreate,
  onRemove,
  updateCoordinates,
  handleClick
}) => {
  // const entries = useContext(EntriesContext);
  console.log("HERE", entries);
  return (
    <div>
      <section className="Posts">
        {entries.length > 1000 && (
          <AddEntry updateCoordinates={updateCoordinates} />
        )}
        {/* <Picture /> */}
        {/* <AddEntry onCreate={onCreate} /> */}

        {/* <img src="https://media.graytvinc.com/images/PERDITA+16+9.jpg" /> */}
        <h2 className="Places-head">Places to go</h2>

        <ul className="entry-list">
          {entries.map(entry => (
            <Entry
              {...entry}
              key={entry.id}
              updateCoordinates={updateCoordinates}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
export default Entries;
