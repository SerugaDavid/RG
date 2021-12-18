import {Vector} from "./Vector.js";

export class Point{
  constructor(point, direction) {
    this.point = point;
    this.direction = direction;
    this.color = false;
  }

  coordinates() {
    // Returns coordinates of this point.
    return [this.point.x, this.point.y];
  }

  move(width, height) {
    // Moves a point in its direction and checks for bounce or collision.
    const touch = this.touchingWall(width, height);
    if (touch !== "not"){
        this.bounce(touch);
    }
    this.point = this.point.add(this.direction);
    this.color = false;
  }

  touchingWall(width, height) {
    // Returns the side which the point is touching or returns "not" if it's not
    const x = this.point.koordinate[0];
    const y = this.point.koordinate[1];
    const edge = 2;
    if (x - edge <= 0){
      return "w";
    }
    if (x + edge >= width){
      return "e";
    }
    if (y - edge <= 0){
      return "n";
    }
    if (y + edge >= height){
      return "s";
    }
    return "not"
  }

  reflectionVector(direction) {
    // Calculates a reflection vector for the point bounce
    switch (direction) {
      case "n":
        return new Vector([0, -1]);
      case "s":
        return new Vector([0, 1]);
      case "w":
        return new Vector([-1, 0]);
      case "e":
        return new Vector([1, 0]);
    }
    return new Vector([0, 0]).negate();
  }

  bounce(touch) {
    // Method for handling a bounce off the wall.
    const reflection = this.reflectionVector(touch);
    this.direction = this.direction.reflect(reflection);
  }

  touching(a) {
    // Method for handling a collision between two balls.
    const pos1 = this.point;
    const pos2 = a.point;
    const vector = pos2.sub(pos1);
    if (!this.color) {
      this.color = vector.length() <= 10;
      if (this.color) {
        a.color = true;
      }
    }
    return this.color;
  }

  draw(canvas) {
    // Draws the Point on canvas
    const context = canvas.getContext("2d");
    context.beginPath();
    const coordinates = this.point.toArray();
    context.arc(coordinates[0], coordinates[1], 5, 0, 2*Math.PI);
    if (this.color) {
      context.fillStyle = "red";
      context.fill();
    }
    context.closePath();
    context.stroke();
  }
}
