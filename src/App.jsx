import { useEffect, useRef, useState } from "react";
import "./App.css";

const BOARD_SIZE = 520;
const POINT_SIZE = 50;
const FADE_DURATION = 1500;
const AUTO_DELAY = 700;

function App() {
  const [pointCount, setPointCount] = useState("");
  const [gamePointCount, setGamePointCount] = useState(0);
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextPoint, setNextPoint] = useState(1);
  const [gameStatus, setGameStatus] = useState("idle");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const nextPointRef = useRef(1);
  const autoTimeoutsRef = useRef([]);
  const fadeTimeoutsRef = useRef([]);
  const countdownIntervalsRef = useRef([]);

  useEffect(() => {
    let timerId;

    if (isPlaying) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 0.1);
      }, 100);
    }

    return () => clearInterval(timerId);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      clearAutoTimeouts();
      clearPointTimers();
    };
  }, []);

  const clearAutoTimeouts = () => {
    autoTimeoutsRef.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });

    autoTimeoutsRef.current = [];
  };

  const clearPointTimers = () => {
    fadeTimeoutsRef.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });

    countdownIntervalsRef.current.forEach((intervalId) => {
      clearInterval(intervalId);
    });

    fadeTimeoutsRef.current = [];
    countdownIntervalsRef.current = [];
  };

  const generatePoints = (total) => {
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

    return generated;
  };

  const stopAutoPlay = () => {
    clearAutoTimeouts();
    setIsAutoPlaying(false);
  };

  const startGame = () => {
    const total = Number(pointCount);

    if (!total || total <= 0) {
      alert("Please enter a valid number");
      return;
    }

    clearAutoTimeouts();
    clearPointTimers();

    const generated = generatePoints(total);

    nextPointRef.current = 1;

    setGamePointCount(total);
    setPoints(generated);
    setTime(0);
    setNextPoint(1);
    setGameStatus("playing");
    setIsPlaying(true);
    setIsAutoPlaying(false);
  };

  const handlePointClick = (clickedId) => {
    if (!isPlaying) return;

    const isCorrectPoint = clickedId === nextPointRef.current;

    if (!isCorrectPoint) {
      clearAutoTimeouts();
      clearPointTimers();

      setPoints((prev) =>
        prev.map((point) =>
          point.id === clickedId
            ? { ...point, isClicked: true, countdown: null }
            : point
        )
      );

      setIsAutoPlaying(false);
      setGameStatus("game-over");
      setIsPlaying(false);

      return;
    }

    const initialCountdown = FADE_DURATION / 1000;

    setPoints((prev) =>
      prev.map((point) =>
        point.id === clickedId
          ? {
              ...point,
              isClicked: true,
              countdown: initialCountdown.toFixed(1),
            }
          : point
      )
    );

    let currentCountdown = initialCountdown;

    const countdownId = setInterval(() => {
      currentCountdown -= 0.1;

      setPoints((prev) =>
        prev.map((point) =>
          point.id === clickedId
            ? {
                ...point,
                countdown: Math.max(currentCountdown, 0).toFixed(1),
              }
            : point
        )
      );
    }, 100);

    countdownIntervalsRef.current.push(countdownId);

    const isLastPoint = clickedId === gamePointCount;

    nextPointRef.current += 1;
    setNextPoint(nextPointRef.current);

    if (isLastPoint) {
      setIsPlaying(false);
      setIsAutoPlaying(false);
      clearAutoTimeouts();
    }

    const fadeTimeoutId = setTimeout(() => {
      clearInterval(countdownId);

      setPoints((prev) => {
        const updatedPoints = prev.filter((point) => point.id !== clickedId);

        if (updatedPoints.length === 0) {
          clearAutoTimeouts();
          clearPointTimers();
          setGameStatus("all-cleared");
          setIsPlaying(false);
          setIsAutoPlaying(false);
        }

        return updatedPoints;
      });
    }, FADE_DURATION);

    fadeTimeoutsRef.current.push(fadeTimeoutId);
  };

  const handleAutoPlay = () => {
    if (!isPlaying) return;

    if (isAutoPlaying) {
      stopAutoPlay();
      return;
    }

    setIsAutoPlaying(true);

    const start = nextPointRef.current;

    for (let i = start; i <= gamePointCount; i++) {
      const timeoutId = setTimeout(() => {
        handlePointClick(i);
      }, (i - start) * AUTO_DELAY);

      autoTimeoutsRef.current.push(timeoutId);
    }
  };

  const getTitleClassName = () => {
    if (gameStatus === "game-over") {
      return "title game-over-text";
    }

    if (gameStatus === "all-cleared") {
      return "title cleared-text";
    }

    return "title";
  };

  const getTitleText = () => {
    if (gameStatus === "game-over") {
      return "GAME OVER";
    }

    if (gameStatus === "all-cleared") {
      return "ALL CLEARED";
    }

    return "LET'S PLAY";
  };

  return (
    <div className="app">
      <h1 className={getTitleClassName()}>{getTitleText()}</h1>

      <div className="control-panel">
        <div className="form-row">
          <label>Points:</label>

          <input
            type="number"
            min="1"
            value={pointCount}
            onChange={(e) => setPointCount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Time:</label>
          <span>{time.toFixed(1)}s</span>
        </div>

        <button className="restart-btn" onClick={startGame}>
          {gameStatus === "idle" ? "Start" : "Restart"}
        </button>

        <button
          className="restart-btn"
          onClick={handleAutoPlay}
          disabled={!isPlaying}
        >
          {isAutoPlaying ? "Stop Auto" : "Auto Play"}
        </button>
      </div>

      <div
        className={`game-board ${
          gameStatus === "game-over" ? "game-board-over" : ""
        }`}
      >
        {points.map((point) => (
          <div
            key={point.id}
            className={`point ${point.isClicked ? "point-clicked" : ""}`}
            style={{
              left: point.x,
              top: point.y,
              zIndex:
                point.id === nextPoint && gameStatus === "playing"
                  ? 9999
                  : point.id,
              "--fade-duration": `${FADE_DURATION}ms`,
            }}
            onClick={() => {
              if (!isAutoPlaying) {
                handlePointClick(point.id);
              }
            }}
          >
            <span>{point.id}</span>

            {point.isClicked && point.countdown !== null && (
              <small className="countdown">{point.countdown}</small>
            )}
          </div>
        ))}
      </div>

      <div className="next-display">
        Next:{" "}
        {gameStatus === "playing" && nextPoint <= gamePointCount
          ? nextPoint
          : "-"}
      </div>
    </div>
  );
}

export default App;