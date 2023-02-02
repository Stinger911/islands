import seedrandom from "seedrandom";
import { Triangle, Tetrahedron, PlanetMap } from "../src/game/planetMap";

describe("PlanetMap Elements Tests", () => {
  const visualMap5 = [
    [9, 9, 8, 2, 0, 0, 0, 8, 2, 8, 0, 0, 0, 1],
    [9, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 4, 0, 9],
    [9, 0, 0, 0, 0, 2, 0, 0, 8, 0, 0, 4, 0, 9],
    [0, 1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 9, 9],
    [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 8, 2, 9, 9],
  ];

  const visualMap4 = [
    [9, 8, 2, 0, 0, 8, 2, 8, 0, 0, 1],
    [9, 0, 0, 0, 2, 0, 0, 0, 0, 4, 0],
    [0, 1, 0, 0, 0, 0, 8, 0, 0, 0, 9],
    [2, 0, 0, 1, 1, 1, 0, 0, 8, 2, 9],
  ];

  function printTriangle(tri) {
    let val = tri.hex;
    let result = "\n";
    for (let r = 1; r <= tri.size; r++) {
      let s = new Array(tri.size - r).fill(" ", 0, tri.size - r).join("");
      result += "." + s + val.slice(0, r).join(" ") + "\n";
      val = val.slice(r);
    }
    console.log(result);
  }

  function printMap(map) {
    let result = map.map((v, i) => {
      return (
        (i % 2 == 1 ? "| " : "|") + v.join(" ") + (i % 2 == 1 ? "|" : " |")
      );
    });
    return result.join("\n");
  }

  it("Test out triangle", () => {
    const tri = new Triangle(5, 1);
    tri.hex = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    printTriangle(tri);
  });

  it("Test flat to UP triangle", () => {
    const tri = new Triangle(5, 1);
    tri.fromFlatUp(visualMap5, 0);
    // printTriangle(tri);
    let r = tri.hex;
    expect(r[0]).toBe(8);
    expect(r[10]).toBe(2);
    expect(r[14]).toBe(1);
    expect(r[8]).toBe(1);
  });

  it("Test flat to DOWN triangle", () => {
    const tri = new Triangle(5, 1);
    tri.fromFlatDown(visualMap5, 3);
    // printTriangle(tri);
    let r = tri.hex;
    expect(r[0]).toBe(1);
    expect(r[14]).toBe(2);
    expect(r[4]).toBe(2);
  });

  it("Test index to (q,r)", () => {
    const tri = new Triangle(5, 1);
    expect(tri.rq2idx(0, 0)).toBe(0);
    expect(tri.rq2idx(3, 1)).toBe(7);
    expect(tri.rq2idx(4, 0)).toBe(10);
    expect(tri.rq2idx(4, 4)).toBe(14);

    expect(tri.idx2rq(0)).toEqual([0, 0]);
    expect(tri.idx2rq(7)).toEqual([3, 1]);
    expect(tri.idx2rq(10)).toEqual([4, 0]);
    expect(tri.idx2rq(14)).toEqual([4, 4]);
    expect(tri.idx2rq(15)).toEqual([5, 0]);
    expect(tri.idx2rq(20)).toEqual([5, 5]);
    expect(tri.idx2rq(tri.rq2idx(11, 8))).toEqual([11, 8]);
    expect(tri.idx2rq(tri.rq2idx(19, 15))).toEqual([19, 15]);
    expect(tri.idx2rq(tri.rq2idx(22, 23))).toEqual([23, 0]);
  });

  it("Test triangle turn", () => {
    const tri = new Triangle(5, 1);
    tri.fromFlatUp(visualMap5, 0);
    let r = tri.turn(true);
    expect(r[0]).toBe(2);
    r = tri.turn(false);
    expect(r[0]).toBe(1);
  });

  it("Test Tetrahedron from Flat", () => {
    const tri = new Tetrahedron(5, null, null);
    tri.fromFlat(visualMap5);
    // printTriangle(tri.triangles[0]);
    // printTriangle(tri.triangles[1]);
    // printTriangle(tri.triangles[2]);
    // printTriangle(tri.triangles[3]);
    let r = tri.triangles[0].hex;
    expect(r[0]).toBe(1);
    expect(r[14]).toBe(2);
    expect(r[4]).toBe(1);
    r = tri.triangles[1].hex;
    expect(r[0]).toBe(1);
    expect(r[14]).toBe(2);
    expect(r[4]).toBe(2);
    r = tri.triangles[2].hex;
    expect(r[0]).toBe(1);
    expect(r[14]).toBe(2);
    expect(r[4]).toBe(8);
    r = tri.triangles[3].hex;
    expect(r[0]).toBe(1);
    expect(r[14]).toBe(2);
    expect(r[4]).toBe(4);
  });

  it("Make lines", () => {
    const planet = new Tetrahedron(5, "t", 0);
    const rng = seedrandom(0);
    const plane = planet.fillPlane(12, 5, rng, 0.2, 0, 0);
    // console.log("|" + plane.join("|\n|") + "|");
    expect(plane[0]).toBe("            ");
    expect(plane[1]).toBe("            ");
    expect(plane[2]).toBe("............");
    expect(plane[3]).toBe("            ");
    expect(plane[4]).toBe("            ");
  });

  it("Make spots", () => {
    const planet = new Tetrahedron(5, "t", 0);
    const rng = seedrandom(0);
    const plane = planet.fillPlane(12, 5, rng, 0.2, 1, 1);
    // console.log("|" + plane.join("|\n|") + "|");
    expect(plane[3]).toBe("...     ....");
  });

  it("Make random", () => {
    const planet = new Tetrahedron(5, "t", 0);
    const rng = seedrandom(0);
    const plane = planet.fillPlane(12, 5, rng, 0.2);
    console.log("|" + plane.join("|\n|") + "|");
  });

  it("Triangle to map UP", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    let mp = new Array(11);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(11).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapUp(mp, p, p, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    expect(mp[3][5]).toBe(1);
    expect(mp[7][3]).toBe(8);
    expect(mp[7][7]).toBe(2);
  });

  it("Triangle to map UP2", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    let mp = new Array(11);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(11).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapUp(mp, p, p + 1, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    // expect(mp[3][5]).toBe(1);
    // expect(mp[7][3]).toBe(3);
    // expect(mp[7][7]).toBe(2);
  });

  it("Triangle to map UP even", () => {
    const planet = new Tetrahedron(4, "t", 0);
    planet.fromFlat(visualMap4);
    let mp = new Array(9);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(9).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapUp(mp, p, p, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    expect(mp[2][4]).toBe(1);
    expect(mp[5][2]).toBe(8);
    expect(mp[5][5]).toBe(2);
  });

  it("Triangle to map UP even 2", () => {
    const planet = new Tetrahedron(4, "t", 0);
    planet.fromFlat(visualMap4);
    let mp = new Array(9);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(9).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapUp(mp, p, p + 1, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    // expect(mp[2][4]).toBe(1);
    // expect(mp[5][2]).toBe(3);
    // expect(mp[5][5]).toBe(2);
  });

  it("Triangle to map DOWN", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    let mp = new Array(11);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(11).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapDown(mp, p, p, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    expect(mp[7][5]).toBe(1);
    expect(mp[3][7]).toBe(8);
    expect(mp[3][3]).toBe(2);
  });

  it("Triangle to map DOWN", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    let mp = new Array(11);
    for (let i = 0; i < mp.length; i++) {
      mp[i] = new Array(11).fill(".");
    }
    const p = Math.round(planet.triSize / 2);
    planet.putOnMapDown(mp, p, p + 1, planet.triangles[0].hex, planet.triSize);
    // console.log(printMap(mp));
    // expect(mp[3][5]).toBe(1);
    // expect(mp[7][3]).toBe(3);
    // expect(mp[7][7]).toBe(2);
  });

  // it("Triangle to map DOWN even", () => {
  //   const planet = new Tetrahedron(4, "t", 0);
  //   planet.fromFlat(visualMap4);
  //   let mp = new Array(9);
  //   for (let i = 0; i < mp.length; i++) {
  //     mp[i] = new Array(9).fill(".");
  //   }
  //   const p = Math.round(planet.triSize / 2);
  //   planet.putOnMapDown(mp, 0, p + 1, planet.triangles[0].hex, planet.triSize);
  //   console.log(printMap(mp));
  //   // expect(mp[2][4]).toBe(1);
  //   // expect(mp[5][2]).toBe(3);
  //   // expect(mp[5][5]).toBe(2);
  // });

  it("Turn triangle around the clock ODD", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    // room for 2rows of 6 triangles
    // 3 == Math.round(5/2);
    const mp = [...Array(5 * 2)].map((e) =>
      new Array(Math.floor((5 * (6 + 1)) / 2) + (6 - 1)).fill(".")
    );
    for (let i = 0; i < 7; i++) {
      // 3 == Math.round(5/2);
      planet.putTriangleToMap(mp, i * 3, 0, planet.triangles[0], i % 6);
    }
    for (let i = 0; i < 7; i++) {
      // 3 == Math.round(5/2);
      planet.putTriangleToMap(mp, i * 3, 5, planet.triangles[0], (i + 3) % 6);
    }
    // console.log(printMap(mp));
    expect(mp[4]).toEqual([
      8, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 8, 8, 8, 0, 0, 0,
    ]);
    expect(mp[5]).toEqual([
      2, 0, 0, 0, 8, 2, 1, 0, 0, 0, 2, 1, 8, 0, 0, 0, 1, 8, 2, 0, 0, 0,
    ]);
  });

  it("Turn triangle around the clock EVEN", () => {
    const planet = new Tetrahedron(4, "t", 0);
    planet.fromFlat(visualMap4);
    // room for 2rows of 6 triangles
    const mp = [...Array(4 * 2)].map((e) =>
      new Array(Math.floor((4 * (6 + 1)) / 2) + (6 - 1)).fill(".")
    );
    for (let i = 0; i < 7; i++) {
      // 3 == Math.round(5/2);
      planet.putTriangleToMap(
        mp,
        i * 2 + Math.round(i / 2),
        0,
        planet.triangles[0],
        i % 6
      );
    }
    for (let i = 0; i < 7; i++) {
      // 3 == Math.round(5/2);
      planet.putTriangleToMap(
        mp,
        i * 2 + Math.round(i > 0 ? (i - 1) / 2 : 0),
        4,
        planet.triangles[0],
        (i + 3) % 6
      );
    }
    // console.log(printMap(mp));
    expect(mp[3]).toEqual([
      8, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 0, 0, 8, 8, 8, 0, 0, 2,
    ]);
    expect(mp[4]).toEqual([
      2, 0, 0, 8, 2, 1, 0, 0, 2, 1, 8, 0, 0, 1, 8, 2, 0, 0, 8,
    ]);
  });

  it("Make zone map", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    const mp = planet.zone(0);
    console.log(printMap(mp.map));
  });

  it("Generate planet", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.generate();
    const mp = planet.zone(0);
    console.log(printMap(mp.map));
  });

  it("Coordinates Test", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    const mp = planet.zone(0);
    // console.log(planet.coords);
    expect(planet.th2xy(0, 0)).toEqual([5, 2]);
    let cth = planet.xy2th(4, 5);
    // console.log(cth);
    expect(planet.th2xy(cth[0], cth[1])).toEqual([4, 5]);
    cth = planet.th2xy(0, 0);
    // console.log(cth);
    expect(planet.xy2th(cth[0], cth[1])).toEqual([0, 0]);
    cth = planet.th2xy(0, 10);
    // console.log(cth);
    expect(planet.xy2th(cth[0], cth[1])).toEqual([0, 10]);
    cth = planet.th2xy(0, 14);
    // console.log(cth);
    expect(planet.xy2th(cth[0], cth[1])).toEqual([0, 14]);
  });

  it("Move Test", () => {
    const planet = new Tetrahedron(5, "t", 0);
    planet.fromFlat(visualMap5);
    planet.zone(0);
    let t = 0,
      h = 4;
    let log = [];
    for (let s = 0; s < 9; s++) {
      let nc = planet.move(t, h, 2);
      log.push(`{t: ${nc.tri}, h: ${nc.hex}, x: ${nc.x}, y: ${nc.y}}`);
      if (nc.tri != t) {
        // log.push(printMap(planet.fill));
        let mp = planet.zone(nc.tri);
        // log.push(printMap(mp.map));
        // log.push(printMap(planet.fill));
        let [x, y] = planet.th2xy(nc.tri, nc.hex);
        log.push(`=> {t: ${nc.tri}, h: ${nc.hex}, x: ${x}, y: ${y}}`);
      }
      t = nc.tri;
      h = nc.hex;
    }
    console.log(log.join("\n"));
    expect([t, h]).toEqual([0, 4]);
  });
});
