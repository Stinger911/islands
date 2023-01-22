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
  /**
   * Create new triagle
   * Triangle vertexes and points:
   * ```text
   *       (1)           (1)
   *       / \            |\
   *    2 /   \ 3       2 | \ 3
   *     /     \          |  \
   *  (3)-------(2)     (3)---(2)
   *        1               1
   * ```
   * @param {number} sz - the length of the triangle side
   */
  constructor(sz) {
    this.size = sz;
    this.hex = new Array((sz + 1) * (sz / 2));
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

  /**
   * Builds the turned triangle
   *
   * @param {boolean} clockwise dirrection of the rotation clockwise or not
   * @returns {array} turned triangle
   */
  turn(clockwise) {
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
  /**
   *
   * @param {number} tris     - how many triangles will be in the map
   * @param {number} triSize  - which is the size of the triangles
   * @param {*}      seed     - seed for random numbers generator
   */
  constructor(tris, triSize, seed) {
    /**
     * @property Size of the triangle (by side)
     * @type {number}
     */
    this.triSize = triSize;
    /** @property RNG seed for generation */
    this.seed = seed;
    /**
     * @property Set of the triangles
     * @type {Triangle[]}
     */
    this.triangles = new Array(tris);
    for (let i = 0; i < this.triangles.length; i++) {
      this.triangles[i] = new Triangle(triSize);
    }
    /**
     * Array of {@link this.tris} elements. Each element contains 3 records,
     * for the sides as defined if {@link Triangle} description. In each record
     * there are three elements: index of connected triangle, orientation of
     * the connected triangle if base is on position 0, and the connected side.
     * @property
     * @protected
     */
    this.connections = [...Array(tris)].map((e) => Array(tris));
    /**
     * Two dimensional array of fills of the zone map
     * Initially (at each iteration of zone map generation) it contains
     * the mark of the triangle (UP or DOWN). During the process
     * of the genetation it fills with the triangle indexes. And used later
     * in the movement procedure
     * @property
     * @protected
     */
    this.fill = [
      ["d", "u", "d", "u", "d"],
      ["u", "d", "u", "d", "u"],
      ["d", "u", "d", "u", "d"],
    ];
    /**
     * Set of buildings placed on the planet
     * @property
     * @protected
     */
    this.buildings = [];
    /**
     * Set of objects and enimies placed on the planet
     * @property
     * @protected
     */
    this.objects = [];
  }

  move(tri, hex, dir) {
    return tri, hex;
  }

  /**
   * Generate map for the planet. It is just @interface
   * and must be implemented in each particular planet class
   */
  generate() {}

  /**
   * Make map for zone with given triangle in center
   *
   * @param {number} tri - index of triangle to place into the map center
   * @returns {object}
   */
  zone(tri) {
    this.fill = [
      ["d", "u", "d", "u", "d"],
      ["u", "d", "u", "d", "u"],
      ["d", "u", "d", "u", "d"],
    ];
    const sz = this.triSize * 2 + 1;
    let map = [...Array(sz)].map((e) => new Array(sz).fill(0));
    const st = Math.round(this.triSize / 2);
    const sy = st % 2 == 1 ? st - 1 : st;
    let queue = [];
    queue.push([tri, 0, 1, 2]); // triangle index, position in `fill`
    while (queue.length > 0) {
      let [t, o, fy, fx] = queue.pop();
      // console.log(t, o, fy, fx); // DEBUG
      if (!Number.isInteger(this.fill[fy][fx])) {
        let tx = st + (fx - 2) * st;
        const ty = sy + (fy - 1) * this.triSize;
        if (fy == 0 && fx > 2) {
          // special case to void jump from triangle to itself
          tx--;
        }
        // console.log(tx, ty); // DEBUG
        this.putTriangleToMap(map, tx, ty, this.triangles[t], o);
        if (this.fill[fy][fx] == "u") {
          let nx, ny, nt, no;
          nx = fx;
          ny = fy + 1;
          nt = this.connections[t][o % 3][0];
          no = (this.connections[t][o % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
          nx = fx - 1;
          ny = fy;
          nt = this.connections[t][(o + 1) % 3][0];
          no = (this.connections[t][(o + 1) % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
          nx = fx + 1;
          ny = fy;
          nt = this.connections[t][(o + 2) % 3][0];
          no = (this.connections[t][(o + 2) % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
        } /* d */ else {
          let nx, ny, nt, no;
          nx = fx;
          ny = fy - 1;
          nt = this.connections[t][o % 3][0];
          no = (this.connections[t][o % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
          nx = fx + 1;
          ny = fy;
          nt = this.connections[t][(o + 1) % 3][0];
          no = (this.connections[t][(o + 1) % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
          nx = fx - 1;
          ny = fy;
          nt = this.connections[t][(o + 2) % 3][0];
          no = (this.connections[t][(o + 2) % 3][1] + o) % 6;
          if (0 <= nx && nx < 5 && 0 <= ny && ny < 3) {
            queue.push([nt, no, ny, nx]);
          }
        }
        this.fill[fy][fx] = t;
      }
    }
    // console.log(this.fill); // DEBUG
    return { map: map, bld: [], obj: [] };
  }

  /**
   * Converts [tri, hex] coordinates to the [row, col] coordinates on the
   * current zone map. Returns [-1, -1] if given coordinates are outside
   * the map or map isn;t generated yet, or something was wrong.
   *
   * @param {number} tri index of the triangle
   * @param {number} hex index of the hex in the triangle
   * @returns {array} two-elements array of [row,column] on the zone map
   */
  triHexToZonePoint(tri, hex) {
    return [y, x];
  }

  /**
   * Put given triangle onto the plane with desired direction
   * Direction means the position of the Upper corner of the triangle
   * (which is designated as (1) in the {@link Triangle}
   * ```text
   *      (0)      (5)---(1)
   *      / \         \ /
   *   (4)---(2)      (3)
   * ```
   * @param {array[]}  map  - two-dim array of the result
   * @param {number}   x    - offset to the enclosing rect
   * @param {number}   y    - offset to the enclosing rect
   * @param {Triangle} tri  - triangle (instance) to draw
   * @param {number}   dir  - direction of the upper corner
   */
  putTriangleToMap(map, x, y, tri, dir) {
    switch (dir) {
      case 0:
        this.putOnMapUp(map, x, y, tri.hex, tri.size);
        break;
      case 1:
        this.putOnMapDown(map, x, y, tri.turn(false), tri.size);
        break;
      case 2:
        this.putOnMapUp(map, x, y, tri.turn(true), tri.size);
        break;
      case 3:
        this.putOnMapDown(map, x, y, tri.hex, tri.size);
        break;
      case 4:
        this.putOnMapUp(map, x, y, tri.turn(false), tri.size);
        break;
      case 5:
        this.putOnMapDown(map, x, y, tri.turn(true), tri.size);
        break;
    }
  }

  /**
   * Put given triangle onto the plane point up
   *
   * **PROTECTED:** should not to be used outside this class
   *
   * @param {array[]} map     - two-dim array of the result
   * @param {number}  x       - offset to the enclosing rect
   * @param {number}  y       - offset to the enclosing rect
   * @param {array}   triHex  - one-dim array of the triangle's hexes
   * @param {number}  triSz   - size of the triangle
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
        if (0 <= yy && yy < map.length && 0 <= xx && xx < map[0].length) {
          map[yy][xx] = triHex[p];
        }
        p++;
      }
    }
  }

  /**
   * Put given triangle onto the plane point down
   *
   * **PROTECTED:** should not to be used outside this class
   *
   * @param {array[]} map     - two-dim array of the result
   * @param {number}  x       - offset to the enclosing rect
   * @param {number}  y       - offset to the enclosing rect
   * @param {array}   triHex  - one-dim array of the triangle's hexes
   * @param {number}  triSz   - size of the triangle
   */
  putOnMapDown(map, x, y, triHex, triSz) {
    let p = 0;
    let xx = 0;
    for (let r = 0; r < triSz; r++) {
      for (let q = 0; q < r + 1; q++) {
        let yy = y + triSz - r - 1;
        xx = x + Math.floor((triSz - r) / 2) + (r - q);
        if (yy % 2 == 1 && y % 2 == 0) xx--;
        if (0 <= yy && yy < map.length && 0 <= xx && xx < map[yy].length) {
          map[yy][xx] = triHex[p];
        }
        p++;
      }
    }
  }

  /**
   * fills plane of (Width x Height) with given load
   *
   * @param {number} w       - width of the plane
   * @param {number} h       - height of the plain
   * @param {*}      rng     - random number generator instance
   * @param {number} load    - 0..1 density of the elements
   * @param {number} style   - 0..1 from straight line to complitly spot
   * @param {number} density - 0..1 chanse to produse separated chunks
   * @returns two-dimensional array of the generated plane
   */
  fillPlane(w, h, rng, load, style = 0.5, density = 0.5) {
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

    this.triangles[0].fromFlatUp(flatMap, 0);
    this.triangles[0].hex = this.triangles[0].turn(false);
    this.triangles[0].con = [(3, 3), (1, 3), (2, 2)];

    this.triangles[1].fromFlatDown(
      flatMap,
      Math.floor(this.triSize / 2) + shift
    );
    this.triangles[1].con = [(3, 2), (2, 3), (0, 2)];

    this.triangles[2].fromFlatUp(flatMap, this.triSize + shift);
    this.triangles[2].con = [(3, 1), (0, 3), (1, 2)];
    this.triangles[2].hex = this.triangles[2].turn(true);

    this.triangles[3].fromFlatDown(
      flatMap,
      Math.floor((this.triSize * 3) / 2) + 1 + shift
    );
    this.triangles[3].hex = this.triangles[3].turn(true);
    this.triangles[3].con = [(2, 1), (1, 1), (0, 1)];

    this.connections = [
      [
        [3, 5, 3],
        [1, 1, 3],
        [2, 5, 2],
      ], // junction to first triangle (0)
      [
        [3, 1, 2],
        [2, 1, 3],
        [0, 5, 2],
      ], // junction to second triangle (1)
      [
        [3, 3, 1],
        [0, 1, 3],
        [2, 5, 2],
      ], // junction to third triangle (2)
      [
        [2, 3, 1],
        [1, 5, 1],
        [0, 1, 1],
      ], // junction to forth triangle (3)
    ];
  }

  generate() {
    const rng = seedrandom(this.seed);
    // room for one row of 6 triangles
    const wid = Math.floor((this.triSize * (6 + 1)) / 2) + (6 - 1);
    const mp = new Array();
    // ToDo make variations depends on the terrain type
    const G = this.fillPlane(wid, this.triSize, rng, 0.3, 0.8, 0.8); // 1 bushes
    const T = this.fillPlane(wid, this.triSize, rng, 0.3, 0.3, 0.8); // 2 trees
    const X = this.fillPlane(wid, this.triSize, rng, 0.15, 0.3, 0.3); //3 Walls (huge mountains)
    const W = this.fillPlane(wid, this.triSize, rng, 0.1, 0.2, 0.2); // 4 water
    for (let r = 0; r < this.triSize; r++) {
      let rw = new Array(wid);
      for (let c = 0; c < wid; c++) {
        let cell = 0;
        if (G[r][c] === ".") {
          cell = 1; // "bushes"
        }
        if (T[r][c] === ".") {
          cell = 2; // "forest"
        }
        if (X[r][c] === ".") {
          cell = 3; //  wall
        }
        if (W[r][c] === ".") {
          cell = 4; // "water"
        }
        rw[c] = cell;
      }
      mp.push(rw);
    }
    this.fromFlat(mp);
  }
}
