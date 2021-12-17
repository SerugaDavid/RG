// import {Vector} from "./Vector.js";
//
// let v = new Vector([1, 2, 3]);
// console.log(v);
// console.log(v*4);
//
//
// function fak(n){
//     if (n === 0){
//         return 1;
//     }
//     let sum = 1;
//     for (let i = 2; i <= n; i++){
//         sum *= i;
//     }
//     return sum;
// }
//
// function bin(n, k){
//     return fak(n) / (fak(k) * fak(n - k));
// }
//
// function value(x, n, k){
//     return bin(n, k) * (x ** k) * ((1 - x) ** (n - k));
// }
//
// function deriv(x, n, k){
//     return n * (value(x, n - 1, k - 1) - value(x, n - 1, k));
// }
//
// console.log(value(2,3,1));
// console.log(deriv(2,3,1));

import {Vector} from "./Vector.js";
import {Bernstein} from "./Bernstein.js";
import {Bezier} from "./Bezier.js";
import {Spline} from "./Spline.js";

// testi
let bz0 = new Bezier([new Vector([1, 2]), new Vector([3, 4]), new Vector([5, 6]), new Vector([9, 9])]);
let bz1 = new Bezier([new Vector([7, 8]), new Vector([9, 10]), new Vector([11, 12]), new Vector([15, 15])]);
let bz2 = new Bezier([new Vector([13, 14]), new Vector([15, 16]), new Vector([17, 18]), new Vector([20, 20])]);
let bz3 = new Bezier([new Vector([10, 20]), new Vector([30, 40]), new Vector([50, 60]), new Vector([50, 60])]);

let ar = [bz0, bz1, bz2, bz3]


let sp = new Spline(ar);

//console.log(sp);
console.log(sp.value(0));
console.log(sp.value(0.5));
console.log(sp.value(0.7));
console.log(sp.value(1.2));
console.log(sp.value(1.8));
console.log(sp.value(1.9));
console.log(sp.value(2));
console.log(sp.value(2.3));
console.log(sp.value(2.7));
console.log(sp.value(3.5));
console.log(sp.value(3.7));
console.log(sp.value(4));

console.log(sp.derivative(0));
console.log(sp.derivative(0.5));
console.log(sp.derivative(1.7));
console.log(sp.derivative(2.3));
console.log(sp.derivative(2.8));
console.log(sp.derivative(3.4));
console.log(sp.derivative(3.7));
console.log(`\n\n makeContinuous`);

sp.makeContinuous();

console.log(sp.curves[0].points[0]);
console.log(sp.curves[0].points[3]);
console.log(sp.curves[1].points[0]);
console.log(sp.curves[1].points[3]);
console.log(sp.curves[2].points[0]);
console.log(sp.curves[2].points[3]);
console.log(sp.curves[3].points[0]);
console.log(sp.curves[3].points[3]);



console.log(sp.curves[0].points[2]);
console.log(sp.curves[1].points[2]);
console.log(sp.curves[1].points[1]);
console.log(sp.curves[2].points[2]);
console.log(sp.curves[2].points[1]);
console.log(sp.curves[3].points[1]);


console.log(`\n\n makeSmooth`);
sp.makeSmooth();

console.log(sp.curves[0].points[0]);
console.log(sp.curves[0].points[3]);
console.log(sp.curves[1].points[0]);
console.log(sp.curves[1].points[3]);
console.log(sp.curves[2].points[0]);
console.log(sp.curves[2].points[3]);
console.log(sp.curves[3].points[0]);
console.log(sp.curves[3].points[3]);

console.log(sp.curves[0].points[2]);
console.log(sp.curves[1].points[2]);
console.log(sp.curves[1].points[1]);
console.log(sp.curves[2].points[2]);
console.log(sp.curves[2].points[1]);
console.log(sp.curves[3].points[1]);