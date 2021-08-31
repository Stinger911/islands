<template>
  <div id="cubeSpace" :style="sizeStyle()">
      <div id="cube" :style="cubeStyle()" :data-size="size" class="flex flex-center">
        <CubeFace face="front" :tiles="planet.faces[0]" :space-size="cubeSize" />
        <CubeFace face="back" :tiles="planet.faces[2]" :space-size="cubeSize" />

        <CubeFace face="left" :tiles="planet.faces[3]" :space-size="cubeSize" />
        <CubeFace face="right" :tiles="planet.faces[1]" :space-size="cubeSize" />

        <CubeFace face="top" :tiles="planet.faces[4]" :space-size="cubeSize" />
        <CubeFace face="bottom" :tiles="planet.faces[5]" :space-size="cubeSize" />
      </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CubeFace from "components/CubeFace";
import store from "src/store/store";

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
      planet: store.state.planet,
      size,
      currentFace: ref(0),
      dieRotation: ref({ x: 0, y: 0, z:0 }),
      cubeSize: ref(sz * 0.71),
    }
  },
  computed: {
    adjustedDieRotation() {
      let rotation = this.dieRotation;
      const location = store.state.player.location;
      console.log(rotation, location, this.currentFace);
      //dont tilt the die if we're looking at a face other than the one the player is on
      if (location.face !== this.currentFace) {
        return rotation;
      }
      //determine which axes to shift based on col and row position for each face
      const faceAxes = [
        { col: 'y', colMultiplier: '-1', row: 'x', rowMultiplier: '1' }, 	//ONE
        { col: 'y', colMultiplier: '-1', row: 'z', rowMultiplier: '1' }, 	//TWO
        { col: 'z', colMultiplier: '1', row: 'x', rowMultiplier: '1' }, 	//THREE
        { col: 'z', colMultiplier: '-1', row: 'x', rowMultiplier: '1' }, 	//FOUR
        { col: 'y', colMultiplier: '-1', row: 'z', rowMultiplier: '1' }, 	//FIVE
        { col: 'y', colMultiplier: '1', row: 'x', rowMultiplier: '1' }, 	//SIX
      ];
      const colShift = -30 + (60 / (this.planet.size - 1) * location.col);
      const rowShift = -30 + (60 / (this.planet.size - 1) * location.row);
      console.log(colShift, rowShift);
      //make column-based adjustments
      rotation[faceAxes[this.currentFace].col] = colShift * faceAxes[this.currentFace].colMultiplier;
      rotation[faceAxes[this.currentFace].row] = rowShift * faceAxes[this.currentFace].rowMultiplier;
      console.log(rotation);
      return rotation;
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
      // style.push('background: bisque');
      //style.push(`width: ${this.size * 0.75}px`)
      //style.push(`height: ${this.size * 0.75}px`)
      style.push(`transform: rotateX(${this.adjustedDieRotation.x}deg) rotateY(${this.adjustedDieRotation.y}deg) rotateZ(${this.adjustedDieRotation.z}deg)`);
      console.log(style.join("; "));
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