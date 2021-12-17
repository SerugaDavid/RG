export class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  inRectangle(point) {
    const coordinates = point.point.toArray();
    const x = coordinates[0];
    const y = coordinates[1];
    return x >= this.x - this.w/2 &&
      x <= this.x + this.w/2 &&
      y >= this.y - this.h/2 &&
      y <= this.y + this.h/2;
  }

}
