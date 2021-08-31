<template>
  <div id="cubeSpace" :style="sizeStyle()">
      <div id="cube" :style="cubeStyle()" style="background: bisque" :data-size="size" class="flex flex-center">
        <CubeFace face="front" :tiles="tiles" :space-size="cubeSize" />
        <CubeFace face="back" :tiles="tiles" :space-size="cubeSize" />

        <CubeFace face="left" :tiles="tiles" :space-size="cubeSize" />
        <CubeFace face="right" :tiles="tiles" :space-size="cubeSize" />

        <CubeFace face="top" :tiles="tiles" :space-size="cubeSize" />
        <CubeFace face="bottom" :tiles="tiles" :space-size="cubeSize" />
      </div>
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
    return {
      tiles: [
          // "12345",
          // "12345",
          // "12345",
          // "12345",
          // "12345",
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
      cubeSize: ref(sz * 0.71),
    }
  },
  computed: {
    adjustedDieRotation() {
      return {x: 0, y: 0, z: 0};
    }
  },
  methods: {
    sizeStyle () {
      const style = [];
      style.push(`width: ${this.size}px`)
      style.push(`height: ${this.size}px`)
      return style.join("; ")
    },
    cubeStyle () {
      const style = [];
      //style.push(`width: ${this.size * 0.75}px`)
      //style.push(`height: ${this.size * 0.75}px`)
      style.push(`transform: 'rotateX(${this.adjustedDieRotation.x}deg) rotateY(${this.adjustedDieRotation.y}deg) rotateZ(${this.adjustedDieRotation.z}deg)' }`)
      return style.join("; ")
    },
  }
})
</script>

<style scoped>
  #cubeSpace {
    margin:auto;
    perspective: 1000px;
  }
  #cube {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 1s;
  }
</style>