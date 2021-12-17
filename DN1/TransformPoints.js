import {Transformation} from "./Transformation.js";
import {PointManager} from "./PointManager.js";
import {Vector} from "./Vector.js";

export class TransformPoints {
    transformPoints(input) {
        let pointManager = new PointManager();
        let matrika = new Transformation();
        let tocke = pointManager.parsePoints(input);
        matrika.translate(new Vector(2.8, 0, 0));
        matrika.rotateY(Math.PI/4);
        matrika.translate(new Vector(0, 0, 7.15));
        matrika.translate(new Vector(0, 2.45, 0));
        matrika.scale(new Vector(1.8, 1.8, 1));
        matrika.rotateY(Math.PI/2);
        for (let i = 0; i < tocke.length; i++) {
            tocke[i] = matrika.transform(tocke[i]);
        }
        return pointManager.formatPoints(tocke);
    }
}