export class Vector {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    toArray() {
        return [this.x, this.y, this.z];
    }

    negate(){
        return new Vector(-this.x, -this.y, -this.z);
    }

    add(v){
        const xyz = v.toArray();
        return new Vector(xyz[0] + this.x, xyz[1] + this.y, xyz[2] + this.z);
    }

    subtract(v){
        return this.add(v.negate());
    }

    multiply(v){
        const xyz = v.toArray();
        return new Vector(xyz[0] * this.x, xyz[1] * this.y, xyz[2] * this.z);
    }

    divide(v){
        const xyz = v.toArray();
        return new Vector(this.x / xyz[0], this.y / xyz[1], this.z / xyz[2]);
    }

    dot(v){
        const xyz = v.toArray();
        return xyz[0] * this.x + xyz[1] * this.y + xyz[2] * this.z;
    }

    cross(v){
        const xyz = v.toArray();
        return new Vector(xyz[2] * this.y - xyz[1] * this.z, xyz[0] * this.z - xyz[2] * this.x, xyz[1] * this.x - xyz[0] * this.y);
    }

    length(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }

    normalize(){
        const dolzina = this.length();
        return this.divide(new Vector(dolzina, dolzina, dolzina));
    }

    project(v){
        const dolzinaV = v.length();
        const dolzinaProjekcije = this.dot(v) / dolzinaV;
        const razmerjeDolzin = dolzinaProjekcije / dolzinaV;
        return v.multiply(new Vector(razmerjeDolzin, razmerjeDolzin, razmerjeDolzin));
    }

    reflect(v){
        // const skalarni = 2 * this.dot(v);
        // const zrcalni = v.multiply(new Vector(skalarni, skalarni, skalarni));
        // //console.log(zrcalni.toString());
        // const odboj = this.subtract(zrcalni);
        // //console.log(odboj.toString());
        // return odboj.negate().normalize();
        let tmp = this.dot(v.normalize());
        let n = v.normalize().multiply(new Vector(tmp, tmp, tmp));
        return this.subtract(new Vector(n.x * 2, n.y * 2, n.z * 2));
    }

    angle(v){
        const cosFi = this.dot(v) / this.length() / v.length();
        return Math.acos(cosFi);
    }

}