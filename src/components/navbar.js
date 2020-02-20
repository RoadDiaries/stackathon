import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => (
  <div className="nav-base">
    <nav>
      <div>
        <div />
        {/* The navbar will show these links before you log in */}
        <div className="main-nav">
          <img
            className="logo-pic"
            src={
              'https://robertdall.com/wp-content/uploads/2016/12/RD-Logo-Background.png'
            }
            alt="logo"
          />
          <Link className="main-links" to="/">
            Home
          </Link>
          <Link className="main-links" to="/newEntry">
            New Entry
          </Link>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
