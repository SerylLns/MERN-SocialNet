import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils";
import FollowHandler from "../Profil/FollowHandler";
import messageIcon from '../../assets/images/message-icon.svg';
import shareIcon from '../../assets/images/share-icon.svg';
import LikeButton from "./LikeButton";


const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

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
                        if (user._id === post.posterId) return user.pseudo;
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
              <p>{post.message}</p>
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
            </div>
            <div className="card-footer">
              <div className="comment-icon">
                <img src={messageIcon} alt="comment" />
                <span>{post.comments.length}</span>
              </div>
                <LikeButton post={ post }/>
              <img src={shareIcon} alt="share" />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
