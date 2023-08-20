import GameObject from './gameObject.js';

export default class Player extends GameObject {

    constructor(coordinates, lineWidth, conText, color) {
        super(coordinates, lineWidth, conText, color);
        this.moves = 0;
    }

    move(moveDirection, maze, exitPoint) {

        this.moves++;
        let finish = false;
        switch (moveDirection) {
            case 37:
                finish = exitPoint.collisionDetection(this.coordinates[0] - this.lineWidth, this.coordinates[1] - this.lineWidth, this);
                if (!maze.collisionDetection(this.coordinates[0] - this.lineWidth, this.coordinates[1] - this.lineWidth)) this.coordinates[0] -= this.lineWidth;
                break;
            case 39:
                finish = exitPoint.collisionDetection(this.coordinates[0] + this.lineWidth, this.coordinates[1] - this.lineWidth, this);
                if (!maze.collisionDetection(this.coordinates[0] + this.lineWidth, this.coordinates[1] - this.lineWidth)) this.coordinates[0] += this.lineWidth;
                break;
            case 38:
                finish = exitPoint.collisionDetection(this.coordinates[0], this.coordinates[1] - this.lineWidth * 2, this);
                if (!maze.collisionDetection(this.coordinates[0], this.coordinates[1] - this.lineWidth * 2)) this.coordinates[1] -= this.lineWidth;
                break;
            case 40:
                finish = exitPoint.collisionDetection(this.coordinates[0], this.coordinates[1], this);
                if (!maze.collisionDetection(this.coordinates[0], this.coordinates[1])) this.coordinates[1] += this.lineWidth;
                break;
            default:
                break;
        }

        return finish;
    }
}