import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "gamediv",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: function () {
      this.load.image("sky", "assets/space3.png");
      this.load.image("logo", "assets/logo.png");
      this.load.image("red", "assets/red.png");
    },
    create: function () {
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
    },
  },
};

export let Game = null;

export const CreateGame = function (title) {
  console.log(document.getElementById(title));
  config.parent = title;
  Game = new Phaser.Game(config);
};
