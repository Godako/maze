export default class GameObject {

    constructor(coordinates, lineWidth, conText, color) {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.conText = conText;
        this.color = color;
    }

    getXCoordinate() {
        return this.coordinates[0];
    }

    getYCoordinate() {
        return this.coordinates[1];
    }

    getCoordinates() {
        return this.coordinates;
    }

    drawObject() {
        this.conText.beginPath();
        this.conText.strokeStyle = this.color;
        this.conText.moveTo(this.coordinates[0], this.coordinates[1]);
        this.conText.lineTo(this.coordinates[0] + this.lineWidth, this.coordinates[1]);
        this.conText.stroke();
    }
}