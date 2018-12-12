// define document width and height
var width = 450, height = 300

// create SVG document and set its size
var draw = SVG('pong').size('100%', '100%')
draw.viewbox(0, 0, 450, 300)

var balls = new Array();

balls[0] = draw.circle(10, 10).move(0, 150).attr({ fill: '#f06' });

for (i = 1; i <= 30; i++) {
    balls[i] = balls[0].clone().dmove(10 * i, 0)
}

var lastTime;
var animFrame;
var elapsedTime = 0;
// update is called on every animation step
function update(dt) {
    elapsedTime += dt;
    let wave=document.querySelector('#sd_wave').value;
    for (i = 0; i <= 30; i++) {
        balls[i].cy(150 + 50 * Math.sin(2 * elapsedTime-wave*0.1*i));
        //console.log(elapsedTime);
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