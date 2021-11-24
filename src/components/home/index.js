import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const Home = () => {
  let navigate = useNavigate();

  const [hide, sethide] = useState("hide");
  const [show, setshow] = useState("");
  useEffect(() => {
    if (localStorage.getItem("User")) {
      setshow("hide");
      sethide("");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("User");
    setshow("");
    sethide("hide");
  };

  const nav = (path) => {
    if (localStorage.getItem("User")) {
      navigate(path);
    } else {
      alert("you have to log in first");
    }
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
        <button id="browse">Browse Games</button>
      </div>

      {/* <button onClick={() => nav("/game_one")}>Game 1</button>
      <button onClick={() => nav("/game_two")}>Game 2</button>
      <button onClick={() => nav("/game_three")}>Game 3</button>
      <button onClick={() => nav("/game_four")}>Game 4</button> */}
    </div>
  );
};

export default Home;
