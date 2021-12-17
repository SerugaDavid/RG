import { Vector } from './Vector.js';

export class Matrix {

    constructor(...m) {
        this.m = new Array(16).fill(0);
        this.m.splice(0, m.length, ...m);
    }

    negate() {
        let nov = new Array(16).fill(0);
        for (let i = 0; i < 16; i++){
            nov[i] = -this.m[i];
        }
        return new Matrix(...nov);
    }

    add(m) {
        const druga = m.toArray();
        let nov = new Array(16).fill(0);
        for (let i = 0; i < 16; i++){
            nov[i] = this.m[i] + druga[i];
        }
        return new Matrix(...nov);
    }

    subtract(m) {
        const druga = m.toArray();
        let nov = new Array(16).fill(0);
        for (let i = 0; i < 16; i++){
            nov[i] = this.m[i] - druga[i];
        }
        return new Matrix(...nov);
    }

    transpose() {
        let nov = new Array(16).fill(0);
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                nov[i*4+j] = this.m[i+j*4];
            }
        }
        return new Matrix(...nov);
    }

    multiply(m) {
        const druga = m.toArray();
        let nov = new Array(16).fill(0);
        for (let vrstica = 0; vrstica < 4; vrstica++){
            for (let stolpec = 0; stolpec < 4; stolpec++){
                for (let i = 0; i < 4; i++){
                    nov[vrstica*4 + stolpec] += this.m[vrstica*4 + i] * druga[i*4 + stolpec];
                }
            }
        }
        return new Matrix(...nov);
    }

    multiplyVector(v) {
        let povecan = new Array(4).fill(1);
        let nov = new Array(4).fill(0);
        povecan.splice(0, 3, ...v.toArray());
        for (let vrstica = 0; vrstica < 4; vrstica++){
            for (let i = 0; i < 4; i++){
                nov[vrstica] += this.m[vrstica * 4 + i] * povecan[i];
            }
        }
        for (let i = 0; i < 4; i++){
            nov[i] /= nov[3];
        }
        return new Vector(nov[0], nov[1], nov[2]);
    }

    toArray() {
        return [...this.m];
    }

    toString() {
        return `(${this.m.join(',')})`;
    }

}