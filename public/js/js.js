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

//orbit cammera
controls = new THREE.OrbitControls(camera, renderer.domElement);

//adds colored axis
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//logo cube
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

//ground
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

//tableTop
var geometry =  new THREE.BoxGeometry(3, .5, 4);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(tableTexture);
var tableTop = new THREE.Mesh(geometry, material);
tableTop.position.x += 10;
tableTop.position.y += 3;
scene.add(tableTop); 

//tableLeg1
var geometry = new THREE.BoxGeometry(.5, 4, .5);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(tableTexture);
var tableLeg = new THREE.Mesh(geometry, material);
tableLeg.position.x += 9;
tableLeg.position.y += 1;
tableLeg.position.z += 1.5;
scene.add(tableLeg);

//tableLeg2
var geometry = new THREE.BoxGeometry(.5, 4, .5);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(tableTexture);
var tableLeg = new THREE.Mesh(geometry, material);
tableLeg.position.x += 9;
tableLeg.position.y += 1;
tableLeg.position.z += -1.5;
scene.add(tableLeg);

//tableLeg3
var geometry = new THREE.BoxGeometry(.5, 4, .5);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(tableTexture);
var tableLeg = new THREE.Mesh(geometry, material);
tableLeg.position.x += 11;
tableLeg.position.y += 1;
tableLeg.position.z += -1.5;
scene.add(tableLeg);

//tableLeg4
var geometry = new THREE.BoxGeometry(.5, 4, .5);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(tableTexture);
var tableLeg = new THREE.Mesh(geometry, material);
tableLeg.position.x += 11;
tableLeg.position.y += 1;
tableLeg.position.z += 1.5;
scene.add(tableLeg);

//laser
var geometry = new THREE.BoxGeometry(2, 1, 3);
var laserTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/metalbox.jpg"), side: THREE.DoubleSide }),
];
var material =  new THREE.MeshFaceMaterial(laserTexture);
var laser = new THREE.Mesh(geometry, material);
laser.position.y += 3.5;
laser.position.x += 10;
scene.add(laser);

var geometry = new THREE.CylinderGeometry(.30, .30, .5);
var material = new THREE.MeshBasicMaterial({color: 0x000000});
var scope = new THREE.Mesh(geometry, material);
scope.position.y += 3.6;
scope.position.x += 10;
scope.position.z += -1.5;
scope.rotation.x = Math.PI / 2;
scene.add(scope);

//laser beam
var material = new THREE.LineBasicMaterial({
	color: 0xFF0000
});

var points = [];
points.push( new THREE.Vector3( 10, 3.6, -10 ) );
points.push( new THREE.Vector3( 10, 3.6, 0 ) );

var geometry = new THREE.BufferGeometry().setFromPoints( points );

var line = new THREE.Line( geometry, material );
scene.add( line );

//lense
var geometry = new THREE.CylinderGeometry(1, 1, .5, 32);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
var lense = new THREE.Mesh(geometry, material);
lense.rotation.x = Math.PI / 2;
lense.position.y += 3.5;
lense.position.x += 10;
lense.position.z += -10;
scene.add(lense);

//lense holder
var geometry = new THREE.CylinderGeometry(.25, .25, 3, 32);
var material = new THREE.MeshBasicMaterial({color: 0x000000});
var lenseHolder = new THREE.Mesh(geometry, material);
lenseHolder.position.y += 1.25;
lenseHolder.position.x += 10;
lenseHolder.position.z += -10
scene.add(lenseHolder);

//camera position
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