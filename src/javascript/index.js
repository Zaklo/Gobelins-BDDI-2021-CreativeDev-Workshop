import * as THREE from 'three'
import Mouse from './utils/mouse'
import Easing from './utils/easing'

const canvas = document.querySelector('.main-canvas')

let time = 0

//setup scene
const scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

let manager = new THREE.LoadingManager();
let textureLoader = new THREE.TextureLoader(manager);

let texture = textureLoader.load('../assets/photo.png')
let geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)

let material = new THREE.RawShaderMaterial({
    uniforms: {
        time: {value: 1.0},
        rez: {type: "v2", value: [canvas.width, canvas.height]},
        mouse: {type: "v2", value: Mouse.cursor},
        texture: {type: "t", value: texture},
    },
    vertexShader: require("../shaders/screen.vert"),
    fragmentShader: require("../shaders/screen.frag"),
});
let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

camera.position.z = 5

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const update = () => {
    requestAnimationFrame(update)

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.05

    time += 0.01
    material.uniforms.time.value = time;
    material.uniforms.mouse.value = Mouse.cursor;
    renderer.render(scene, camera);
}

requestAnimationFrame(update)

