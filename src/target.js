class Target {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {

        fill(255, 10, 30);
        // translate(this.x  , this.y );
        // rotate(QUARTER_PI);
        ellipse(this.x, this.y, target_radius * 2, target_radius * 2);
    }

}
