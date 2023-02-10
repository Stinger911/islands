import Phaser from "phaser";
import { useGameStore } from "src/stores/game";
import { useMainStore } from "src/stores/main";

const TILE_HEIGHT = 200;
const TILE_WIDTH = 173;
const SPR_HEIGHT = 140;
const SPR_WIDTH = 100;

const TILE_BASE = {
  t: 0,
  d: 5,
  r: 10,
  l: 15,
  w: 20,
  i: 20,
};
class PlanetView extends Phaser.Scene {
  constructor() {
    super("PlanetView");
  }

  init() {
    // Used to prepare data
  }

  preload() {
    // Used for preloading assets into your scene, such as
    this.load.spritesheet("tiles", "assets/images/tiles.png", {
      frameWidth: TILE_WIDTH,
      frameHeight: TILE_HEIGHT,
    });
    this.load.spritesheet("sprites", "assets/images/sprites.png", {
      frameWidth: SPR_WIDTH,
      frameHeight: SPR_HEIGHT,
    });
    this.load.spritesheet("builds", "assets/images/buildings.png", {
      frameWidth: TILE_WIDTH,
      frameHeight: TILE_HEIGHT,
    });
  }

  create() {
    const state = useMainStore();
    state.scene = "Planet";

    const gameData = useGameStore();
    /*if (!this.terrain)*/ this.terrain = this.add.group();
    /*if (!this.builds)*/ this.builds = this.add.group();

    //console.log(this);
    const sz = this.drawMap(gameData.loc_tri);

    this.terrain.dysplayX = Math.round(TILE_WIDTH * sz.width) - TILE_WIDTH / 2;
    this.terrain.dysplayY = Math.round(
      (TILE_HEIGHT * sz.height * 3) / 4 - TILE_HEIGHT / 4
    );
    this.terrain.baseZoom = Math.max(
      this.game.config.width / this.terrain.dysplayX,
      this.game.config.height / this.terrain.dysplayY
    );
    // player
    let [x, y] = gameData.planet.map.th2xy(gameData.loc_tri, gameData.loc_hex);
    x *= TILE_WIDTH;
    if (y % 2 == 1) x += Math.round(TILE_WIDTH / 2);
    y = y * ((TILE_HEIGHT * 3) / 4) + TILE_HEIGHT / 4;
    this.ship = this.add.sprite(x, y, "sprites", 1);
    this.ship.depth = 40;
    this.target = new Phaser.Math.Vector2();
    this.target.x = x;
    this.target.y = y;

    this.cameras.main.setBounds(
      0,
      0,
      this.terrain.dysplayX,
      this.terrain.dysplayY
    );
    this.cameras.main.startFollow(this.ship);
    this.cameras.main.setZoom(this.game.config.height / (TILE_HEIGHT * 5));
    console.log(this.cameras.main.zoom);

    this.game.events.on("enter", () => {
      this.removeEvents();
      this.scene.stop("PlanetView");
      this.scene.start("HangarView");
    });

    this.game.events.on("stars", () => {
      this.removeEvents();
      this.scene.stop("PlanetView");
      this.scene.start("StarMapView");
    });

    this.game.events.on("jump", () => {
      this.removeEvents();
      this.scene.stop("PlanetView");
      this.scene.start("JumpView");
    });

    this.game.events.on("zoomIn", () => {
      var zm = this.cameras.main.zoom * 1.1;
      if (TILE_HEIGHT * zm > this.game.config.height) {
        zm = this.game.config.height / TILE_HEIGHT;
      }
      this.cameras.main.zoom = zm;
      this.emitZoom();
    });

    this.game.events.on("zoomOut", () => {
      var zm = this.cameras.main.zoom * 0.9;
      if (zm < this.terrain.baseZoom * 2) {
        zm = this.terrain.baseZoom * 2;
      }
      this.cameras.main.zoom = zm;
      this.emitZoom();
    });

    this.game.events.on("zoomReset", () => {
      this.cameras.main.zoom = this.game.config.height / (TILE_HEIGHT * 5);
      this.emitZoom();
    });

    this.input.keyboard.on("keydown", (event) => {
      // console.log(event, gameData);
      if (event.code == "KeyE") {
        this.game.events.emit("onMove", 1);
      }
      if (event.code == "KeyD" || event.code == "ArrowRight") {
        this.game.events.emit("onMove", 2);
      }
      if (event.code == "KeyX" || event.code == "ArrowDown") {
        this.game.events.emit("onMove", 3);
      }
      if (event.code == "KeyZ") {
        this.game.events.emit("onMove", 4);
      }
      if (event.code == "KeyA" || event.code == "ArrowLeft") {
        this.game.events.emit("onMove", 5);
      }
      if (event.code == "KeyW" || event.code == "ArrowUp") {
        this.game.events.emit("onMove", 6);
      }
    });

    this.game.events.on("onMove", (dir) => {
      const nc = gameData.planet.map.move(
        gameData.loc_tri,
        gameData.loc_hex,
        dir
      );
      // console.log(nc);
      if (nc.tri != gameData.loc_tri) {
        // console.log("Rebuild zone to " + nc.tri);
        this.drawMap(nc.tri);
        let [px, py] = gameData.planet.map.th2xy(
          gameData.loc_tri,
          gameData.loc_hex
        );
        let [x, y] = gameData.planet.map.th2xy(nc.tri, nc.hex);
        x *= TILE_WIDTH;
        if (y % 2 == 1) x += Math.round(TILE_WIDTH / 2);
        y = y * ((TILE_HEIGHT * 3) / 4) + TILE_HEIGHT / 4;
        px *= TILE_WIDTH;
        if (py % 2 == 1) px += Math.round(TILE_WIDTH / 2);
        py = py * ((TILE_HEIGHT * 3) / 4) + TILE_HEIGHT / 4;
        this.tweens.killAll();
        this.ship.setPosition(px, py);
        this.tweens.add({
          targets: this.ship,
          x: x,
          y: y,
          delay: 300,
          duration: 1500,
          ease: "Power2",
        });
      } else if (nc.hex != gameData.loc_hex) {
        // console.log(nc);
        this.target.y = nc.y;
        this.target.x = nc.x * TILE_WIDTH;
        if (this.target.y % 2 == 1) this.target.x += Math.round(TILE_WIDTH / 2);
        this.target.y =
          this.target.y * ((TILE_HEIGHT * 3) / 4) + TILE_HEIGHT / 4;
        this.tweens.add({
          targets: this.ship,
          x: this.target.x,
          y: this.target.y,
          delay: 300,
          duration: 1500,
          ease: "Power2",
        });
      }
      if (0 < dir && dir <= 6) {
        this.ship.setFrame(dir - 1);
      }
      let blds = gameData.planet.map.hasBld(nc.tri, nc.hex);
      state.blds = blds;
      // console.log(state.blds, blds);
      gameData.loc_tri = nc.tri;
      gameData.loc_hex = nc.hex;
    });
  }

  update(time, delta) {
    // Used to update your game. This function runs constantly
  }

  emitZoom() {
    const state = useMainStore();
    const zmn = this.terrain.baseZoom * 2;
    const zmx = this.game.config.height / TILE_HEIGHT;
    state.zoom = (this.cameras.main.zoom - zmn) / (zmx - zmn);
    // console.log(zmx, state.zoom, this.cameras.main.zoom, zmn);
  }

  drawMap(tri) {
    const gameData = useGameStore();
    const t_base = TILE_BASE[gameData.planet.terrain];
    let zone = gameData.planet.map.zone(tri);
    // console.log(zone);

    // terrain
    // clear group before draw
    this.terrain.clear(true, true);
    for (var y = 0, hy = TILE_HEIGHT / 4; y < zone.map.length; y++) {
      let hx = 0;
      if (y % 2 == 1) hx += Math.round(TILE_WIDTH / 2);
      for (var x = 0; x < zone.map[y].length; x++) {
        var hexagon = this.add.sprite(hx, hy, "tiles", zone.map[y][x] + t_base);
        hexagon.depth = 10;
        this.terrain.add(hexagon);
        hx += TILE_WIDTH;
      }
      hy += Math.round((TILE_HEIGHT * 3) / 4);
    }
    // console.log(terrain);
    // buildings
    // clear group before draw
    this.builds.clear(true, true);
    zone.bld.forEach((bld) => {
      var bc = gameData.planet.map.th2xy(bld.tri, bld.hex);
      let hy = bc[1] * Math.round((TILE_HEIGHT * 3) / 4);
      let hx = bc[0] * TILE_WIDTH;
      if (bc[1] % 2 == 1) hx += Math.round(TILE_WIDTH / 2);
      var hexagon = this.add.sprite(hx, hy, "builds", bld.ico);
      if (bld.ani != null) {
        hexagon.anims.create({
          key: "spin",
          frames: this.anims.generateFrameNumbers("builds", {
            frames: bld.ani,
          }),
          frameRate: bld.ani.length,
          repeat: -1,
        });
        hexagon.play("spin");
      }
      hexagon.depth = 20;
      this.builds.add(hexagon);
    });
    // moving objects

    return { width: zone.map[0].length, height: zone.map.length };
  }

  removeEvents() {
    this.game.events.removeAllListeners();
    // this.game.events.removeListener("enter");
    // this.game.events.removeListener("stars");
    // this.game.events.removeListener("jump");
    // this.game.events.removeListener("onMove");
    // this.game.events.removeListener("zoomIn");
    // this.game.events.removeListener("zoomOut");
    // this.game.events.removeListener("zoomReset");
  }
}

export default PlanetView;
