import SVG = require("./node_modules/svg.js/svg.js");

// define document width and height
var width = 450, height = 300

// create SVG document and set its size
var draw = SVG('pong').size('100%', '100%')
draw.viewbox(0, 0, 450, 300)

var balls = new Array();
var lines = new Array(30);

balls[0] = draw.circle(10, 10).move(0, 150).attr({ fill: '#f06' });

for (i:number = 1; i <= 30; i++) {
    balls[i] = balls[0].clone().dmove(10 * i, 0)    
}

for (i = 0; i <= 29; i++) {
    lines[i] = draw.line(balls[i].cx(), balls[i].cy(), balls[i+1].cx(), balls[i+1].cy()).stroke({ width: 1 })
}

var lastTime:number;
var animFrame;
var elapsedTime = 0;
// update is called on every animation step
function update(dt:number):void {
    elapsedTime += dt;
    let wave=Element document.querySelector('#sd_wave').value;
    for (i = 0; i <= 30; i++) {
        if(i<30)
                lines[i].plot(balls[i].cx(), balls[i].cy(), balls[i+1].cx(), balls[i+1].cy());
        balls[i].cy(150 + 50 * Math.sin(2 * elapsedTime-wave*0.1*i));
        
    }
    
}

function callback(ms) {
    // we get passed a timestamp in milliseconds
    // we use it to determine how much time has passed since the last call
    if (lastTime) {
        update((ms - lastTime) / 1000) // call update and pass delta time in seconds
    }

    lastTime = ms;
    //elapsedTime += ms;
    animFrame = requestAnimationFrame(callback)
}


callback()


SVG.on(document, 'keydown', function (e) {
    paddleDirection = e.keyCode == 40 ? 1 : e.keyCode == 38 ? -1 : 0
    e.preventDefault()
})

SVG.on(document, 'keyup', function (e) {
    paddleDirection = 0
    e.preventDefault()
})

draw.on('click', function () {
    if (vx === 0 && vy === 0) {
        vx = Math.random() * 500 - 150
        vy = Math.random() * 500 - 150
    }
})

function reset() {
    // visualize boom
    boom()

    // reset speed values
    vx = 0
    vy = 0
}