import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './style.css'

const Header = () => {
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

  return (
    <div>
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
    </div>
  );
};

export default Header;
