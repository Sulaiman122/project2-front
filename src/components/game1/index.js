import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Countdown from "react-countdown";
import Header from "../header";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from "../footer";

const Game1 = () => {
  const navigate = useNavigate();

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

  const canvasRef = useRef(null);
  const [canvas, setcanvas] = useState();
  let timer;
  let done = false;
  useEffect(() => {
    setcanvas(canvasRef.current);
  }, []);

  //The game board 1 = walls, 0 = free space, and -1 = the goal
  var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
  ];
  var player = {
    x: 0,
    y: 0,
  };

  //Draw the game board
  function draw() {
    if (canvas != null) {
      var width = canvas.width;
      var blockSize = width / board.length;
      var context = canvas.getContext("2d");
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, width, width);
      context.fillStyle = "white";
      //Loop through the board array drawing the walls and the goal
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
          //Draw a wall
          if (board[y][x] === 1) {
            context.fillRect(
              x * blockSize,
              y * blockSize,
              blockSize,
              blockSize
            );
          }
          //Draw the goal
          else if (board[y][x] === -1) {
            context.beginPath();
            context.lineWidth = 3;
            context.strokeStyle = "gold";
            context.moveTo(x * blockSize + 8, y * blockSize + 8);
            context.lineTo((x + 1) * blockSize - 8, (y + 1) * blockSize - 8);
            context.moveTo(x * blockSize + 8, (y + 1) * blockSize - 8);
            context.lineTo((x + 1) * blockSize - 8, y * blockSize + 8);
            context.stroke();
          }
        }
      }
      //Draw the player
      context.beginPath();
      var half = blockSize / 2;
      context.fillStyle = "lightgreen";
      context.arc(
        player.x * blockSize + half,
        player.y * blockSize + half,
        half - 4,
        0,
        2 * Math.PI
      );
      context.fill();
    } else {
      console.log("didnt render");
    }
    if (player.x == 0 && player.y == 9) {
      done = true;
      let myuser = JSON.parse(localStorage.getItem("User"));
      myuser.score.splice(0, 1, timer / 2);
      console.log(myuser);
      localStorage.setItem("User", JSON.stringify(myuser));
      setScore(myuser.score, myuser.email);

      Swal.fire({
        icon: "success",
        title: `Score : ${timer / 2}`,
        showDenyButton: true,
        confirmButtonText: "Play again",
        denyButtonText: `Back`,
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#e1e1e1",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          restart();
        } else if (result.isDenied) {
          navigate("/games");
        }
      });
    }
  }
  useEffect(() => {}, []);
  //Check to see if the new space is inside the board and not a wall
  function canMove(x, y) {
    return (
      y >= 0 &&
      y < board.length &&
      x >= 0 &&
      x < board[y].length &&
      board[y][x] != 1
    );
  }

  function handleKeyDown(e) {
    if (e.keyCode == 38 && canMove(player.x, player.y - 1))
      //Up arrow
      player.y--;
    else if (e.keyCode == 40 && canMove(player.x, player.y + 1))
      // down arrow
      player.y++;
    else if (e.keyCode == 37 && canMove(player.x - 1, player.y)) player.x--;
    else if (e.keyCode == 39 && canMove(player.x + 1, player.y)) player.x++;
    draw();
    e.preventDefault();
  }

  draw();

  const restart = () => {
    window.location.reload();
  };

  const renderer = ({ seconds, completed }) => {
    timer = seconds;
    if (completed) {
      Swal.fire({
        icon: "error",
        title: `Score : 0`,
        showDenyButton: true,
        confirmButtonText: "Play again",
        denyButtonText: `Back`,
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#e1e1e1",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          restart();
        } else if (result.isDenied) {
          navigate("/games");
        }
      });
    }
    if (done) {
      return "Well Played";
    } else {
      return <span>{" " + seconds}</span>;
    }
  };

  const sendComment = async (e) => {
    let myuser = JSON.parse(localStorage.getItem("User"));
    e.preventDefault();
    console.log(e.target.comment.value);
    console.log(myuser.userName);
    try {
      const resp = await axios.post("http://localhost:4500/comment", {
        game: 1,
        comment: e.target.comment.value,
        username: myuser.userName,
      }).then(async()=>{
        try {
          const resp = await axios.post("http://localhost:4500/retrievecomment", {
            game: 1,
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
      const resp = await axios.post("http://localhost:4500/retrievecomment", {
        game: 1,
      });
      console.log(resp.data);
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="game1Container">
      <Header />

      <div onKeyDown={handleKeyDown} tabIndex="0" className="game1 ">
        <p className="timer">
          Time :
          <Countdown date={Date.now() + 40000} renderer={renderer}></Countdown>
        </p>

        <canvas ref={canvasRef} width="400px" height="400px"></canvas>
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
        {commments.map((comment, index) => {
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

export default Game1;
