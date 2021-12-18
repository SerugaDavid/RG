import {Vector} from "./Vector.js";
import {Point} from "./Point.js";
import {Rectangle} from "./Rectangle.js";

export class QuadTree {
  constructor(points, max, rectangle, mesh) {
    this.rectangle = rectangle;
    this.points = [];
    this.children = [null, null, null, null];
    this.devided = false;
    this.max = max;
    this.mesh = mesh;
    for (let point of points) {
      this.addPoint(point);
    }
  }

  capacity() {
    // Method that returns the current capacity of the QuadTree node.
    return this.points.length;
  }

  addPoint(point) {
    // Method that adds a point to the current QuadTree node.
    if (!this.rectangle.inRectangle(point)){
      return false;
    }
    if (!this.devided && this.capacity() < this.max) {
      this.points.push(point);
      return true;
    }
    if (!this.devided){
      this.split();
    }
    // add point
    for (const child of this.children) {
      if (child.addPoint(point)){
        return true;
      }
    }
  }

  split() {
    // Method for splitting the QuadTree node to 4 other nodes.
    this.devided = true
    // get rect info
    const x = this.rectangle.x;
    const y = this.rectangle.y;
    const w = Math.floor(this.rectangle.w / 2);
    const h = Math.floor(this.rectangle.h / 2);
    // create children
    this.children[0] = new QuadTree([], this.max, new Rectangle(x, y, w, h), this.mesh); // nw
    this.children[1] = new QuadTree([], this.max, new Rectangle(x + w, y, w, h), this.mesh); // ne
    this.children[2] = new QuadTree([], this.max, new Rectangle(x, y + h, w, h), this.mesh); // sw
    this.children[3] = new QuadTree([], this.max, new Rectangle(x + w, y + h, w, h), this.mesh); // se
    // give points to children
    const len = this.points.length;
    for (let i = 0; i < len; i++){
      this.addPoint(this.points.pop());
    }
  }

  colourPoints() {
    // Colours all point that are touching
    if (this.devided) {
      for (let child of this.children) {
        child.colourPoints();
      }
      return;
    }
    for (let first of this.points) {
      for (let second of this.points) {
        if (first !== second) {
          first.touching(second);
        }
      }
    }
  }

  draw(canvas) {
    // Draws current QuadTree
    if (this.mesh) {
      this.rectangle.draw(canvas);
    }
    if (this.devided) {
      for (let child of this.children) {
        child.draw(canvas);
      }
      return;
    }
    for (let point of this.points) {
      point.draw(canvas);
    }
  }


}
