import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
      // A square button with value inside and click event.
      <button className="square" onClick={onSquareClick}>
          {value}
      </button>
  );
}

function calculateWinner(squares) {
  // Index of squares lead to winner!!
  const winLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ];
  for (let i=0; i<winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * The main function export to main.jsx file return
 * the below JSX which is the tic-tac-toe board with
 * 3 Square in 3 rows.
 * @returns the tic-tac-toe board.
 */
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "next player: " + (xIsNext?"X":"O");
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "go to move #" + move;
    } else {
      description = "go to game start";
    }
    return (
      <li key={move}>
        <button 
        className="historyBtn" 
        style={{backgroundColor: currentMove===move?"#23a4cf":"#b2e2f2"}} 
        onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}