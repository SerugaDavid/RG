// TESTI
// test vector
import {Vector as vet1} from "./Vector.js";
import {Vector as vet2} from "./reseno/Vector.js"
const prvi_v = new vet1(1,-1,0);
const prvi_v2 = new vet1(0, -1, 0);
const drugi_v = new vet2(1,-1,0);
const drugi_v2 = new vet2(0, -1, 0);

console.log("Negate:");
console.log(prvi_v.negate().toString());
console.log(drugi_v.negate().toString());

console.log("Add:");
console.log(prvi_v.add(prvi_v).toString());
console.log(drugi_v.add(drugi_v).toString());

console.log("Subtract:");
console.log(prvi_v.subtract(prvi_v).toString());
console.log(drugi_v.subtract(drugi_v).toString());

console.log("Multiply:");
console.log(prvi_v.multiply(prvi_v).toString());
console.log(drugi_v.multiply(drugi_v).toString());

console.log("Devide:");
console.log(prvi_v.divide(prvi_v).toString());
console.log(drugi_v.divide(drugi_v).toString());

console.log("Dot:");
console.log(prvi_v.dot(prvi_v).toString());
console.log(drugi_v.dot(drugi_v).toString());

console.log("Cross:");
console.log(prvi_v.cross(prvi_v).toString());
console.log(drugi_v.cross(drugi_v).toString());

console.log("Length:");
console.log(prvi_v.length().toString());
console.log(drugi_v.length().toString());

console.log("Normalize:");
console.log(prvi_v.normalize().toString());
console.log(drugi_v.normalize().toString());

console.log("Project:");
console.log(prvi_v.project(prvi_v).toString());
console.log(drugi_v.project(drugi_v).toString());

console.log("Reflect:");
console.log(prvi_v.reflect(prvi_v2).toString());
console.log(drugi_v.reflect(drugi_v2).toString());

console.log("Angle:");
console.log(prvi_v.angle(prvi_v).toString());
console.log(drugi_v.angle(drugi_v).toString());


// test matrix
import {Matrix as mat1} from "./Matrix.js";
import {Matrix as mat2} from "./reseno/Matrix.js";
const prvi_m = new mat1(...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
const drugi_m = new mat2(...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);

console.log("Negate:");
console.log(prvi_m.negate().toString());
console.log(drugi_m.negate().toString());

console.log("Add:");
console.log(prvi_m.add(prvi_m).toString());
console.log(drugi_m.add(drugi_m).toString());

console.log("Subtract:");
console.log(prvi_m.subtract(prvi_m).toString());
console.log(drugi_m.subtract(drugi_m).toString());

console.log("Transpose:")
console.log(prvi_m.transpose().toString());
console.log(drugi_m.transpose().toString());

console.log("Multiply:")
console.log(prvi_m.multiply(prvi_m).toString());
console.log(drugi_m.multiply(drugi_m).toString());

console.log("Multiply Vector:");
console.log(prvi_m.multiplyVector(prvi_v).toString());
console.log(drugi_m.multiplyVector(drugi_v).toString());


// test PointManager
import {PointManager as pm2} from "./reseno/PointManager.js";
import {PointManager as pm1} from "./PointManager.js";
const besedilo = "1 2 3\n4 5 6\n\n7 8 9\n\n3 6 9";
console.log(besedilo);

const prvi_p = new pm1();
const drugi_p = new pm2();

console.log("Prvi");
console.log(prvi_p.formatPoints(prvi_p.parsePoints(besedilo)));

console.log("Drugi:");
console.log(drugi_p.formatPoints(drugi_p.parsePoints(besedilo)));


// test Transformation
import {Transformation as Tr1} from "./Transformation.js";
import {Transformation as Tr2} from "./reseno/Transformation.js";




// test TransformPoints
import {TransformPoints as TP1} from "./TransformPoints.js";
import {TransformPoints as TP2} from "./reseno/TransformPoints.js";

let tekst = "1 2 3\n4 5 6\n\n7 8 9";
const tp1 = new TP1();
const tp2 = new TP2();

console.log("Prvi");
console.log(tp1.transformPoints(tekst));

console.log("Drugi:");
console.log(tp2.transformPoints(tekst));
