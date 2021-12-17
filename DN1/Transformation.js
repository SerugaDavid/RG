import { Matrix } from "./Matrix.js";

export class Transformation {
    constructor() {
        this.matrix = new Matrix(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    translate(v){
        this.matrix = (
            new Matrix(
                1, 0, 0, v.x,
                0, 1, 0, v.y,
                0, 0, 1, v.z,
                0, 0, 0, 1
            ).multiply(this.matrix)
        );
    }

    scale(v) {
        this.matrix = (
            new Matrix(
                v.x, 0, 0, 0,
                0, v.y, 0, 0,
                0, 0, v.z, 0,
                0, 0, 0, 1
            ).multiply(this.matrix)
        );
    }

    rotateX(angle) {
        this.matrix = (
            new Matrix(
                1, 0, 0, 0,
                0, Math.cos(angle), -Math.sin(angle), 0,
                0, Math.sin(angle), Math.cos(angle), 0,
                0, 0, 0, 1
            ).multiply(this.matrix)
        );
    }

    rotateY(angle) {
        this.matrix = (
            new Matrix(
                Math.cos(angle), 0, Math.sin(angle), 0,
                0, 1, 0, 0,
                -Math.sin(angle), 0, Math.cos(angle), 0,
                0, 0, 0, 1
            ).multiply(this.matrix)
        );
    }

    rotateZ(angle) {
        this.matrix = (
            new Matrix(
                Math.cos(angle), -Math.sin(angle), 0, 0,
                Math.sin(angle), Math.cos(angle), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ).multiply(this.matrix)
        );
    }

    transform(v) {
        return this.matrix.multiplyVector(v);
    }
}