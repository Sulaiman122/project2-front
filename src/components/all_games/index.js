import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Header from '../header'

const AllGames = () => {
  let navigate = useNavigate();
  const nav = (path) => {
    if (localStorage.getItem("User")) {
      navigate(path);
    } else {
      alert("you have to log in first");
    }
  };


  return (
    <div className="allGames">
      <Header />
      <h1>Games</h1>

      <div class="cards-list">
        <div class="card 1" onClick={() => nav("/game_one")}>
          <div class="card_image">
            {" "}
            <img src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg" />{" "}
          </div>
          <div class="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>

        <div class="card 2" onClick={() => nav("/game_two")}>
          <div class="card_image">
            <img src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_2.jpg" />
          </div>
          <div class="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>

        <div class="card 3" onClick={() => nav("/game_three")}>
          <div class="card_image">
            <img src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_3.jpg" />
          </div>
          <div class="card_title">
            <p>Card Title</p>
          </div>
        </div>

        <div class="card 4" onClick={() => nav("/game_four")}>
          <div class="card_image">
            <img src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_4.jpg" />
          </div>
          <div class="card_title title-black">
            <p>Card Title</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGames;
