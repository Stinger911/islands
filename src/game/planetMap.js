class Triangle {
  constructor(sz, dir) {
    this.size = sz;
    this.dir = dir;
    this.hex = new Array((sz + 1) * (sz / 2));
  }
}

class PlanetMap {
  constructor(tris, triSize) {
    this.triSize = triSize;
    this.triangles = new Array(tris);
  }

  move(tri, hex, dir) {
    return { tri: tri, hex: hex };
  }

  zone(tri, hex, zoom) {
    if (zoom < 1) {
      zoom = 1;
    }
    if (zoom > this.triSize) {
      zoom = this.triSize;
    }
    let map = new Array(zoom + 2);
    const wid = Math.round((zoom * 4) / 3);
    for (let i = 0; i < map.length; i++) {
      map[i] = new Array(wid + 2);
      // ToDo: fill the row
      Array.fill(map[i], "*", 0, wid + 2);
    }
    return { map: map, bld: [] };
  }
}

export class Tetrahedron extends PlanetMap {
  constructor(triSize, terrain, rng) {
    super(4, triSize);
  }
}

export class Octahedron extends PlanetMap {
  constructor(triSize, terrain, rng) {
    super(8, triSize);
  }
}
