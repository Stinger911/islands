import Phaser from "phaser";
import { useMainStore } from "src/stores/main";

class HangarView extends Phaser.Scene {
  constructor() {
    super("HangarView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    this.load.image("sky", "assets/images/hangar.jpg");
    this.load.image("logo", "assets/logo.png");
    this.load.image("red", "assets/red.png");
  }

  create(data) {
    const state = useMainStore();
    state.scene = "Hangar";
    // Used to add objects to your game
    this.add.image(400, 300, "sky");

    var particles = this.add.particles("red");

    particles.createEmitter({
      speed: 70,
      scale: { start: 0.7, end: 0 },
      x: 450,
      y: 500,
      gravityY: -500,
      blendMode: "ADD",
    });

    var logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(30, 40);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    logo.body.customBoundsRectangle.setPosition(350, 300);
    logo.body.customBoundsRectangle.setSize(200, 200);

    this.input.on("pointerup", () => {
      this.logClick(this);
    });
    this.game.events.on("next", () => {
      this.logClick(this);
    });
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }

  logClick(gameObj) {
    // this.events.emit("planet");
    this.game.scene.stop("HangarView");
    this.game.scene.start("PlanetView");
  }
}

export default HangarView;
