import React from "react";
import Square from "./Square";
import "../static/style/Board.css"; // Ensure correct path

const Board = ({ squares, onClick, winningSquares }) => {
    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square 
                    key={index} 
                    value={square} 
                    onClick={() => onClick(index)}
                    isWinningSquare={winningSquares.includes(index)}
                />
            ))}
        </div>
    );
};

export default Board;
