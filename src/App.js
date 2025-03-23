import React from "react";
import Game from "./components/Game";
import './index.css'; 

function App() {
    return (
        <div className="App">
            <h1>Tic-Tac-Toe</h1>
            <button className="reset">Reset</button> {/* Reset button here */}
            <Game />
        </div>
    );
}

export default App;
