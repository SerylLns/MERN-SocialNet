import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NewPostForm = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");

  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="post-container">
      <div className="data">
        <p>
          <span>{userData.following ? userData.following.length : 0}</span>
          {""} Abonnement
          {userData.following && userData.following.length > 1 ? "s" : null}
        </p>
        <p>
          <span>{userData.followers ? userData.followers.length : 0}</span>
          {""} Abonné
          {userData.followers && userData.followers.length > 1 ? "s" : null}
        </p>
      </div>
      <NavLink exact to="/profil">
        <div className="user-home-info">
          <img src={userData.picture} alt="user pic" />
        </div>
      </NavLink>
      <div className="post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="footer-form">
        
      </div>
    </div>
  );
};

export default NewPostForm;
