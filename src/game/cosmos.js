import { randint, dice, choice } from "./support";

export const STAR_COLOR = ["RED", "ORANGE", "YELLOW", "BLUE", "WHITE"];
const MAIN_MASS = [6, 7, 7, 8, 8, 9];
const MAIN_ORBI = [
  [0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1.1, 1.4, 1.7, 2],
  [2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0],
  [7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
];

export function Planet(mass, orbit, tr = "t") {
  return {
    mass: mass,
    orbit: orbit,
    terrain: tr,

    str() {
      return "M: " + this.mass + "; O: " + this.orbit + "; T: " + this.terrain;
    },
  };
}

export function makeSystem(rng) {
  const obj = {
    color: randint(rng, 0, STAR_COLOR.length),
    planets: Array(dice(rng, 2, 7)),
    main: 0,

    str: function () {
      console.log(this);
      return (
        "COLOR: " +
        STAR_COLOR[this.color] +
        "; P: " +
        this.planets.length +
        "(" +
        this.main +
        "): " +
        this.planets[this.main].str()
      );
    },
  };
  let mo_pos = dice(rng, 1, 6);
  if (mo_pos < 0) {
    mo_pos = 0;
  } else if (mo_pos < 6) {
    mo_pos = 1;
  } else {
    mo_pos = 2;
  }
  if (mo_pos == 0) {
    obj.main = dice(rng, 1, 4) - 2;
  } else {
    obj.main = dice(rng, 1, 4) + 1;
  }
  if (obj.main >= obj.planets.length - 1) {
    obj.main = obj.planets.length - 1;
  }
  if (obj.main < 0) {
    obj.main = 0;
  }
  obj.planets[obj.main] = Planet(
    choice(rng, MAIN_MASS),
    choice(rng, MAIN_ORBI[mo_pos])
  );
  // inner planets
  const main = obj.planets[obj.main];
  let hm = 0,
    lm = 0;
  for (; hm < MAIN_ORBI[0].length; hm++) {
    if (MAIN_ORBI[0][hm] > main.orbit) {
      break;
    }
  }
  for (let p = 0; p < obj.main; p++) {
    let o = MAIN_ORBI[0][randint(rng, lm, hm - (obj.main - p))];
    let m = randint(rng, 0, 100);
    if (m < 19) {
      obj.planets[p] = Planet(1, o, choice(rng, "lr"));
    } else if (m < 38) {
      obj.planets[p] = Planet(2, o, choice(rng, "lrrrdddd"));
    } else if (m < 57) {
      obj.planets[p] = Planet(3, o, choice(rng, "lrrrddddtt"));
    } else if (m < 60) {
      obj.planets[p] = Planet(0, o, "b");
    } else if (m < 73) {
      obj.planets[p] = Planet(4, o, choice(rng, "rrddddtttw"));
    } else if (m < 82) {
      obj.planets[p] = Planet(5, o, choice(rng, "rrddtttwww"));
    } else if (m < 90) {
      obj.planets[p] = Planet(6, o, choice(rng, "rdddttttww"));
    } else if (m < 96) {
      obj.planets[p] = Planet(7, o, choice(rng, "rrrddddttiiii"));
    } else {
      obj.planets[p] = Planet(8, o, choice(rng, "rrddttiiii"));
    }
  }
  // outer planets
  for (let p = obj.main + 1; p < obj.planets.length; p++) {
    let o = obj.planets[p - 1].orbit * (1.3 + dice(rng, 1, 12) * 0.1);
    o = Math.round(o * 10) / 10;
    let m = randint(rng, 0, 100);
    if (m < 32) {
      obj.planets[p] = Planet(
        choice(rng, [2, 3, 4, 5]),
        o,
        choice(rng, "rriiiii")
      );
    } else if (m < 41) {
      obj.planets[p] = Planet(0, o, "b");
    } else if (m < 59) {
      obj.planets[p] = Planet(
        choice(rng, [5, 6, 7]),
        o,
        choice(rng, "rrwwwwwiiiiiii")
      );
    } else if (m < 92) {
      obj.planets[p] = Planet(
        choice(rng, [6, 7, 8]),
        o,
        choice(rng, "ttttwwwiiii")
      );
    } else {
      obj.planets[p] = Planet(
        choice(rng, [7, 8, 9]),
        o,
        choice(rng, "tttwtwiwiii")
      );
    }
  }
  // console.log(obj);
  return obj;
}
