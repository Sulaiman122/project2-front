import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const AllGames = () => {
  let navigate = useNavigate();
  const nav = (path) => {
    if (localStorage.getItem("User")) {
      navigate(path);
    } else {
      alert("you have to log in first");
    }
  };
  if(localStorage.getItem('User')){
      console.log('current user: ', JSON.parse(localStorage.getItem("User")));
  }else{
      console.log("No user found");
  }
  return (
    <div>
      <button onClick={() => nav("/game_one")}>Game 1</button>
      <button onClick={() => nav("/game_two")}>Game 2</button>
      <button onClick={() => nav("/game_three")}>Game 3</button>
      <button onClick={() => nav("/game_four")}>Game 4</button>
    </div>
  );
};

export default AllGames;
