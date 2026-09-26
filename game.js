/* =========================================================
   CRIME WORLD
   Third-Person Open World Prototype
========================================================= */

import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =========================================================
   BASIC ELEMENTS
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

function setLoading(percent, text) {

  if (loadingFill) {
    loadingFill.style.width =
      `${percent}%`;
  }

  if (loadingText) {
    loadingText.textContent =
      text;
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
  new THREE.Color(0x9bb7c9);

scene.fog =
  new THREE.Fog(
    0x9bb7c9,
    80,
    420
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
  4,
  10
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.15;


game.appendChild(renderer.domElement);


/* =========================================================
   LIGHTING
========================================================= */

const skyLight =
  new THREE.HemisphereLight(
    0xbfdcff,
    0x39434c,
    2.2
  );

scene.add(skyLight);


const sun =
  new THREE.DirectionalLight(
    0xfff1d0,
    3.2
  );

sun.position.set(
  80,
  120,
  50
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -180;
sun.shadow.camera.right = 180;
sun.shadow.camera.top = 180;
sun.shadow.camera.bottom = -180;

sun.shadow.camera.near = 1;
sun.shadow.camera.far = 500;

scene.add(sun);


/* =========================================================
   WORLD
========================================================= */

const WORLD_SIZE = 360;


/* =========================================================
   GROUND
========================================================= */

const groundGeometry =
  new THREE.PlaneGeometry(
    WORLD_SIZE,
    WORLD_SIZE
  );

const groundMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x4d5758,
    roughness: 0.95,
    metalness: 0.02
  });

const ground =
  new THREE.Mesh(
    groundGeometry,
    groundMaterial
  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   ROADS
========================================================= */

function createRoad(
  x,
  z,
  width,
  length,
  rotation = 0
) {

  const roadGeometry =
    new THREE.PlaneGeometry(
      width,
      length
    );

  const roadMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x25292c,
      roughness: 0.9
    });

  const road =
    new THREE.Mesh(
      roadGeometry,
      roadMaterial
    );

  road.rotation.x =
    -Math.PI / 2;

  road.rotation.z =
    rotation;

  road.position.set(
    x,
    0.012,
    z
  );

  road.receiveShadow = true;

  scene.add(road);

}


/* Main roads */

createRoad(
  0,
  0,
  18,
  WORLD_SIZE,
  0
);

createRoad(
  0,
  0,
  WORLD_SIZE,
  18,
  0
);

createRoad(
  -90,
  0,
  12,
  WORLD_SIZE,
  0
);

createRoad(
  90,
  0,
  12,
  WORLD_SIZE,
  0
);

createRoad(
  0,
  -90,
  WORLD_SIZE,
  12,
  0
);

createRoad(
  0,
  90,
  WORLD_SIZE,
  12,
  0
);


/* =========================================================
   SIDEWALKS
========================================================= */

function createSidewalk(
  x,
  z,
  width,
  length,
  rotation = 0
) {

  const geometry =
    new THREE.BoxGeometry(
      width,
      0.16,
      length
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x858585,
      roughness: 0.85
    });

  const sidewalk =
    new THREE.Mesh(
      geometry,
      material
    );

  sidewalk.position.set(
    x,
    0.08,
    z
  );

  sidewalk.rotation.y =
    rotation;

  sidewalk.receiveShadow = true;

  scene.add(sidewalk);

}


/* =========================================================
   ROAD MARKINGS
========================================================= */

function createRoadLine(
  x,
  z,
  width,
  length,
  rotation = 0
) {

  const geometry =
    new THREE.PlaneGeometry(
      width,
      length
    );

  const material =
    new THREE.MeshBasicMaterial({
      color: 0xe5e1c9
    });

  const line =
    new THREE.Mesh(
      geometry,
      material
    );

  line.rotation.x =
    -Math.PI / 2;

  line.rotation.z =
    rotation;

  line.position.set(
    x,
    0.025,
    z
  );

  scene.add(line);

}


/* center markings */

for (
  let z = -170;
  z < 170;
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
  x < 170;
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

  const buildingGeometry =
    new THREE.BoxGeometry(
      width,
      height,
      depth
    );


  const buildingMaterial =
    new THREE.MeshStandardMaterial({
      color:
        new THREE.Color()
          .setHSL(
            0.58,
            0.08,
            0.25 +
              Math.random() * 0.18
          ),
      roughness: 0.8,
      metalness: 0.08
    });


  const building =
    new THREE.Mesh(
      buildingGeometry,
      buildingMaterial
    );


  building.position.set(
    x,
    height / 2,
    z
  );

  building.castShadow = true;
  building.receiveShadow = true;

  scene.add(building);


  /* rooftop */

  const roofGeometry =
    new THREE.BoxGeometry(
      width + 0.4,
      0.25,
      depth + 0.4
    );

  const roofMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x202326,
      roughness: 0.9
    });

  const roof =
    new THREE.Mesh(
      roofGeometry,
      roofMaterial
    );

  roof.position.set(
    x,
    height + 0.12,
    z
  );

  roof.castShadow = true;

  scene.add(roof);


  /* windows */

  const windowMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x9fc4d6,
      emissive: 0x172b36,
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
        Math.random() < 0.16
      ) continue;


      const windowGeometry =
        new THREE.BoxGeometry(
          1.15,
          1.35,
          0.08
        );


      const windowMesh =
        new THREE.Mesh(
          windowGeometry,
          windowMaterial
        );


      const wx =
        x -
        width / 2 +
        1.7 +
        column * 3.2;


      const wy =
        2 +
        floor * 3.4;


      const wz =
        z -
        depth / 2 -
        0.06;


      windowMesh.position.set(
        wx,
        wy,
        wz
      );

      scene.add(
        windowMesh
      );

    }

  }

}


/* =========================================================
   CITY BLOCKS
========================================================= */

const buildingBlocks = [

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
  const building of buildingBlocks
) {

  createBuilding(
    ...building
  );

}


/* =========================================================
   SMALLER CITY BUILDINGS
========================================================= */

for (
  let x = -155;
  x <= 155;
  x += 38
) {

  for (
    let z = -155;
    z <= 155;
    z += 38
  ) {

    const nearMainRoad =
      Math.abs(x) < 22 ||
      Math.abs(z) < 22;

    if (nearMainRoad)
      continue;


    if (
      Math.random() < 0.48
    ) {

      const width =
        18 +
        Math.random() * 10;

      const depth =
        18 +
        Math.random() * 10;

      const height =
        12 +
        Math.random() * 28;


      createBuilding(
        x,
        z,
        width,
        depth,
        height
      );

    }

  }

}


/* =========================================================
   TREES
========================================================= */

function createTree(
  x,
  z
) {

  const trunkGeometry =
    new THREE.CylinderGeometry(
      0.35,
      0.5,
      3.2,
      8
    );

  const trunkMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x5a3b27
    });

  const trunk =
    new THREE.Mesh(
      trunkGeometry,
      trunkMaterial
    );

  trunk.position.set(
    x,
    1.6,
    z
  );

  trunk.castShadow = true;

  scene.add(trunk);


  const crownGeometry =
    new THREE.SphereGeometry(
      2.4,
      12,
      10
    );

  const crownMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x254f31,
      roughness: 0.9
    });

  const crown =
    new THREE.Mesh(
      crownGeometry,
      crownMaterial
    );

  crown.position.set(
    x,
    4.1,
    z
  );

  crown.scale.y = 1.15;

  crown.castShadow = true;

  scene.add(crown);

}


/* trees around city */

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
  ) continue;


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

  const poleGeometry =
    new THREE.CylinderGeometry(
      0.08,
      0.12,
      6,
      8
    );

  const poleMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x24272a,
      metalness: 0.7,
      roughness: 0.35
    });

  const pole =
    new THREE.Mesh(
      poleGeometry,
      poleMaterial
    );

  pole.position.set(
    x,
    3,
    z
  );

  pole.castShadow = true;

  scene.add(pole);


  const lampGeometry =
    new THREE.SphereGeometry(
      0.28,
      10,
      8
    );

  const lampMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xffe9aa,
      emissive: 0xffb83d,
      emissiveIntensity: 2
    });

  const lamp =
    new THREE.Mesh(
      lampGeometry,
      lampMaterial
    );

  lamp.position.set(
    x,
    6,
    z
  );

  scene.add(lamp);


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

  scene.add(light);

}


/* main street lights */

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
   PLAYER STATE
========================================================= */

const playerState = {

  position:
    new THREE.Vector3(
      0,
      0,
      28
    ),

  velocity:
    new THREE.Vector3(),

  rotation: 0,

  speed: 5,

  runSpeed: 9,

  running: false

};


let player = null;

let mixer = null;

let animations = {};

let activeAnimation = null;


/* =========================================================
   MARIA LOADER
========================================================= */

async function loadPlayer() {

  try {

    setLoading(
      100,
      "Entering Crime World..."
    );


    /*
      GLTFLoader is loaded separately so
      it cannot prevent the main game
      from starting.
    */

    const module =
      await import(
        "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js"
      );


    const GLTFLoader =
      module.GLTFLoader;


    const loader =
      new GLTFLoader();


    const modelPath =
      "assets/characters/Maria%20WProp%20J%20J%20Ong.glb";


    loader.load(

      modelPath,

      (gltf) => {

        console.log(
          "Maria loaded successfully."
        );


        player =
          gltf.scene;


        /* measure character */

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


        /*
          Scale Maria to approximately
          real human height.
        */

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


        /* animations */

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
              clip.name
                .toLowerCase();


            animations[key] =
              mixer.clipAction(
                clip
              );


            console.log(
              "Maria animation:",
              clip.name
            );

          }


          playBestAnimation(
            [
              "idle",
              "standing",
              "breathing"
            ]
          );

        }


        /*
          Put camera behind Maria
          immediately.
        */

        camera.position.set(
          player.position.x,
          player.position.y + 3.2,
          player.position.z + 7
        );

      },

      (progress) => {

        if (
          progress.total
        ) {

          const percent =
            progress.loaded /
            progress.total *
            100;


          console.log(
            `Maria loading: ${Math.round(percent)}%`
          );

        }

      },

      (error) => {

        console.error(
          "Maria could not be loaded:",
          error
        );

      }

    );

  } catch (error) {

    console.error(
      "Maria loader error:",
      error
    );

  }

}


/* =========================================================
   ANIMATION
========================================================= */

function playBestAnimation(
  names
) {

  if (!mixer)
    return;


  let found = null;


  for (
    const name of names
  ) {

    const key =
      Object.keys(
        animations
      ).find(
        animationName =>
          animationName.includes(
            name
          )
      );


    if (key) {

      found =
        animations[key];

      break;

    }

  }


  if (!found) {

    const first =
      Object.values(
        animations
      )[0];


    if (first)
      found = first;

  }


  if (
    found &&
    found !== activeAnimation
  ) {

    if (activeAnimation) {

      activeAnimation.fadeOut(
        0.2
      );

    }


    found.reset()
      .fadeIn(0.2)
      .play();


    activeAnimation =
      found;

  }

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

let joystickActive = false;


if (joystick) {

  joystick.addEventListener(
    "pointerdown",
    (event) => {

      joystickActive =
        true;

      joystick.setPointerCapture(
        event.pointerId
      );

    }
  );


  joystick.addEventListener(
    "pointermove",
    (event) => {

      if (
        !joystickActive
      )
        return;


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


      if (joystickKnob) {

        joystickKnob.style.transform =
          `translate(${dx}px, ${dy}px)`;

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


function resetJoystick() {

  joystickActive =
    false;

  joystickX = 0;

  joystickY = 0;


  if (joystickKnob) {

    joystickKnob.style.transform =
      "translate(0, 0)";

  }

}


/* =========================================================
   RUN
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

}


/* =========================================================
   CAMERA TOUCH
========================================================= */

const cameraTouchArea =
  document.getElementById(
    "cameraTouchArea"
  );


let cameraTouching = false;

let lastTouchX = 0;

let cameraAngle = 0;


if (cameraTouchArea) {

  cameraTouchArea.addEventListener(
    "pointerdown",
    (event) => {

      cameraTouching =
        true;

      lastTouchX =
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
        !cameraTouching
      )
        return;


      const movement =
        event.clientX -
        lastTouchX;


      lastTouchX =
        event.clientX;


      cameraAngle -=
        movement * 0.008;

    }
  );


  cameraTouchArea.addEventListener(
    "pointerup",
    () => {

      cameraTouching =
        false;

    }
  );


  cameraTouchArea.addEventListener(
    "pointercancel",
    () => {

      cameraTouching =
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


  const movement =
    new THREE.Vector3(
      joystickX,
      0,
      joystickY
    );


  if (
    movement.lengthSq() > 0.01
  ) {

    movement.normalize();


    const speed =
      playerState.running
        ? playerState.runSpeed
        : playerState.speed;


    /*
      Camera-relative movement.
    */

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


    direction.addScaledVector(
      right,
      movement.x
    );


    direction.addScaledVector(
      forward,
      movement.z
    );


    direction.normalize();


    player.position.addScaledVector(
      direction,
      speed * delta
    );


    /*
      Keep Maria inside the city.
    */

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


    /*
      Character faces movement
      direction.
    */

    const targetRotation =
      Math.atan2(
        direction.x,
        direction.z
      );


    player.rotation.y =
      THREE.MathUtils.lerp(
        player.rotation.y,
        targetRotation,
        0.15
      );


    if (
      playerState.running
    ) {

      playBestAnimation(
        [
          "run",
          "running"
        ]
      );

    } else {

      playBestAnimation(
        [
          "walk",
          "walking",
          "idle",
          "standing"
        ]
      );

    }

  } else {

    playBestAnimation(
      [
        "idle",
        "standing",
        "breathing"
      ]
    );

  }

}


/* =========================================================
   THIRD-PERSON CAMERA
========================================================= */

function updateCamera(
  delta
) {

  if (!player)
    return;


  const distance =
    6.5;


  const height =
    3.0;


  const target =
    new THREE.Vector3(
      player.position.x,
      player.position.y +
        1.35,
      player.position.z
    );


  const desiredPosition =
    new THREE.Vector3(

      player.position.x +
        Math.sin(cameraAngle) *
        distance,

      player.position.y +
        height,

      player.position.z +
        Math.cos(cameraAngle) *
        distance

    );


  camera.position.lerp(
    desiredPosition,
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

  const healthFill =
    document.getElementById(
      "healthFill"
    );


  const armorFill =
    document.getElementById(
      "armorFill"
    );


  if (healthFill) {

    healthFill.style.width =
      "100%";

  }


  if (armorFill) {

    armorFill.style.width =
      "70%";

  }


  const missionTitle =
    document.getElementById(
      "missionTitle"
    );


  const missionText =
    document.getElementById(
      "missionText"
    );


  if (missionTitle) {

    missionTitle.textContent =
      "Welcome to the City";

  }


  if (missionText) {

    missionText.textContent =
      "Explore the city.";

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


  /*
    Hide loading quickly.
    The world does not wait for Maria.
  */

  setTimeout(
    hideLoadingScreen,
    500
  );


  /*
    Maria loads in background.
  */

  setTimeout(
    loadPlayer,
    300
  );

}


/* =========================================================
   BOOT GAME
========================================================= */

setLoading(
  20,
  "Building the city..."
);


animate();


startGame();
