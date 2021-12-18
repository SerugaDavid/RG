export class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  inRectangle(point) {
    // Returns if point is in this Rectangle
    const coordinates = point.point.toArray();
    const x = coordinates[0];
    const y = coordinates[1];
    return x >= this.x &&
      x <= this.x + this.w &&
      y >= this.y &&
      y <= this.y + this.h;
  }

  draw(canvas) {
    // Draws the Rectangle on canvas
    const context = canvas.getContext("2d");
    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.closePath();
    context.stroke();
  }
}
