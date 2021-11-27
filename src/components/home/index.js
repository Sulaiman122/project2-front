import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Header from '../header'
const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("User")) {
      console.log("current user: ", JSON.parse(localStorage.getItem("User")));
    } else {
      console.log("No user found");
    }
  }, []);


  return (
    <div className="home">
      <Header />
      <div className="homeContainer">
        <p className="p1">
          Games
          <br />
          <span className='unleash'>Unleashed</span>
        </p>
        <p className="p2">
          Are you ready for your next challenge?<br/>Explore and compete on the best games here and have fun
        </p>
        <Link to="/games">
          <button id="browse">Browse Games</button>
        </Link>
        <img className="homeImage" src="https://pixner.net/begam/images/left-banner.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
