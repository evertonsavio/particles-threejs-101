/*==================================================================================
https://github.com/Rhavyx/Three.js_Particles
==================================================================================*/

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/*==================================================================================
==================================================================================*/
const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webglcanvas')
const scene = new THREE.Scene()

/*==================================================================================
TEXTURES - FREE Particles texture https://www.kenney.nl/assets/particle-pack
==================================================================================*/
const textureLoader = new THREE.TextureLoader()


/*==================================================================================
PARTICLES
==================================================================================*/
const particlesGeometry =  new THREE.BufferGeometry();
const particlePositions = new Float32Array(1000 * 3)
const numberOfStars = 5000;

for ( let i = 0; i < numberOfStars; i ++ ) {
	particlePositions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute( 
    'position', 
    new THREE.Float32BufferAttribute( particlePositions, 3 ) 
);

const particlesMaterial = new THREE.PointsMaterial( {
    size: 0.01, 
    sizeAttenuation: true,
    color: 0x888888 
} );

const particlesPoints = new THREE.Points( particlesGeometry, particlesMaterial );

scene.add(particlesPoints);

/*==================================================================================
CANVAS SIZE & RESIZE EVENT
==================================================================================*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/*==================================================================================
CAMERA
==================================================================================*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/*==================================================================================
ORBIT CONTROL
==================================================================================*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*==================================================================================
RENDERER
==================================================================================*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*==================================================================================
FRAME UPDATE
==================================================================================*/
const clock = new THREE.Clock()

const frameUpdate = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(frameUpdate)
}

frameUpdate()

/*==================================================================================
==================================================================================*/