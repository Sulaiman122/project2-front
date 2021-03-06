import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";
import Header from "../header";
import Footer from "../footer";

const Game2 = () => {
  const board = useRef(null);
  let turn;
  let timer;
  const [resultMessage, setResultMessage] = useState("");
  const [scoreGame2, setScoreGame2] = useState("");
  const [show, setShow] = useState("");
  const [hide, sethide] = useState("");
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

  const setScore = async (passedScore, em) => {
    try {
      const resp = await axios.post("https://project2-games.herokuapp.com/setscore", {
        email: em,
        score: passedScore,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
    let myuser = JSON.parse(localStorage.getItem("User"));

    if (
      winLines.some((combinations) => {
        return combinations.every((index) => {
          return imagination[index].includes(currentTurn);
        });
      })
    ) {
      if (currentTurn == "x") {
        setScoreGame2(timer * 6);
        setResultMessage("You Win!");
        setShow("show");
        sethide("hide");
        end = true;
        if (myuser.score[1] < timer * 6) {
          myuser.score.splice(1, 1, timer * 6);
          localStorage.setItem("User", JSON.stringify(myuser));
          setScore(myuser.score, myuser.email);
        }
      } else if (currentTurn == "o") {
        setScoreGame2(0);
        setResultMessage("Computer Win");
        setShow("show");
        sethide("hide");
        end = true;
      }
    } else if (draw) {
      setScoreGame2(2);
      setResultMessage("Draw");
      setShow("show");
      sethide("hide");
      end = true;
      let myuser = JSON.parse(localStorage.getItem("User"));
      if (myuser.score[1] < 2) {
        myuser.score.splice(1, 1, 2);
        localStorage.setItem("User", JSON.stringify(myuser));
        setScore(myuser.score, myuser.email);
      }
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
      setScoreGame2(0);
      setResultMessage("LOST BY TIME");
      setShow("show");
      sethide("hide");
    }
    return ":)";
  };

  const renderer = ({ seconds, completed }) => {
    timer = seconds;

    if (completed) {
      return <Completionist />;
    } else {
      return <span> {seconds}</span>;
    }
  };



  const sendComment = async (e) => {
    let myuser = JSON.parse(localStorage.getItem("User"));
    e.preventDefault();
    console.log(e.target.comment.value);
    console.log(myuser.userName);
    try {
      const resp = await axios.post("https://project2-games.herokuapp.com/comment", {
        game: 2,
        comment: e.target.comment.value,
        username: myuser.userName,
      }).then(async()=>{
        try {
          const resp = await axios.post("https://project2-games.herokuapp.com/retrievecomment", {
            game: 2,
          });
          console.log(resp.data);
          setcommments(resp.data);
          setNoComment(resp.data.length);
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value=''
  };

  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);
  useEffect(async () => {
    try {
      const resp = await axios.post("https://project2-games.herokuapp.com/retrievecomment", {
        game: 2,
      });
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  }, []);



  return (
    <div className="game2">
      <Header />
      <div className="game2Container">
        <p className={`timer ${hide}`}>
          Time :
          <Countdown date={Date.now() + 4000} renderer={renderer}></Countdown>
        </p>
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
          <div className="text">
            <p>Score: {scoreGame2}</p>
          </div>
          <div>
            <button onClick={restart}>Restart</button>
            <Link to="/games">
              <button>Back</button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>


      <form className="comments_form" onSubmit={sendComment}>
        <div className="commentHead">
          <h3>New Comment</h3>
          <button type="submit">Submit</button>
        </div>
        <div className="commentTail">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
          <textarea
            name="comment"
            placeholder="Your message"
            required
            cols="55"
            rows="8"
          ></textarea>
        </div>
        <div className="numComment">
          <h3>{noComment} Comments</h3>
        </div>
        {commments.map((comment,index) => {
          return (
            <div className="realComment" key={index}>
              <hr />
              <div className="realcommentRow">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
                <div className="realcommentData">
                  <h3>{comment.username}</h3>
                  <p>{comment.comment}</p>
                  <p className="dateP">
                    {comment.createdAt.slice(0, 10)}{" "}
                    {comment.createdAt.slice(11, 16)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </form>

      <Footer />
    </div>
  );
};

export default Game2;
