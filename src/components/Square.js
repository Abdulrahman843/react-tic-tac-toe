import React from "react";
import "../static/style/Square.css"; // Ensure correct path

const Square = ({ value, onClick, isWinningSquare }) => {
    return (
        <button 
            className={`square ${isWinningSquare ? "winning-square animate-bounce" : ""}`} 
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;
