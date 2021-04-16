import React from 'react';

import LeftNav from '../Components/LeftNav';
import Navbar from '../Components/Navbar';
import Thread from '../Components/Thread';

const Home = () => {

  return (
    <>
      <Navbar />
      <div className="home">
        <LeftNav/>
        <div className="main">
          <Thread/>
        </div>
      </div>
    </>
  );
};

export default Home;