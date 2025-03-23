import React, { useState, useEffect, useCallback } from "react";
import Board from "./Board";
import "../static/style/Game.css"; // Ensure correct path

// Define winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to determine the winner
const calculateWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winningSquares: [a, b, c] };
        }
    }
    return { winner: null, winningSquares: [] };
};

// ✅ Minimax Algorithm for AI
const minimax = (squares, depth, isMaximizing) => {
    const { winner } = calculateWinner(squares);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (!squares.includes(null)) return 0; // Tie

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(idx => idx !== null);

    for (let move of availableMoves) {
        let newSquares = squares.slice();
        newSquares[move] = isMaximizing ? "O" : "X";
        let score = minimax(newSquares, depth + 1, !isMaximizing);
        bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }

    return bestScore;
};

// ✅ Find the Best Move for AI
const bestMove = (squares) => {
    let bestScore = -Infinity;
    let move = null;
    let availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(idx => idx !== null);

    for (let index of availableMoves) {
        let newSquares = squares.slice();
        newSquares[index] = "O";
        let score = minimax(newSquares, 0, false);
        if (score > bestScore) {
            bestScore = score;
            move = index;
        }
    }

    return move;
};

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [scores, setScores] = useState({ X: 0, O: 0 });

    const { winner, winningSquares = [] } = calculateWinner(squares);

    // ✅ Memoized `handleClick` using `useCallback`
    const handleClick = useCallback((index) => {
        if (squares[index] || winner) return;

        console.log(`Player clicked index ${index}`); // ✅ Debug log
        const newSquares = squares.slice();
        newSquares[index] = isXNext ? "X" : "O";
        setSquares(newSquares);
        setIsXNext(!isXNext);

        console.log("Updated squares:", newSquares); // ✅ Debug log

        if (calculateWinner(newSquares).winner) {
            setScores(prevScores => ({
                ...prevScores,
                [newSquares[index]]: prevScores[newSquares[index]] + 1
            }));
        }
    }, [squares, isXNext, winner]);

    // ✅ AI Move Handling with `useEffect`
    useEffect(() => {
        if (!isXNext && !winner && squares.includes(null)) {
            let aiMove = bestMove(squares);
            if (aiMove !== null) {
                setTimeout(() => handleClick(aiMove), 500);
            }
        }
    }, [isXNext, squares, winner, handleClick]); // ✅ Now `handleClick` is included

    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    const status = winner
        ? `Winner: ${winner}`
        : squares.every((square) => square !== null)
        ? "Tie"
        : `Next player: ${isXNext ? "X" : "O"}`;

    return (
        <div className="game">
            <h1 className="text-3xl font-bold">Tic-Tac-Toe</h1>
            <div className="status text-xl font-semibold">{status}</div>
            <div className="leaderboard">
                <p>Player X: {scores.X}</p>
                <p>AI O: {scores.O}</p>
            </div>
            <Board squares={squares} onClick={handleClick} winningSquares={winningSquares || []} />
            <button className="reset" onClick={handleReset}>Reset Game</button>
        </div>
    );
};

export default Game;