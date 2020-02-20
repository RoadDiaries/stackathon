import React from 'react';
import Entry from './singleEntry';
import AddEntry from './addEntry';

const Entries = ({ entries, updateCoordinates }) => {
  return (
    <div>
      <section className="Posts">
        {entries.length > 1000 && (
          <AddEntry updateCoordinates={updateCoordinates} />
        )}
        <h2 className="Places-head">Places We Visited</h2>

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
