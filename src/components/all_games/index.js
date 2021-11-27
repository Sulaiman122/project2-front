import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Header from '../header'
import Footer from "../footer";
import Swal from "sweetalert2";

const AllGames = () => {
  let navigate = useNavigate();
  const nav = (path) => {
    if (localStorage.getItem("User")) {
      navigate(path);
    } else {
      Swal.fire({
        title: 'You have to login first',
        confirmButtonColor: '#1D0F6B',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  };


  return (
    <div className="allGames">
      <Header />
      <div className="allGamesContainer">
      <h1>GAMES</h1>
      <div className="cards-list">
        <div className="card 1" onClick={() => nav("/game_one")}>
          <div className="card_image">
            <img src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg" />{" "}
          </div>
          <div className="card_title title-white">
            <p>Maze</p>
          </div>
        </div>

        <div className="card 2" onClick={() => nav("/game_two")}>
          <div className="card_image">
            <img src="https://i.ytimg.com/vi/w6bCNW9aLd0/maxresdefault.jpg" />
          </div>
          <div className="card_title title-black">
            <p>Tic Tac Toe</p>
          </div>
        </div>

        <div className="card 3" onClick={() => nav("/game_three")}>
          <div className="card_image">
            <img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2020/06/top-10-90s-cartoon-shows-ranked-according-to-imdb-courage-the-cowardly-dog-Cropped.jpg" />
          </div>
          <div className="card_title title-white">
            <p>Cooloor</p>
          </div>
        </div>

        <div className="card 4" onClick={() => nav("/game_four")}>
          <div className="card_image">
            <img src="https://coolkidproblems.com/wp-content/uploads/2017/06/coming-soon-1.jpg" />
          </div>
          <div className="card_title title-white">
          </div>
        </div>
        <div className="card 4" onClick={() => nav("/game_four")}>
          <div className="card_image">
            <img src="https://coolkidproblems.com/wp-content/uploads/2017/06/coming-soon-1.jpg" />
          </div>
          <div className="card_title title-white">
          </div>
        </div>
        <div className="card 4" onClick={() => nav("/game_four")}>
          <div className="card_image">
            <img src="https://coolkidproblems.com/wp-content/uploads/2017/06/coming-soon-1.jpg" />
          </div>
          <div className="card_title title-white">
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AllGames;
