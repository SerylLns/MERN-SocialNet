import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    dispatch(uploadPicture(data, userData._id))
  }
  return (
    <form className="upload-pic" onSubmit={handlePicture}>
      <label htmlFor="file">Changer d'image</label>
      <span className="divider-profil"></span>

      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input className="upload-btn" type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;