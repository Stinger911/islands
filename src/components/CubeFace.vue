<template>
  <div style="border: #1D1D1D solid 1px" :id="face" class="face" :style="faceStyle()">
    <div v-for="t in tiles" :key="t" class="row">
      <div v-for="x in t" :key="x" class="tile" :style="tileSizeStyle()" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

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
        return ["front", "top", "bottom", "left", "right"].includes(value)
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
    }
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
    }
  },
})
</script>

<style scoped>
  .tile {
    border: 1px solid #1D1D1D;
  }
  .face {
    border: 1px solid #222;
    display: block;
    position: absolute;
    background-color: transparent;
    font-size: 6em;
    color: #000;
    text-shadow: none;
    text-align: center;
  }
</style>