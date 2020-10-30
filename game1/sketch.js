let target;
let pointer;
let speed = 3;
let counter;
let n = 400;
let lifespan = 20;
let mutationRate = 0.08;
const target_radius = 25;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    target = new Target(width / 2, 50);
    // pointer = new Pointer(random(10 , width-10) , random(height-40 , height-3));

    //generate new Population
    population = new Population(n, target);

}

function draw() {

    //disegna sfondo e linea di spawn
    background(51, 51, 60);
    stroke(255);
    strokeWeight(5);
    line(10, height - 50, width - 10, height - 50);

    //disegna il target
    noStroke();
    target.show();



    if (population.alive)
        population.move();

    else {
        population.calculateFit();
        population = population.reproduce();
        population.alive = true;
    }

}

function mouseClicked() {
    target.x = mouseX;
    target.y = mouseY;
}
