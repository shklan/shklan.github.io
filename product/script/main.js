import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.module.js';
`use strict`;

window.onload = function () {

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innterWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementsByClassName("Canvas")[0].appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    console.log("add cube");

    camera.position.z = 5;

    console.log("rendering...");
    renderer.render(scene, camera);
};

function render(renderer, scene, camera) {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};


