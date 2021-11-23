import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

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
          if (rounds <= 0) {
            setshow3("");
            setshow2("hide");
          }
          if (this.style.backgroundColor == question) {
            score += 1;
            container.style.backgroundColor = question;
            setMessage("Correct!");
            setTimeout(() => {
              startGame(level);
            }, 1000);
          } else {
            setrounds(rounds);
            rounds = rounds - 1;
            setMessage("Wrong");
          }
        },
        { once: true }
      );
      setccc(score);
    }
  };
  const restart = () => {
    window.location.reload();
  };
  // const [seconds, setseconds] = useState(62);
  // useEffect(() => {
  //   setInterval(() => {
  //     setseconds(seconds - 1);
  //   }, 1000);
  //   if (seconds == 0) {
  //     setseconds(0);
  //   }
  // }, [seconds]);

  const [show, setshow] = useState();
  const [show3, setshow3] = useState("hide");
  const [show2, setshow2] = useState("hide");
  return (
    <div className="game3" ref={cont}>
      <div className={`page2 ${show2}`}>
        {/* {seconds} */}

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
        <h1>Your Score is 5/{ccc}</h1>
        <button onClick={restart}>Restart</button>
        <Link to="/">
          <button>go home</button>
        </Link>
      </div>
    </div>
  );
};

export default Game3;
