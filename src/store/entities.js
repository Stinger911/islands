import { MOVE_LEFT, MOVE_NONE, findAdjacentTile } from "./constants";
import { makeName } from "./game";

/**
 * Entity object (everything can change state, existence or position)
 *
 * Entities are related to planet
 *
 * loc: {
 *      f: <int>  - face of cube
 *      r: <int>  - row of face
 *      c: <int>  - column of face
 *      d: <int>  - last move direction
 *                  (-1 - none, 0 up, 1 right, 2 down, 3 left)
 * }
 * class: <string>      - type of entity (enemy, resource, etc.)
 * sprite: <string>     - image for the entiy
 * name: <string>       - personal name for some kond of entities
 * movement: <int>      - movement style code
 * ... and counting...
 */
const TEMPLATES = [
  {
    class: "RES",
    sprite: "WRC", // code name for CubeFace render
    name: "crashed zeppelin",
    movement: MOVE_NONE,
    initial_dir: MOVE_NONE,
    one_per_face: false,
    restricted: "XSo", // can't place on these terrains
  },
  {
    class: "ENM",
    sprite: "EGL", // code name for CubeFace render
    name: "wild electrical eagle",
    movement: function (planet, rng = null) {
      if (rng == null) {
        rng = Math.random;
      }
      let dir = this.loc.dir;
      const mv = rng();
      if (mv > 0.5 && mv <= 0.7) {
        dir -= 1;
      }
      if (mv > 0.7 && mv <= 0.9) {
        dir += 1;
      }
      if (mv > 0.9) {
        return; // no move
      }
      if (dir < 0) {
        dir += 4;
      }
      if (dir > 3) {
        dir -= 4;
      }
      const nt = findAdjacentTile(planet.size, this.loc, dir);
      const np = planet.faces[nt.tile.face][nt.tile.row][nt.tile.col];
      if (this.restricted.indexOf(np) > -1) {
        return;
      }
      this.loc = {
        ...nt.tile,
        dir: nt.newDirection,
      };

      return this.loc;
    },
    initial_dir: MOVE_LEFT,
    one_per_face: false,
    restricted: "XSow", // can't place on these terrains
  },
];

export function placeEntity(rng, planet, cls, overrides = {}) {
  if (rng == null) {
    rng = Math.random;
  }
  const cls_blk = cls.split("-");
  const tpl_list = TEMPLATES.filter((v) => {
    return (
      v.class === cls ||
      (cls_blk.length > 1 && v.class === cls_blk[0] && v.sprite === cls_blk[1])
    );
  });
  if (tpl_list.length == 0) {
    return;
  }
  const def = {
    ...tpl_list[Math.floor(rng() * tpl_list.length)],
    ...overrides,
  };
  while (def.name.indexOf("%s") > -1) {
    def.name.replace("%s", makeName(rng));
  }
  let place = false;
  while (!place) {
    place = {
      face: Math.floor(rng() * 6),
      row: Math.floor(rng() * planet.size),
      col: Math.floor(rng() * planet.size),
      dir: MOVE_NONE,
    };
    if (
      def.restricted.indexOf(planet.faces[place.face][place.row][place.col]) >
      -1
    ) {
      place = false;
    }
    // ToDO: pay attention `one_per_face` property
  }
  place.dir = def.initial_dir;
  def.loc = place;

  planet.entities.push(def);
}

export function placeEnemies(rng, planet) {
  if (rng == null) {
    rng = Math.random;
  }
  // TODO: choose number of enemies and their classes
  let count = Math.round(rng() * (planet.size * 1.3));
  for (let i = 0; i < count; i++) {
    placeEntity(rng, planet, "ENM-EGL");
  }
}

export function playerEntity(loc, dir) {
  return {
    class: "PLR",
    sprite: "PLR", // code name for CubeFace render
    name: "Hero",
    movement: MOVE_NONE,
    loc: {
      f: loc.face,
      r: loc.row,
      c: loc.col,
      d: dir,
    },
  };
}
