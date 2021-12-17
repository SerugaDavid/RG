export class Bernstein {
    constructor(n = 0, k = 0) {
        this.n = n;
        this.k = k;
    }

    fakulteta(n){
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
        return this.fakulteta(n) / (this.fakulteta(k) * this.fakulteta(n - k));
    }

    value(x, n = this.n, k = this.k){
        return this.binomial(n, k) * (x ** k) * ((1 - x) ** (n - k));
    }

    derivative(x){
        return this.n * (this.value(x, this.n - 1, this.k - 1) - this.value(x, this.n - 1, this.k));
    }
}