<template>
  <div id="cubeSpace" :style="sizeStyle()">
    <div
      id="cube"
      ref="cubeController"
      :style="cubeStyle()"
      :data-size="size"
      class="flex flex-center"
    >
      <!-- Like D6 dice (-1 for indexes):
            5
        4   1   3   6
            2
      -->
      <CubeFace face="front" :tiles="planet.faces[0]" :space-size="cubeSize" />
      <CubeFace face="back" :tiles="planet.faces[5]" :space-size="cubeSize" />

      <CubeFace face="left" :tiles="planet.faces[3]" :space-size="cubeSize" />
      <CubeFace face="right" :tiles="planet.faces[2]" :space-size="cubeSize" />

      <CubeFace face="top" :tiles="planet.faces[4]" :space-size="cubeSize" />
      <CubeFace face="bottom" :tiles="planet.faces[1]" :space-size="cubeSize" />
    </div>
  </div>
  <q-dialog v-model="statsDlg" seamless position="bottom">
    <q-card style="width: 350px; position: absolute; left: 20px; bottom: 70px">
      <h6 class="q-ma-xs">On {{ planet.name }}</h6>

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">The Walker</div>
          <div class="text-grey">Fitz & The Tantrums</div>
        </div>

        <q-space />

        <q-btn flat round icon="play_arrow" />
        <q-btn flat round icon="pause" />
        <q-btn flat round icon="close" @click="closeStats()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CubeFace from "components/CubeFace";
  import store from "src/store/store";

  export default defineComponent({
    name: "Cube",
    components: { CubeFace },
    setup() {
      let sz = window.innerHeight - 100;
      if (window.innerWidth < sz) sz = window.innerWidth;
      sz = Math.floor((sz * 0.95) / 10);
      if (sz > 70) sz = 70;

      const size = ref(sz * 10);
      return {
        planet: store.state.planet,
        size,
        currentFace: ref(0),
        dieRotation: ref({ x: 0, y: 0, z: 0 }),
        cubeSize: ref(sz * 7),
      };
    },
    computed: {
      statsDlg() {
        return store.state.showStats;
      },
      adjustedDieRotation() {
        let rotation = { ...this.dieRotation };
        const location = store.state.player.location;
        //dont tilt the die if we're looking at a face other than the one the player is on
        if (location.face !== this.currentFace) {
          this.rotateCube(this.currentFace, location.face);
          rotation = { ...this.dieRotation };
          //return rotation;
        }
        //determine which axes to shift based on col and row position for each face
        const faceAxes = [
          { col: "y", colMultiplier: "-1", row: "x", rowMultiplier: "1" }, //ONE
          { col: "y", colMultiplier: "-1", row: "z", rowMultiplier: "1" }, //TWO
          { col: "z", colMultiplier: "1", row: "x", rowMultiplier: "1" }, //THREE
          { col: "z", colMultiplier: "-1", row: "x", rowMultiplier: "1" }, //FOUR
          { col: "y", colMultiplier: "-1", row: "z", rowMultiplier: "1" }, //FIVE
          { col: "y", colMultiplier: "1", row: "x", rowMultiplier: "1" }, //SIX
        ];
        const colShift = -30 + (60 / (this.planet.size - 1)) * location.col;
        const rowShift = -30 + (60 / (this.planet.size - 1)) * location.row;
        //make column-based adjustments
        rotation[faceAxes[location.face].col] +=
          colShift * faceAxes[location.face].colMultiplier;
        rotation[faceAxes[location.face].row] +=
          rowShift * faceAxes[location.face].rowMultiplier;
        return rotation;
      },
    },
    mounted() {
      window.addEventListener("keyup", this.handleKeyPress);
    },
    beforeUnmount() {
      window.removeEventListener("keyup", this.handleKeyPress);
    },
    methods: {
      sizeStyle() {
        const style = [];
        style.push(`width: ${this.size}px`);
        style.push(`height: ${this.size}px`);
        return style.join("; ");
      },
      cubeStyle() {
        const style = [];
        // style.push('background: bisque');
        //style.push(`width: ${this.size * 0.75}px`)
        //style.push(`height: ${this.size * 0.75}px`)
        style.push(
          `transform: rotateX(${this.adjustedDieRotation.x}deg) rotateY(${this.adjustedDieRotation.y}deg) rotateZ(${this.adjustedDieRotation.z}deg)`
        );
        return style.join("; ");
      },
      closeStats() {
        store.setStatsVisibility(false);
      },
      handleKeyPress(e) {
        switch (e.keyCode) {
          case 32: // space
          case 13: // enter
            console.log("Call action");
            break;
          case 73: //i
            store.setStatsVisibility(!store.state.showStats);
            break;
          case 87: // w
          case 75: // k
          case 38: // UP
            store.playerActions.moveUp();
            break;
          case 65: //a
          case 72: //h
          case 37: //left
            store.playerActions.moveLeft();
            break;
          case 83: //s
          case 74: //j
          case 40: //down
            store.playerActions.moveDown();
            break;
          case 68: //d
          case 76: //l
          case 39: //right
            store.playerActions.moveRight();
            break;
        }
      },
      // rotate the die from any face to any other face
      rotateCube(startingFace, endingFace) {
        if (startingFace === endingFace) return;
        switch (startingFace) {
          //ONE
          case 0:
            if (endingFace === 1) {
              this.dieRotation.y += 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 2) {
              this.dieRotation.x += 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 3) {
              this.dieRotation.x -= 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 4) {
              this.dieRotation.y += 90;
              this.dieRotation.z -= 90;
            } else if (endingFace === 5) {
              this.dieRotation.x += 180;
            }
            break;
          //TWO
          case 1:
            if (endingFace === 0) {
              this.dieRotation.y -= 90;
              this.dieRotation.z -= 90;
            } else if (endingFace === 2) {
              this.dieRotation.x += 90;
              this.dieRotation.y -= 90;
            } else if (endingFace === 3) {
              this.dieRotation.x -= 90;
              this.dieRotation.y -= 90;
            } else if (endingFace === 4) {
              this.dieRotation.z -= 180;
            } else if (endingFace === 5) {
              this.dieRotation.x += 180;
              this.dieRotation.y -= 90;
              this.dieRotation.z -= 90;
            }
            break;
          //THREE
          case 2:
            if (endingFace === 0) {
              this.dieRotation.x -= 90;
              this.dieRotation.z -= 90;
            } else if (endingFace === 1) {
              this.dieRotation.x -= 90;
              this.dieRotation.y += 90;
            } else if (endingFace === 3) {
              this.dieRotation.x -= 180;
            } else if (endingFace === 4) {
              this.dieRotation.x -= 90;
              this.dieRotation.y += 90;
              this.dieRotation.z += 180;
            } else if (endingFace === 5) {
              this.dieRotation.x += 90;
              this.dieRotation.z -= 90;
            }
            break;
          //FOUR
          case 3:
            if (endingFace === 0) {
              this.dieRotation.x += 90;
              this.dieRotation.z -= 90;
            } else if (endingFace === 1) {
              this.dieRotation.x += 90;
              this.dieRotation.y += 90;
            } else if (endingFace === 2) {
              this.dieRotation.x += 180;
            } else if (endingFace === 4) {
              this.dieRotation.x += 90;
              this.dieRotation.y += 90;
              this.dieRotation.z -= 180;
            } else if (endingFace === 5) {
              this.dieRotation.x -= 90;
              this.dieRotation.z -= 90;
            }
            break;
          //FIVE
          case 4:
            if (endingFace === 0) {
              this.dieRotation.y -= 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 1) {
              this.dieRotation.z += 180;
            } else if (endingFace === 2) {
              this.dieRotation.x += 90;
              this.dieRotation.y -= 90;
              this.dieRotation.z -= 180;
            } else if (endingFace === 3) {
              this.dieRotation.x -= 90;
              this.dieRotation.y -= 90;
              this.dieRotation.z += 180;
            } else if (endingFace === 5) {
              this.dieRotation.x -= 180;
              this.dieRotation.y -= 90;
              this.dieRotation.z += 90;
            }
            break;
          //SIX
          case 5:
            if (endingFace === 0) {
              this.dieRotation.x -= 180;
            } else if (endingFace === 1) {
              this.dieRotation.x -= 180;
              this.dieRotation.y += 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 2) {
              this.dieRotation.x -= 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 3) {
              this.dieRotation.x += 90;
              this.dieRotation.z += 90;
            } else if (endingFace === 4) {
              this.dieRotation.x += 180;
              this.dieRotation.y += 90;
              this.dieRotation.z -= 90;
            }
            break;
        }
        this.currentFace = endingFace;
      },
    },
  });
</script>

<style scoped>
  #cubeSpace {
    margin: auto;
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
