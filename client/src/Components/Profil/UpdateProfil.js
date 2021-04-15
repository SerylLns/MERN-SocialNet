import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../utils";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const allUsersData = useSelector((state) => state.usersReducer);
  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(userData.bio);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <LeftNav />
      <div className="profil-container">
        <h1>Profil de {userData.pseudo}</h1>
        <div className="update_container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={userData.picture} alt="" />
            <UploadImg />
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm !== true && (
                <>
                  <p
                    className="update-bio-text"
                    onClick={() => setUpdateForm(!updateForm)}
                  >
                    {userData.bio}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    className="update-bio-text"
                    defaultValue={userData.bio}
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                </>
              )}
            </div>
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            <h5 onClick={() => setFollowingPopup(true)}>
              Abonnements: {userData.following ? userData.following.length : ""}
            </h5>
            <h5 onClick={() => setFollowersPopup(true)}>
              Abonnés: {userData.followers ? userData.followers.length : ""}
            </h5>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <div className="modal-header">
                <h3>Abonnement</h3>
                <span
                  onClick={() => setFollowingPopup(false)}
                  className="cross"
                >
                  &#10005;
                </span>
              </div>
              <ul>
                {allUsersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user pic" />
                          <h4>{user.pseudo}</h4>
                          <FollowHandler idToFollow={ user._id }/>
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </div>
          </div>
        )}
        {followersPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <div className="modal-header">
                <h3>Abonnés</h3>
                <span
                  onClick={() => setFollowersPopup(false)}
                  className="cross"
                >
                  &#10005;
                </span>
              </div>
              <ul>
                {allUsersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user pic" />
                          <h4>{user.pseudo}</h4>
                          <FollowHandler idToFollow={user._id} />
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfil;
