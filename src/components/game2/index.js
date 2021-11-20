import React,{useState,useEffect,useRef} from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Game2 = () => {
    const [clicked, setClicked] = useState(false);
    
const handleClick = (sss) =>{
    console.log('clicked ',sss.currentTarget.className)

    if (!clicked) {
        setClicked(true);
    }
}
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]


  return (
    <div>
      <div className="board o"  >
        <div className="cell x"></div>
        <div className="cell x"></div>
        <div className="cell" ></div>
        <div className="cell o" ></div>
        <div className="cell" ></div>
        <div className="cell" ></div>
        <div className="cell" value='3'></div>
        <div className="cell" value='2'></div>
        <div className="cell" value='1'  onClick={handleClick}></div>
      </div>
      <div className="result">
        <div className="text">x winner</div>
        <button>Restart</button>
      </div>
      <Link to="/"><button>go home</button></Link>
    </div>
  );
};

export default Game2;
