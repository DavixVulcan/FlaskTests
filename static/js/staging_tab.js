let canvasy = document.getElementById("main-canvas-staging")

const camera = new THREE.PerspectiveCamera( 70, canvasy.clientWidth / canvasy.clientHeight, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// const renderer = new THREE.WebGLRenderer( { antialias: true } );
const renderer = new THREE.WebGLRenderer( { canvas:  canvasy} );
renderer.setSize( canvasy.style.width, canvasy.style.height);
renderer.setAnimationLoop( animation );
// document.body.appendChild( renderer.domElement );

// document.body.appendChild( XRButton.createButton( renderer ) );
// renderer.xr.enabled = true;
// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	if (resizeRenderer(renderer)) {
		camera.aspect = canvasy.clientWidth / canvasy.clientHeight;
		camera.updateProjectionMatrix();
	}

	renderer.render( scene, camera );

}

console.log("Loaded")

function resizeRenderer(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if(needResize){
		renderer.setSize(width, height, false);
		console.log("Resizing");
	}
	return needResize

}