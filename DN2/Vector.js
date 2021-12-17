export class Vector {

    constructor(koordinate = [0.0]) {
        this.koordinate = koordinate;
    }

    toString() {
        let besedilo = "(";
        for (const i in this.koordinate){
            besedilo += i.toString();
            if (i !== this.koordinate[this.koordinate.length - 1]){
                besedilo += ", ";
            }
            else {
                besedilo += ")";
            }
        }
        return besedilo;
    }

    toArray() {
        return this.koordinate;
    }

    negate(){
        return new Vector(this.koordinate.map(x => -x));
    }

    add(v){
        let nov = [];
        for (let i = 0; i < this.koordinate.length; i++){
            nov.push(this.koordinate[i] + v.koordinate[i]);
        }
        return new Vector(nov);
    }

    sub(v){
        return this.add(v.negate());
    }

    mul(v){
        let nov = [];
        for (let i = 0; i < this.koordinate.length; i++){
            nov.push(this.koordinate[i] * v.koordinate[i]);
        }
        return new Vector(nov);
    }

    div(v){
        let nov = [];
        for (let i = 0; i < this.koordinate.length; i++){
            nov.push(this.koordinate[i] / v.koordinate[i]);
        }
        return new Vector(nov);
    }

    mulScalar(s) {
        return new Vector(this.koordinate.map(x => x * s))
    }

    divScalar(s) {
        return this.mulScalar(1 / s);
    }

    dot(v){
        let sum = 0;
        for (let i = 0; i < this.koordinate.length; i++){
            sum += this.koordinate[i] * v.koordinate[i]
        }
        return sum;
    }

    // kaku da hek to nardiš
    // cross(v){
    //     const xyz = v.toArray();
    //     return new Vector(xyz[2] * this.y - xyz[1] * this.z, xyz[0] * this.z - xyz[2] * this.x, xyz[1] * this.x - xyz[0] * this.y);
    // }

    length(){
        let sum = 0;
        for (const i in this.koordinate) {
            sum += i ** 2;
        }
        return Math.sqrt(sum);
    }

    normalize(){
        const dolzina = this.length();
        return this.divScalar(dolzina);
    }

    project(v){
        const dolzinaV = v.length();
        const dolzinaProjekcije = this.dot(v) / dolzinaV;
        const razmerjeDolzin = dolzinaProjekcije / dolzinaV;
        return v.mul(new Vector(new Array(this.koordinate.length).fill(razmerjeDolzin)));
    }

    reflect(v){
        let tmp = this.dot(v.normalize());
        let n = v.normalize().mulScalar(tmp);
        return this.subtract(new Vector(n.koordinate.map(x => x * 2)));
    }

    angle(v){
        const cosFi = this.dot(v) / this.length() / v.length();
        return Math.acos(cosFi);
    }

}