class QuadTree {
    constructor(points, max) {
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
        this.points.push(point);
        if (this.capacity() > this.max){
            this.split();
        }
    }

    split() {
        // Method for spliting the QuadTree node to 4 other nodes.
        for (let i = 0; i < 4; i++) {
            this.children[i] = new QuadTree([new Point], this.max);
        }
    }
}