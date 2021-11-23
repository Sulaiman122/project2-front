import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

const Game2 = () => {
  const board = useRef(null);
  let turn;
  const [resultMessage, setResultMessage] = useState("");
  const [show, setShow] = useState("");
  let end = false;
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let imagination = ["", "", "", "", "", "", "", "", ""];

  const ComputerPlay = () => {
    const divs = board.current.childNodes;
    let available = [];
    for (let i = 0; i < divs.length; i++) {
      if (
        !divs[i].classList[1]?.includes("x") &&
        !divs[i].classList[1]?.includes("o")
      ) {
        available.push(divs[i]);
      }
    }
    let random = available[Math.floor(Math.random() * available.length)];
    random?.classList.add("o");
    let randomIndex;
    board.current.childNodes.forEach((item, i) => {
      if (item == random) {
        randomIndex = i;
      }
    });
    imagination.splice(randomIndex, 1, "o");
    checkResult("o");
  };

  const checkResult = (currentTurn) => {
    let draw = imagination.every((item) => {
      if (item == "o" || item == "x") return true;
    });
    console.log(
      "should be win ",
      winLines.some((combinations) => {
        return combinations.every((index) => {
          return imagination[index].includes(currentTurn);
        });
      }),
      currentTurn
    );

    if (
      winLines.some((combinations) => {
        return combinations.every((index) => {
          return imagination[index].includes(currentTurn);
        });
      })
    ) {
      if (currentTurn == "x") {
        setResultMessage("You Win!");
        setShow("show");
        end = true;
      } else if (currentTurn == "o") {
        setResultMessage("Computer Win");
        setShow("show");
      }
    } else if (draw) {
      setResultMessage("Draw");
      setShow("show");
      end = true;
    } else {
      return true;
    }
  };

  const handleClick = (e, cellNo) => {
    if (!imagination[cellNo]) {
      const cell = e.target;
      imagination.splice(cellNo, 1, "x");
      cell.classList.add("x");
      turn = !turn;
      checkResult("x");
      if (!end) {
        ComputerPlay();
      }
    }
  };

  const restart = () => {
    window.location.reload();
  };

  useEffect(() => {
    ComputerPlay();
  }, []);

  const Completionist = () => {
    if (!show) {
      setResultMessage("Lost by time");
      setShow("show");
    }
    return ":)";
  };

  const renderer = ({ seconds, completed }) => {
    if (show) {
      return <Completionist />;
    } else {
      return <span>0{seconds}</span>;
    }
  };

  return (
    <div>
      <Countdown date={Date.now() + 5000} renderer={renderer}></Countdown>
      <div className="board x" ref={board}>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 0);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 1);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 2);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 3);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 4);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 5);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 6);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 7);
          }}
        ></div>
        <div
          className="cell"
          onClick={(e) => {
            handleClick(e, 8);
          }}
        ></div>
      </div>
      <div className={`result ${show}`}>
        <div className="text">{resultMessage}</div>
        <button onClick={restart}>Restart</button>
      </div>
      <Link to="/">
        <button>go home</button>
      </Link>
    </div>
  );
};

export default Game2;
