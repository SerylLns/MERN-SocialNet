import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(userData.bio);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  }

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
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfil;
