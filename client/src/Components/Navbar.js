import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import dogLogo from "../assets/images/Network.png";
import { UidContext } from "./AppContext";
import LoginImg from '../assets/images/loggin.svg';
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav className="navbar">
        <div className='logo'>
        <NavLink exact to="/">
          <img src={dogLogo} alt="logo Chien" />
        </NavLink>
        </div>
      {uid ? (
        <ul>
          <li>
            <NavLink exact to="/profil">
              <h5>Bienvenue { userData.pseudo }</h5>
            </NavLink>
          </li>
          <Logout />
        </ul>
      ) : (
        <ul>
          <li></li>
          <li>
            <NavLink className="connex" exact to="/profil">
              <img src={LoginImg} alt="connection" />
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
