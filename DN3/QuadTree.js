import {Vector} from "./Vector.js";
import {Point} from "./Point.js";
import {Rectangle} from "./Rectangle.js";

class QuadTree {
  constructor(points, max, rectangle) {
    this.rectangle = rectangle;
    this.points = points;
    this.children = [null, null, null, null];
    this.max = max;
  }

  capacity() {
    // Method that returns the current capacity of the QuadTree node.
    return this.points.length;
  }

  addPoint(point) {
    // Method that adds a point to the current QuadTree node.
    if (!this.rectangle.inRectangle(point)){
      return;
    }
    if (this.capacity() < this.max) {
      this.points.push(point);
      return;
    }
    this.split();
    for (const child of this.children) {
      child.addPoint(point);
    }
  }

  split() {
    // Method for splitting the QuadTree node to 4 other nodes.
    const x = this.rectangle.x;
    const y = this.rectangle.y;
    const w = Math.floor(this.rectangle.w / 2);
    const h = Math.floor(this.rectangle.h / 2);
    this.children[0] = new QuadTree([], this.max, new Rectangle(Math.floor(x/2), Math.floor(y/2), w, h)); // nw
    this.children[1] = new QuadTree([], this.max, new Rectangle(Math.floor(x/2) + x, Math.floor(y/2), w, h)); // ne
    this.children[2] = new QuadTree([], this.max, new Rectangle(Math.floor(x/2), Math.floor(y/2) + y, w, h)); // sw
    this.children[3] = new QuadTree([], this.max, new Rectangle(Math.floor(x/2) + x, Math.floor(y/2) + y, w, h)); // se

  }
}
