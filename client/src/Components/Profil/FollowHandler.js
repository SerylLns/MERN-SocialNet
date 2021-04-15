import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../actions/user.actions";
import { isEmpty } from "../utils";

const FollowHandler = ({ idToFollow }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {};

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        console.log('true');
        setIsFollowed(true);
      } else {
        console.log("false");
        setIsFollowed(false);
      }
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed ? (
        <span onClick={handleUnfollow}>
          <button className="follow-button">Abonné</button>
        </span>
      ) : (
        <span onClick={handleFollow}>
          <button className="unfollow-button">Suivre</button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
