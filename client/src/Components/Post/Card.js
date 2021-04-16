import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils";
import FollowHandler from "../Profil/FollowHandler";
import messageIcon from "../../assets/images/message-icon.svg";
import shareIcon from "../../assets/images/share-icon.svg";
import LikeButton from "./LikeButton";
import EditIcon from "../../assets/images/edit.svg";
import { updatePost } from "../../actions/post.action";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [openComments, setOpenComments] = useState(false);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <p>animation de chargement</p>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) {
                          return user.pseudo;
                        } else return null;
                      })
                      .join("")}
                </h3>
              </div>
              {post.posterId !== userData._id && (
                <FollowHandler idToFollow={post.posterId} type={"card"} />
              )}
              <span className="card-date">{dateParser(post.createdAt)}</span>
            </div>
            <div className="card-content">
              {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <button onClick={updateItem} className="upload-btn">
                    Valider modification
                  </button>
                </div>
              )}
              {post.picture && <img src={post.picture} alt="card img" />}
              {post.video && (
                <iframe
                  src={post.video}
                  width="500"
                  height="300"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
              {userData._id === post.posterId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src={EditIcon} alt="edit" />
                  </div>
                  <DeleteCard post={post} />
                </div>
              )}
            </div>
            <div className="card-footer">
              <div
                onClick={() => setOpenComments(!openComments)}
                className="comment-icon"
              >
                <img src={messageIcon} alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src={shareIcon} alt="share" />
            </div>
            {openComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
