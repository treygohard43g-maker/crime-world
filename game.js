/* =========================================================
   START GAME
========================================================= */

function hideLoadingScreen() {

  const screen =
    document.getElementById("loadingScreen");

  if (screen) {

    screen.classList.add("hidden");

  }

}


/* =========================================================
   START GAME IMMEDIATELY
========================================================= */

function startGame() {

  setLoading(
    100,
    "Welcome to Crime World"
  );

  updateHUD();

  /*
     Do NOT wait for Maria.
     Enter the city immediately.
  */

  setTimeout(() => {

    hideLoadingScreen();

    /*
       Load Maria in the background.
    */

    loadPlayer()
      .then((loaded) => {

        if (loaded) {

          console.log(
            "Maria is now in Crime World."
          );

        } else {

          console.log(
            "Maria could not be loaded."
          );

        }

      })
      .catch((error) => {

        console.error(
          "Maria background loading error:",
          error
        );

      });

  }, 700);

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


/* =========================================================
   BOOT
========================================================= */

startGame();
