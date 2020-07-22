

// used for drag and drop
var plane;
var selectedObject;
var offset = new THREE.Vector3();
var objects = [];

var orbit
var container, stats;
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

container = document.createElement('div');
document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer({ antialias: true });
container.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 18, 18), new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	opacity: 0.25,
	transparent: true
}));
plane.visible = false;
scene.add(plane);

//orbit cammera
orbit = new THREE.OrbitControls(camera, renderer.domElement);

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
objects.push(cube);
scene.add(cube);

//ground
var texture = new THREE.TextureLoader().load("../images/grasslight-big.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);
var ground = new THREE.Mesh(
	new THREE.PlaneGeometry(500, 500, 10, 10),
	new THREE.MeshBasicMaterial({ map: texture, wireframe: false })
);
ground.rotation.x -= Math.PI / 2;
scene.add(ground);

//tableTop
var geometry = new THREE.BoxGeometry(3, .5, 4);
var tableTexture = [
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../images/woodgrain.jpg"), side: THREE.DoubleSide }),
];
var material = new THREE.MeshFaceMaterial(tableTexture);
var tableTop = new THREE.Mesh(geometry, material);
tableTop.position.x += 10;
tableTop.position.y += 3;

//table legs
var geometry = new THREE.BoxGeometry(.5, 4, .5);

var material = new THREE.MeshFaceMaterial(tableTexture);

var tableLeg1 = new THREE.Mesh(geometry, material);
tableLeg1.position.set(9, 1, 1.5);

var tableLeg2 = new THREE.Mesh(geometry, material);
tableLeg2.position.set(9, 1, -1.5);

var tableLeg3 = new THREE.Mesh(geometry, material);
tableLeg3.position.set(11, 1, -1.5);

var tableLeg4 = new THREE.Mesh(geometry, material);
tableLeg4.position.set(11, 1, 1.5);

var table = new THREE.Group();

table.add(tableTop);
table.add(tableLeg1);
table.add(tableLeg2);
table.add(tableLeg3);
table.add(tableLeg4);
objects.push(table);
console.log(objects);
scene.add(table);


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
var material = new THREE.MeshFaceMaterial(laserTexture);
var laser = new THREE.Mesh(geometry, material);
laser.position.y += 3.5;
laser.position.x += 10;
scene.add(laser);

var geometry = new THREE.CylinderGeometry(.30, .30, .5);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
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
points.push(new THREE.Vector3(10, 3.6, -10));
points.push(new THREE.Vector3(10, 3.6, 0));

var geometry = new THREE.BufferGeometry().setFromPoints(points);

var line = new THREE.Line(geometry, material);
scene.add(line);

//lense
var geometry = new THREE.CylinderGeometry(1, 1, .5, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
var lense = new THREE.Mesh(geometry, material);
lense.rotation.x = Math.PI / 2;
lense.position.y += 3.5;
lense.position.x += 10;
lense.position.z += -10;
scene.add(lense);

//lense holder
var geometry = new THREE.CylinderGeometry(.25, .25, 3, 32);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var lenseHolder = new THREE.Mesh(geometry, material);
lenseHolder.position.y += 1.25;
lenseHolder.position.x += 10;
lenseHolder.position.z += -10
scene.add(lenseHolder);

//GUI
var options = {
	rotationX: .01,
	rotationY: .005,
	reset: function () {
		this.rotationX = .01;
		this.rotationY = .005;
		cube.scale.x = 1;
		cube.scale.y = 1;
		cube.scale.z = 1;
	},
	stop: function () {
		this.rotationX = 0;
		this.rotationY = 0;
	},
};

//camera position
camera.position.z = 5;

//stats
stats = new Stats();
container.appendChild(stats.dom);

//GUI
var gui = new dat.GUI();

var box = gui.addFolder('Cube');
box.add(cube.scale, 'x', 0, 10).name('Width').listen();
box.add(cube.scale, 'y', 0, 10).name('Height').listen();
box.add(cube.scale, 'z', 0, 10).name('Length').listen();
box.open();

var velocity = gui.addFolder('Velocity');
velocity.add(options, 'rotationX', -0.5, 0.5).name('X').listen();
velocity.add(options, 'rotationY', -0.5, 0.5).name('Y').listen();
velocity.open();

gui.add(options, 'reset');

//render to the page
var render = function () {

	renderer.render(scene, camera);
};

var update = function () {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.005;
	orbit.update();
	stats.update();
	cube.rotation.x += options.rotationX;
	cube.rotation.y += options.rotationY;
};

var animate = function () {
	requestAnimationFrame(animate);
	update();
	render();
};
document.onmousemove = function (event) {
	// make sure we don't access anything else
	event.preventDefault();

	// get the mouse positions
	var mouse_x = (event.clientX / window.innerWidth) * 2 - 1;
	var mouse_y = -(event.clientY / window.innerHeight) * 2 + 1;

	// get the 3D position and create a raycaster
	var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
	vector.unproject(camera);
	var raycaster = new THREE.Raycaster(camera.position,
		vector.sub(camera.position).normalize());

	// first check if we've already selected an object by clicking
	if (selectedObject) {
		// check the position where the plane is intersected
		var intersects = raycaster.intersectObject(plane);
		// reposition the selectedobject based on the intersection with the plane
		selectedObject.position.copy(intersects[0].point.sub(offset));
	} else {
		// if we haven't selected an object, we check if we might need
		// to reposition our plane. We need to do this here, since
		// we need to have this position before the onmousedown
		// to calculate the offset.
		var intersects = raycaster.intersectObjects(objects);

		if (intersects.length > 0) {
			// now reposition the plane to the selected objects position
			plane.position.copy(intersects[0].object.position);
			// and align with the camera.
			plane.lookAt(camera.position);

		}
	}
};

document.onmousedown = function (event) {

	// get the mouse positions
	var mouse_x = (event.clientX / window.innerWidth) * 2 - 1;
	var mouse_y = -(event.clientY / window.innerHeight) * 2 + 1;

	// use the projector to check for intersections. First thing to do is unproject
	// the vector.
	var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
	// we do this by using the unproject function which converts the 2D mouse
	// position to a 3D vector.
	vector.unproject(camera);

	// now we cast a ray using this vector and see what is hit.
	var raycaster = new THREE.Raycaster(camera.position,
		vector.sub(camera.position).normalize());

	// intersects contains an array of objects that might have been hit
	var intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {
		orbit.enabled = false;

		// the first one is the object we'll be moving around
		selectedObject = intersects[0].object;

		// and calculate the offset
		var intersects = raycaster.intersectObject(plane);
		offset.copy(intersects[0].point).sub(plane.position);
	}
};

document.onmouseup = function (event) {
	orbit.enabled = true;
	selectedObject = null;
}
animate();


