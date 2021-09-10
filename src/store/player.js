import store from "./store";
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "./constants";

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
};

function doMove(dir) {
  const nt = findAdjacentTile(store.state.player.location, dir);
  if (
    store.state.planet.faces[nt.tile.face][nt.tile.row][nt.tile.col] === "X"
  ) {
    return;
  }
  store.state.player.dir = nt.newDirection;
  store.state.player.location = {
    ...nt.tile,
  };
}

function findAdjacentTile(originTile, direction) {
  let targetTile = null,
    newDirection = direction;
  let fSize = store.state.planet.size - 1;
  //check if tile is on the same face
  if (direction === MOVE_RIGHT && originTile.col + 1 <= fSize) {
    targetTile = {
      face: originTile.face,
      row: originTile.row,
      col: originTile.col + 1,
    };
  } else if (direction === MOVE_LEFT && originTile.col - 1 >= 0) {
    targetTile = {
      face: originTile.face,
      row: originTile.row,
      col: originTile.col - 1,
    };
  } else if (direction === MOVE_DOWN && originTile.row + 1 <= fSize) {
    targetTile = {
      face: originTile.face,
      row: originTile.row + 1,
      col: originTile.col,
    };
  } else if (direction === MOVE_UP && originTile.row - 1 >= 0) {
    targetTile = {
      face: originTile.face,
      row: originTile.row - 1,
      col: originTile.col,
    };
  }
  //tile is on a different face, so we need to get the tile and figure out the directional change
  if (!targetTile) {
    // ONE
    if (originTile.face === 0) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 2,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 3,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 4,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 1,
          row: originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      }
    }
    // TWO
    if (originTile.face === 1) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 0,
          row: fSize,
          col: originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 5,
          row: 0,
          col: originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 3,
          row: originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 2,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      }
    }
    // THREE
    if (originTile.face === 2) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 4,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 1,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 0,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 5,
          row: originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      }
    }
    // FOUR
    if (originTile.face === 3) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 4,
          row: fSize,
          col: originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 1,
          row: 0,
          col: originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 5,
          row: originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 0,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      }
    }
    // FIVE
    if (originTile.face === 4) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 0,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 5,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 2,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 3,
          row: originTile.col,
          col: fSize,
        };
        newDirection = MOVE_LEFT;
      }
    }
    // SIX
    if (originTile.face === 5) {
      if (direction === MOVE_RIGHT) {
        targetTile = {
          face: 2,
          row: fSize,
          col: originTile.row,
        };
        newDirection = MOVE_UP;
      } else if (direction === MOVE_LEFT) {
        targetTile = {
          face: 3,
          row: 0,
          col: originTile.row,
        };
        newDirection = MOVE_DOWN;
      } else if (direction === MOVE_UP) {
        targetTile = {
          face: 1,
          row: originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      } else if (direction === MOVE_DOWN) {
        targetTile = {
          face: 4,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = MOVE_RIGHT;
      }
    }
  }
  return {
    tile: targetTile,
    newDirection: newDirection,
  };
}
