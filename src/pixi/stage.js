import * as PIXI from "pixi.js";
import { CompositeTilemap } from "@pixi/tilemap";
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "src/store/constants";

const ticker = PIXI.Ticker.shared;
const loader = new PIXI.Loader();
const tileSize = 64;
let resources = null;

export function PixiLoadResources() {
  loader.add("atlas", "img/tileset.json");
  loader.add("entities", "img/entities.json");
  loader.load((ld, res) => {
    //console.log(ld, res);
    console.log("Resources were loaded", res);
    resources = res;
  });
}

export default function (planet) {
  const dim = planet.size * tileSize; // tile size
  const faces = [
    makeFace("front", dim, planet.type, planet.faces[0]),
    makeFace("bottom", dim, planet.type, planet.faces[1]),
    makeFace("right", dim, planet.type, planet.faces[2]),
    makeFace("left", dim, planet.type, planet.faces[3]),
    makeFace("top", dim, planet.type, planet.faces[4]),
    makeFace("back", dim, planet.type, planet.faces[5]),
  ];

  const pixi = {
    faces,
    entities: {},
    render(delay) {
      this.faces.forEach((f) => {
        f.render(delay);
      });
    },
    addEntity(tag, sprite, face, row, col) {
      let ent = this.entities[tag];
      if (ent == null) {
        ent = {
          tag,
          face,
          row,
          col,
          code: sprite,
        };
        ent.sprite = new PIXI.Sprite(resources.entities.textures[sprite]);
        if (ent.sprite != null) {
          ent.sprite.x = col * tileSize;
          ent.sprite.y = row * tileSize;
          this.entities[tag] = ent;
          this.faces[face].stage.addChild(ent.sprite);
        }
      }
    },
    moveEntity(tag, loc, dir) {
      if (this.entities[tag]) {
        const ent = this.entities[tag];
        if (ent.face != loc.face) {
          // move to another face
          this.faces[ent.face].stage.removeChild(ent.sprite);
          this.faces[loc.face].stage.addChild(ent.sprite);
          ent.face = loc.face;
        }
        let txtr = ent.code;
        switch (dir) {
          case MOVE_RIGHT:
            txtr += "-right";
            break;
          case MOVE_LEFT:
            txtr += "-left";
            break;
          case MOVE_UP:
            txtr += "-up";
            break;
          case MOVE_DOWN:
            txtr += "-down";
            break;
        }
        ent.sprite.texture = resources.entities.textures[txtr];
        ent.row = loc.row;
        ent.col = loc.col;
        ent.sprite.x = loc.col * tileSize;
        ent.sprite.y = loc.row * tileSize;
        // console.log(txtr, ent.sprite);
      }
    },
  };

  ticker.add((delay) => {
    pixi.render(delay);
  });

  return pixi;
}

function makeFace(faceId, dim, planet, face) {
  const pixi = new PIXI.autoDetectRenderer({
    backgroundAlpha: 0,
    width: dim,
    height: dim,
  });
  const div = document.getElementById(faceId);
  const stage = new PIXI.Container();
  stage.scale.x = div.clientWidth / dim;
  stage.scale.y = div.clientHeight / dim;

  const tilemap = new CompositeTilemap();
  stage.addChild(tilemap);
  makeTiles(tilemap, planet, face);

  pixi.resize(div.clientWidth, div.clientHeight);
  div.appendChild(pixi.view);

  return {
    pixi,
    div,
    stage,
    scale: div.clientWidth / dim,
    render(delay) {
      this.pixi.render(this.stage);
    },
  };
}

function makeTiles(tilemap, planet, face) {
  tilemap.clear();

  //const resources = loader.resources;
  const tsz = face.length;

  for (let r = 0; r < tsz; r++) {
    for (let c = 0; c < tsz; c++) {
      const ti = face[r][c] === " " ? "open" : face[r][c];
      tilemap.tile(`${planet}-${ti}`, c * tileSize, r * tileSize);
    }
  }
}
