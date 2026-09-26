import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { GLTFLoader } from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


/* =========================================================
   CRIME WORLD
   Maria - Third Person Player
========================================================= */

const game = document.getElementById("game");


/* =========================================================
   SCENE
========================================================= */

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x9db4c9);

scene.fog =
  new THREE.Fog(
    0x9db4c9,
    45,
    220
  );


/* =========================================================
   CAMERA
========================================================= */

const camera =
  new THREE.PerspectiveCamera(
    62,
    window.innerWidth /
    window.innerHeight,
    0.1,
    500
  );

camera.position.set(
  0,
  3,
  6
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference:
      "high-performance"
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    1.7
  )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.05;

game.appendChild(
  renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const skyLight =
  new THREE.HemisphereLight(
    0xcfe5ff,
    0x35404a,
    2.2
  );

scene.add(skyLight);


const sun =
  new THREE.DirectionalLight(
    0xfff0d2,
    3.2
  );

sun.position.set(
  -70,
  100,
  50
);

sun.castShadow = true;

sun.shadow.mapSize.width =
  2048;

sun.shadow.mapSize.height =
  2048;

sun.shadow.camera.left =
  -100;

sun.shadow.camera.right =
  100;

sun.shadow.camera.top =
  100;

sun.shadow.camera.bottom =
  -100;

sun.shadow.camera.near =
  1;

sun.shadow.camera.far =
  300;

sun.shadow.bias =
  -0.0005;

scene.add(sun);


/* =========================================================
   WORLD
========================================================= */

const world =
  new THREE.Group();

scene.add(world);


/* =========================================================
   MATERIALS
========================================================= */

const roadMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x24272b,
    roughness: 0.92,
    metalness: 0.02
  });


const sidewalkMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x777a7d,
    roughness: 0.9
  });


const grassMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x405342,
    roughness: 1
  });


const buildingMaterials = [

  new THREE.MeshStandardMaterial({
    color: 0x8d9297,
    roughness: 0.86
  }),

  new THREE.MeshStandardMaterial({
    color: 0x696e74,
    roughness: 0.9
  }),

  new THREE.MeshStandardMaterial({
    color: 0xa29b91,
    roughness: 0.86
  }),

  new THREE.MeshStandardMaterial({
    color: 0x59636a,
    roughness: 0.9
  })

];


/* =========================================================
   GROUND
========================================================= */

const ground =
  new THREE.Mesh(
    new THREE.PlaneGeometry(
      500,
      500
    ),
    grassMaterial
  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow = true;

world.add(ground);


/* =========================================================
   ROADS
========================================================= */

function createRoad(
  x,
  z,
  width,
  depth
) {

  const road =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.12,
        depth
      ),
      roadMaterial
    );

  road.position.set(
    x,
    0.06,
    z
  );

  road.receiveShadow = true;

  world.add(road);
}


createRoad(
  0,
  0,
  500,
  15
);

createRoad(
  0,
  0,
  15,
  500
);

createRoad(
  0,
  -45,
  500,
  12
);

createRoad(
  0,
  45,
  500,
  12
);

createRoad(
  -45,
  0,
  12,
  500
);

createRoad(
  45,
  0,
  12,
  500
);


/* =========================================================
   ROAD MARKINGS
========================================================= */

function createRoadLine(
  x,
  z,
  width,
  depth
) {

  const material =
    new THREE.MeshBasicMaterial({
      color: 0xd5b95c
    });

  const line =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.025,
        depth
      ),
      material
    );

  line.position.set(
    x,
    0.125,
    z
  );

  world.add(line);
}


for (
  let x = -230;
  x <= 230;
  x += 16
) {

  createRoadLine(
    x,
    0,
    7,
    0.14
  );
}


for (
  let z = -230;
  z <= 230;
  z += 16
) {

  createRoadLine(
    0,
    z,
    0.14,
    7
  );
}


/* =========================================================
   SIDEWALKS
========================================================= */

function createSidewalk(
  x,
  z,
  width,
  depth
) {

  const sidewalk =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.18,
        depth
      ),
      sidewalkMaterial
    );

  sidewalk.position.set(
    x,
    0.09,
    z
  );

  sidewalk.receiveShadow = true;

  world.add(sidewalk);
}


createSidewalk(
  0,
  10,
  500,
  3
);

createSidewalk(
  0,
  -10,
  500,
  3
);

createSidewalk(
  10,
  0,
  3,
  500
);

createSidewalk(
  -10,
  0,
  3,
  500
);


/* =========================================================
   BUILDINGS
========================================================= */

function createBuilding(
  x,
  z,
  width,
  depth,
  height
) {

  const material =
    buildingMaterials[
      Math.floor(
        Math.random() *
        buildingMaterials.length
      )
    ];

  const building =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),
      material
    );

  building.position.set(
    x,
    height / 2,
    z
  );

  building.castShadow = true;
  building.receiveShadow = true;

  world.add(building);


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width + 0.25,
        0.15,
        depth + 0.25
      ),
      new THREE.MeshStandardMaterial({
        color: 0x45484c,
        roughness: 0.9
      })
    );

  roof.position.set(
    x,
    height + 0.08,
    z
  );

  roof.castShadow = true;

  world.add(roof);


  createWindows(
    x,
    z,
    width,
    depth,
    height
  );
}


/* =========================================================
   WINDOWS
========================================================= */

function createWindows(
  x,
  z,
  width,
  depth,
  height
) {

  const windowMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x6d8794,
      roughness: 0.25,
      metalness: 0.2
    });


  const rows =
    Math.max(
      1,
      Math.floor(height / 4)
    );

  const columns =
    Math.max(
      2,
      Math.floor(width / 3)
    );


  for (
    let row = 0;
    row < rows;
    row++
  ) {

    const y =
      2.2 +
      row * 3.4;


    for (
      let col = 0;
      col < columns;
      col++
    ) {

      const px =
        x -
        width / 2 +
        1.5 +
        col * 3;


      if (
        px >
        x + width / 2 - 1
      ) {
        continue;
      }


      const front =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            1.1,
            1.4,
            0.05
          ),
          windowMaterial
        );

      front.position.set(
        px,
        y,
        z -
        depth / 2 -
        0.03
      );

      world.add(front);


      const back =
        front.clone();

      back.position.z =
        z +
        depth / 2 +
        0.03;

      world.add(back);
    }
  }
}


/* =========================================================
   CITY
========================================================= */

const buildingPositions = [

  [-28, -28, 25, 25, 28],
  [28, -28, 28, 24, 40],

  [-28, 28, 25, 25, 34],
  [28, 28, 28, 25, 22],

  [-75, -30, 34, 30, 48],
  [75, -30, 35, 28, 34],

  [-75, 30, 32, 28, 27],
  [75, 30, 35, 32, 50],

  [-120, -30, 40, 30, 42],
  [120, -30, 38, 32, 30],

  [-120, 35, 38, 34, 55],
  [120, 35, 40, 32, 44]

];


for (
  const building
  of buildingPositions
) {

  createBuilding(
    building[0],
    building[1],
    building[2],
    building[3],
    building[4]
  );
}


/* =========================================================
   TREES
========================================================= */

function createTree(
  x,
  z,
  scale = 1
) {

  const trunk =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.25 * scale,
        0.38 * scale,
        3 * scale,
        8
      ),
      new THREE.MeshStandardMaterial({
        color: 0x4a3021,
        roughness: 1
      })
    );

  trunk.position.set(
    x,
    1.5 * scale,
    z
  );

  trunk.castShadow = true;

  world.add(trunk);


  const leaves =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.8 * scale,
        12,
        10
      ),
      new THREE.MeshStandardMaterial({
        color: 0x294b31,
        roughness: 1
      })
    );

  leaves.position.set(
    x,
    3.6 * scale,
    z
  );

  leaves.castShadow = true;

  world.add(leaves);
}


const treeLocations = [

  [-18, -18],
  [18, -18],
  [-18, 18],
  [18, 18],

  [-58, -18],
  [58, -18],
  [-58, 18],
  [58, 18],

  [-108, -18],
  [108, -18],
  [-108, 18],
  [108, 18]

];


for (
  const [x, z]
  of treeLocations
) {

  createTree(
    x,
    z,
    0.9 +
    Math.random() * 0.35
  );
}


/* =========================================================
   STREET LIGHTS
========================================================= */

function createStreetLight(
  x,
  z,
  rotation = 0
) {

  const group =
    new THREE.Group();

  group.position.set(
    x,
    0,
    z
  );

  group.rotation.y =
    rotation;

  world.add(group);


  const pole =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.08,
        0.12,
        5,
        10
      ),
      new THREE.MeshStandardMaterial({
        color: 0x272b2e,
        metalness: 0.7,
        roughness: 0.35
      })
    );

  pole.position.y =
    2.5;

  pole.castShadow = true;

  group.add(pole);


  const arm =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        1.1,
        0.08,
        0.08
      ),
      pole.material
    );

  arm.position.set(
    0.5,
    4.8,
    0
  );

  group.add(arm);


  const lamp =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.13,
        8,
        8
      ),
      new THREE.MeshBasicMaterial({
        color: 0xffe9b0
      })
    );

  lamp.position.set(
    1,
    4.7,
    0
  );

  group.add(lamp);


  const light =
    new THREE.PointLight(
      0xffdba0,
      1.2,
      18
    );

  light.position.set(
    1,
    4.6,
    0
  );

  group.add(light);
}


for (
  let x = -100;
  x <= 100;
  x += 25
) {

  createStreetLight(
    x,
    12,
    0
  );

  createStreetLight(
    x,
    -12,
    Math.PI
  );
}


/* =========================================================
   PLAYER
========================================================= */

let player = null;

let mixer = null;

const animations = {};

let activeAnimation = null;


const playerState = {

  position:
    new THREE.Vector3(
      0,
      0,
      25
    ),

  speed: 4.2,

  runSpeed: 7.2,

  health: 100,

  armor: 100

};


/* =========================================================
   GLTF LOADER
========================================================= */

const loader =
  new GLTFLoader();


/* =========================================================
   LOAD MARIA
========================================================= */

function loadPlayer() {

  return new Promise(
    (resolve) => {

      const modelPath =
        "assets/characters/Maria%20WProp%20J%20J%20Ong.glb";


      loader.load(

        modelPath,

        (gltf) => {

          console.log(
            "Maria loaded successfully"
          );


          player =
            gltf.scene;


          /* -----------------------------------------
             AUTOMATIC MODEL SIZING
          ----------------------------------------- */

          const box =
            new THREE.Box3()
              .setFromObject(
                player
              );


          const size =
            new THREE.Vector3();

          box.getSize(
            size
          );


          const desiredHeight =
            1.75;


          if (
            size.y > 0
          ) {

            const scale =
              desiredHeight /
              size.y;

            player.scale.set(
              scale,
              scale,
              scale
            );

          }


          /* -----------------------------------------
             PLACE CHARACTER
          ----------------------------------------- */

          player.position.copy(
            playerState.position
          );


          player.traverse(
            (object) => {

              if (
                object.isMesh
              ) {

                object.castShadow =
                  true;

                object.receiveShadow =
                  true;

              }

            }
          );


          scene.add(
            player
          );


          /* -----------------------------------------
             ANIMATIONS
          ----------------------------------------- */

          if (
            gltf.animations &&
            gltf.animations.length
          ) {

            mixer =
              new THREE.AnimationMixer(
                player
              );


            for (
              const clip
              of gltf.animations
            ) {

              const key =
                clip.name
                  .toLowerCase();

              animations[key] =
                mixer.clipAction(
                  clip
                );

              console.log(
                "Animation:",
                clip.name
              );

            }


            findAnimation([
              "idle",
              "standing",
              "breathing"
            ]);

          }


          resolve(
            true
          );

        },


        (progress) => {

          if (
            progress.total
          ) {

            const percent =
              (
                progress.loaded /
                progress.total
              ) * 100;

            setLoading(
              Math.min(
                percent,
                95
              ),
              "Loading Maria..."
            );

          }

        },


        (error) => {

          console.error(
            "Maria could not be loaded:",
            error
          );

          setLoading(
            100,
            "Could not load character"
          );

          resolve(
            false
          );

        }

      );

    }
  );
}


/* =========================================================
   ANIMATION FINDER
========================================================= */

function findAnimation(
  names
) {

  if (!mixer) {
    return;
  }


  const key =
    Object.keys(
      animations
    ).find(
      animationName => {

        return names.some(
          name =>
            animationName.includes(
              name
            )
        );

      }
    );


  if (key) {

    playAnimation(
      key
    );

  }

}


/* =========================================================
   PLAY ANIMATION
========================================================= */

function playAnimation(
  name
) {

  const next =
    animations[name];


  if (!next) {
    return;
  }


  if (
    activeAnimation === next
  ) {

    return;

  }


  if (
    activeAnimation
  ) {

    activeAnimation.fadeOut(
      0.2
    );

  }


  next
    .reset()
    .fadeIn(0.2)
    .play();


  activeAnimation =
    next;
}


/* =========================================================
   JOYSTICK
========================================================= */

const joystick =
  document.getElementById(
    "joystick"
  );

const knob =
  document.getElementById(
    "joystickKnob"
  );


let joystickActive =
  false;

let joystickX = 0;

let joystickY = 0;

let joystickPointerId =
  null;


const joystickRadius =
  43;


function updateJoystick(
  event
) {

  const rect =
    joystick.getBoundingClientRect();


  const centerX =
    rect.left +
    rect.width / 2;

  const centerY =
    rect.top +
    rect.height / 2;


  let dx =
    event.clientX -
    centerX;

  let dy =
    event.clientY -
    centerY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if (
    distance >
    joystickRadius
  ) {

    dx =
      dx /
      distance *
      joystickRadius;

    dy =
      dy /
      distance *
      joystickRadius;

  }


  joystickX =
    dx /
    joystickRadius;

  joystickY =
    dy /
    joystickRadius;


  knob.style.transform =
    `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
}


joystick.addEventListener(
  "pointerdown",
  (event) => {

    joystickActive =
      true;

    joystickPointerId =
      event.pointerId;

    joystick.setPointerCapture(
      event.pointerId
    );

    updateJoystick(
      event
    );

  }
);


joystick.addEventListener(
  "pointermove",
  (event) => {

    if (
      !joystickActive ||
      event.pointerId !==
      joystickPointerId
    ) {

      return;

    }

    updateJoystick(
      event
    );

  }
);


function resetJoystick() {

  joystickActive =
    false;

  joystickPointerId =
    null;

  joystickX = 0;

  joystickY = 0;

  knob.style.transform =
    "translate(-50%, -50%)";
}


joystick.addEventListener(
  "pointerup",
  resetJoystick
);

joystick.addEventListener(
  "pointercancel",
  resetJoystick
);


/* =========================================================
   RUN
========================================================= */

const runButton =
  document.getElementById(
    "runButton"
  );

let running = false;


runButton.addEventListener(
  "pointerdown",
  () => {

    running = true;

  }
);


runButton.addEventListener(
  "pointerup",
  () => {

    running = false;

  }
);


runButton.addEventListener(
  "pointercancel",
  () => {

    running = false;

  }
);


/* =========================================================
   CAMERA TOUCH
========================================================= */

const cameraTouchArea =
  document.getElementById(
    "cameraTouchArea"
  );


let cameraPointerId =
  null;

let lastCameraX =
  0;

let lastCameraY =
  0;


let cameraYaw = 0;

let cameraPitch = 0.18;


cameraTouchArea.addEventListener(
  "pointerdown",
  (event) => {

    cameraPointerId =
      event.pointerId;

    lastCameraX =
      event.clientX;

    lastCameraY =
      event.clientY;

    cameraTouchArea.setPointerCapture(
      event.pointerId
    );

  }
);


cameraTouchArea.addEventListener(
  "pointermove",
  (event) => {

    if (
      event.pointerId !==
      cameraPointerId
    ) {

      return;

    }


    const dx =
      event.clientX -
      lastCameraX;

    const dy =
      event.clientY -
      lastCameraY;


    lastCameraX =
      event.clientX;

    lastCameraY =
      event.clientY;


    cameraYaw -=
      dx * 0.006;

    cameraPitch -=
      dy * 0.004;


    cameraPitch =
      THREE.MathUtils.clamp(
        cameraPitch,
        -0.25,
        0.65
      );

  }
);


cameraTouchArea.addEventListener(
  "pointerup",
  () => {

    cameraPointerId =
      null;

  }
);


/* =========================================================
   PLAYER MOVEMENT
========================================================= */

function updatePlayer(
  delta
) {

  if (!player) {
    return;
  }


  const inputX =
    joystickX;

  const inputY =
    joystickY;


  const magnitude =
    Math.min(
      1,
      Math.sqrt(
        inputX * inputX +
        inputY * inputY
      )
    );


  if (
    magnitude > 0.05
  ) {

    const speed =
      running
        ? playerState.runSpeed
        : playerState.speed;


    const forward =
      new THREE.Vector3(
        Math.sin(cameraYaw),
        0,
        Math.cos(cameraYaw)
      );


    const right =
      new THREE.Vector3(
        Math.cos(cameraYaw),
        0,
        -Math.sin(cameraYaw)
      );


    const direction =
      new THREE.Vector3();


    direction
      .addScaledVector(
        right,
        inputX
      )
      .addScaledVector(
        forward,
        inputY
      );


    direction.normalize();


    player.position.addScaledVector(
      direction,
      speed *
      magnitude *
      delta
    );


    const targetRotation =
      Math.atan2(
        direction.x,
        direction.z
      );


    player.rotation.y =
      smoothAngle(
        player.rotation.y,
        targetRotation,
        10 * delta
      );


    if (running) {

      findAnimation([
        "run",
        "running",
        "sprint"
      ]);

    } else {

      findAnimation([
        "walk",
        "walking"
      ]);

    }

  } else {

    findAnimation([
      "idle",
      "standing",
      "breathing"
    ]);

  }


  player.position.x =
    THREE.MathUtils.clamp(
      player.position.x,
      -230,
      230
    );


  player.position.z =
    THREE.MathUtils.clamp(
      player.position.z,
      -230,
      230
    );

}


/* =========================================================
   SMOOTH ROTATION
========================================================= */

function smoothAngle(
  current,
  target,
  amount
) {

  let difference =
    target -
    current;


  difference =
    Math.atan2(
      Math.sin(difference),
      Math.cos(difference)
    );


  return (
    current +
    difference *
    Math.min(
      1,
      amount
    )
  );
}


/* =========================================================
   THIRD PERSON CAMERA
========================================================= */

function updateCamera(
  delta
) {

  if (!player) {
    return;
  }


  const distance = 5.0;

  const height = 2.5;


  const target =
    new THREE.Vector3(
      player.position.x,
      player.position.y +
      1.25,
      player.position.z
    );


  const horizontalDistance =
    distance *
    Math.cos(
      cameraPitch
    );


  const desired =
    new THREE.Vector3(

      player.position.x -
      Math.sin(cameraYaw) *
      horizontalDistance,

      player.position.y +
      height +
      Math.sin(cameraPitch) *
      distance,

      player.position.z -
      Math.cos(cameraYaw) *
      horizontalDistance

    );


  camera.position.lerp(
    desired,
    1 -
    Math.pow(
      0.001,
      delta
    )
  );


  camera.lookAt(
    target
  );
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

  const health =
    document.getElementById(
      "healthFill"
    );

  const armor =
    document.getElementById(
      "armorFill"
    );


  if (health) {

    health.style.width =
      `${playerState.health}%`;

  }


  if (armor) {

    armor.style.width =
      `${playerState.armor}%`;

  }

}


/* =========================================================
   LOADING SCREEN
========================================================= */

function setLoading(
  percent,
  message
) {

  const fill =
    document.getElementById(
      "loadingFill"
    );

  const text =
    document.getElementById(
      "loadingText"
    );


  if (fill) {

    fill.style.width =
      `${Math.min(
        100,
        percent
      )}%`;

  }


  if (text) {

    text.textContent =
      message;

  }

}


/* =========================================================
   START GAME
========================================================= */

async function startGame() {

  setLoading(
    15,
    "Building city..."
  );


  await new Promise(
    resolve =>
      setTimeout(
        resolve,
        300
      )
  );


  setLoading(
    40,
    "Preparing Maria..."
  );


  const loaded =
    await loadPlayer();


  if (loaded) {

    setLoading(
      100,
      "Welcome to Crime World"
    );

  } else {

    setLoading(
      100,
      "Character failed to load"
    );

  }


  updateHUD();


  setTimeout(
    () => {

      const screen =
        document.getElementById(
          "loadingScreen"
        );

      if (screen) {

        screen.classList.add(
          "hidden"
        );

      }

    },
    800
  );

}


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.7
      )
    );

  }
);


/* =========================================================
   GAME LOOP
========================================================= */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      0.05
    );


  if (mixer) {

    mixer.update(
      delta
    );

  }


  updatePlayer(
    delta
  );


  updateCamera(
    delta
  );


  renderer.render(
    scene,
    camera
  );

}


animate();

startGame();
