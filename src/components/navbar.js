import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
// import Map from "./Map";
const Navbar = ({ handleClick }) => (
  <div className="nav-base">
    <pre id="info"></pre>
    <nav>
      <div>
        <div />
        {/* The navbar will show these links before you log in */}
        <div className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/newEntry">New Entry</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  </div>
);
// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div className="nav-base">
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           <div className="main-nav">
//             <Link to="/home">Home</Link>

//             <Link to="/newEntry">New Entry</Link>

//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div />
//           {/* The navbar will show these links before you log in */}
//           <div className="main-nav">
//             <Link to="/">Home</Link>
//             <Link to="/newEntry">New Entry</Link>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   </div>
// );

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     }
//   };
// };

export default Navbar;

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
