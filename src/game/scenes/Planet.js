import Phaser from "phaser";
import { useMainStore } from "src/stores/main";
import { useUserStore } from "src/stores/user";

const TILE_HEIGHT = 76;
const TILE_WIDTH = 66;
class PlanetView extends Phaser.Scene {
  constructor() {
    super("PlanetView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    // target tileset is https://graphicriver.net/item/map-tiles/24002537
    this.load.spritesheet("tiles", "assets/images/tiles.png", {
      frameWidth: TILE_WIDTH,
      frameHeight: TILE_HEIGHT,
    });
    this.load.spritesheet("sprites", "assets/images/sprites.png", {
      frameWidth: 50,
      frameHeight: 70,
    });
  }

  create() {
    const state = useMainStore();
    state.scene = "Planet";

    const gameData = useUserStore();
    var zone = gameData.planet.map.zone(0);
    // console.log(zone);

    var terrain = this.add.group();
    for (var y = 0, hy = TILE_HEIGHT / 4; y < zone.map.length; y++) {
      let hx = 0;
      if (y % 2 == 1) hx += Math.round(TILE_WIDTH / 2);
      for (var x = 0; x < zone.map[y].length; x++) {
        var hexagon = this.add.sprite(hx, hy, "tiles", zone.map[y][x]);
        terrain.add(hexagon);
        hx += TILE_WIDTH;
      }
      hy += Math.round((TILE_HEIGHT * 3) / 4);
    }
    terrain.dysplayX =
      Math.round(TILE_WIDTH * zone.map[0].length) - TILE_WIDTH / 2;
    terrain.dysplayY = Math.round(
      (TILE_HEIGHT * zone.map.length * 3) / 4 - TILE_HEIGHT / 4
    );
    terrain.baseZoom = Math.max(800 / terrain.dysplayX, 600 / terrain.dysplayY);
    terrain.zoom = terrain.baseZoom;
    // console.log(terrain);
    // buildings
    // moving objects
    // player
    y = zone.map.length / 2;
    x = (zone.map[0].length / 2) * TILE_WIDTH;
    if (y % 2 == 1) hx += Math.round(TILE_WIDTH / 2);
    y = y * ((TILE_HEIGHT * 3) / 4) - TILE_HEIGHT / 8;
    this.ship = this.add.sprite(x, y, "sprites", 0);
    this.target = new Phaser.Math.Vector2();
    this.target.x = x;
    this.target.y = y;

    this.cameras.main.setBounds(0, 0, terrain.dysplayX, terrain.dysplayY);
    this.cameras.main.startFollow(this.ship);
    this.cameras.main.setZoom(terrain.baseZoom);

    this.game.events.on("next", () => {
      this.logClick(this);
    });

    this.game.events.on("zoomIn", () => {
      var zm = this.cameras.main.zoom * 1.1;
      if (TILE_HEIGHT * zm > 600) {
        zm = 600 / TILE_HEIGHT;
      }
      this.cameras.main.zoom = zm;
    });

    this.game.events.on("zoomOut", () => {
      var zm = this.cameras.main.zoom * 0.9;
      if (zm < terrain.baseZoom * 2) {
        zm = terrain.baseZoom * 2;
      }
      this.cameras.main.zoom = zm;
    });

    this.game.events.on("zoomReset", () => {
      this.cameras.main.zoom = terrain.baseZoom * 2;
    });

    this.game.events.on("onMove", (dir) => {
      switch (dir) {
        case 1:
          this.ship.setFrame(5);
          this.target.x += TILE_WIDTH / 2;
          this.target.y -= Math.round((TILE_HEIGHT * 3) / 4);
          break;
        case 2:
          this.ship.setFrame(1);
          this.target.x += TILE_WIDTH;
          break;
        case 3:
          this.ship.setFrame(3);
          this.target.x += TILE_WIDTH / 2;
          this.target.y += Math.round((TILE_HEIGHT * 3) / 4);
          break;
        case 4:
          this.ship.setFrame(2);
          this.target.x -= TILE_WIDTH / 2;
          this.target.y += Math.round((TILE_HEIGHT * 3) / 4);
          break;
        case 5:
          this.ship.setFrame(0);
          this.target.x -= TILE_WIDTH;
          break;
        case 6:
          this.ship.setFrame(4);
          this.target.x -= TILE_WIDTH / 2;
          this.target.y -= Math.round((TILE_HEIGHT * 3) / 4);
          break;
        default:
          console.error("Stop to hack!! Dir is " + dir);
          break;
      }
      this.tweens.add({
        targets: this.ship,
        x: this.target.x,
        y: this.target.y,
        delay: 300,
        duration: 1500,
        ease: "Power2",
      });
      // this.ship.setPosition(this.target.x, this.target.y);
      // this.physics.moveToObject(this.ship, this.target, 200);
    });

    setTimeout(() => {
      this.cameras.main.zoom = terrain.baseZoom * 2;
    }, 1);
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }

  removeEvents() {
    this.game.events.removeListener("next");
    this.game.events.removeListener("zoomIn");
    this.game.events.removeListener("zoomOut");
    this.game.events.removeListener("zoomReset");
  }

  logClick(gameObj) {
    // this.events.emit("planet");
    this.removeEvents();
    this.game.scene.stop("PlanetView");
    this.game.scene.start("HangarView");
  }
}

export default PlanetView;
