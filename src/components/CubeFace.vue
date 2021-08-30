<template>
  <div style="border: #1D1D1D solid 1px">
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
    tileSize: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {
    }
  },
  methods: {
    tileSizeStyle() {
      console.log(`width: ${this.$props.tileSize}px; height: ${this.$props.tileSize}px`)
      return `width: ${this.$props.tileSize}px; height: ${this.$props.tileSize}px`;
    }
  },
})
</script>

<style scoped>
.tile {
  border: 1px solid #1D1D1D;
}
</style>