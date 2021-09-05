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
        <div class="entity" v-for="e in tileEntities(c, r)" :key="''+e+c+r" :class="entityClass(e)">
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
      if (ci - 1 === loc.col && ri - 1 === loc.row && fn === loc.face) {
        entities.push("@");
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
        default:
          tc += "cube-tile-open";
      }
      return tc;
    },
    entityClass(e) {
      switch (e) {
        case "@":
          console.log("ent-zeppel-" + store.state.player.dir);
          return "player ent-zeppel-" + store.state.player.dir;
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
.entity {
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
.entity-img {
  background-image: url("../../public/img/entities.png");
  background-size: 800%; /* 8x8 sprites */
  position: absolute;
  width: 10%;
  height: 10%;
}
.glow {
  width: 1px;
  height: 1px;
}
.player > .glow {
  box-shadow: 0 0 20px 11px cyan;
}
.ent-zeppel-right > .entity-img {
  background-position-y: 0;
  background-position-x: 0;
}
.ent-zeppel-down > .entity-img {
  background-position-y: 0;
  background-position-x: -300%;
}
.ent-zeppel-left > .entity-img {
  background-position-y: 0;
  background-position-x: -200%;
}
.ent-zeppel-up > .entity-img {
  background-position-y: 0;
  background-position-x: -100%;
}
.cube-tile-set {
  background-image: url("../../public/img/tileset.png");
  background-size: 500%; /* 5x5 tiles */
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
.cube-tile-open {
  background-position-x: 0;
}
</style>