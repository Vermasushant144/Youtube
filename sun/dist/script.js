console.clear();

function perlin() {
  return `

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_xpos;
  uniform float u_ypos;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }
`;
}

const sampleScale = 1.5;

let width = window.innerWidth * sampleScale;
let height = window.innerHeight * sampleScale;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

let smoothScrollY = window.scrollY;
//\const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

camera.position.z = 10;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const startTime = new Date().getTime();

const uniforms = {
  time: new THREE.Uniform(1),
  width: new THREE.Uniform(width),
  height: new THREE.Uniform(height),
  scrollY: new THREE.Uniform(window.scrollTop) };



const bgPlane = new THREE.PlaneGeometry(camera.position.z * 2, camera.position.z * 2);
const bgMaterial = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  fragmentShader: `
uniform float width;
uniform float height;
uniform float time;
uniform float scrollY;

float wavePos(float waveIndex, vec2 p, float numWaves){
	float sixth = 1./numWaves;
	float reverse = 1.;
	if(mod(waveIndex, 2.) == 0.) reverse = -1.;
	return sixth * waveIndex + sin(time + waveIndex * 9.14516 + p.x * 8. * reverse) * .02;
}

void main() {
	float minWindowDimension = min(width, height);
	vec2 p = gl_FragCoord.xy / vec2(width, height);
	vec2 squareP = gl_FragCoord.xy / vec2(minWindowDimension, minWindowDimension);
	vec2 truePScale = vec2(width, height) / minWindowDimension;
	p.y = 1. - p.y;
	
	vec3 color = vec3(1.,1.,1.);
	float alpha = 1.;
	float numWaves = 6.;
	if(height > width) numWaves = 6.5;
	
	if((height - gl_FragCoord.y) + scrollY < height * 1.){
		if(p.y < wavePos(1., p, numWaves)) color = vec3(254./255., 240./255., 215./255.);
		else if(p.y < wavePos(2., p, numWaves)) color = vec3(250./255., 217./255., 178./255.);
		else if(p.y < wavePos(3., p, numWaves)) color = vec3(247./255., 197./255., 125./255.);
		else if(p.y < wavePos(4., p, numWaves)) color = vec3(239./255., 165./255., 87./255.);
		else if(p.y < wavePos(5., p, numWaves)) color = vec3(242./255., 130./255., 24./255.);
		else if(p.y > wavePos(5., p, numWaves)) color = vec3(239./255., 94./255., 43./255.);

		if(p.y < wavePos(4., p, numWaves)){
			if(distance(squareP, truePScale / 2.) < .3) color = vec3(239./255., 67./255., 50./255.);
		}
	} else {
		alpha = 0.;
	}

	gl_FragColor = vec4(color, alpha);
}
	  ` });

const bgMesh = new THREE.Mesh(bgPlane, bgMaterial);

scene.add(bgMesh);

const bushMaterial = new THREE.ShaderMaterial({
  uniforms,
  blending: THREE.NormalBlending,
  depthTest: false,
  transparent: true,
  vertexShader: `
      varying vec2 vUv;
      void main () {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
      }
		`,
  fragmentShader: `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float width;
uniform float height;
uniform float time;
uniform float rotation;
uniform float numLeafs;
uniform float leafSizePercent;
uniform vec3 color;
uniform vec3 centerColor;

varying vec2 vUv;

${perlin()}

void main() {
	vec2 p = vUv;
	p.y = 1. - p.y;
	vec2 center = vec2(.5, .5);

	float leafExtrusion = leafSizePercent;
	float leafRLength = (PI * 2.) / numLeafs;

	vec4 result = vec4(1.,1.,1.,0.);

	float angle = atan(center.x - p.x, center.y - p.y ) + rotation;
	float leaf = floor(angle / leafRLength);
	float leafR = leaf * leafRLength;

	float leafStartAngle = leafR - leafRLength * .5;
	float noiseScale = ((cos((angle - leafStartAngle) / leafRLength * PI * 2.) + 1.) / 2.) * leafExtrusion;

	float leafYNoise = ((snoise(vec3(cos(leafR), sin(leafR), time * .25)) + 1.) / 2.);

	float leafEnd = .25 + (leafYNoise * .5 + .5) * noiseScale;
	float distanceFromCenter = distance(p, center);

	vec3 mixedColor = mix(centerColor, color, distanceFromCenter * 4.);
	if(distanceFromCenter < leafEnd) result = vec4(mixedColor / 255., 1.);

	gl_FragColor = result;
}
	  ` });

const bush = props => {
  let { x, y, z, numLeafs, rotation, leafSizePercent, size, color, centerColor } = {
    ...{
      x: 0, y: 0, z: 5,
      numLeafs: 6,
      rotation: 0,
      leafSizePercent: .25,
      size: 1.5,
      color: { x: 37, y: 40, z: 91 } },

    ...props };


  if (!centerColor) centerColor = color;
  const material = bushMaterial.clone();

  material.uniforms.time = uniforms.time;
  material.uniforms.width = uniforms.width;
  material.uniforms.height = uniforms.height;
  material.uniforms.numLeafs = new THREE.Uniform(numLeafs);
  material.uniforms.rotation = new THREE.Uniform(rotation + Math.PI / numLeafs);
  material.uniforms.leafSizePercent = new THREE.Uniform(leafSizePercent);
  material.uniforms.color = new THREE.Uniform(new THREE.Vector3(color.x, color.y, color.z));
  material.uniforms.centerColor = new THREE.Uniform(new THREE.Vector3(centerColor.x, centerColor.y, centerColor.z));

  const plane = new THREE.PlaneGeometry(size, size);
  const mesh = new THREE.Mesh(plane, material);
  mesh.position.x = x;
  mesh.position.y = -y;
  mesh.position.z = z;

  scene.add(mesh);
};

const darkBlueBush = (darkness = 0) => {
  let baseDarkness = 1 - darkness;
  let darkerDarkness = .9 - darkness;
  return {
    color: { x: 37 * baseDarkness, y: 40 * baseDarkness, z: 91 * baseDarkness },
    centerColor: { x: 31 * darkerDarkness, y: 33 * darkerDarkness, z: 76 * darkerDarkness } };

};

const lightBlueBush = {
  color: { x: 94, y: 48, z: 134 },
  centerColor: { x: 65, y: 40, z: 126 } };


const lightBlueAltBush = {
  color: { x: 37 * 1.1, y: 40 * 1.1, z: 91 * 1.1 },
  centerColor: { x: 31, y: 33, z: 76 } };


const darkerBlueBush = {
  color: { x: 37 * .75, y: 40 * .75, z: 91 * .75 },
  centerColor: { x: 37 * .7, y: 40 * .7, z: 91 * .7 } };


const bushes = [


{ ...lightBlueAltBush, size: 1.8, x: 0, y: 1.7, z: 6.6, numLeafs: 5 }, // font and center

{ ...darkBlueBush(.05), size: 3, x: 1.4, y: 2.2, z: 6, numLeafs: 9, mirrorX: true }, // foreground two side

{ ...lightBlueBush, size: 4, x: 2.2, y: 2.4, z: 4, numLeafs: 11, mirrorX: true }, // foreground two sde behind

{ ...darkerBlueBush, size: 9, x: 7.3, y: 1, z: 1, numLeafs: 11, mirrorX: true }, // edge 

{ ...darkBlueBush(), size: 7, x: 6.2, y: 1.7, z: 2, numLeafs: 9, mirrorX: true }, // foreground two side


{ ...darkBlueBush(-.3), size: 4, x: 5, y: 1.85, z: 3, numLeafs: 5, mirrorX: true, rotation: Math.PI * .3 }, // foreground two side

{ ...darkerBlueBush, size: 2.5, x: 1, y: 2.3, z: 6.4, numLeafs: 9, mirrorX: false },
{ ...lightBlueAltBush, size: 3.5, x: -.8, y: 3.2, z: 5, numLeafs: 9, mirrorX: false },

{ ...darkBlueBush(.4), size: 2, x: -2.4, y: 2.2, z: 6.3, numLeafs: 9, mirrorX: false },

{ ...lightBlueAltBush, size: 2, x: -1, y: 3, z: 7.5, numLeafs: 9, mirrorX: false },
{ ...darkBlueBush(.1), size: 1.5, x: .8, y: 2.5, z: 8, numLeafs: 9, mirrorX: false },
{ ...darkBlueBush(.2), size: 2, x: -.7, y: 2.8, z: 6.5, numLeafs: 9, mirrorX: false },

{ ...darkBlueBush(.4), size: 2.5, x: -.2, y: 2.8, z: 6.4, numLeafs: 9, mirrorX: false },

{ ...darkBlueBush(.2), size: 4, x: 4, y: 3.1, z: 4.4, numLeafs: 9, mirrorX: true },
{ ...darkBlueBush(.4), size: 4, x: 1.5, y: 3.6, z: 4.3, numLeafs: 9, mirrorX: true },
{ ...darkBlueBush(.1), size: 3, x: 2.5, y: 3.9, z: 4.3, numLeafs: 7, mirrorX: true },
{ ...darkBlueBush(.2), size: 3, x: 1.2, y: 3.5, z: 4.3, numLeafs: 7, mirrorX: false }];




for (let i = 0; i < bushes.length; i++) {
  let b = bushes[i];
  b.rotation = b.rotation || i * 13.14156;
  let doubledBush = { ...b, rotation: b.rotation + Math.PI };

  bush(b);
  if (bushes[i].mirrorX) bush({ ...b, x: b.x * -1, rotation: b.rotation * -1 });

  if (b.double !== false) {
    bush(doubledBush);
    if (bushes[i].mirrorX) bush({ ...doubledBush, x: doubledBush.x * -1, rotation: doubledBush.rotation * -1 });
  }
}

window.addEventListener('resize', resize);

function resize() {
  width = window.innerWidth * sampleScale;
  height = window.innerHeight * sampleScale;
  renderer.setSize(width, height);
  uniforms.width.value = width;
  uniforms.height.value = height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

resize();

function update() {
  renderer.render(scene, camera);
  //smoothScrollY += (window.scrollY - smoothScrollY) * .05
  smoothScrollY = window.scrollY;

  camera.position.y = -smoothScrollY * .006;

  bgMesh.position.y = camera.position.y;

  let now = new Date().getTime();
  let currentTime = now - startTime;
  uniforms.time.value = currentTime / 1000;
  uniforms.scrollY.value = smoothScrollY * sampleScale;

  //setTimeout(update, 10);
  window.requestAnimationFrame(update);
}

update();