

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"

const canvas = document.querySelector('.main-canvas')
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth * window.devicePixelRatio
canvas.height = window.innerHeight * window.devicePixelRatio
canvas.style.maxWidth = window.innerWidth
canvas.style.maxHeight = window.innerHeight

let canvasWidth = (canvas.width)
let canvasHeight = (canvas.height)
let cW2 = (canvas.width / 2)
let cH2 = (canvas.height / 2)

let maskLoaded = false

let time = 0


// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    time += .01

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let size = 200

    ctx.save()

    ctx.translate(mouseX, mouseY)
    ctx.rotate(time)
    ctx.scale(Math.sin(time), Math.sin(time))

    ctx.beginPath()
    ctx.strokeStyle = '#ffffff'
    ctx.moveTo(-size / 2, size / 2)
    ctx.lineTo(0, -size / 2)
    ctx.lineTo(size / 2, size / 2)
    ctx.lineTo(-size / 2, size / 2)
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

    // 


}
requestAnimationFrame(update)



// let img = new Image()
// img.src = "https://miro.medium.com/max/1068/0*WwAJP2U-pFbydOfi.jpeg"
// img.onload = ()=>{
//     console.log("l'image est chargée")
// }

// let mask = new Image()
// mask.src = "https://images-ext-2.discordapp.net/external/iYBUoq3zm0M5LJDbHAX8xSMU0ZZGHQjaf60XYRcPD9U/http/designinteractif.gobelins.fr/wp-content/uploads/2018/11/cropped-Logo-Gobelins-1.png"
// mask.onload = () => {
//     maskLoaded = true
// }

// Blabla

// let canvasWidth = (canvas.width)
// let canvasHeight = (canvas.height)
// let cW2 = (canvas.width / 2)
// let cH2 = (canvas.height / 2)

// ctx.beginPath()
// ctx.strokeStyle = '#00aa00'
// ctx.moveTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50)
// ctx.lineTo(canvasWidth / 2, canvasHeight / 2 - 50)
// ctx.lineTo(canvasWidth / 2 + 50, canvasHeight / 2 + 50)
// ctx.lineTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50)
// ctx.stroke()
// ctx.closePath()


