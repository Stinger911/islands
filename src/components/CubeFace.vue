<template>
  <div :id="face" class="face" :style="faceStyle()">
    <div v-for="r in faceSize" :key="'r' + r" class="row">
      <div v-for="c in faceSize" :key="'c' + c" class="tile" :class="tileClass(c, r)" :style="tileSizeStyle()">
        <div class="entity" v-for="e in tileEntities(c, r)" :key="e">{{ e }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import store from "src/store/store";

const faceNames = ["front", "back", "top", "bottom", "left", "right"];

export default defineComponent({
  name: "CubeFace",
  props: {
    tiles: {
      type: Array,
      default () {
        return [" "]
      }
    },
    face: {
      validator (value) {
        return faceNames.includes(value)
      },
      required: true,
    },
    spaceSize: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {
    }
  },
  computed: {
    tileSize() {
      return this.$props.spaceSize / 10;
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
      const tileRatio = this.$props.tiles.length / 10;
      const rtz = (this.$props.spaceSize / 2) * tileRatio;
      switch (face) {
        case "front": return `transform: translateZ(${rtz}px)`
        case "back": return `transform: rotateY(180deg) rotateZ(180deg) translateZ(${rtz}px)`
        case "right": return `transform: rotateY(90deg) rotateZ(-90deg) translateZ(${rtz}px)`
        case "left": return `transform: rotateY(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`
        case "top": return `transform: rotateX(90deg) rotateZ(90deg) translateZ(${rtz}px)`
        case "bottom": return `transform: rotateX(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`
      }
    },
    tileEntities(ci, ri) {
      const entities = [];
      const loc = store.state.player.location;
      const fn = faceNames.indexOf(this.face);
      if (ci-1 === loc.col && ri-1 === loc.row && fn === loc.face) {
        entities.push('@');
      }
      return entities;
    },
    tileClass(c, r) {
      let tc="cube-tile-set cube-tile-set-" + store.state.planet.type + " ";
      console.log(c, r, this.$props.tiles);
      const tl = this.$props.tiles[r-1][c-1];
      switch (tl)  {
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
    }
  },
})
</script>

<style scoped>
  .tile {
  }
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
    font-size: .35em;
  }
  .cube-tile-wall {
    background: dimgray;
  }
  .cube-tile-tree {
    background: darkgreen;
  }
  .cube-tile-grass {
    background: darkolivegreen;
  }
  .cube-tile-water {
    background: aquamarine;
  }
  .cube-tile-open {
    background: olivedrab;
  }
</style>