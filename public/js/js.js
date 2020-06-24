var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var geometry = new THREE.BoxGeometry(2, 2, 2);
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/mountain.png"), side: THREE.DoubleSide }),
];
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, material);
cube.position.y += 2;
scene.add(cube);

var texture = new THREE.TextureLoader().load("../images/grasslight-big.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10,10);
var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(500,500,10,10),
    new THREE.MeshBasicMaterial({map: texture, wireframe: false})
);
ground.rotation.x -= Math.PI/2;
scene.add(ground);


camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0,player.height,0));

var render = function () {

    renderer.render(scene, camera);
};
var update = function () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;

    // Keyboard movement inputs
	if(keyboard[87]){ // W key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x -= Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	// Keyboard turn inputs
	if(keyboard[81]){ // Q key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[69]){ // E key
		camera.rotation.y += player.turnSpeed;
	}

};

var animate = function () {
    requestAnimationFrame(animate);
    update();
    render();
};
function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

animate();