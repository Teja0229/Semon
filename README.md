# Simon Says Game 🎮

A memory game built with plain HTML, CSS and JavaScript. Watch the pattern of colors, then repeat it. Each level adds one more color, so the pattern gets longer and harder to remember.

## How to Play

1. Press any key (or tap the heading on a phone) to start.
2. Watch the buttons flash in order.
3. Repeat the same order by clicking the buttons, or by pressing keys `1`–`4`.
4. If you get the order right, you go up a level. If you get it wrong, the game is over.

| Key | Button |
|-----|--------|
| 1   | Orange |
| 2   | Blue   |
| 3   | Yellow |
| 4   | Purple |

## Features

- Full sequence replay on every level, like the classic Simon game
- A different sound for each color, plus a buzz on a wrong answer
- High score saved in the browser (it stays after you refresh the page)
- Clicks are blocked while the game is showing the pattern
- Keyboard controls (keys 1–4) and tap-to-start for mobile
- Red screen flash on game over
- Gradient background

## Project Structure

```
├── simon_game.html   # Page structure (heading, high score, 4 buttons)
├── simonstyle.css    # Styling, button colors, flash effects, background
└── simon.js          # Game logic
```

## How to Run

1. Download all three files into the same folder.
2. Open `simon_game.html` in any modern browser.

No installation or build step is needed.

## How It Works

- `gameSeq` stores the pattern made by the game, and `userSeq` stores what the player clicks.
- `levelUp()` adds one random color to `gameSeq` and calls `playSequence()` to show it.
- `btnPress()` runs when a button is clicked. It saves the click in `userSeq` and calls `checkAns()`.
- `checkAns()` compares the player's click with the pattern. A match continues the game, and a mismatch ends it.
- `reset()` clears everything so a new game can start.

## Technologies Used

- HTML5
- CSS3
- JavaScript (DOM manipulation, `setTimeout`, Web Audio API, `localStorage`)

## Ideas for the Future

- Restart button
- Strict mode (the game ends on the first mistake)
- Speed that increases with each level
- Difficulty levels
