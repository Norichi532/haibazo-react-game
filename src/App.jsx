import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="title">LET'S PLAY</h1>

      <div className="control-panel">
        <div className="form-row">
          <label>Points:</label>
          <input type="number" min="1" placeholder="Enter points" />
        </div>

        <div className="form-row">
          <label>Time:</label>
          <span>0.0s</span>
        </div>

        <button className="restart-btn">Start</button>
      </div>

      <div className="game-board"></div>
    </div>
  );
}

export default App;