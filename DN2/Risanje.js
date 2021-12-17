import {Vector} from "./Vector.js";
import {Bezier} from "./Bezier.js";
import {Spline} from "./Spline.js";

export class Risanje {
    constructor(canvas, xd) {
        this.canvas = canvas;
        this.xd = xd
        this.count = 0;
        this.krivulje = new Spline([]);
        this.tmpKoord = [0, 0];
    }

    koodrinateKlika(event){
        // Pridobi koordinate klika
        const meje = this.canvas.getBoundingClientRect();
        const x = event.clientX - meje.left;
        const y = event.clientY - meje.top;
        return [x, y];
    }

    narisiKrog(koordinate){
        this.xd.beginPath();
        this.xd.arc(koordinate[0], koordinate[1], 4, 0, 2*Math.PI);
        this.xd.fillStyle = "black";
        this.xd.fill();
        this.xd.closePath();
        this.xd.stroke();
    }

    narisiKvadrat(koordinate){
        this.xd.beginPath();
        this.xd.fillRect(koordinate[0] - 4, koordinate[1] - 4, 8, 8);
        this.xd.closePath();
        this.xd.stroke();
    }

    klik(e){
        this.count++;
        this.tmpKoord = this.koodrinateKlika(e);
        //console.log("klik: " + this.tmpKoord.toString());
        this.narisiKrog(this.tmpKoord);
    }

    spust(e, draw){
        const klik = this.koodrinateKlika(e)
        //console.log("spust: " + klik.toString());
        this.narisiKvadrat(klik);
        if (this.count > 2){
            const dolzina = this.krivulje.curves.length;
            const prva = this.krivulje.curves[dolzina - 1].points[3];
            let druga = this.krivulje.curves[dolzina - 1].points[2];
            druga = prva.add(prva.sub(druga));
            this.krivulje.curves.push(new Bezier([prva, druga, new Vector(klik), new Vector(this.tmpKoord)]));
        }
        else if (this.count === 1){
            this.krivulje.curves.push(new Bezier([new Vector(this.tmpKoord), new Vector(klik)]));
        }
        else {
            this.krivulje.curves[0].points.push(new Vector(klik), new Vector(this.tmpKoord));
        }
        this.risi(true);
        for (let i = 0; i < draw.length - 1; i++){
            draw[i].risi(false);
        }
    }

    risi(clear) {
        const natancnost = 50;
        let koor = this.krivulje.value(0).koordinate;
        if (clear) {
            this.xd.clearRect(0, 0, 800, 600);
        }
        let tmp_koor;
        for (let j = 0; j < this.krivulje.curves.length; j++){
            for (let i = 0; i < this.krivulje.curves[j].points.length; i++){
                if (i === 0 || i === this.krivulje.curves[j].points.length - 1){
                    this.narisiKrog(this.krivulje.curves[j].points[i].koordinate);
                }
                else {
                    tmp_koor = this.krivulje.curves[j].points[i].koordinate;
                    this.narisiKvadrat(tmp_koor);
                    if (j >= 1 && i === 1){
                        this.xd.closePath();
                        this.xd.moveTo(tmp_koor[0], tmp_koor[1]);
                        tmp_koor = this.krivulje.curves[j-1].points[i+1].koordinate;
                        this.xd.lineTo(tmp_koor[0], tmp_koor[1]);
                        this.xd.stroke();
                    }
                }
            }
        }
        this.xd.closePath();
        this.xd.moveTo(koor[0], koor[1]);
        for (let i = 0; i <= natancnost * this.krivulje.curves.length; i++){
            koor = this.krivulje.value(i / natancnost).koordinate;
            this.piksel(koor);
            //console.log("move to: " + koor.toString());
            this.xd.moveTo(koor[0], koor[1]);
        }
    }

    piksel(koor){
        const x = koor[0];
        const y = koor[1];
        this.xd.lineTo(x, y);
        //console.log("line to: " + koor.toString());
        this.xd.stroke();
    }
}
