import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);

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
        </div>
      </div>
    </>
  );
};

export default UpdateProfil;
