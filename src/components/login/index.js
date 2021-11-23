import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

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
  return (
    <div className="home">
      <h1>Login page</h1>
      <form onSubmit={goLogin}>
        <p>Email</p>
        <input type="email" name="email" required />
        <p>Password</p>
        <input type="password" name="password" required />
        <br/>
        {errorMessage}
        <br/>
        <button type="submit">Login</button>
        <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      </form>
    </div>
  );
};

export default Login;
