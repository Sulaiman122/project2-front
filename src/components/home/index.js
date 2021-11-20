import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <Link to="/game_one"><button>Game 1</button></Link>
            <Link to="/game_two"><button>Game 2</button></Link>
            <Link to="/game_three"><button>Game 3</button></Link>
            <Link to="/game_four"><button>Game 4</button></Link>
        </div>
    )
}

export default Home
