import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
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
    navigate("/"); 
  };
  const goLogin = async(e) => {
    e.preventDefault();
    try {
      const resp = await axios
        .post("http://localhost:4500/login", {
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data._id) {
            console.log("login successfully");
            localStorage.setItem("User", JSON.stringify(response.data));
            navigate("/"); 
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="header">
      <span className="logooo" onClick={()=>navigate('/')}></span><h4 onClick={()=>navigate('/')} className="loggg">Cool Games</h4>
        <div className="logo" >

        {/* <div class="dots" onClick={()=>document.querySelector('.dots').classList.toggle('active')}>
  <div class="shadow cut"></div>
  <div class="conte cut">
    <div class="drop cut2"></div>
  </div>
  <form onSubmit={goLogin} className='list'>
        <p>Email</p>
        <input type="email" name="email" required />
        <p>Password</p>
        <input type="password" name="password" required />
        <br/>
        <button type="submit">Login</button>
      </form>
  <div>Login</div>
</div> */}

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
