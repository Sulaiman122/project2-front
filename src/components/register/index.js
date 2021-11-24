import React, { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();

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
          if (response.data._id) {
            console.log("registered successfully");
            localStorage.setItem("User", response.data);
            navigate("/");
          }
        });
    } catch (err) {
      console.error(err);
    }
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
          if (response.data.userID) {
            console.log("login successfully");
            localStorage.setItem("User", response.data);
            navigate("/"); 
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
      {/* <div className="register">
      <h1>Register page</h1>
      <form onSubmit={goRegister}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          title="username must be at least 4 characters"
          pattern="[a-zA-Z0-9].{3,}"
          required
        />
        <p>Email</p>
        <input type="email" name="email" required />
        <p>Password</p>
        <input
          type="password"
          name="password"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          required
        />
        <br />
        <button type="submit">Register</button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </form>
      </div> */}

      <div class="registerpage" ref={container}>
        <div class="form-container sign-up-container">
          <form onSubmit={goRegister}>
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form onSubmit={goLogin}>
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn" onClick={signinBTN}>
                Sign In
              </button>
              <button onClick={() => {
            navigate(-1);
          }}>Back</button>

            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" onClick={signupBTN}>
                Sign Up
              </button>
              <button onClick={() => {
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
