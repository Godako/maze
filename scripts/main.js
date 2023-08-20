import Maze from './classes/maze.js';
import GameFunctions from './classes/gameFunctions.js';

const getMazeLengthOneDimension = (mazeLength, lineWidth) => {

    let length = Math.floor(mazeLength / lineWidth) * lineWidth;

    if ((length / lineWidth) % 2 === 0) length -= lineWidth;

    return length;
}

const canvas = document.getElementById('game-room');
const conText = canvas.getContext('2d');

const lineWidth = 10;
const mazeWidth = getMazeLengthOneDimension(canvas.width, lineWidth);
const mazeHeight = getMazeLengthOneDimension(canvas.height, lineWidth);

const playRoom = new Maze(mazeWidth, mazeHeight, lineWidth, conText);
window.operator = new GameFunctions(playRoom, lineWidth, conText);

window.operator.generateMaze();

document.addEventListener('keydown', function (e) {
    window.operator.drawGame(e.keyCode);
});

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
