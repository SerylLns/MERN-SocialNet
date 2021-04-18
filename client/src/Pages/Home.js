import React, { useContext } from "react";
import { UidContext } from "../Components/AppContext";
import FriendsHint from "../Components/FriendsHint";

import LeftNav from "../Components/LeftNav";
import Log from "../Components/Log/Log";
import Navbar from "../Components/Navbar";
import NewPostForm from "../Components/Post/NewPostForm";
import Thread from "../Components/Thread";
import Trends from "../Components/Trends";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <Navbar />
      <div className="home">
        <LeftNav />
      </div>
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log page={"home"} />}
          <Thread />
        </div>
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint/>}
        </div>
      </div>
    </>
  );
};

export default Home;
