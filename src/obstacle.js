class Obstacle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {

        fill(255, 10, 30);
        ellipse(this.x, this.y, target_radius * 2, target_radius * 2);
    }

}
