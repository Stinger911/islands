import seedrandom from "seedrandom";
import { makePlanet, placeBuilding } from "./planet";

/*
 * Game Alphabet
 *
 * X - moutains (walls)   T - forest      g - bush
 * w - water (flows)      B - beacon      S - settlement
 * o - observing points
 */

const planetTypes = ["grass", "desert", "lava", "ocean", "snow"];

export function makeGame(seed = null) {
  if (seed == null) {
    seed = Date.now();
  }
  const rng = seedrandom(seed, {
    state: true,
  });
  const home = {
    x: Math.round(rng() * 1000 - 500),
    y: Math.round(rng() * 1000 - 500),
  };

  return {
    seed,
    rng,
    home,
    primes: [17, 29, 23, 19],
    patches: [],
    getSystem(x, y) {
      const px = x >= 0 ? this.primes[0] : this.primes[2];
      const py = y >= 0 ? this.primes[1] : this.primes[3];
      const sysSeed = x * px + y * py + this.seed;
      const sysRNG = seedrandom(sysSeed, {
        state: true,
      });
      const name = makeName(sysRNG);
      const planets = [];
      const mp = Math.floor(sysRNG() * 4) + 3;
      for (let p = 0; p < mp; p++) {
        let ps = {};
        if (p === 0) {
          ps = makePlanet(9, sysRNG);
          ps.name = name;
        } else {
          ps = makePlanet(Math.floor(sysRNG() * 5) + 5, sysRNG); // 5 -- 9
          ps.name = name + " " + romanize(p);
        }
        ps.type = planetTypes[Math.floor(sysRNG() * planetTypes.length)];
        planets.push(ps);
      }
      // create observing points
      let obs = [];
      for (let p = 0; p < mp; p++) {
        let i = Math.floor(rng() * mp);
        while (
          obs.findIndex((v) => {
            return v == i;
          }) != -1
        ) {
          i = Math.floor(rng() * mp);
        }
        obs.push(i);
      }
      obs = obs.slice(0, 3);
      obs.forEach((i) => {
        placeBuilding(rng, planets[i].faces, planets[i].size, "o");
      });
      return {
        name,
        planets,
        cx: x + sysRNG() - 0.5,
        cy: y + sysRNG() - 0.5,
      };
    },
  };
}

export function makeName(rng = null) {
  if (rng == null) {
    rng = Math.random;
  }
  const digrams =
    "ABOUSEITILETSTONLONUTHNOALLEXEGEZACEBISOUSESARMAINDIREA?ERATENBERALAVETIEDORQUANTEISRION";
  let pName = "";
  let x = 0;
  const size = rng() < 0.15 ? 2 : rng() < 0.5 ? 3 : 4;
  for (let i = 0; i < size; i++) {
    x = Math.floor(rng() * 43) * 2;
    pName += digrams[x];
    if (digrams[x + 1] !== "?") {
      pName += digrams[x + 1];
    }
  }
  return pName.charAt(0) + pName.slice(1).toLowerCase();
}

export function romanize(num) {
  if (isNaN(num)) return "NaN";
  const lookup = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let roman = "";
  lookup.forEach((i) => {
    while (num >= i[1]) {
      roman += i[0];
      num -= i[1];
    }
  });
  return roman;
}
