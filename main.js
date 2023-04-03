import './style.css'

import * as THREE from 'three'; // import the three.js lib //

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // to make the site more interactive //

// from three.js to work we need 3 things 

//-------- SCENE -----------//
const scene = new THREE.Scene();
// to see inside the scene we need a camera //

//--------- CAMERA -----------// 
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000); 
//like the eye ball (fov, aspect ratio, view-frustom(top), view-frustom(right)) are the 4 entries // 

//---------- RENDERER ---------// 
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
  });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// adding object: 3 things to add objects //

//geometry
const geometry = new THREE.TorusGeometry(20,6,32,200)
const geometry_1 = new THREE.TetrahedronGeometry(20,6,32,150)

//material
// const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true });
// basic-material is like sun
// standard-material is like moon, so it needs a light source to light up 
const material = new THREE.MeshStandardMaterial({color: 'blue', wireframe: true});

//mesh (geometry + material )
const torus = new THREE.Mesh(geometry, material);

scene.add(torus) // to add torus to the scene 
// renderer.render(scene, camera); // to rerender the scene after addinf the object  
const pointLight = new THREE.PointLight(0xffffff) // creating a light source 
pointLight.position.set(5,5,5) // positioning the light source 

// const ambientLight = new THREE.AmbientLight(0xffffff); // to light the entire screen 
// scene.add(pointLight, ambientLight); // to add the object to the scene 

scene.add(pointLight) // to add the light-object to scene  

// const lightHelper = new THREE.PointLightHelper(pointLight) // displays the position of light source
// scene.add(lightHelper) 

// const gridHelper = new THREE.GridHelper(200, 50); // to see the grid level (line)
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement); // listen to the mouse click acc to the user 

// const spaceTexture = new THREE.TextureLoader().load('nightsky.jpg'); // to add bg to the scene 
// scene.background = spaceTexture;


// to avoid calling render method again and again manually we create a function
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.0009;
  torus.rotation.y += 0.0009; // to actually animate the object everytime the func is called 
  torus.rotation.z += 0.0009;

  controls.update(); // update the mouse ineraction constantly

  renderer.render(scene, camera); // game loop 
}

function addStar(){ // to place stars(objects) randomly in the scene 
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));// to randomly generate coordinates for these star objects
  
  star.position.set(x,y,z); // to set the coordinates for stars
  scene.add(star) // adding star to the scene 

}

Array(250).fill().forEach(addStar) // 200 randomly positioned stars accross the scene 

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // to get the location of where the user is currently scrolled to 

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera // fires the function everytime the user scrolls 

animate()
