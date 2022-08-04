const canvas = document.getElementById("canvas");
const str = document.querySelector("#start");
const ctx = canvas.getContext('2d');
let canvH = canvas.height;
let canvW = canvas.width;
let r = 10;
let w = 4;
let dispx = 15;
let dispy = 10;
let len = 1;
let left = false;            //initially ballis on 0th index
let right = false;
let t = 0;
let interval;
let f = false;
let fallT = 0;
let nxt = 0;
let score = 0;
let count = 0;
let arr = [{ y: 270, x1: 30, x2: 70 }];
let yp = arr[0].y;
let g = 0.4;
let xp = 0;
function drawscore() {
    ctx.beginPath()
    ctx.fillText(`score:${score}`, 10, 10,40);
    ctx.closePath();
}
function ball(yp) {
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.setLineDash([]);
    ctx.arc(xp,yp-r,r,0,(2*Math.PI),false);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawPlatform(y,b,c){
    if (y < canvH && y > 0) {
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(b,y);
        ctx.stroke();
        ctx.closePath();     
        ctx.beginPath();
        ctx.moveTo(c, y);
        ctx.lineTo(canvW,y);
        ctx.stroke();
        ctx.closePath();
    }
}
ball();
function manipulate() {
    if (yp - 2*r <= 0) {
        alert("Game over");
        score = 0;
        count = 0;
        clearInterval(interval);
    }
    if (t < len){
        if (t + 1 < len){
            nxt = arr[t + 1].y;
        }
        else {
            nxt = canvH;
        }
        if ((xp >= arr[t].x1 && xp < arr[t].x2) || f) {
            if (yp < nxt) {
                f = true;
                yp += 1 + g*fallT;
                fallT += 1;
            }
            else {
                fallT = 0;
                f = false;
                t += 1;
            }
        }
        else {
            yp = arr[t].y;
        }
    }
    else {
        alert("You won!!");
        score = 0;
        count = 0;
        fallT = 0;
        clearInterval(interval);
    }
}

interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (count == 20) {
        score++;
        count = 0;
    }
    if (arr[0].y < 0) {
        arr.shift();
        len -= 1;
        t -= 1;
    }
    if (arr[len - 1].y < canvH - 50) {
        let str = Math.floor(Math.random() * 260);
        let level = arr[len - 1].y;
        arr.push({ y: level + 50, x1: str, x2: str + 40 });
        len += 1;
    }
    if (left == true) {
        if (xp>r){
            xp -= 6;
        }
    }
    else if (right == true) {
        if (xp + r < canvW){
            xp += 6;
        }
    }
    manipulate();
    ball(yp);
    drawscore();
    for (let levs of arr) {
        drawPlatform(levs.y, levs.x1, levs.x2);
        levs.y -= 0.9;
    }
    count++;
}, 40)

window.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowLeft') {
        left = true;
    }
    else if (e.code == 'ArrowRight') {
        right = true;
    }
});         
window.addEventListener('keyup', function (e) {
    left = false;
    right = false;
});