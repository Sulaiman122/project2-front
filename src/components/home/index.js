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
          Unleashed
        </p>
        <p className="p2">
          The Most Popular WordPress Themes In The World And The Ultimate Visual
          Page
        </p>
        <Link to="/games">
          <button id="browse">Browse Games</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
