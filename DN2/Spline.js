export class Spline {
    constructor(curves) {
        this.curves = curves;
    }

    indeks(t) {
        // vrne indeks krivulje na katero se dani t nanaša
        if (t === this.curves.length){
            return this.curves.length - 1;
        }
        return Math.floor(t);
        // const korak = 1 / this.curves.length;
        // return Math.floor(t / korak);
    }

    raztegnjen(i, t) {
        // vrne raztenjen t za uporabo na krivulji
        return t - i;
        // const korak = 1 / this.curves.length;
        // const osnova = t - korak * i;
        // return osnova * this.curves.length;
    }

    value(t) {
        // vrne točko na Bézierjevem zlepku ob času t
        const i = this.indeks(t);
        t = this.raztegnjen(i, t);
        return this.curves[i].value(t);
    }

    derivative(t) {
        // vrne odvod Bézierjevega zlepka ob času t
        const i = this.indeks(t);
        t = this.raztegnjen(i, t);
        return this.curves[i].derivative(t);
    }

    makeContinuous() {
        // poveže krivulje z prvo in zadnjo točko v aritmetični sredini
        let vektor;
        let zadnji;
        for (let i = 1; i < this.curves.length; i++){
            zadnji = this.curves[i - 1].points.length - 1;
            vektor = this.curves[i - 1].points[zadnji].sub(this.curves[i].points[0]).divScalar(2);
            vektor = this.curves[i].points[0].add(vektor);
            this.curves[i].points[0] = vektor
            this.curves[i - 1].points[zadnji] = vektor;
        }
    }

    makeSmooth() {
        // krivulje izgladi potek krivulj, kjer se te stikajo
        let povprecen;
        const dolzina = this.curves[0].points.length;
        for (let i = 1; i < this.curves.length; i++){
            povprecen = this.curves[i - 1].derivative(1).add(this.curves[i].derivative(0)).divScalar(2);
            this.curves[i - 1].points[2] = this.curves[i - 1].points[3].sub(povprecen.divScalar(dolzina));
            this.curves[i].points[1] = this.curves[i].points[0].add(povprecen.divScalar(dolzina));
        }
    }
}