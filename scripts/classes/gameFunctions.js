import Player from './player.js';
import ExitOfMaze from './exitOfMaze.js';

export default class GameFunctions {
    constructor(playRoom, lineWidth, conText) {
        this.playRoom = playRoom;
        this.lineWidth = lineWidth;
        this.conText = conText;
    }

    generateMaze() {

        this.playRoom.initMaze();

        this.exitCoordinates = this.createPointOnBorderWall();
        this.playerStartCoordinates = this.createStartPoint();

        this.exitPoint = new ExitOfMaze(this.exitCoordinates, this.lineWidth, this.conText, '#ffff00');
        this.player = new Player(this.playerStartCoordinates, this.lineWidth, this.conText, '#ff0000');

        this.playRoom.drawMaze();
        this.exitPoint.drawObject();
        this.player.drawObject();
    }

    drawGame(moveDirection) {

        const finish = this.player.move(moveDirection, this.playRoom, this.exitPoint);

        if (finish) {
            this.generateMaze();
        } else {
            this.playRoom.drawMaze();
            this.exitPoint.drawObject();
            this.player.drawObject();
        }
    }

    createPointOnBorderWall() {

        switch (this.getRandomInt(2)) {
            case 0:
                //top left
                return [this.playRoom.lineWidth, this.playRoom.lineWidth];
            case 1:
                //bottom right
                return [this.playRoom.width - this.playRoom.lineWidth * 2, this.playRoom.height];
        }
    }

    createStartPoint() {

        if (this.exitCoordinates[1] === this.playRoom.height) {
            //exit point -> bottom right, start point -> top left

            return [this.playRoom.lineWidth, this.playRoom.lineWidth * 2];
        }
        else if (this.exitCoordinates[1] === this.playRoom.lineWidth) {
            //exit point -> top left, start point -> bottom right

            return [this.playRoom.width - this.playRoom.lineWidth * 2, this.playRoom.height - this.playRoom.lineWidth];
        }
    }

    getRandomInt(max) {

        return Math.floor(Math.random() * max);
    }
}
