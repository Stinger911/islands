import seedrandom from "seedrandom";
import { replaceAt } from "./support";

export const TERRAIN = {
  GROUND: 0,
  BUSH: 1,
  FOREST: 2,
  WATER: 3,
  WALL: 4,
};
export class Triangle {
  constructor(sz, dir) {
    // Triangle vertexes and points:
    //       (1)           (1)
    //       / \            |\
    //    2 /   \ 3       2 | \ 3
    //     /     \          |  \
    //  (3)-------(2)     (3)---(2)
    //        1               1
    this.size = sz;
    this.dir = dir;
    this.hex = new Array((sz + 1) * (sz / 2));
    this.con = [(null, 1), (null, 2), (null, 0)];
  }

  // It uses the formula for triangular numbers, n*(n+1)/2
  // to calculate the index value.
  rq2idx(r, q) {
    return (r * (r + 1)) / 2 + q;
  }

  // It first find out the value of r by solving the quadratic equation
  //        r^2+r-2*idx = 0,
  // then it calculate the value of q using the reverse formula of triangular numbers
  //        q = idx - (r*(r+1)/2)
  // In this version, it returns both values in an array.
  idx2rq(idx) {
    let r = Math.floor((Math.sqrt(8 * idx + 1) - 1) / 2);
    let q = idx - (r * (r + 1)) / 2;
    return [r, q];
  }

  fromFlatUp(flatMap, offset = 0) {
    if (flatMap.length < this.size || flatMap[0].length < this.size + offset) {
      throw "Not enough data for Triangle of " + this.size;
    }
    for (let r = 1, p = 0; r <= this.size; r++) {
      let sh = Math.floor((this.size - r) / 2);
      for (let i = 0; i < r; i++) {
        this.hex[p + i] = flatMap[r - 1][offset + sh + i];
      }
      p += r;
    }
  }

  fromFlatDown(flatMap, offset = 0) {
    if (flatMap.length < this.size || flatMap[0].length < this.size + offset) {
      throw "Not enough data for Triangle of " + this.size;
    }
    for (let r = 1, p = 0; r <= this.size; r++) {
      let sh = Math.floor((this.size - r) / 2);
      for (let i = 0; i < r; i++) {
        this.hex[p + i] = flatMap[this.size - r][offset + sh + r - i - 1];
      }
      p += r;
    }
  }

  turnedMap(clockwise) {
    let mtrx = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      mtrx[i] = new Array(this.size);
    }
    let p = 0;
    for (let r = 0; r < this.size; r++) {
      for (let q = 0; q <= r; q++) {
        if (clockwise) {
          mtrx[q + this.size - r - 1][this.size - r - 1] = this.hex[p];
        } else {
          mtrx[this.size - q - 1][r] = this.hex[p];
        }
        p++;
      }
    }
    // console.log(mtrx);
    if (clockwise) {
      for (let i = 0; i < this.size - 1; i++) {
        mtrx[i].splice(i + 1);
      }
    } else {
      for (let i = 0; i < this.size - 1; i++) {
        mtrx[i].splice(0, this.size - i - 1);
      }
    }
    // console.log(mtrx.flat());
    return mtrx.flat();
  }
}

export class PlanetMap {
  constructor(tris, triSize, seed) {
    this.triSize = triSize;
    this.seed = seed;
    this.triangles = new Array(tris);
  }

  move(tri, hex, dir) {
    return tri, hex;
  }

  generate() {}

  zone(tri, hex) {
    let map = new Array(this.triSize * 2);
    const wid = this.triSize * 2 + 1;
    for (let i = 0; i < map.length; i++) {
      map[i] = new Array(wid).fill(0, 0, wid);
    }
    return { map: map, bld: [] };
  }

  /**
   * Put given triangle onto the plane point up
   *
   * @param {*} map     - two-dim array of the result
   * @param {*} x       - offset to the enclosing rect
   * @param {*} y       - offset to the enclosing rect
   * @param {*} triHex  - one-dim array of the triangle's hexes
   * @param {*} triSz   - size of the triangle
   */
  putOnMapUp(map, x, y, triHex, triSz) {
    let p = 0;
    let xx = 0;
    for (let r = 0; r < triSz; r++) {
      for (let q = 0; q < r + 1; q++) {
        let yy = y + r;
        xx = x + Math.floor((triSz - r) / 2) + q;
        if (triSz % 2 == 1) {
          if (yy % 2 == 1 && y % 2 == 0) xx--;
        } else {
          if (yy % 2 == 0 && y % 2 == 1) xx++;
        }
        if (0 <= xx < map[0].length && 0 <= yy < map.length) {
          map[yy][xx] = triHex[p];
        }
        p++;
      }
    }
  }

  /**
   * Put given triangle onto the plane point down
   *
   * @param {*} map     - two-dim array of the result
   * @param {*} x       - offset to the enclosing rect
   * @param {*} y       - offset to the enclosing rect
   * @param {*} triHex  - one-dim array of the triangle's hexes
   * @param {*} triSz   - size of the triangle
   */
  putOnMapDown(map, x, y, triHex, triSz) {
    let p = 0;
    let xx = 0;
    for (let r = 0; r < triSz; r++) {
      for (let q = 0; q < r + 1; q++) {
        let yy = y + triSz - r - 1;
        // if (triSz % 2 == 0) {
        //   xx = x + Math.ceil((triSz - r) / 2) + q;
        // } else {
        xx = x + Math.floor((triSz - r) / 2) + (r - q);
        if (yy % 2 == 1 && y % 2 == 0) xx--;
        // }
        if (0 <= xx < map[0].length && 0 <= yy < map.length) {
          map[yy][xx] = triHex[p];
        }
        p++;
      }
    }
  }

  /**
   * fills plane of (Width x Height) with given load
   *
   * @param {*} w       - width of the plane
   * @param {*} h       - height of the plain
   * @param {*} load    - density of the elements
   * @param {*} style   - 0..1 from straight line to complitly spot
   * @param {*} density - chanse to produse separated chunks
   * @returns two-dimensional array of the generated plane
   */
  fillPlane(w, h, load, style = 0.5, density = 0.5) {
    function movePoint(x, y, d) {
      switch (d) {
        case 0:
          y = y - 1;
          if (y < 0) y = h - 1;
          break;
        case 1:
          x = x + 1;
          if (x == w) x = 0;
          break;
        case 2:
          y = y + 1;
          if (y == h) y = 0;
          break;
        case 3:
          x = x - 1;
          if (x < 0) x = w - 1;
          break;
      }
      return [x, y];
    }
    const plane = Array(h).fill(" ".repeat(w));
    const rng = seedrandom(this.seed);
    let leftover = Math.floor(w * h * (load + (rng() * load) / 10)); // 10% variations of load
    let x = Math.floor(rng() * w);
    let y = Math.floor(rng() * h);
    let ld = -1; // last direction not defined yet

    while (leftover > 0) {
      // set point
      plane[y] = replaceAt(plane[y], x, ".");
      leftover -= 1;
      let local_style = rng();
      if (ld === -1 || local_style < style) {
        let nd = Math.floor(rng() * 4);
        if (local_style < style && nd == ld) {
          // force change direction
          nd = (nd + 1) % 4;
        }
        ld = nd;
      }
      let np = movePoint(x, y, ld);
      x = np[0];
      y = np[1];
      if (plane[y][x] === ".") {
        // restart chunk
        if (rng() < density) {
          // move to next free point
          np = movePoint(x, y, ld);
          while (plane[np[1]][np[0]] === ".") {
            if (np[0] === x && np[1] === y) {
              break; // return to current point
            }
            np = movePoint(np[0], np[1], ld);
          }
          x = np[0];
          y = np[1];
        }
        if (plane[y][x] === ".") {
          // choose new point
          while (plane[y][x] === ".") {
            x = Math.floor(rng() * w);
            y = Math.floor(rng() * h);
          }
        }
      }
    }
    return plane;
  }
}

export class Tetrahedron extends PlanetMap {
  constructor(triSize, terrain, seed) {
    super(4, triSize, seed);
    this.terrain = terrain;
  }

  fromFlat(flatMap) {
    const shift = this.triSize % 2;
    const wid = this.triSize * 2 + 3 - shift;
    if (flatMap.length < this.triSize || flatMap[0].length < wid) {
      throw "Not enough data for " + this.triSize;
    }

    this.triangles[0] = new Triangle(this.triSize, 3);
    this.triangles[0].fromFlatUp(flatMap, 0);
    this.triangles[0].hex = this.triangles[0].turnedMap(false);
    this.triangles[0].con = [(3, 3), (1, 3), (2, 2)];
    this.triangles[1] = new Triangle(this.triSize, 4);
    this.triangles[1].fromFlatDown(
      flatMap,
      Math.floor(this.triSize / 2) + shift
    );
    this.triangles[1].con = [(3, 2), (2, 3), (0, 2)];
    this.triangles[2] = new Triangle(this.triSize, 5);
    this.triangles[2].fromFlatUp(flatMap, this.triSize + shift);
    this.triangles[2].con = [(3, 1), (0, 3), (1, 2)];
    this.triangles[2].hex = this.triangles[2].turnedMap(true);
    this.triangles[3] = new Triangle(this.triSize, 2);
    this.triangles[3].fromFlatDown(
      flatMap,
      Math.floor((this.triSize * 3) / 2) + 1 + shift
    );
    this.triangles[3].hex = this.triangles[3].turnedMap(true);
    this.triangles[3].con = [(2, 1), (1, 1), (0, 1)];
  }

  generate() {
    // super();
  }
}
