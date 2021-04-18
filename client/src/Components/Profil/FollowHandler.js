import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../utils";
import CheckImg from '../../assets/images/checkboxYes.png';
import NotcheckImg from '../../assets/images/checkboxNot.png';

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        console.log("true");
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
          {type === "suggestion" && (
            <button className="follow-button">Abonné</button>
          )}
          {type === "card" && <img src={CheckImg} alt="checked" />}
        </span>
      ) : (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="unfollow-button">Suivre</button>
          )}
          {type === "card" && <img src={NotcheckImg} alt="check" />}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
