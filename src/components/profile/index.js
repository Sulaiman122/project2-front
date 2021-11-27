import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import Header from '../header'
import './style.css'
const Profile = () => {
  let myuser = JSON.parse(localStorage.getItem("User"));
  const [usr, setUsr] = useState([])
  useEffect(() => {
    setUsr(myuser)
  }, [])
  console.log(myuser);
  const change = async (username, password, em, is) => {
    swal(`Enter your new ${is}:`, {
      content: "input",
    }).then((value) => {
      if (!value) throw null;
      console.log(value);
      try {
        if (is == "password") {
          axios.post("https://project2-games.herokuapp.com/change", {
            email: em,
            password: value,
            username: username,
          });
          myuser.password = value
          localStorage.setItem("User", JSON.stringify(myuser));
          setUsr(myuser)
        } else if (is == "username") {
          console.log('username method');
          console.log(value);
          axios.post("https://project2-games.herokuapp.com/change", {
            email: em,
            password: password,
            username: value,
          });
          myuser.userName = value
          localStorage.setItem("User", JSON.stringify(myuser));
          setUsr(myuser)
        }
      } catch (err) {
        console.error(err);
      }
      swal(`Your new ${is}: ${value}`);
    });
  };

  return (
    <div className='profilee'>
      <Header />
    <div className='profileContainer'>

    <div className="frame">
    <h1>Profile</h1>
  <div className="center">
    
		<div className="profile">
			<div clclassNameme="image">
				<div className="circle-1"></div>
				<div className="circle-2"></div>
				<img src="https://bootdey.com/img/Content/avatar/avatar1.png" width="70" height="70" alt="Jessica Potter"/>
			</div>
			
			<div className="name">{usr.userName}</div>
			<div className="job">{usr.email}</div>
			<div className="job">Password : {usr.password}</div>
			
			<div className="actions">
				<button className="btn"  onClick={() =>
          change(myuser.userName, myuser.password, myuser.email, "username")
        }>Change Username</button>
				<button className="btn" onClick={() =>
          change(myuser.userName, myuser.password, myuser.email, "password")
        }>Change Password</button>
			</div>
		</div>
		
		<div className="stats">
    <p style={{color:'black',paddingTop:'60px'}}>Statistics</p>
			<div className="box">
				<span className="value">{myuser.score[0]}</span>
				<span className="parameter">Game 1</span>
			</div>
			<div className="box">
				<span className="value">{myuser.score[1]}</span>
				<span className="parameter">Game 2</span>
			</div>
			<div className="box">
				<span className="value">{myuser.score[2]}</span>
				<span className="parameter">Game 3</span>
			</div>
		</div>
  </div>
</div>

    </div>
    </div>
  );
};

export default Profile;
