`use strict`;

window.onload = function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innterWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    let light = new THREE.PointLight(0x0fffff);
    
    light.position.set(2, 2, 2);
    scene.add(light);

    camera.position.z = 3;

    let animate = function () {
//        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
};




