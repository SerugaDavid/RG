import {Vector} from "./Vector.js";
import {Point} from "./Point.js";

export class Draw {
    constructor(canvas, points) {
        this.points = points;
        this.xd = canvas.getContext("2d");
        this.canvas = canvas;
        this.clickVector = new Vector();
        this.speed = 3;
    }

    drawPoint(point) {
        // Draws a point on canvas.
        this.xd.beginPath();
        const coordinates = point.point.toArray();
        this.xd.arc(coordinates[0], coordinates[1], 5, 0, 2*Math.PI);
        this.xd.fillStyle = "black";
        this.xd.fill();
        this.xd.closePath();
        this.xd.stroke();
    }

    clickCoordinates(event){
        // Gets coordinates of click on canvas.
        const border = this.canvas.getBoundingClientRect();
        const x = event.clientX - border.left;
        const y = event.clientY - border.top;
        return [x, y];
    }

    click(event) {
        // Reads a "mousedown" and remembers those coordinates.
        const coordinates = this.clickCoordinates(event);
        this.clickVector = new Vector(coordinates);
    }

    drop(event) {
        // Reads a "mouseup" and creates a new point with direction.
        const coordinates = this.clickCoordinates(event);
        const point = new Vector(coordinates);
        const directionVector = point.sub(this.clickVector).normalize().mulScalar(this.speed);
        this.points.push(new Point(point, directionVector));
    }

    addPoints(n) {
        // Creates n new random points
        this.points = [];
        for (let i = 0; i < n; i++) {
            this.points.push(this.createRandomPoint());
        }
    }

    createRandomPoint() {
        // Returns a point with random position and random direction
        const w = this.canvas.width;
        const h = this.canvas.height;
        const position = new Vector(this.randomCoords(w, h, false));
        const direction = new Vector(this.randomCoords(w, h, true)).normalize().mulScalar(this.speed);
        return new Point(position, direction);
    }

    randomCoords(w, h, direction) {
        // Returns random coordinates
        const padding = 5;
        const width = Math.floor(Math.random() * (w - padding) + padding);
        const height = Math.floor(Math.random() * (h - padding) + padding);
        if (direction) {
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    return [-width, height];
                case 1:
                    return [width, -height];
                case 2:
                    return [-width, -height];
            }
        }
        return [width, height];
    }

    newFrame() {
        // Moves every point on screen and draws it
        this.xd.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].move(this.canvas.width, this.canvas.height);
            this.drawPoint(this.points[i]);
        }
        window.requestAnimationFrame(()=>this.newFrame());
    }
}