export default class Maze {

    constructor(width, height, lineWidth, conText) {
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.conText = conText;
        this.step = this.width / this.lineWidth;
    }

    initMaze() {

        this.walls = new Array();

        for (let i = 0; i <= this.height - this.lineWidth; i += this.lineWidth) {

            for (let j = 0; j <= this.width - this.lineWidth; j += this.lineWidth) {

                const borderWall = (i === 0 || i === this.height - this.lineWidth || j === 0 || j === this.width - this.lineWidth);

                if (borderWall) {
                    this.walls.push('borderWall');
                }
                else if (i % (this.lineWidth * 2) === 0 && j % (this.lineWidth * 2) === 0) {
                    this.walls.push('wall');
                }
                else {
                    this.walls.push('floor');
                }
            }
        }

        let lastPastedElementIsAWall = false;

        for (let i = this.step; i < this.walls.length; i++) {

            if (this.walls[i] === 'floor') {

                if ((i < this.step * 2) &&
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i + this.step + 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i - this.step - 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i - this.step + 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - this.step + 1) && !this.checkElementIndexIfIsWallOrBorderWall(i + this.step + 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i - this.step)) &&
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - this.step) && !this.checkElementIndexIfIsWallOrBorderWall(i + 1)) &&
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + 1) && !this.checkElementIndexIfIsWallOrBorderWall(i + this.step)) &&
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + this.step) && !this.checkElementIndexIfIsWallOrBorderWall(i - 1)) &&
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i + this.step + 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i + this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i - this.step - 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - this.step - 1) && !this.checkElementIndexIfIsWallOrBorderWall(i - this.step + 1)) ||
                    (!this.checkElementIndexIfIsWallOrBorderWall(i - this.step + 1) && !this.checkElementIndexIfIsWallOrBorderWall(i + this.step + 1))) {

                    if (this.getRandomInt(2)) {
                        this.walls[i] = 'wall';
                        lastPastedElementIsAWall = true;
                    }
                    else if (!lastPastedElementIsAWall) {
                        this.walls[i] = 'wall';
                        lastPastedElementIsAWall = true;
                    }
                    else {
                        lastPastedElementIsAWall = false;
                    }
                }
            }
        }

        let i = 0;
        let firstFloor = true;
        this.walls.forEach(element => {

            if (element === 'floor') {
                if(firstFloor) {
                    this.walls[i] = 'path';
                    firstFloor = false;
                }
                else {
                    this.moveToPath(i);
                }
                
            }
            i++;
        });

        i = 0;
        this.walls.forEach(element => {

            if (element === 'wall') {

                if(
                !this.checkElementIndexIfIsWallOrBorderWall(i + 1) &&
                !this.checkElementIndexIfIsWallOrBorderWall(i - 1) &&
                !this.checkElementIndexIfIsWallOrBorderWall(i + this.step) &&
                !this.checkElementIndexIfIsWallOrBorderWall(i - this.step)) { 
                
                    this.walls[i - this.step] = 'wall';

                    if(
                    this.walls[i - this.step * 2] === 'borderWall') this.walls[i + 1] = 'wall';
                }
            }
            i++;
        });
    }

    moveToPath(index) {

        let findPath = false; 
        let newIndex = index;
        this.walls[index] = 'temporaryPath';
        
        
        if(this.checkPath(index)) this.walls[index] = 'path';

        if(!findPath) {

            newIndex = this.moveDirectionWhileNotCollosion(index, 1);
            findPath = this.checkPath(newIndex);
        }
        if(!findPath) {

            newIndex = this.moveDirectionWhileNotCollosion(index, this.step);
            findPath = this.checkPath(newIndex);
        }
        if(!findPath) {
            newIndex = this.moveDirectionWhileNotCollosion(index, -1);
            findPath = this.checkPath(newIndex);
        }
        if(!findPath) {

            newIndex = this.moveDirectionWhileNotCollosion(index, this.step * -1);
            findPath = this.checkPath(newIndex);
        }

        if(!findPath && newIndex === index) {  
            
            this.walls[index] = 'temporaryPath';
            let deleted = false;
            
            if(this.checkElementIndexIfIsWall(index - 1)){

                this.walls[index - 1] = 'temporaryPath';
                this.moveToPath(index - 1);
                deleted = true;
            }
            if(!deleted && this.checkElementIndexIfIsWall(index + 1)) {

                this.walls[index + 1] = 'temporaryPath';
                this.moveToPath(index + 1);
                deleted = true;
            }
            if(!deleted && this.checkElementIndexIfIsWall(index + this.step - 1)) {

                this.walls[index + this.step - 1] = 'temporaryPath';
                this.moveToPath(index + this.step - 1);
                deleted = true;
            }
            if(!deleted && this.checkElementIndexIfIsWall(index - this.step + 1)) {

                this.walls[index - this.step + 1] = 'temporaryPath';
                this.moveToPath(index - this.step + 1);
                deleted = true;
            }
        }
        else if (!findPath) {

            this.moveToPath(newIndex);
        }

        let i = 0;
        this.walls.forEach(element => { 

            if(element === 'temporaryPath') this.walls[i] = 'path';
            i++;
        });
    }

    moveDirectionWhileNotCollosion(index, dir) {
         
        do {

            index += dir;
        }while(this.walls[index] === 'floor');

        index -= dir;

        return index;
    }

    checkPath(index) {

        if(this.walls[index] === 'path'  ||
        this.walls[index + 1] === 'path' ||
        this.walls[index - 1] === 'path' ||
        this.walls[index - this.step] === 'path' ||
        this.walls[index + this.step] === 'path') return true;

        return false;
    }

    checkElementIndexIfIsWall(index) {

        if (this.walls[index] === 'wall') return true;

        return false;
    }

    checkElementIndexIfIsWallOrBorderWall(index) {

        if (this.walls[index] === 'wall' || this.walls[index] === 'borderWall') return true;
        
        return false;
    }

    collisionDetection(x, y) {

        if (x < 0 || y < 0) return false;
        let m = 0;

        for (let i = 0; i < this.height; i += this.lineWidth) {

            for (let j = 0; j < this.width; j += this.lineWidth) {

                if (j === x && i === y) {
                    if (this.walls[m] === 'wall' || this.walls[m] === 'borderWall') return true;
                }
                m++;
            }
        }
        return false;
    }

    drawMaze() {
        this.conText.lineWidth = this.lineWidth;

        let x = 0;
        let y = this.lineWidth;

        for (let i = 0; i < this.walls.length; i++) {
            if (x > this.width - this.lineWidth) {

                x = 0;
                y += this.lineWidth;

            }

            if (this.walls[i] === 'wall' || this.walls[i] === 'borderWall') {
                this.lineDraw('#000000', x, y);
            }
            else if (this.walls[i] === 'path') {
                this.lineDraw('#00ffff', x, y);
            }

            x += this.lineWidth;
        }
    }

    lineDraw(color, x, y) {
        this.conText.beginPath();
        this.conText.strokeStyle = color;
        this.conText.moveTo(x, y);
        this.conText.lineTo(x + this.lineWidth, y);
        this.conText.stroke();
    }

    getRandomInt(max) {

        return Math.floor(Math.random() * max);
    }
}