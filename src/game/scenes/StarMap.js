import Phaser from "phaser";

class StarMapView extends Phaser.Scene {
  constructor() {
    super("StarMapView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    this.load.image("sky", "assets/space3.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("red", "assets/red.png");
  }

  create(data) {
    // Used to add objects to your game
    this.add.image(400, 300, "sky");

    var particles = this.add.particles("red");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    var logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }
}

export default StarMapView;
