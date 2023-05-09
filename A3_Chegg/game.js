// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 544;
document.getElementById("theCanvas").appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "bg.jpg";

// Bug image
var ghostReady = false;
var ghostImage = new Image();
ghostImage.onload = function () {
    ghostReady = true;
};
ghostImage.src = "ghost.png";

// initialize score to 0
var score = 0;
// initialize hop interval to 2 seconds
var hopInterval = 2000;
//set hopping 
var hop = setInterval(function () {
    resetLocation();
}, hopInterval);

var ghost = {
    speed: 256 // movement in pixels per second
};

// Handle mouse click events to check if the user clicked
// on the bug
canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    // Get the location of the mouse click
    var x = e.clientX;
    var y = e.clientY;

    // check if the player clicked on the bug
    if (x > ghost.x && x < ghost.x + 61 && y > ghost.y && y < ghost.y + 169) {
        // increment score by 10
        score += 10;
        resetLocation();
        // reduce hop interval, but should not be less than 0
        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function () {
                resetLocation();
            }, hopInterval);

        }
    }
}

// Reset the bug location when the player restarts or catches a bug
var resetLocation = function () {
    // Throw the bug somewhere on the screen randomly
    ghost.x = 32 + (Math.random() * (canvas.width - 64));
    ghost.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset hopping interval
var resetSpeed = function () {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function () {
        resetLocation();
    }, hopInterval);
};
var resetScore = function () {
    score = 0;
    // reset the speed
    resetSpeed();
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (ghostReady) {
        ctx.drawImage(ghostImage, ghost.x, ghost.y);
    }

    // Score
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score : " + score;
};

// The main game loop
var main = function () {
    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Play this game!
main();