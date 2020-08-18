import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.module.js';
`use strict`;

window.onload = function () {
    // const base = document.createElement("canvas");
    // base.width = window.innerWidth;
    // base.height = window.innerHeight;

    // document.getElementsByClassName("Canvas")[0].appendChild(base);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innterWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSisze(window.innerWidth, window.innerHeight);
    document.getElementsByClassName("Canvas")[0].appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    console.log("add cube");

    let light = new THREE.PointLight(0x0fffff);
    
    light.position.set(2, 2, 2);
    scene.add(light);
    console.log("add light");

    camera.position.z = 3;

    console.log("rendering...");
    render(renderer, scene, camera);
};

function render(renderer, scene, camera) {
    renderer.render(scene, camera);
};


