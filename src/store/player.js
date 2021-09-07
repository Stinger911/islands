import store from "src/store/store";

export default function () {
  return {
    hp: 5,
    xp: 0,
    dir: "left",
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
  if (direction === "right" && originTile.col + 1 <= fSize) {
    targetTile = {
      face: originTile.face,
      row: originTile.row,
      col: originTile.col + 1,
    };
  } else if (direction === "left" && originTile.col - 1 >= 0) {
    targetTile = {
      face: originTile.face,
      row: originTile.row,
      col: originTile.col - 1,
    };
  } else if (direction === "down" && originTile.row + 1 <= fSize) {
    targetTile = {
      face: originTile.face,
      row: originTile.row + 1,
      col: originTile.col,
    };
  } else if (direction === "up" && originTile.row - 1 >= 0) {
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
      if (direction === "right") {
        targetTile = {
          face: 2,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = "down";
      } else if (direction === "left") {
        targetTile = {
          face: 3,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = "up";
      } else if (direction === "up") {
        targetTile = {
          face: 4,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = "left";
      } else if (direction === "down") {
        targetTile = {
          face: 1,
          row: originTile.col,
          col: fSize,
        };
        newDirection = "left";
      }
    }
    // TWO
    if (originTile.face === 1) {
      if (direction === "right") {
        targetTile = {
          face: 0,
          row: fSize,
          col: originTile.row,
        };
        newDirection = "up";
      } else if (direction === "left") {
        targetTile = {
          face: 5,
          row: 0,
          col: originTile.row,
        };
        newDirection = "down";
      } else if (direction === "up") {
        targetTile = {
          face: 3,
          row: originTile.col,
          col: 0,
        };
        newDirection = "right";
      } else if (direction === "down") {
        targetTile = {
          face: 2,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = "right";
      }
    }
    // THREE
    if (originTile.face === 2) {
      if (direction === "right") {
        targetTile = {
          face: 4,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = "down";
      } else if (direction === "left") {
        targetTile = {
          face: 1,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = "up";
      } else if (direction === "up") {
        targetTile = {
          face: 0,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = "left";
      } else if (direction === "down") {
        targetTile = {
          face: 5,
          row: originTile.col,
          col: fSize,
        };
        newDirection = "left";
      }
    }
    // FOUR
    if (originTile.face === 3) {
      if (direction === "right") {
        targetTile = {
          face: 4,
          row: fSize,
          col: originTile.row,
        };
        newDirection = "up";
      } else if (direction === "left") {
        targetTile = {
          face: 1,
          row: 0,
          col: originTile.row,
        };
        newDirection = "down";
      } else if (direction === "up") {
        targetTile = {
          face: 5,
          row: originTile.col,
          col: 0,
        };
        newDirection = "right";
      } else if (direction === "down") {
        targetTile = {
          face: 0,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = "right";
      }
    }
    // FIVE
    if (originTile.face === 4) {
      if (direction === "right") {
        targetTile = {
          face: 0,
          row: 0,
          col: fSize - originTile.row,
        };
        newDirection = "down";
      } else if (direction === "left") {
        targetTile = {
          face: 5,
          row: fSize,
          col: fSize - originTile.row,
        };
        newDirection = "up";
      } else if (direction === "up") {
        targetTile = {
          face: 2,
          row: fSize - originTile.col,
          col: fSize,
        };
        newDirection = "left";
      } else if (direction === "down") {
        targetTile = {
          face: 3,
          row: originTile.col,
          col: fSize,
        };
        newDirection = "left";
      }
    }
    // SIX
    if (originTile.face === 5) {
      if (direction === "right") {
        targetTile = {
          face: 2,
          row: fSize,
          col: originTile.row,
        };
        newDirection = "up";
      } else if (direction === "left") {
        targetTile = {
          face: 3,
          row: 0,
          col: originTile.row,
        };
        newDirection = "down";
      } else if (direction === "up") {
        targetTile = {
          face: 1,
          row: originTile.col,
          col: 0,
        };
        newDirection = "right";
      } else if (direction === "down") {
        targetTile = {
          face: 4,
          row: fSize - originTile.col,
          col: 0,
        };
        newDirection = "right";
      }
    }
  }
  return {
    tile: targetTile,
    newDirection: newDirection,
  };
}
