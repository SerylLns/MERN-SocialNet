import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import dogLogo from "../assets/images/logo-dog.png";
import { UidContext } from "./AppContext";
import LoginImg from '../assets/images/loggin.svg';
import Logout from "./Log/Logout";
const Navbar = () => {
  const uid = useContext(UidContext);

  return (
    <nav className="navbar">
        <div className='logo'>
        <NavLink exact to="/">
          <img src={dogLogo} alt="logo Chien" />
          Nom du site
        </NavLink>
        </div>
      {uid ? (
        <ul>
          <li>
            <NavLink exact to="/profil">
              <h5>Bienvenue 'nom de l'utilisateur</h5>
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
