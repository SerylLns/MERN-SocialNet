import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPost } from "../../actions/post.action";
import { isEmpty, timestampParser } from "../utils";
import addPictureIcon from '../../assets/images/addpicture-icon.svg';

const NewPostForm = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");

  const userData = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorsReducer.postErrors);
  const dispatch = useDispatch()

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };
  const handlePost = async (e) => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append('file', file);
      data.append('video', video);
      
      await dispatch(addPost(data));
      dispatch(getPost(5));
      cancelPost();
    }
  };
  
  const cancelPost = () => {
    setMessage("");
    setPostPicture(null);
    setVideo("");
    setFile("");
  };

  
  useEffect(() => {
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture('');
        }
      }
    };
    handleVideo();
  }, [message, video]);

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
          value={message}
        />
        {message || postPicture || video.length > 20 ? (
          <li className="card-container">
            <div className="card-left">
              <img src={userData.picture} alt="user-pic" />
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>{userData.pseudo}</h3>
                </div>
                <span className="card-date">{timestampParser(Date.now())}</span>
              </div>
              <div className="card-content">
                <p>{message}</p>
                { postPicture && <img src={postPicture} alt='post-pics' /> }
                {video && (
                  <iframe
                    src={video}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video}
                  ></iframe>
                )}
              </div>
            </div>
          </li>
        ) : null}
        {!isEmpty(errors.format) && <p className="error">{errors.format}</p>}
        {!isEmpty(errors.maxSize) && <p className="error">{errors.maxSize}</p>}
        <div className="footer-form">
          <div className="icon">
            {isEmpty(video) && (
              <>
                <img src={addPictureIcon} alt="add-pics" />
                <input
                  type="file"
                  name="file"
                  accept=".jpg, .png, .jpeg"
                  onChange={(e) => handlePicture(e)}
                />
              </>
            )}
          </div>
          <div className="btn-send">
            {message || postPicture || video.length > 20 ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler message
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
