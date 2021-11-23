import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        navigate(path)
    }else{
        alert('you have to log in first')
    }
  };
  return (
    <div>
      <Link to="/login">
        <button className={`${show}`}>Login</button>
      </Link>
      <Link to="/signup">
        <button className={`${show}`}>Sign Up</button>
      </Link>
      <button className={`${hide}`} onClick={logout}>
        Log out
      </button>
      <br />
      <br />
      <br />
        <button onClick={()=>nav('/game_one')}>Game 1</button>
        <button  onClick={()=>nav('/game_two')}>Game 2</button>
        <button onClick={()=>nav('/game_three')}>Game 3</button>
        <button onClick={()=>nav('/game_four')}>Game 4</button>
    </div>
  );
};

export default Home;
