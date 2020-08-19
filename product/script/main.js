import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.module.js';
// `use strict`;

window.onload = function () {

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innterWidth / window.innerHeight, 1, 10);
    let renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementsByClassName("Canvas")[0].appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let cube = new THREE.Mesh(geometry, material);
    let light = new THREE.PointLight(0x00ffff);

    // setting
    camera.position.z = 5;
    camera.lookAt(scene.position);
    light.position.set(2, 2, 2);

    scene.add(light);
    scene.add(cube);

    console.log("rendering...");
    let scenerenderer = new SceneRenderer(renderer, scene, camera);
    scenerenderer.render();
};


class SceneRenderer {
    constructor(renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.stamp = requestAnimationFrame(this.render.bind(this));
        console.log(this.renderer, this.scene, this.camera);
    }
}

class KeydownListener extends EventTarget {
    constructor() {
        this.events = [];
    }

    addAction(key, action) {
        this.events.push({key: key, action: action});
    }

    listen() {
        this.addEventListener("keydown", this.handle.bind(this));
    }

    close() {
        this.removeEventListener("keydown", this.handle.bind(this));
    }

    handle(event) {
        const code = event.key;
        this.events.forEach(e => {
            if (e["key"] == code) {
                e["action"]();
            }            
        });
    }
}