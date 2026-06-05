import { useEffect, useState } from "react";
import "./App.css";

const BOARD_SIZE = 520;
const POINT_SIZE = 50;
const FADE_DURATION = 1000;

function App() {
  const [pointCount, setPointCount] = useState("");
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextPoint, setNextPoint] = useState(1);
  const [gameStatus, setGameStatus] = useState("idle");

  useEffect(() => {
    let timerId;

    if (isPlaying) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 0.1);
      }, 100);
    }

    return () => clearInterval(timerId);
  }, [isPlaying]);

  const startGame = () => {
    const total = Number(pointCount);

    if (!total || total <= 0) {
      alert("Please enter a valid number");
      return;
    }

    const generated = [];

    for (let i = 1; i <= total; i++) {
      generated.push({
        id: i,
        x: Math.random() * (BOARD_SIZE - POINT_SIZE),
        y: Math.random() * (BOARD_SIZE - POINT_SIZE),
        isClicked: false,
        countdown: null,
      });
    }

    setPoints(generated);
    setTime(0);
    setNextPoint(1);
    setGameStatus("playing");
    setIsPlaying(true);
  };

  const handlePointClick = (clickedId) => {
    if (!isPlaying) return;

    if (clickedId !== nextPoint) {
      setGameStatus("game-over");
      setIsPlaying(false);
      return;
    }

    setPoints((prev) =>
      prev.map((point) =>
        point.id === clickedId
          ? { ...point, isClicked: true }
          : point
      )
    );

    let currentCountdown = 1.0;

  const countdownId = setInterval(() => {
    currentCountdown -= 0.1;

    setPoints((prev) =>
      prev.map((point) =>
        point.id === clickedId
          ? { ...point, countdown: Math.max(currentCountdown, 0).toFixed(1) }
          : point
      )
    );
  }, 100);

    setNextPoint((prev) => prev + 1);

    setTimeout(() => {
      clearInterval(countdownId);
      setPoints((prev) => {
        const updatedPoints = prev.filter(
          (point) => point.id !== clickedId
        );

        if (updatedPoints.length === 0) {
          setGameStatus("all-cleared");
          setIsPlaying(false);
        }

        return updatedPoints;
      });
    }, FADE_DURATION);
  };

  return (
    <div className="app">
      <h1
        className={
          gameStatus === "game-over"
            ? "title game-over-text"
            : gameStatus === "all-cleared"
            ? "title cleared-text"
            : "title"
        }
      >
        {gameStatus === "game-over"
          ? "GAME OVER"
          : gameStatus === "all-cleared"
          ? "ALL CLEARED"
          : "LET'S PLAY"}
      </h1>

      <div className="control-panel">
        <div className="form-row">
          <label>Points:</label>

          <input
            type="number"
            min="1"
            value={pointCount}
            onChange={(e) => setPointCount(e.target.value)}
            disabled={isPlaying}
          />
        </div>

        <div className="form-row">
          <label>Time:</label>
          <span>{time.toFixed(1)}s</span>
        </div>

        <button className="restart-btn" onClick={startGame}>
          {gameStatus === "idle" ? "Start" : "Restart"}
        </button>
      </div>

      <div className="game-board">
        {points.map((point) => (
          <div
            key={point.id}
            className={`point ${point.isClicked ? "point-clicked" : ""}`}
            style={{
              left: point.x,
              top: point.y,
            }}
            onClick={() => handlePointClick(point.id)}
          >
            <span>{point.id}</span>
            {point.isClicked && (
              <small className="countdown">{point.countdown}</small>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;