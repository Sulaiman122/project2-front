import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Game1 = () => {
  const canvasRef = useRef(null);
  const [canvas, setcanvas] = useState();
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
            context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
          //Draw the goal
          else if (board[y][x] === -1) {
            context.beginPath();
            context.lineWidth = 3;
            context.strokeStyle = "gold";
            context.moveTo(x * blockSize+8, y * blockSize+8);
            context.lineTo((x + 1) * blockSize-8, (y + 1) * blockSize-8);
            context.moveTo(x * blockSize+8, (y + 1) * blockSize-8);
            context.lineTo((x + 1) * blockSize-8, y * blockSize+8);
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
        half-4,
        0,
        2 * Math.PI
      );
      context.fill();
    } else {
      console.log("didnt render");
    }
    if(player.x==0&&player.y==9){
        alert('you won')
    }
  }

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
  return (
    <div onKeyDown={handleKeyDown} tabIndex="0" className="game1">
      <canvas
        ref={canvasRef}
        id="GameBoardCanvas"
        width="400px"
        height="400px"
      ></canvas>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default Game1;
