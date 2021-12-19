import {Vector} from "./Vector.js";
import {Point} from "./Point.js";
import {QuadTree} from "./QuadTree.js";
import {Rectangle} from "./Rectangle.js";

// this class handles the drawing of all the things
// it creates points, handles clicks, creates new frames and works with the quad tree.
export class Draw {
  constructor(canvas, points) {
    this.points = points;
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.clickVector = new Vector();
    this.speed = 1;
    this.max = 4;
    this.outerRect = new Rectangle(0, 0, canvas.width, canvas.height);
    this.mesh = true;
    this.qtree = new QuadTree(points, this.max, this.outerRect, this.mesh);
    this.pressed = false;
    this.event = null;
  }

  clickCoordinates(event){
    // Gets coordinates of click on canvas.
    const border = this.canvas.getBoundingClientRect();
    const x = event.clientX - border.left;
    const y = event.clientY - border.top;
    return [x, y];
  }

  // click and drop functions had a different purpose than they have now, that's why there is commented code
  click(event) {
    // Reads a "mousedown" and remembers those coordinates.
    this.pressed = true;
    // const coordinates = this.clickCoordinates(event);
    // this.clickVector = new Vector(coordinates);
  }

  drop(event) {
    // Reads a "mouseup" and creates a new point with direction.
    this.pressed = false;
    // const coordinates = this.clickCoordinates(event);
    // const point = new Vector(coordinates);
    // const directionVector = point.sub(this.clickVector).normalize().mulScalar(this.speed);
    // this.points.push(new Point(point, directionVector));
  }

  addPoints(n) {
    // Creates n new random points
    this.points = [];
    for (let i = 0; i < n; i++) {
        this.points.push(this.createRandomPoint());
    }
    this.qtree = new QuadTree(this.points, this.max, this.outerRect, this.mesh);
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

  getEvent(event) {
    this.event = event;
  }

  newFrame() {
    // Moves every point on screen and draws it
    // Maybe add points
    if (this.pressed) {
      const w = this.canvas.width;
      const h = this.canvas.height;
      const coordinates = this.clickCoordinates(this.event);
      const point = new Vector(coordinates);
      const directionVector = new Vector(this.randomCoords(w, h, true)).normalize().mulScalar(this.speed);
      this.points.push(new Point(point, directionVector));
    }
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].move(this.canvas.width, this.canvas.height);
      // this.drawPoint(this.points[i]);
    }
    this.qtree = new QuadTree(this.points, this.max, this.outerRect, this.mesh);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.qtree.colourPoints();
    this.qtree.draw(this.canvas);
    window.requestAnimationFrame(()=>this.newFrame());
  }

  meshSwitch() {
    // Negates the mesh attribute
    this.mesh = !this.mesh;
  }
}
