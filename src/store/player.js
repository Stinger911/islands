import store from "./store";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  findAdjacentTile,
  MOVE_NONE,
} from "./constants";

export default function () {
  return {
    hp: 5,
    xp: 0,
    dir: MOVE_LEFT,
    location: {
      face: 0,
      row: 4,
      col: 0,
    },
    coords: {
      x: 0,
      y: 0,
      s: 0,
    },
  };
}

export const playerActions = {
  moveLeft() {
    doMove(MOVE_LEFT);
  },
  moveRight() {
    doMove(MOVE_RIGHT);
  },
  moveUp() {
    doMove(MOVE_UP);
  },
  moveDown() {
    doMove(MOVE_DOWN);
  },
  doAction() {
    console.log("Call action");
    const pos = store.state.player.location;
    // TODO: chaeck for collision with entities
    const ent = store.state.planet.entities.filter((v, i) => {
      return (
        v.loc.face == pos.face && v.loc.row == pos.row && v.loc.col == pos.col
      );
    });
    if (ent.length > 0) {
      console.log("Collided: ", ent);
      let enemies = ent.find((v) => {
        return v.class === "ENM";
      });
      if (enemies) store.state.inFight = ent;
      else store.state.inGather = ent;
      return;
    }
    // Check terrain objects
    const terr = store.state.planet.faces[pos.face][pos.row][pos.col];
    switch (terr) {
      case "B":
        store.state.showBeacon = true;
        break;
      case "S":
        store.state.showCity = true;
        break;
      case "o":
        store.state.showObserve = true;
        break;
    }
  },
};

function doMove(dir) {
  const nt = findAdjacentTile(
    store.state.planet.size,
    store.state.player.location,
    dir
  );
  if (
    !nt ||
    store.state.planet.faces[nt.tile.face][nt.tile.row][nt.tile.col] === "X"
  ) {
    return;
  }
  store.state.player.dir = nt.newDirection;
  store.state.player.location = {
    ...nt.tile,
  };
  if (store.state.pixi) {
    store.state.pixi.moveEntity(
      "@",
      store.state.player.location,
      store.state.player.dir
    );
  }
  // move other entities
  store.state.planet.entities.forEach((v, i) => {
    const tag = `${i}-${v.sprite}`;
    if (v.movement !== MOVE_NONE) {
      const np = v.movement(store.state.planet, store.state.game.rng);
      if (np) store.state.pixi.moveEntity(tag, np, np.dir);
    }
  });
}
