class Pointer {

    constructor(x, y, dna = 0) {
        this.x = x;
        this.y = y;
        this.xspeed = 0;
        this.yspeed = 0;

        this.dna = dna;

        this.fit = 0;
        this.normFit = 0;

        this.hasReachedGoal = false;
        this.bonked = false;

        if (dna == 0) {
            this.dna = new Dna(lifespan);
        }

        this.direction = this.dna.genesList[0];

        this.currentMove = 0;
    }

    stop() {
        this.hasReachedGoal = true;
    }
    bonk() {
        this.bonked = true;
    }

    show() {
        fill(200);

        push();

        translate(this.x, this.y);

        rotate(this.direction + Math.PI / 2);
        triangle(-5, 3, 5, 3, 0, -10);

        pop();
    }

    move(moveIndex, targetx, targety) {
        if (this.hasReachedGoal || this.bonked) {
            this.show();
            return true;
        }
        if (moveIndex >= this.dna.genesList.length)
            return false;
        this.direction = this.dna.genesList[moveIndex];


        // direction is an angle between 0 and 2π that has to be summed to the angle between cursor and target
        const v1 = createVector(this.x - targetx, this.y - targety);
        const v2 = createVector(1, 0);

        const base_angle = v1.angleBetween(v2) * -1 * Math.sign(v1.cross(v2).z || 1) + Math.PI;

        this.direction = base_angle + this.direction;

        const movex = Math.cos(this.direction) * speed;
        const movey = Math.sin(this.direction) * speed;


        this.x += movex;
        this.y += movey;

        this.show();

        return true;

    }

    combine(other) {
        let babyGenes = [];

        for (let i = 0; i < lifespan; i++) {
            if (i % 2 == 0) { babyGenes.push(this.dna.genesList[i]) }
            else { babyGenes.push(other.dna.genesList[i]) }
        }

        for (let i = 0; i < lifespan; i++) {
            if (random() < mutationRate)
                babyGenes[i] = int(random() * 8);
        }

        let babyDna = new Dna(n, babyGenes);
        return new Pointer(width / 2, height - 20, babyDna);
    }

}
