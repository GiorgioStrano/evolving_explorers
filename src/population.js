class Population {
    constructor(size, target, people = [], obstacles = []) {
        this.people = people;
        this.size = size;
        this.alive = true;
        this.timer = 10;
        this.currentMove = 0;
        this.target = target;
        this.bestFitPointer;
        this.obstacles = obstacles;


        if (this.people.length == 0) {
            this.fillRandom();
        }

    }

    fillRandom() {
        for (let i = 0; i < this.size; i++) {

            let player = new Pointer(width / 2, height - 20);
            this.people.push(player);
        }

    }


    calculateFit() {
        this.totalFit = 0;
        this.bestFitPointer;

        for (let i = 0; i < this.people.length; i++) {
            let d = dist(this.target.x, this.target.y, this.people[i].x, this.people[i].y);

            if (this.people[i].hasReachedGoal) {
                this.people[i].fit = 1;
            }
            else {
                this.people[i].fit = 1 / (d);
                this.people[i].fit *= this.people[i].fit;
            }

            if (this.bestFitPointer == undefined || this.people[i].fit >= this.bestFitPointer.fit) {
                this.bestFitPointer = this.people[i];
            }

            this.totalFit += this.people[i].fit;

        }
    }


    move() {
        for (let obstacle of obstacles) {
            obstacle.show();
        }
        if ((this.timer % 10 == 0) && (this.timer)) {
            this.currentMove++;
        }

        for (let i = 0; i < this.size; i++) {

            if (!this.people[i].move(this.currentMove, this.target.x, this.target.y)) {
                this.killEmAll();
                break;
            }

            for (let j = 0; j < this.obstacles.length; j++) {

                if (dist(this.obstacles[j].x, this.obstacles[j].y, this.people[i].x, this.people[i].y) <= target_radius) {
                    this.people[i].bonk();
                }
            }

            if (dist(this.target.x, this.target.y, this.people[i].x, this.people[i].y) < target_radius)
                this.people[i].stop();
        }
        this.timer++;
    }

    killEmAll() {
        this.alive = false;
        // this.calculateFit();
    }


    getFit(p) { return p.fit; }

    reproduce() {
        this.people.sort(function compare(a, b) { return - (a.fit - b.fit) });
        let newPop = [];

        for (let i = 0; i < int(n / 2); i++) {
            newPop.push(new Pointer(width / 2, height - 20, this.people[i].dna));
        }

        for (let i = 0; i < int(n / 2); i++) {
            let other = this.people[int(random() * int(n / 2))];
            newPop.push(this.people[i].combine(other));
        }
        return new Population(n, target, newPop, obstacles);
    }


    // sceglie due genitori estraendoli con metodo monte carlo -- DEPRECATED
    pickParents() {
        for (let i = 0; i < this.size; i++) {
            this.people[i].normFit = this.people[i].fit / this.totalFit;
        }

        let k = 0;
        let parents = [];
        while (k < 10000) {

            k++;
            //scelgo un elemento casuale
            let a = int(random() * this.size);

            // scelgo se accetarlo o no in base al suo fit
            if (random() < this.people[a].normFit) {
                parents.push(this.people[a]);
                break
            }
        }

        let j = 0;
        while (j < 10000) {
            j++;
            let b = int(random() * this.size);
            if (random() < this.people[b].normFit) {
                parents.push(this.people[b]);
                break
            }
        }


        return parents
    }




}
