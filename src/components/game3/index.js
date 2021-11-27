import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Header from "../header";
import Swal from "sweetalert2";
import Footer from "../footer";

const Game3 = () => {
  const navigate = useNavigate();
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
    container.style.backgroundColor = 'rgba(0,0,0,0)';
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
      setQ(question.toUpperCase());
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
      if(seconds>0)
      setseconds(seconds - 1);
    }, 1000);
    if (seconds == 0) {
      setseconds(0);
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
  }, [seconds]);



  const sendComment = async (e) => {
    let myuser = JSON.parse(localStorage.getItem("User"));
    e.preventDefault();
    console.log(e.target.comment.value);
    console.log(myuser.userName);
    try {
      const resp = await axios.post("http://localhost:4500/comment", {
        game: 3,
        comment: e.target.comment.value,
        username: myuser.userName,
      }).then(async()=>{
        try {
          const resp = await axios.post("http://localhost:4500/retrievecomment", {
            game: 3,
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
        game: 3,
      });
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  }, []);



  return (
    <div className="game3">
      <Header/>
      <div className="game3Container">
      <div className={`page2 ${show2}`}  ref={cont}>
      <h1>The Great Game</h1>
        <div className="game3banner">
        <p>Tries: {rounds}</p>
        <p>{message}</p>
        <p>Time:{seconds}</p>
        </div>
        <p className="question"><b>{Q}</b></p>
        <div className="containerr" ref={squr}>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      </div>
      <div className={`page1 ${show}`}>
        <button onClick={() => startGame(2)} className='fill'>Easy</button>
        <button onClick={() => startGame(5)} className='fill'>Hard</button>
      </div>
      <div className={`page3 ${show3}`}>
        <h1>Result</h1>
        <h1>Your Score is {ccc}</h1>
        <button onClick={restart} className='fill'>Restart</button>
        <Link to="/games" style={{textDecoration:'none'}}>
          <button className='fill'>Back</button>
        </Link>
      </div>
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

export default Game3;
