import React from "react";
import axios from "axios";
import swal from "sweetalert";

const Profile = () => {
  let myuser = JSON.parse(localStorage.getItem("User"));
  console.log(myuser);
  const change = async (username, password, em, is) => {
    swal(`Enter your new ${is}:`, {
      content: "input",
    }).then((value) => {
      if (!value) throw null;
      console.log(value);
      try {
        if (is == "password") {
          axios.post("http://localhost:4500/change", {
            email: em,
            password: value,
            username: username,
          });
          myuser.password = value
          localStorage.setItem("User", JSON.stringify(myuser));
        } else if (is == "username") {
          console.log('username method');
          console.log(value);
          axios.post("http://localhost:4500/change", {
            email: em,
            password: password,
            username: value,
          });
          myuser.userName = value
          localStorage.setItem("User", JSON.stringify(myuser));
        }
      } catch (err) {
        console.error(err);
      }
      swal(`Your new ${is}: ${value}`);
    });
  };

  return (
    <div>
      <h1>Profile</h1>
      <p style={{ display: "inline" }}>Your username is: {myuser.userName}</p>
      <button
        onClick={() =>
          change(myuser.userName, myuser.password, myuser.email, "username")
        }
      >
        Change username
      </button><br/>
      <p style={{ display: "inline" }}>Your password is: {myuser.password}</p>
      <button
        onClick={() =>
          change(myuser.userName, myuser.password, myuser.email, "password")
        }
      >
        Change Password
      </button>
      <p>Your email is: {myuser.email}</p>
      <p>Your scores:</p>
      <ul>
        <li>Game1: {myuser.score[0]}</li>
        <li>Game2: {myuser.score[1]}</li>
        <li>Game3: {myuser.score[2]}</li>
        <li>Game4: {myuser.score[3]}</li>
      </ul>
    </div>
  );
};

export default Profile;
