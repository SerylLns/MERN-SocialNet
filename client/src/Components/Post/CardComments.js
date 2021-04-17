import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/post.action";
import FollowHandler from "../Profil/FollowHandler";
import { isEmpty, timestampParser } from "../utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo));
      setText('');
    }
  }

  return (
    <div className="comments-container">
      {post.comments.map((com) => {
        return (
          <div
            key={com._id}
            className={
              com.commenterId === userData._id ? "comment client" : "comment"
            }
          >
            <div className="left-comment-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === com.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="comment pic"
              />
            </div>
            <div className="right-comment-part">
              <div className="comment-header">
                <h3>{com.commenterPseudo}</h3>
                {com.commenterId !== userData._id && (
                  <FollowHandler idToFollow={com.commenterId} type={"card"} />
                )}
                <span className="date-comment">
                  {timestampParser(com.timestamp)}
                </span>
              </div>
              <p>{com.text}</p>
              <EditDeleteComment comment={com} postId={ post._id }/>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" className="new-comment" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Laisser un commentaire"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <input type="submit" value="Envoyer"/>
        </form>
      )}
    </div>
  );
};

export default CardComments;
