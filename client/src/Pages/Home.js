import React from 'react';
import LeftNav from '../Components/LeftNav';
import Navbar from '../Components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <LeftNav/>
      <h1>Home</h1>
    </div>
  );
};

export default Home;