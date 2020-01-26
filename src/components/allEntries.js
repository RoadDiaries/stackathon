import React, { useContext } from "react";
import Entry from "./singleEntry";
import AddEntry from "./addEntry";
import { EntriesContext } from "../providers/entriesProvider";

// const Entries = () => {
const Entries = ({ entries, onCreate, onRemove }) => {
  // const entries = useContext(EntriesContext);
  console.log("HERE", entries);
  return (
    <section className="Posts">
      {/* <AddEntry onCreate={onCreate} /> */}
      <ul className="entry-list">
        {entries.map(entry => (
          <Entry {...entry} key={entry.id} />
        ))}
      </ul>
    </section>
  );
};
export default Entries;
