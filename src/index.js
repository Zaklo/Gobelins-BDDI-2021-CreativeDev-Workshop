require('normalize.css/normalize.css');
require('./styles/index.scss');

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"

const canvas = document.querySelector('.main-canvas')
const ctx = canvas.getContext("2d")


//important
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.maxHeight = window.innerHeight;
canvas.style.maxWidth = window.innerWidth;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let cw2 = canvasWidth / 2;
let cH2 = canvasHeight / 2;

let img = new Image();
let time = 1;
// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)
    console.log(Mouse.cursor, ctx)

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvasWidth
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvasHeight
    let size = 200;

    time += .01;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.strokeStyle = '#ffffff'
    ctx.save();
    ctx.translate(mouseX,mouseY)
    ctx.rotate(time)
    ctx.scale(Math.sin(time),Math.sin(time))
    ctx.beginPath()
    ctx.moveTo(-size / 2 , size / 2)
    ctx.lineTo(0, -size / 2)
    ctx.lineTo(size/2 , size/2)
    ctx.lineTo(-size/2 ,size / 2 )
    ctx.stroke()
    ctx.closePath()
    ctx.restore();
}

img.src = 'https://www.kuzeo.com/uploads/articlerelated/OlympusMythFDJ.jpg';
img.onload = () => {
    requestAnimationFrame(update)
    console.log("Image loaded");
}
