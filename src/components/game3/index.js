import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

const Game3 = () => {
  const squr = useRef(null);
  const cont = useRef(null);
  let random = [];
  let getRandmoize = (s) => Math.floor(Math.random() * s);
  let score = 0;
  var [rounds, setrounds] = useState(6);
  const [message, setMessage] = useState("");
  const [Q, setQ] = useState("");
  const [ccc, setccc] = useState(1);

  const [show, setshow] = useState();
  const [show3, setshow3] = useState("hide");
  const [show2, setshow2] = useState("hide");

  const setScore = async (passedScore, em) => {
    try {
      const resp = await axios.post("http://localhost:4500/setscore", {
        email: em,
        score: passedScore,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const startGame = (level) => {
    if (rounds >= 0) {
      setshow2("");
    }
    setshow("hide");
    random = [];
    const divs = squr.current.childNodes;
    const container = cont.current;
    container.style.backgroundColor = "white";
    setMessage("");
    let question;
    for (let i = 0; i <= level; i++) {
      random.push(
        "rgb(" +
          Math.floor(Math.random() * 256) +
          ", " +
          Math.floor(Math.random() * 256) +
          ", " +
          Math.floor(Math.random() * 256) +
          ")"
      );
    }
    for (let i = 0; i <= level; i++) {
      divs[i].style.backgroundColor = random[i];
      divs[i].style.display = "block";
      question = random[getRandmoize(level)];
      setQ("What is this color " + question.toUpperCase());
      divs[i].addEventListener(
        "click",
        function () {
          console.log(rounds, "   score:", score);

          if (this.style.backgroundColor == question) {
            score += 1;
            container.style.backgroundColor = question;
            setMessage("Correct!");
            setTimeout(() => {
              startGame(level);
            }, 1000);
            rounds = rounds + 1;
          } else {
            rounds = rounds - 1;
            setrounds(rounds);
            setMessage("Wrong");
            if (rounds <= 0) {
              setshow3("");
              setshow2("hide");
              let myuser = JSON.parse(localStorage.getItem("User"));
              if (myuser.score[2] < score * 3) {
                myuser.score.splice(2, 1, score * 3);
                localStorage.setItem("User", JSON.stringify(myuser));
                setScore(myuser.score, myuser.email);
              }
            }
          }
        },
        { once: true }
      );
      setccc(score * 3);
    }
  };
  const restart = () => {
    window.location.reload();
  };

  const [seconds, setseconds] = useState(62);
  useEffect(() => {
    setTimeout(() => {
      setseconds(seconds - 1);
    }, 1000);
    if (seconds == 0) {
      setseconds(0);
    }
  }, [seconds]);

  return (
    <div className="game3" ref={cont}>
      <div className={`page2 ${show2}`}>
        {seconds}

        <h1>
          The Great Game
          <br />
          {Q}
        </h1>
        <p>{message}</p>
        <p>Tries left: {rounds}</p>
        <div class="container" ref={squr}>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
        </div>
      </div>
      <div className={`page1 ${show}`}>
        <button onClick={() => startGame(2)}>Easy</button>
        <button onClick={() => startGame(5)}>Hard</button>
      </div>
      <div className={`page3 ${show3}`}>
        <h1>Result</h1>
        <h1>Your Score is {ccc}</h1>
        <button onClick={restart}>Restart</button>
        <Link to="/">
          <button>go home</button>
        </Link>
      </div>
    </div>
  );
};

export default Game3;
