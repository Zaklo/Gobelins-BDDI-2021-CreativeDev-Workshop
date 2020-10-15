import Mouse from "./utils/mouse"
import Easing from "./utils/easing"

import * as THREE from 'three';

const canvas = document.querySelector('.main-canvas')

let vertShaderCode = require("../shaders/screen.vert")


let time = 0

// Setup Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    material.uniforms.rez.value = [window.innerWidth, window.innerHeight]
})


let manager = new THREE.LoadingManager();
let textureLoader = new THREE.TextureLoader(manager)


// let texture = textureLoader.load('/assets/photo.jpg')
let geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)


let videosElements = document.querySelectorAll('video')
let textures = []

for (let i = 0; i < videosElements.length; i++) {
    let texture = new THREE.VideoTexture(videosElements[i]);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    textures.push(texture)
}

let buttons = document.querySelectorAll('.buttons')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        progress = -.5
    })
}

buttons[0].addEventListener('click', () => {
    material.uniforms.texture.value = textures[1];
    material.uniforms.texture1.value = textures[0];
})

videosElements[0].addEventListener("canplay", () => {
    videosElements[0].play()
    material.uniforms.videoRez.value = [videosElements[0].offsetWidth, videosElements[0].offsetHeight]
})
videosElements[1].addEventListener("canplay", () => {
    videosElements[1].play()
    //material.uniforms.videoRez.value = [videosElements[0].offsetWidth, videosElements[0].offsetHeight]
})

let progress = 1.


let material = new THREE.RawShaderMaterial({
    uniforms: {
        time: {value: 1.0},
        progress: {value: progress},
        rez: {type: "v2", value: [canvas.width, canvas.height]},
        mouse: {type: "v2", value: Mouse.cursor},
        videoRez: {type: "v2", value: [videosElements[0].width, videosElements[0].height]},
        texture: {type: "t", value: textures[0]},
        texture1: {type: "t", value: textures[1]},
    },
    vertexShader: require("../shaders/screen.vert"),
    fragmentShader: require("../shaders/screen.frag"),
})

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

camera.position.z = 5

// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    time += 0.01

    progress += 0.01
    progress = Math.min(progress, 1)

    material.uniforms.time.value = time
    material.uniforms.progress.value = progress
    material.uniforms.mouse.value = Mouse.cursor

    // Render WebGL Scene
    renderer.render(scene, camera);
}
requestAnimationFrame(update)

