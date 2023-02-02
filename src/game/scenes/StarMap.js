import Phaser from "phaser";
import { useMainStore } from "src/stores/main";

class StarMapView extends Phaser.Scene {
  constructor() {
    super("StarMapView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    this.load.image("starMapBack", "assets/images/nebula-wallpaper.jpeg");
    this.load.image("nebula", "assets/red.png");
  }

  create(data) {
    const state = useMainStore();
    state.scene = "StarMap";
    // Used to add objects to your game
    this.add.image(400, 300, "starMapBack");

    var particles = this.add.particles("nebula");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    var logo = this.physics.add.image(400, 100, "nebula");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    this.game.events.on("close", () => {
      this.game.events.removeListener("close");
      this.scene.stop("StarMapView");
      this.scene.start(state.beforeMap);
    });
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }
}

export default StarMapView;
