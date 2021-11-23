import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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

  return (
    <div className="home">
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
    </div>
  );
};

export default Register;
