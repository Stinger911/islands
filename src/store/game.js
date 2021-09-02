import seedrandom from "seedrandom";
import {
  makePlanet
} from "src/store/planet";

const planetTypes = ["grass", "desert", "lava", "ocean", "snow"];

export function makeGame() {
  const seed = "15"; // Date.now();
  const rng = seedrandom(seed, {
    state: true
  });
  const home = {
    x: Math.round(rng() * 1000 - 500),
    y: Math.round(rng() * 1000 - 500)
  }

  return {
    seed,
    rng,
    home,
    primes: [17, 29, 23, 19],
    patches: [],
    makeName(rng = null) {
      if (rng == null) {
        rng = this.rng;
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
      return pName.charAt(0) + pName.slice(1).toLowerCase()
    },
    getSystem(x, y) {
      const px = x >= 0 ? this.primes[0] : this.primes[2];
      const py = y >= 0 ? this.primes[1] : this.primes[3];
      const sysSeed = x * px + y * py + this.seed;
      const sysRNG = seedrandom(sysSeed, {
        state: true
      });
      const name = this.makeName(sysRNG)
      const planets = [];
      const mp = Math.floor(sysRNG() * 4) + 2;
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
      return {
        name,
        planets,
        cx: x + sysRNG() - 0.5,
        cy: y + sysRNG() - 0.5,
      }
    },
  }
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
  lookup.forEach(i => {
    while (num >= i[1]) {
      roman += i[0];
      num -= i[1];
    }
  });
  return roman;
}
