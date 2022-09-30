import React, { Component } from "react";
import bank from "../bank.png";

function Navbar(props) {
  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: "#000", height: "50px", color: "white" }}
    >
      <a
        style={{ color: "white" }}
        className="navbar-brand col-sm-3  col-md-2 mr-0"
        href="#home"
      >
        <img
          src={bank}
          alt="bank icon"
          width="50"
          height="30"
          className="d-inline-block align-top mr-4"
        />
        Dapp Yield Farming
      </a>
      <ul className="navbar-nav px-3">
        <li
          style={{ color: "white" }}
          className="text-nowrap d-none nav-item d-sm-none d-sm-block"
        >
          ACCOUNT NUMBER: {props.account}
        </li>
      </ul>
    </nav>
  );
}

// class Navbar extends Component {
//   render() {
//     return (
//       <nav
//         className="navbar navbar-dark fixed-top shadow p-0"
//         style={{ backgroundColor: "#000", height: "50px", color: "white" }}
//       >
//         <a
//           style={{ color: "white" }}
//           className="navbar-brand col-sm-3  col-md-2 mr-0"
//           href="#home"
//         >
//           <img
//             src={bank}
//             alt="bank icon"
//             width="50"
//             height="30"
//             className="d-inline-block align-top mr-4"
//           />
//           Dapp Yield Farming
//         </a>
//         <ul className="navbar-nav px-3">
//           <li
//             style={{ color: "white" }}
//             className="text-nowrap d-none nav-item d-sm-none d-sm-block"
//           >
//             ACCOUNT NUMBER: 12fvdjagddcyvc
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

export default Navbar;
