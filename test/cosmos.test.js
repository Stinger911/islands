import seedrandom from "seedrandom";
import { makeSystem } from "../src/game/cosmos";
import { makeName, romanize } from "../src/game/support";

describe("Space Elements Tests", () => {
  function printSystem(sys) {
    let lines = [];
    lines.push(sys.str());
    sys.planets.forEach((v, i) => {
      lines.push("    " + i + ": " + v.str());
    });

    return lines.join("\n");
  }

  it("Basic System Test", () => {
    const rng = seedrandom(0);
    const sys = makeSystem(rng);
    console.log(printSystem(sys));
    expect(sys.planets.length).toBe(2);
    expect(sys.color).toBe(0);
  });

  it("HomeWorld Test", () => {
    const rng = seedrandom(70);
    const sys = makeSystem(rng);
    // console.log(printSystem(sys));
    expect(sys.planets.length).toBe(8);
    expect(sys.color).toBe(2);
    expect(sys.main).toBe(5);
    expect(sys.planets[5].mass).toBe(8);
    expect(sys.planets[5].orbit).toBe(3.5);
  });

  it("Romanize Test", () => {
    expect(romanize(1994)).toBe("MCMXCIV");
  });

  it("Name Generator Test", () => {
    const rng = seedrandom(0);
    expect(makeName(rng)).toBe("Itdi");
    // completly unpredicatble
    expect(makeName(null)).not.toBe("");
  });

  it("100k generation Test", () => {
    for (let i = 71; i < 100000; i++) {
      makeSystem(seedrandom(i));
    }
  });

  // it("Found Home Systems", () => {
  //   let count = 10;
  //   for (let i = 71; count > 0 && i < 1000000; i++) {
  //     let ss = makeSystem(seedrandom(i));
  //     let p = ss.planets[ss.main];
  //     if (
  //       (ss.color == 1 || ss.color == 2) &&
  //       ss.main > 1 &&
  //       ss.planets.length > 4 &&
  //       ss.planets.length < 11 &&
  //       p.mass > 7 &&
  //       p.orbit > 1 &&
  //       p.orbit < 4
  //     ) {
  //       console.log(i, printSystem(ss));
  //       count--;
  //     }
  //   }
  // });
});
