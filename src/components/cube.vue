<template>
  <div :style="sizeStyle()" style="background: bisque" :data-size="size" class="flex flex-center">
    <CubeFace face="front" :tiles="tiles" :tile-size="tile_size" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CubeFace from "components/CubeFace";

export default defineComponent({
  name: "Cube",
  components: {CubeFace},
  setup () {
    let sz = window.innerHeight - 100;
    if(window.innerWidth < sz) sz = window.innerWidth;
    sz = sz * 0.95;
    if (sz > 700) sz = 700;

    const size = ref(sz)
    const tile_size = Math.floor(sz * 0.1)
    return {
      tiles: [
          "123456789",
          "123456789",
          "123456789",
          "123456789",
          "123456789",
          "123456789",
          "123456789",
          "123456789",
          "123456789",
        ],
      size,
      tile_size,
    }
  },
  methods: {
    sizeStyle () {
      return `width: ${this.size}px; height: ${this.size}px`;
    },
  }
})
</script>

<style scoped>
</style>