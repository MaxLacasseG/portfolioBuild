"use strict"

window.addEventListener('load', () => {
   // console.log('ok anim');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.querySelector('.fondAnim').appendChild(renderer.domElement);

    var geometry = new THREE.TorusKnotBufferGeometry(2, 0.5, 200,16);
    var material = new THREE.MeshLambertMaterial({
        color: 0XCCCCCC,
        emissive:0X333333,
        wireframe:true,
        opacity:0.7,
        transparent:true,
    });
    var noeud = new THREE.Mesh(geometry, material);

    var spotLight = new THREE.SpotLight( 0xEF7029, 2, 10, 0.8, 1);
    spotLight.position.set = (10, 5, 0);

    var pointLight = new THREE.PointLight( 0xff0037, 1);

    scene.add(noeud);
    scene.add(spotLight);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = -1;
    var lumVitesse = 0.01;
    function animate() {
        pointLight.position.y += lumVitesse;
        if(pointLight.position.y > 3 || pointLight.position.y < -3){
            lumVitesse = -lumVitesse;
        }
        noeud.rotation.z += 0.002;
        noeud.rotation.x -= 0.002;
        noeud.rotation.y += 0.002;
        spotLight.rotation.z -= 0.2;
        spotLight.rotation.x += 0.2;
        spotLight.rotation.y -= 0.2;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
})