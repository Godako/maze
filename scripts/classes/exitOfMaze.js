import GameObject from './gameObject.js';

export default class ExitOfMaze extends GameObject {

    constructor(coordinates, lineWidth, conText, color) {
        super(coordinates, lineWidth, conText, color);
    }

    collisionDetection(x, y, player) {

        if (x === this.coordinates[0] && y === this.coordinates[1] - this.lineWidth) {
            alert('Congratulations, you got out of the labyrinth with ' + player.moves + ' steps!');
            return true;
        }

        return false;
    }
}