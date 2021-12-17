import {Vector} from "./Vector.js";
import {Bernstein} from "./Bernstein.js";

export class Bezier {
    constructor(points) {
        this.points = points;
    }

    fakulteta(n){
        // fakulteta števila n
        if (n === 0){
            return 1;
        }
        let sum = 1;
        for (let i = 2; i <= n; i++){
            sum *= i;
        }
        return sum;
    }

    binomial(n, k){
        // binomski koeficient za število n, k
        return this.fakulteta(n) / (this.fakulteta(k) * this.fakulteta(n - k));
    }

    value(t) {
        // vrne točko na Bézierjevi krivulji ob času t
        // greš čez vse točke in pr vsaki zračunaš "bin" in še neki fanci matematke in to nakonc skp sešteješ
        // kako to nardiš, nardiš en vector na katerega pol to skos prištevaš v eni for zanki, ni potrebna rekurzija
        let point = new Vector(new Array(this.points[0].koordinate.length).fill(0));
        let tmp;
        for (let i = 0; i <= this.points.length - 1; i++){
            tmp = this.binomial(this.points.length - 1, i) * (1 - t) ** (this.points.length - 1 - i) * t ** i;
            point = point.add(this.points[i].mulScalar(tmp));
        }
        return point;
    }

    derivative(t) {
        // vrne odvod Bézierjeve krivulje ob času t
        let bernstein;
        let point = new Vector(new Array(this.points[0].koordinate.length).fill(0));
        for (let i = 0; i < this.points.length - 1; i++){
            bernstein = new Bernstein(this.points.length - 2, i);
            point = point.add(this.points[i + 1].sub(this.points[i]).mulScalar(bernstein.value(t)));
        }
        return point.mulScalar(this.points.length - 1);
    }
}