import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/home'
import Game1 from './components/game1'
import Game2 from './components/game2'
import Game3 from './components/game3'
import Game4 from './components/game4'
import Error from './components/error'
import Login from './components/login'
import Register from './components/register'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<Register />}/>
        <Route exact path="/game_one" element={<Game1/>}/>
        <Route exact path="/game_two" element={<Game2/>}/>
        <Route exact path="/game_three" element={<Game3/>}/>
        <Route exact path="/game_four" element={<Game4/>}/>
        <Route path='*' element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
