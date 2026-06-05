import { useEffect, useState } from "react";
import "./App.css";

const BOARD_SIZE = 520;
const POINT_SIZE = 50;

function App() {
  const [pointCount, setPointCount] = useState("");
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
      });
    }

    setPoints(generated);
    setTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <h1 className="title">LET'S PLAY</h1>

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
          {isPlaying ? "Restart" : "Start"}
        </button>
      </div>

      <div className="game-board">
        {points.map((point) => (
          <div
            key={point.id}
            className="point"
            style={{
              left: point.x,
              top: point.y,
            }}
          >
            {point.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;