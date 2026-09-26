import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =========================================================
   ELEMENTS
========================================================= */

const game =
  document.getElementById("game");

const loadingScreen =
  document.getElementById("loadingScreen");

const loadingFill =
  document.getElementById("loadingFill");

const loadingText =
  document.getElementById("loadingText");


/* =========================================================
   LOADING
========================================================= */

function setLoading(percent, message) {

  if (loadingFill) {
    loadingFill.style.width =
      `${percent}%`;
  }

  if (loadingText) {
    loadingText.textContent =
      message;
  }

}


function hideLoadingScreen() {

  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
  }

}


/* =========================================================
   SCENE
========================================================= */

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x9db8c8);

scene.fog =
  new THREE.Fog(
    0x9db8c8,
    90,
    430
  );


/* =========================================================
   CAMERA
========================================================= */

const camera =
  new THREE.PerspectiveCamera(
    60,
    window.innerWidth /
      window.innerHeight,
    0.1,
    700
  );

camera.position.set(
  0,
  3,
  8
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
    window.devicePixelRatio || 1,
    1.7
  )
);

renderer.shadowMap.enabled =
  true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.15;

game.appendChild(
  renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const hemisphere =
  new THREE.HemisphereLight(
    0xc9e4ff,
    0x394047,
    2.4
  );

scene.add(
  hemisphere
);


const sun =
  new THREE.DirectionalLight(
    0xffefcf,
    3.3
  );

sun.position.set(
  90,
  130,
  60
);

sun.castShadow =
  true;

sun.shadow.mapSize.width =
  2048;

sun.shadow.mapSize.height =
  2048;

sun.shadow.camera.left =
  -180;

sun.shadow.camera.right =
  180;

sun.shadow.camera.top =
  180;

sun.shadow.camera.bottom =
  -180;

sun.shadow.camera.near =
  1;

sun.shadow.camera.far =
  500;

scene.add(
  sun
);


/* =========================================================
   WORLD
========================================================= */

const WORLD_SIZE = 360;


/* =========================================================
   GROUND
========================================================= */

const ground =
  new THREE.Mesh(
    new THREE.PlaneGeometry(
      WORLD_SIZE,
      WORLD_SIZE
    ),
    new THREE.MeshStandardMaterial({
      color: 0x50595a,
      roughness: 0.96
    })
  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow =
  true;

scene.add(
  ground
);


/* =========================================================
   ROADS
========================================================= */

function createRoad(
  x,
  z,
  width,
  length
) {

  const road =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        width,
        length
      ),
      new THREE.MeshStandardMaterial({
        color: 0x24282b,
        roughness: 0.92
      })
    );

  road.rotation.x =
    -Math.PI / 2;

  road.position.set(
    x,
    0.015,
    z
  );

  road.receiveShadow =
    true;

  scene.add(
    road
  );

}


createRoad(
  0,
  0,
  18,
  WORLD_SIZE
);

createRoad(
  0,
  0,
  WORLD_SIZE,
  18
);

createRoad(
  -90,
  0,
  12,
  WORLD_SIZE
);

createRoad(
  90,
  0,
  12,
  WORLD_SIZE
);

createRoad(
  0,
  -90,
  WORLD_SIZE,
  12
);

createRoad(
  0,
  90,
  WORLD_SIZE,
  12
);


/* =========================================================
   SIDEWALKS
========================================================= */

function createSidewalk(
  x,
  z,
  width,
  length
) {

  const sidewalk =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.16,
        length
      ),
      new THREE.MeshStandardMaterial({
        color: 0x858585,
        roughness: 0.9
      })
    );

  sidewalk.position.set(
    x,
    0.08,
    z
  );

  sidewalk.receiveShadow =
    true;

  scene.add(
    sidewalk
  );

}


createSidewalk(
  -10,
  0,
  2,
  WORLD_SIZE
);

createSidewalk(
  10,
  0,
  2,
  WORLD_SIZE
);

createSidewalk(
  0,
  -10,
  WORLD_SIZE,
  2
);

createSidewalk(
  0,
  10,
  WORLD_SIZE,
  2
);


/* =========================================================
   ROAD MARKINGS
========================================================= */

function createRoadLine(
  x,
  z,
  width,
  length
) {

  const line =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        width,
        length
      ),
      new THREE.MeshBasicMaterial({
        color: 0xe7e2c8
      })
    );

  line.rotation.x =
    -Math.PI / 2;

  line.position.set(
    x,
    0.025,
    z
  );

  scene.add(
    line
  );

}


for (
  let z = -170;
  z <= 170;
  z += 8
) {

  createRoadLine(
    0,
    z,
    0.25,
    4
  );

}


for (
  let x = -170;
  x <= 170;
  x += 8
) {

  createRoadLine(
    x,
    0,
    4,
    0.25
  );

}


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

  const building =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),
      new THREE.MeshStandardMaterial({
        color:
          new THREE.Color().setHSL(
            0.58,
            0.08,
            0.25 +
              Math.random() * 0.18
          ),
        roughness: 0.82,
        metalness: 0.06
      })
    );

  building.position.set(
    x,
    height / 2,
    z
  );

  building.castShadow =
    true;

  building.receiveShadow =
    true;

  scene.add(
    building
  );


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width + 0.4,
        0.25,
        depth + 0.4
      ),
      new THREE.MeshStandardMaterial({
        color: 0x202326,
        roughness: 0.9
      })
    );

  roof.position.set(
    x,
    height + 0.12,
    z
  );

  roof.castShadow =
    true;

  scene.add(
    roof
  );


  const windowMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x9fc5d7,
      emissive: 0x152b38,
      roughness: 0.35,
      metalness: 0.15
    });


  const floors =
    Math.max(
      1,
      Math.floor(
        height / 3.4
      )
    );


  const columns =
    Math.max(
      1,
      Math.floor(
        width / 3.2
      )
    );


  for (
    let floor = 0;
    floor < floors;
    floor++
  ) {

    for (
      let column = 0;
      column < columns;
      column++
    ) {

      if (
        Math.random() < 0.15
      ) {
        continue;
      }


      const window =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            1.15,
            1.35,
            0.08
          ),
          windowMaterial
        );


      window.position.set(
        x -
          width / 2 +
          1.7 +
          column * 3.2,

        2 +
          floor * 3.4,

        z -
          depth / 2 -
          0.06
      );


      scene.add(
        window
      );

    }

  }

}


/* =========================================================
   CITY
========================================================= */

const blocks = [

  [-55, -55, 25, 25, 32],
  [55, -55, 28, 24, 48],

  [-55, 55, 30, 28, 42],
  [55, 55, 25, 30, 28],

  [-125, -55, 30, 30, 55],
  [125, -55, 28, 28, 38],

  [-125, 55, 26, 32, 34],
  [125, 55, 30, 26, 60],

  [-55, -125, 30, 28, 45],
  [55, -125, 25, 30, 34],

  [-55, 125, 28, 28, 52],
  [55, 125, 30, 26, 40]

];


for (
  const block of blocks
) {

  createBuilding(
    ...block
  );

}


/* =========================================================
   TREES
========================================================= */

function createTree(
  x,
  z
) {

  const trunk =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.35,
        0.5,
        3.2,
        8
      ),
      new THREE.MeshStandardMaterial({
        color: 0x5a3b27
      })
    );

  trunk.position.set(
    x,
    1.6,
    z
  );

  trunk.castShadow =
    true;

  scene.add(
    trunk
  );


  const crown =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        2.4,
        12,
        10
      ),
      new THREE.MeshStandardMaterial({
        color: 0x254f31,
        roughness: 0.9
      })
    );

  crown.position.set(
    x,
    4.1,
    z
  );

  crown.scale.y =
    1.15;

  crown.castShadow =
    true;

  scene.add(
    crown
  );

}


for (
  let i = 0;
  i < 65;
  i++
) {

  const x =
    THREE.MathUtils.randFloat(
      -165,
      165
    );

  const z =
    THREE.MathUtils.randFloat(
      -165,
      165
    );


  if (
    Math.abs(x) < 14 ||
    Math.abs(z) < 14
  ) {
    continue;
  }


  createTree(
    x,
    z
  );

}


/* =========================================================
   STREET LIGHTS
========================================================= */

function createStreetLight(
  x,
  z
) {

  const pole =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.08,
        0.12,
        6,
        8
      ),
      new THREE.MeshStandardMaterial({
        color: 0x24272a,
        metalness: 0.7,
        roughness: 0.35
      })
    );

  pole.position.set(
    x,
    3,
    z
  );

  pole.castShadow =
    true;

  scene.add(
    pole
  );


  const lamp =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.28,
        10,
        8
      ),
      new THREE.MeshStandardMaterial({
        color: 0xffe9aa,
        emissive: 0xffb83d,
        emissiveIntensity: 2
      })
    );

  lamp.position.set(
    x,
    6,
    z
  );

  scene.add(
    lamp
  );


  const light =
    new THREE.PointLight(
      0xffd68a,
      1.4,
      20
    );

  light.position.set(
    x,
    5.7,
    z
  );

  scene.add(
    light
  );

}


for (
  let i = -150;
  i <= 150;
  i += 25
) {

  createStreetLight(
    11,
    i
  );

  createStreetLight(
    -11,
    i
  );

}


/* =========================================================
   PLAYER
========================================================= */

const playerState = {

  position:
    new THREE.Vector3(
      0,
      0,
      28
    ),

  speed: 4.8,

  runSpeed: 8.5,

  running: false,

  jumping: false,

  verticalVelocity: 0

};


let player = null;

let mixer = null;

let animations = {};

let activeAnimation = null;


/* =========================================================
   MARIA DIAGNOSTIC
========================================================= */

function showMariaStatus(
  message,
  type = "info"
) {

  let box =
    document.getElementById(
      "mariaStatus"
    );


  if (!box) {

    box =
      document.createElement(
        "div"
      );

    box.id =
      "mariaStatus";


    Object.assign(
      box.style,
      {
        position: "fixed",
        left: "12px",
        right: "12px",
        bottom: "120px",
        zIndex: "99999",
        padding: "14px",
        borderRadius: "12px",
        fontFamily: "Arial",
        fontSize: "13px",
        lineHeight: "1.45",
        color: "#fff",
        background:
          "rgba(0,0,0,.92)",
        border:
          "2px solid #4da6ff",
        whiteSpace:
          "pre-wrap",
        wordBreak:
          "break-word"
      }
    );


    document.body.appendChild(
      box
    );

  }


  box.style.borderColor =
    type === "error"
      ? "#ff4040"
      : type === "success"
        ? "#35d07f"
        : "#4da6ff";


  box.textContent =
    message;

}


function removeMariaStatus() {

  const box =
    document.getElementById(
      "mariaStatus"
    );

  if (box) {

    box.remove();

  }

}


/* =========================================================
   LOAD MARIA
========================================================= */

async function loadPlayer() {

  const modelPath =
    new URL(
      "./assets/characters/Maria WProp J J Ong.glb",
      import.meta.url
    ).href;


  showMariaStatus(
    "MARIA STATUS\n\n" +
    "Loading Maria..."
  );


  try {

    const module =
      await import(
        "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js"
      );


    const GLTFLoader =
      module.GLTFLoader;


    const response =
      await fetch(
        modelPath,
        {
          cache: "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        "Maria file could not be found.\n\n" +
        "HTTP " +
        response.status
      );

    }


    const loader =
      new GLTFLoader();


    loader.load(

      modelPath,


      (gltf) => {

        try {

          player =
            gltf.scene;


          if (!player) {

            throw new Error(
              "Maria scene is empty."
            );

          }


          /* ===============================================
             SCALE
          =============================================== */

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


            player.scale.setScalar(
              scale
            );

          }


          /* ===============================================
             POSITION
          =============================================== */

          player.position.copy(
            playerState.position
          );


          /* ===============================================
             SHADOWS
          =============================================== */

          player.traverse(
            (object) => {

              if (
                object.isMesh
              ) {

                object.castShadow =
                  true;

                object.receiveShadow =
                  true;

                if (
                  object.material
                ) {

                  object.material
                    .side =
                    THREE.FrontSide;

                }

              }

            }
          );


          scene.add(
            player
          );


          /* ===============================================
             ANIMATIONS
          =============================================== */

          if (
            gltf.animations &&
            gltf.animations.length
          ) {

            mixer =
              new THREE.AnimationMixer(
                player
              );


            for (
              const clip of
              gltf.animations
            ) {

              const key =
                clip.name.toLowerCase();


              animations[key] =
                mixer.clipAction(
                  clip
                );

            }

          }


          playIdle();


          removeMariaStatus();


          console.log(
            "Maria loaded successfully."
          );

        } catch (
          error
        ) {

          showMariaStatus(
            "MARIA ERROR\n\n" +
            error.message,
            "error"
          );

        }

      },


      null,


      (error) => {

        showMariaStatus(
          "MARIA ERROR\n\n" +
          "Could not load Maria.\n\n" +
          (
            error.message ||
            String(error)
          ),
          "error"
        );

      }

    );

  } catch (
    error
  ) {

    showMariaStatus(
      "MARIA ERROR\n\n" +
      error.message,
      "error"
    );

  }

}


/* =========================================================
   ANIMATION SYSTEM
========================================================= */

function findAnimation(
  names
) {

  const keys =
    Object.keys(
      animations
    );


  for (
    const name of names
  ) {

    const found =
      keys.find(
        key =>
          key.includes(
            name
          )
      );


    if (found) {

      return animations[
        found
      ];

    }

  }


  return null;

}


function playAnimation(
  names
) {

  if (!mixer)
    return;


  const action =
    findAnimation(
      names
    );


  if (!action)
    return;


  if (
    activeAnimation ===
    action
  ) {
    return;
  }


  if (
    activeAnimation
  ) {

    activeAnimation
      .fadeOut(0.2);

  }


  action
    .reset()
    .fadeIn(0.2)
    .play();


  activeAnimation =
    action;

}


function playIdle() {

  playAnimation(
    [
      "idle",
      "standing",
      "breathing"
    ]
  );

}


function playWalk() {

  playAnimation(
    [
      "walk",
      "walking"
    ]
  );

}


function playRun() {

  playAnimation(
    [
      "run",
      "running",
      "sprint"
    ]
  );

}


/* =========================================================
   JOYSTICK
========================================================= */

const joystick =
  document.getElementById(
    "joystick"
  );

const joystickKnob =
  document.getElementById(
    "joystickKnob"
  );


let joystickX = 0;

let joystickY = 0;

let joystickActive =
  false;


if (joystick) {

  joystick.addEventListener(
    "pointerdown",
    (event) => {

      joystickActive =
        true;

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
        joystickActive
      ) {

        updateJoystick(
          event
        );

      }

    }
  );


  joystick.addEventListener(
    "pointerup",
    resetJoystick
  );


  joystick.addEventListener(
    "pointercancel",
    resetJoystick
  );

}


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


  const max =
    rect.width * 0.32;


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
    distance > max
  ) {

    dx =
      dx /
      distance *
      max;

    dy =
      dy /
      distance *
      max;

  }


  joystickX =
    dx / max;


  joystickY =
    dy / max;


  if (
    joystickKnob
  ) {

    joystickKnob.style.transform =
      `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

  }

}


function resetJoystick() {

  joystickActive =
    false;

  joystickX = 0;

  joystickY = 0;


  if (
    joystickKnob
  ) {

    joystickKnob.style.transform =
      "translate(-50%, -50%)";

  }

}


/* =========================================================
   RUN BUTTON
========================================================= */

const runButton =
  document.getElementById(
    "runButton"
  );


if (runButton) {

  runButton.addEventListener(
    "pointerdown",
    () => {

      playerState.running =
        true;

    }
  );


  runButton.addEventListener(
    "pointerup",
    () => {

      playerState.running =
        false;

    }
  );


  runButton.addEventListener(
    "pointercancel",
    () => {

      playerState.running =
        false;

    }
  );


  runButton.addEventListener(
    "pointerleave",
    () => {

      playerState.running =
        false;

    }
  );

}


/* =========================================================
   JUMP
========================================================= */

const jumpButton =
  document.getElementById(
    "jumpButton"
  );


if (jumpButton) {

  jumpButton.addEventListener(
    "pointerdown",
    () => {

      if (
        !playerState.jumping
      ) {

        playerState.jumping =
          true;

        playerState.verticalVelocity =
          7;

      }

    }
  );

}


/* =========================================================
   ACTION
========================================================= */

const actionButton =
  document.getElementById(
    "actionButton"
  );


if (actionButton) {

  actionButton.addEventListener(
    "pointerdown",
    () => {

      console.log(
        "ACTION pressed"
      );

    }
  );

}


/* =========================================================
   CAMERA
========================================================= */

const cameraTouchArea =
  document.getElementById(
    "cameraTouchArea"
  );


let cameraDragging =
  false;

let lastCameraX =
  0;

let cameraAngle =
  0;

let cameraPitch =
  0.25;


if (cameraTouchArea) {

  cameraTouchArea.addEventListener(
    "pointerdown",
    (event) => {

      cameraDragging =
        true;

      lastCameraX =
        event.clientX;

      cameraTouchArea.setPointerCapture(
        event.pointerId
      );

    }
  );


  cameraTouchArea.addEventListener(
    "pointermove",
    (event) => {

      if (
        !cameraDragging
      ) {
        return;
      }


      const movement =
        event.clientX -
        lastCameraX;


      lastCameraX =
        event.clientX;


      cameraAngle -=
        movement * 0.008;

    }
  );


  cameraTouchArea.addEventListener(
    "pointerup",
    () => {

      cameraDragging =
        false;

    }
  );


  cameraTouchArea.addEventListener(
    "pointercancel",
    () => {

      cameraDragging =
        false;

    }
  );

}


/* =========================================================
   PLAYER MOVEMENT
========================================================= */

function updatePlayer(
  delta
) {

  if (!player)
    return;


  const inputX =
    joystickX;


  const inputY =
    joystickY;


  const moving =
    Math.abs(inputX) > 0.08 ||
    Math.abs(inputY) > 0.08;


  /* ===============================================
     GRAVITY / JUMP
  =============================================== */

  if (
    playerState.jumping
  ) {

    playerState.verticalVelocity -=
      18 * delta;


    player.position.y +=
      playerState.verticalVelocity *
      delta;


    if (
      player.position.y <= 0
    ) {

      player.position.y =
        0;

      playerState.jumping =
        false;

      playerState.verticalVelocity =
        0;

    }

  }


  if (!moving) {

    playIdle();

    return;

  }


  /* ===============================================
     MOVEMENT DIRECTION
  =============================================== */

  const forward =
    new THREE.Vector3(
      Math.sin(cameraAngle),
      0,
      Math.cos(cameraAngle)
    );


  const right =
    new THREE.Vector3(
      Math.cos(cameraAngle),
      0,
      -Math.sin(cameraAngle)
    );


  const direction =
    new THREE.Vector3();


  direction
    .addScaledVector(
      right,
      inputX
    );


  direction
    .addScaledVector(
      forward,
      inputY
    );


  if (
    direction.lengthSq() >
    0.001
  ) {

    direction.normalize();

  }


  const speed =
    playerState.running
      ? playerState.runSpeed
      : playerState.speed;


  player.position.addScaledVector(
    direction,
    speed * delta
  );


  /* ===============================================
     WORLD BOUNDS
  =============================================== */

  player.position.x =
    THREE.MathUtils.clamp(
      player.position.x,
      -170,
      170
    );


  player.position.z =
    THREE.MathUtils.clamp(
      player.position.z,
      -170,
      170
    );


  /* ===============================================
     CHARACTER ROTATION
  =============================================== */

  const targetRotation =
    Math.atan2(
      direction.x,
      direction.z
    );


  let rotationDifference =
    targetRotation -
    player.rotation.y;


  rotationDifference =
    Math.atan2(
      Math.sin(
        rotationDifference
      ),
      Math.cos(
        rotationDifference
      )
    );


  player.rotation.y +=
    rotationDifference *
    Math.min(
      1,
      delta * 10
    );


  /* ===============================================
     ANIMATION
  =============================================== */

  if (
    playerState.running
  ) {

    playRun();

  } else {

    playWalk();

  }

}


/* =========================================================
   THIRD PERSON CAMERA
========================================================= */

function updateCamera(
  delta
) {

  if (!player)
    return;


  const distance =
    5.8;


  const cameraHeight =
    2.8;


  const horizontalDistance =
    Math.cos(
      cameraPitch
    ) *
    distance;


  const verticalDistance =
    Math.sin(
      cameraPitch
    ) *
    distance;


  const desiredPosition =
    new THREE.Vector3(

      player.position.x +
        Math.sin(cameraAngle) *
        horizontalDistance,

      player.position.y +
        cameraHeight +
        verticalDistance,

      player.position.z +
        Math.cos(cameraAngle) *
        horizontalDistance

    );


  const smoothing =
    1 -
    Math.pow(
      0.0005,
      delta
    );


  camera.position.lerp(
    desiredPosition,
    smoothing
  );


  const lookTarget =
    new THREE.Vector3(
      player.position.x,
      player.position.y + 1.25,
      player.position.z
    );


  camera.lookAt(
    lookTarget
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
      "100%";

  }


  if (armor) {

    armor.style.width =
      "70%";

  }

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
        window.devicePixelRatio || 1,
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


/* =========================================================
   START
========================================================= */

function startGame() {

  setLoading(
    100,
    "Welcome to Crime World"
  );


  updateHUD();


  setTimeout(
    hideLoadingScreen,
    700
  );


  setTimeout(
    loadPlayer,
    500
  );

}


/* =========================================================
   BOOT
========================================================= */

setLoading(
  20,
  "Building the city..."
);


animate();


startGame();
