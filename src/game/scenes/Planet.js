import Phaser from "phaser";
import { useMainStore } from "src/stores/main";

class PlanetView extends Phaser.Scene {
  constructor() {
    super("PlanetView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    this.load.image("tiles", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/hexagonal.json");
  }

  create(data) {
    const state = useMainStore();
    state.scene = "Planet";

    var map = this.add.tilemap("map");

    var tileset = map.addTilesetImage("tileset", "tiles");

    var layer = map.createLayer("Calque 1", tileset);

    layer.scale = 3;

    this.game.events.on("next", () => {
      this.logClick(this);
    });

    this.game.events.on("zoomIn", () => {
      if (layer.scale < 18) {
        layer.scale++;
      }
    });

    this.game.events.on("zoomOut", () => {
      if (layer.scale > 3) {
        layer.scale--;
      }
    });
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }

  logClick(gameObj) {
    // this.events.emit("planet");
    this.game.scene.stop("PlanetView");
    this.game.scene.start("HangarView");
  }
}

export default PlanetView;
