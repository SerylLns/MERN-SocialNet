import { NavLink } from "react-router-dom";
import React from 'react';
import homeIcon from '../assets/images/home-icon.png';
import trendIcon from '../assets/images/trend-icon.png';
import userIcon from '../assets/images/user-icon.png';


const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/' exact activeClassName='active-left-nav'>
            <img src={homeIcon} alt="home"/>
          </NavLink>
          <NavLink exact to='/trending' activeClassName='active-left-nav'>
            <img src={trendIcon} alt="trending"/>
          </NavLink>
          <NavLink to='/profil' exact activeClassName='active-left-nav'>
            <img src={userIcon} alt="profil" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;