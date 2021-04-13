import React from "react";
import cookie from "js-cookie";
import Logoutimg from "../../assets/images/logging-out.svg";
import axios from "axios";

const Logout = () => {

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = '/';
  };

  return (
    <li>
      <img onClick={logout} src={Logoutimg} alt="deconnexion" />
    </li>
  );
};

export default Logout;
