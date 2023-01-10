import Phaser from "phaser";
import BattleView from "./scenes/Battle";
import HangarView from "./scenes/Hangar";
import JumpView from "./scenes/Jump";
import PlanetView from "./scenes/Planet";
import StarMapView from "./scenes/StarMap";

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
  scene: [HangarView, PlanetView, BattleView, JumpView, StarMapView],
};

export let Game = null;

export const CreateGame = function (title) {
  config.parent = title;
  Game = new Phaser.Game(config);
};
