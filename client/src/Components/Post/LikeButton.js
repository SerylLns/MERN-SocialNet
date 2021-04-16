import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LikeIcon from "../../assets/images/like-icon.svg";
import UnlikeIcon from "../../assets/images/unlike-icon.svg";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, post.likers, liked]);

  const like = () => {
    setLiked(true);
    dispatch(likePost(post._id, uid));
  };
  const unlike = () => {
    setLiked(false);
    dispatch(unlikePost(post._id, uid));
  };

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src={UnlikeIcon} alt="like"></img>}
          position={["top center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          {" "}
          <div>Connectez-vous pour aimer un post !</div>{" "}
        </Popup>
      )}
      {uid && liked === false && (
        <img onClick={like} src={UnlikeIcon} alt="like"></img>
      )}
      {uid && liked && (
        <img onClick={unlike} src={LikeIcon} alt="unlike"></img>
      )}
      <span>{ post.likers.length }</span>
    </div>
  );
};

export default LikeButton;
