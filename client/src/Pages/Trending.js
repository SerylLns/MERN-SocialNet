import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../Components/AppContext";
import FriendsHint from "../Components/FriendsHint";
import LeftNav from "../Components/LeftNav";
import Navbar from "../Components/Navbar";
import Card from "../Components/Post/Card";
import Trends from "../Components/Trends";
import { isEmpty } from "../Components/utils";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trendingPage">
      <Navbar />
      <LeftNav />
      <div className="trendingPage-main">
        <div className="main">
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </div>
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trending;
