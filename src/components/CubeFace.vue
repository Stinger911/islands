<template>
  <div :id="face" class="face" :style="faceStyle()">
    <div v-for="r in faceSize" :key="'r' + r" class="row">
      <div
        v-for="c in faceSize"
        :key="'c' + c"
        class="tile"
        :class="tileClass(c, r)"
        :style="tileSizeStyle()"
      >
        <div
          v-for="e in tileEntities(c, r)"
          :key="'' + e + c + r"
          class="entity"
          :class="entityClass(e)"
        >
          <div class="glow"></div>
          <div class="entity-img"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import store from "src/store/store";
  import { playerEntity } from "src/store/entities";

  const faceNames = ["front", "bottom", "right", "left", "top", "back"];

  export default defineComponent({
    name: "CubeFace",
    props: {
      tiles: {
        type: Array,
        default() {
          return [" "];
        },
      },
      face: {
        validator(value) {
          return faceNames.includes(value);
        },
        required: true,
      },
      spaceSize: {
        type: Number,
        default: 0,
      },
    },
    setup() {
      return {};
    },
    computed: {
      tileSize() {
        return Math.floor(this.$props.spaceSize / 10);
      },
      faceSize() {
        return store.state.planet.size;
      },
    },
    methods: {
      tileSizeStyle() {
        return `width: ${this.tileSize}px; height: ${this.tileSize}px; `;
      },
      faceStyle() {
        const face = this.$props.face;
        const rtz = Math.floor((this.tileSize * store.state.planet.size) / 2);
        switch (face) {
          case "front": // 0
            return `transform: translateZ(${rtz}px)`;
          case "back": // 5
            return `transform: rotateY(180deg) rotateZ(180deg) translateZ(${rtz}px)`;
          case "right": // 2
            return `transform: rotateY(90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
          case "left": // 3
            return `transform: rotateY(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
          case "top": // 4
            return `transform: rotateX(90deg) rotateZ(90deg) translateZ(${rtz}px)`;
          case "bottom": // 1
            return `transform: rotateX(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
        }
      },
      tileEntities(ci, ri) {
        const entities = [];
        const loc = store.state.player.location;
        const fn = faceNames.indexOf(this.face);
        if (store.state.planet.entities) {
          store.state.planet.entities.forEach((v) => {
            if (ci - 1 === v.loc.c && ri - 1 === v.loc.r && fn === v.loc.f) {
              entities.push(v);
            }
          });
        }
        // last one (to be on top of stack)
        if (ci - 1 === loc.col && ri - 1 === loc.row && fn === loc.face) {
          entities.push(
            playerEntity(store.state.player.location, store.state.player.dir)
          );
        }
        return entities;
      },
      tileClass(c, r) {
        let tc = "cube-tile-set cube-tile-set-" + store.state.planet.type + " ";
        // console.log(c, r, this.$props.tiles);
        const tl = this.$props.tiles[r - 1][c - 1];
        switch (tl) {
          case "X":
            tc += "cube-tile-wall";
            break;
          case "T":
            tc += "cube-tile-tree";
            break;
          case "g":
            tc += "cube-tile-grass";
            break;
          case "w":
            tc += "cube-tile-water";
            break;
          case "B":
            tc += "cube-tile-beacon";
            break;
          case "S":
            tc += "cube-tile-town";
            break;
          case "o":
            tc += "cube-tile-point";
            break;
          default:
            tc += "cube-tile-open";
        }
        return tc;
      },
      entityClass(e) {
        switch (e.sprite) {
          case "PLR":
            return "player ent-zeppel-" + e.loc.d;
          case "EGL":
            return "enemy ent-eagle-" + e.loc.d;
          case "WRC":
            return "ent-shipwreck";
        }
      },
    },
  });
</script>

<style scoped>
  .face {
    /*border: 1px solid #222;*/
    display: block;
    position: absolute;
    background-color: transparent;
    font-size: 6em;
    color: #000;
    text-shadow: none;
    text-align: center;
  }
  .tile {
    position: relative;
  }
  .entity {
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .entity-img {
    background-image: url("../../public/img/entities.png");
    background-size: 800%; /* 8x8 sprites */
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .glow {
    width: 1px;
    height: 1px;
  }
  .player > .glow {
    box-shadow: 0 0 20px 11px cyan;
  }
  .enemy > .glow {
    box-shadow: 0 0 20px 11px rgb(255, 81, 0);
  }
  /* 
   * Entities
   */
  .ent-zeppel-1 > .entity-img {
    background-position-y: 0;
    background-position-x: 0;
  }
  .ent-zeppel-2 > .entity-img {
    background-position-y: 0;
    background-position-x: -300%;
  }
  .ent-zeppel-3 > .entity-img {
    background-position-y: 0;
    background-position-x: -200%;
  }
  .ent-zeppel-0 > .entity-img {
    background-position-y: 0;
    background-position-x: -100%;
  }
  .ent-shipwreck > .entity-img {
    background-position-y: 0;
    background-position-x: -400%;
  }
  .ent-eagle-1 > .entity-img {
    background-position-y: -100%;
    background-position-x: 0;
  }
  .ent-eagle-2 > .entity-img {
    background-position-y: -100%;
    background-position-x: -300%;
  }
  .ent-eagle-3 > .entity-img {
    background-position-y: -100%;
    background-position-x: -200%;
  }
  .ent-eagle-0 > .entity-img {
    background-position-y: -100%;
    background-position-x: -100%;
  }
  /*
   * CUBE TILES 
   */
  .cube-tile-set {
    background-image: url("../../public/img/tileset.png");
    background-size: 800%; /* 8x(5+3 empty rows) tiles */
  }
  .cube-tile-set-grass {
    background-position-y: 0;
  }
  .cube-tile-set-desert {
    background-position-y: -100%;
  }
  .cube-tile-set-lava {
    background-position-y: -200%;
  }
  .cube-tile-set-ocean {
    background-position-y: -300%;
  }
  .cube-tile-set-snow {
    background-position-y: -400%;
  }
  .cube-tile-wall {
    background-position-x: -300%;
  }
  .cube-tile-tree {
    background-position-x: -200%;
  }
  .cube-tile-grass {
    background-position-x: -100%;
  }
  .cube-tile-water {
    background-position-x: -400%;
  }
  .cube-tile-beacon {
    background-position-x: -500%;
  }
  .cube-tile-town {
    background-position-x: -600%;
  }
  .cube-tile-point {
    background-position-x: -700%;
  }
  .cube-tile-open {
    background-position-x: 0;
  }
</style>
