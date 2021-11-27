import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./style.css";
import Header from '../header'

const Register = () => {
  const navigate = useNavigate();
  
  
  const [registerMessage, setregisterMessage] = useState("")

  const goRegister = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios
        .post("http://localhost:4500/register", {
          userName: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.userName) {
            console.log("registered successfully");
            localStorage.setItem("User", JSON.stringify(response.data));
            navigate("/");
          }else{
            setregisterMessage(response.data.message)
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  const [loginMessage, setLoginMessage] = useState("")
  const goLogin = async (e) => {
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
          }else{
            setLoginMessage(response.data.message)
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const container = useRef(null);
  const signupBTN = () => {
    container.current.classList.add("right-panel-active");
  };

  const signinBTN = () => {
    container.current.classList.remove("right-panel-active");
  };

  return (
    <div className="home">
      <Header />
      <div className="registerpage" ref={container}>
        <div className="form-container sign-in-container">
          <form onSubmit={goRegister}>
            <h1>Create Account</h1>

            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              title="username must be at least 4 characters"
              pattern="[a-zA-Z0-9].{3,}"
              required
            />
            <input type="email" placeholder="Email" name="email" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              required
            />
            <button style={{marginTop:'13px'}} type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-up-container">
          <form onSubmit={goLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name="email" required/>
            <input type="password" placeholder="Password" name="password" required/>
            <button type="submit" className="margintop">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left ">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={signinBTN}>
                Sign Up
              </button>
              <button id='regBack' onClick={() => {
            navigate(-1);
          }}>Back</button>

            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>


              <button className="ghost" id="signUp" onClick={signupBTN}>
                Sign In
              </button>
              <button id='regBack' onClick={() => {
            navigate(-1);
          }}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
