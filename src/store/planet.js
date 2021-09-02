export function makePlanet(sz, rng = null) {
  if (rng == null) {
    rng = Math.random;
  }
  const fc = [];
  for (let f = 0; f < 6; f++) {
    const fx = [];
    const X = fillPlane(sz, .15, rng, .3, .2);
    const T = fillPlane(sz, .3, rng, .3, .8);
    const G = fillPlane(sz, .3, rng, .8, .8);
    const W = fillPlane(sz, .1, rng, .2, .2);
    for (let r = 0; r < sz; r++) {
      let rw = "";
      for (let c = 0; c < sz; c++) {
        let cell = " ";
        if (G[r][c] === ".") {
          cell = "g"; // "bushes"
        }
        if (T[r][c] === ".") {
          cell = "T"; // "forest"
        }
        if (X[r][c] === ".") {
          cell = "X"; //  wall
        }
        if (W[r][c] === ".") {
          cell = "w"; // "water"
        }
        rw = rw + cell;
      }
      fx.push(rw);
    }
    fc.push(fx);
  }
  return {
    name: "Random Planet",
    size: sz,
    type: "grass",
    faces: fc,
  }
}

// filss plane with given load (0..1)
// style 0..1 from straight line to complitly spot
// density - chanse to produse separated chunks
// directions are: . 0 .
//                 3   1
//                 . 2 .
export function fillPlane(sz, load, rng = null, style = 0.5, density = 0.5) {
  const plane = Array(sz).fill(" ".repeat(sz));
  if (rng == null) {
    rng = Math.random;
  }
  let leftover = Math.floor(sz * sz * (load + (rng() * load / 10))); // 10% variations of load
  let x = Math.floor(rng() * sz);
  let y = Math.floor(rng() * sz);
  let ld = -1; // last direstion not defined yet

  while (leftover > 0) {
    // set point
    plane[y] = plane[y].replaceAt(x, ".");
    leftover -= 1;
    let local_style = rng();
    if (ld === -1 || local_style < style) {
      let nd = Math.floor(rng() * 4)
      if (local_style < style && nd == ld) { // force change direction
        nd = (nd + 1) % 4;
      }
      ld = nd;
    }
    let np = movePoint(x, y, sz, ld);
    x = np[0];
    y = np[1];
    if (plane[y][x] === ".") {
      // restart chunk
      if (rng() < density) {
        // move to next free point
        np = movePoint(x, y, sz, ld);
        while (plane[np[1]][np[0]] === ".") {
          if (np[0] === x && np[1] === y) {
            break; // return to current point
          }
          np = movePoint(np[0], np[1], sz, ld);
        }
        x = np[0];
        y = np[1];
      }
      if (plane[y][x] === ".") {
        // choose new point
        while (plane[y][x] === ".") {
          x = Math.floor(rng() * sz);
          y = Math.floor(rng() * sz);
        }
      }
    }
  }
  return plane;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function movePoint(x, y, sz, d) {
  switch (d) {
    case 0:
      y = y - 1;
      if (y < 0)
        y = sz - 1;
      break;
    case 1:
      x = x + 1;
      if (x == sz)
        x = 0;
      break;
    case 2:
      y = y + 1;
      if (y == sz)
        y = 0;
      break;
    case 3:
      x = x - 1;
      if (x < 0)
        x = sz - 1;
      break;
  }
  return [x, y];
}
