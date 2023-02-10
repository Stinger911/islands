import Phaser from "phaser";
import { useMainStore } from "src/stores/main";

class JumpView extends Phaser.Scene {
  constructor() {
    super("JumpView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    const state = useMainStore();
    state.scene = "Jump";
    // Used for preloading assets into your scene, such as
    this.load.image("jump_back", "assets/space3.png");
    this.load.image("red", "assets/red.png");
  }

  create(data) {
    // Used to add objects to your game
    this.add.image(400, 300, "jump_back");

    var particles = this.add.particles("red");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    var logo = this.physics.add.image(400, 100, "red");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    this.game.events.on("exit", () => {
      this.exitFunc(this);
    });
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }

  exitFunc(gameObj) {
    // console.log("jump exit", this.game.events);
    this.game.events.removeListener("exit");
    this.game.scene.stop("JumpView");
    this.game.scene.start("PlanetView");
  }
}

export default JumpView;
