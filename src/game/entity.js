import { randint } from "./support";

const ICON_ROW_LEN = 5;

export const EntityType = {
  BUILDING: 0,
  ENEMY: 1,
  RESOURCE: 2,
};

export const BldType = {
  CITY: 0,
  BEACON: 1,
  POINT: 2,
  QUEST: 3,
};

const TEMPLATES = [
  {
    typ: EntityType.BUILDING,
    sub: BldType.QUEST,
    ico: [BldType.QUEST, BldType.QUEST + ICON_ROW_LEN],
    dsc: [""],
  },
];

export class Entity {
  constructor(typ, sub = -1, t = -1, h = -1, ico = -1, desc = "") {
    this.typ = typ;
    if (sub > -1) {
      this.sub = sub;
    } else {
      // generate
    }
    this.tri = t;
    this.hex = h;
    this.ico = ico;
    if (desc !== "") {
      this.dsc = desc;
    }
    this.ani = null;
  }
}

export class Building extends Entity {
  constructor(sub, t, h, ico = -1, desc = "") {
    let i = ico == -1 ? sub : ico;
    if (sub == BldType.QUEST) {
      let tpl = TEMPLATES.filter(
        (v) => v.typ == EntityType.BUILDING && v.sub == BldType.QUEST
      );
      if (tpl.length) {
        let x = choice(Math.random, tpl);
        if (Array.isArray(i.ico)) {
          i = choice(Math.random, x.ico);
        } else {
          i = x.ico;
        }
        if (Array.isArray(i.dsc)) {
          desc = choice(Math.random, x.dsc);
        } else {
          desc = x.dsc;
        }
      }
    }
    super(EntityType.BUILDING, sub, t, h, i, desc);
    if (sub == BldType.POINT) {
      this.ani = [...new Array(5)].map((v, i) => {
        return BldType.POINT + i * ICON_ROW_LEN;
      });
    }
  }
}
