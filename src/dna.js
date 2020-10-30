/*
The DNA of a pointer contains a sequence of moves.
Each move is represented as a unitary direction vector (versor).
The direction is a number in radians between 0 and 2π, where 0 is the direction of
the distance vector to the target, and the angle of the versor rotates counterclockwise.
*/
class Dna {
    constructor(len, genesList = []) {
        this.genesList = genesList;
        this.len = len;

        if (genesList.length == 0) {
            this.generateMoves();
        }
    }

    generateMoves() {
        for (let i = 0; i < this.len; i++) {
            // this.genesList.push(floor(random(0, 8)));

            this.genesList.push(random(0, 2 * Math.PI));
            // this.genesList.push(0);
        }
    }

}
