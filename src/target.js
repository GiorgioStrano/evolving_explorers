class Target {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {

        fill(10, 255, 30);
        ellipse(this.x, this.y, target_radius * 2, target_radius * 2);
    }

}
