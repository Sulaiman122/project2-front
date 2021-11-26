import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const Home = () => {
  const [hide, sethide] = useState("hide");
  const [show, setshow] = useState("");
  useEffect(() => {
    if (localStorage.getItem("User")) {
      setshow("hide");
      sethide("");
    }
    if (localStorage.getItem("User")) {
      console.log("current user: ", JSON.parse(localStorage.getItem("User")));
    } else {
      console.log("No user found");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("User");
    setshow("");
    sethide("hide");
  };

  return (
    <div className="home">
      <div className="header">
        <h4>Cool Games</h4>
        <div className="logo">
          <Link to="/login">
            <button className={`${show}`}>Login</button>
          </Link>
          <div className="signup">
            <Link to="/signup">
              <button className={`${show}`}>Sign Up</button>
            </Link>
          </div>
          <Link to="/profile">
              <button className={`${hide}`}>Profile</button>
            </Link>
          <button className={`${hide}`} onClick={logout}>
            Log out
          </button>
        </div>
      </div>
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
