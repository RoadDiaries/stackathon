import React from "react";

import moment from "moment";
import { signOut } from "../firebase";

const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && (
          <img className="CurrentUser-pic" src={photoURL} alt={displayName} />
        )}
        <div className="CurrentUser--information">
          <h2>{displayName}</h2>
          <p className="user-info">{email}</p>
          <p className="user-info">Last Seen {moment(createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: "Chuck Norris",
  email: "chuck@gmail.com",
  photoURL:
    "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjQ5OTc4ODk1/chuck-norris-15720761-1-402.jpg",
  createdAt: new Date()
};

export default CurrentUser;
