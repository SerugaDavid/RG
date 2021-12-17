import { Vector } from './Vector.js';

export class PointManager {

    parsePoints(input){
        const stringKoordinate = input.split("\n");
        let vektorji = new Array(stringKoordinate.length);
        let tmp = new Array(0);
        let velikost = 0;
        for (let i = 0; i < stringKoordinate.length; i++){
            if (stringKoordinate[i].length > 0){
                tmp = stringKoordinate[i].split(" ");
                vektorji[velikost++] = new Vector(parseInt(tmp[0]), parseInt(tmp[1]), parseInt(tmp[2]));
            }
        }
        vektorji.splice(velikost);
        return vektorji;
    }

    formatPoints(points){
        let besedilo = "";
        let tmp = new Array(3);
        for (let i = 0; i < points.length; i++){
            tmp = points[i].toArray();
            besedilo += tmp[0].toString().concat(" ", tmp[1].toString(), " ", tmp[2].toString(), "\n");
        }
        return besedilo;
    }
}
