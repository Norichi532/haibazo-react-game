# HAIBAZO React Game

This project is my submission for the HAIBAZO Entrance Test - Intern Software Engineer.

The game is developed using ReactJS and Vite. The player needs to click the points in ascending order. If the player clicks the wrong point, the game will show GAME OVER. When all points have disappeared completely, the game will show ALL CLEARED.

---

## Demo

GitHub Repository URL: https://github.com/Norichi532/haibazo-react-game

Deployed Web URL: haibazo-react-game-delta.vercel.app

---

## Technologies Used

ReactJS, Vite, JavaScript, CSS, Vercel.

---

## Features

The game allows the player to input the number of points, generate random points on the game board, click points in ascending order, display the next point, track the playing time, restart the game, handle GAME OVER when the player clicks the wrong point, and show ALL CLEARED only after all points have disappeared completely.

The game also includes Auto Play and Stop Auto Play. Auto Play can automatically click the points in the correct order, while Stop Auto Play allows the player to stop auto mode and continue manually.

When the player clicks a point, that point is highlighted in red. If the player clicks the wrong point, the wrong point also turns red and the game board freezes at that moment. Previously clicked points will remain visible if they have not disappeared yet.

The game supports large point numbers such as 100, 500, or 2000.

---

## Game Rules

1. Enter the number of points.
2. Click the Start button.
3. Click the points in ascending order: 1 → 2 → 3 → ...
4. If the player clicks the wrong point, the game shows GAME OVER.
5. If all points disappear completely, the game shows ALL CLEARED.
6. The player can use Auto Play to automatically click points in order.
7. The player can use Stop Auto to stop Auto Play and continue manually.

---

## Important Notes

ALL CLEARED is displayed only when all points have disappeared completely.

When the final correct point is clicked, the timer stops immediately. However, ALL CLEARED will only appear after the final point finishes disappearing.

When the player clicks the wrong point, the wrong point turns red and stays on the board. The game board freezes immediately, and any previously clicked points that have not disappeared yet will also stay visible.

The next point is displayed under the game board.

If points overlap, the current next point is placed above other points to keep it clickable.

---

## Test Cases

### Case 1: Normal Clear

Input: Points = 5

Action: Click 1 → 2 → 3 → 4 → 5

Expected result: The timer stops after clicking the last point. ALL CLEARED appears only after all points disappear completely.

---

### Case 2: Click Wrong Point First

Input: Points = 5

Action: Click 3

Expected result: GAME OVER appears. Point 3 turns red and stays on the board. The timer stops immediately.

---

### Case 3: Click Wrong Point After Some Correct Points

Input: Points = 5

Action: Click 1 → 2 → 5

Expected result: GAME OVER appears. Point 5 turns red and stays on the board. Previously clicked points remain visible if they have not disappeared yet. The timer stops immediately.

---

### Case 4: One Point

Input: Points = 1

Action: Click 1

Expected result: The timer stops after clicking point 1. ALL CLEARED appears after point 1 disappears completely.

---

### Case 5: Restart Game

Action: Start game → Restart

Expected result: The timer resets. Points are generated again. Game status returns to playing. The next point returns to 1.

---

### Case 6: Auto Play and Stop Auto

Action: Start game → Auto Play → Stop Auto → Continue manually

Expected result: Auto Play stops. The player can continue clicking manually from the current next point.

---

## How to Run Locally

Clone the repository:

`git clone https://github.com/Norichi532/haibazo-react-game.git`

Go to the project folder:

`cd haibazo-react-game`

Install dependencies:

`npm install`

Run the development server:

`npm run dev`

Open the local URL in your browser:

`http://localhost:5173`

---

## Build for Production

Build the project:

`npm run build`

Preview the production build:

`npm run preview`

---

## Deployment

This project is deployed on Vercel.

Vercel build settings:

Framework Preset: Vite

Build Command: `npm run build`

Output Directory: `dist`

Install Command: `npm install`

---

## Project Structure

haibazo-react-game/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md

---

## Main Implementation

The main game logic is implemented in `src/App.jsx`.

The main UI styling is implemented in `src/App.css`.

---

## Author

Huynh Doan Tan Phat

Information Technology Student

Greenwich Vietnam - Da Nang Campus

Email: impphatdn99@gmail.com