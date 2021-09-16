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
      <div id="front" class="face" :style="faceStyle('front')" />
      <div id="back" class="face" :style="faceStyle('back')" />

      <div id="left" class="face" :style="faceStyle('left')" />
      <div id="right" class="face" :style="faceStyle('right')" />

      <div id="top" class="face" :style="faceStyle('top')" />
      <div id="bottom" class="face" :style="faceStyle('bottom')" />
    </div>
  </div>
  <stats-dlg v-model="statsDlg" />
  <beacon-dlg v-model="beaconDlg" />
  <city-dlg v-model="cityDlg" />
  <observe-dlg v-model="observeDlg" />
  <fight-dlg v-model="showArena" />
  <gathering-dlg v-model="showResources" />
</template>

<script>
  import { defineComponent, ref } from "vue";
  import store from "src/store/store";
  import stage from "src/pixi/stage";
  import BeaconDlg from "src/components/BeaconDlg";
  import CityDlg from "./CityDlg.vue";
  import ObserveDlg from "./ObserveDlg.vue";
  import FightDlg from "./FightDlg.vue";
  import GatheringDlg from "./GatheringDlg.vue";
  import StatsDlg from "./StatsDlg.vue";

  export default defineComponent({
    name: "Cube",
    components: {
      BeaconDlg,
      CityDlg,
      ObserveDlg,
      FightDlg,
      GatheringDlg,
      StatsDlg,
    },
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
        cubeSize: ref(Math.floor(sz * store.state.planet.size * 0.66)),
        pixi: ref(null),
      };
    },
    computed: {
      statsDlg() {
        return store.state.showStats;
      },
      beaconDlg() {
        return store.state.showBeacon;
      },
      cityDlg() {
        return store.state.showCity;
      },
      observeDlg() {
        return store.state.showObserve;
      },
      showArena() {
        return store.state.inFight != false;
      },
      showResources() {
        return store.state.inGather != false;
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
      store.state.pixi = stage(store.state.planet);
      store.state.pixi.addEntity(
        "@",
        "player",
        store.state.player.location.face,
        store.state.player.location.row,
        store.state.player.location.col
      );
      // console.log(store.state.planet.entities);
      store.state.planet.entities.forEach((v, i) => {
        const tag = `${i}-${v.sprite}`;
        store.state.pixi.addEntity(
          tag,
          v.sprite,
          v.loc.face,
          v.loc.row,
          v.loc.col
        );
      });
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
      faceStyle(face) {
        const rtz = Math.floor(this.cubeSize / 2);
        const szs = `width: ${this.cubeSize}px; height: ${this.cubeSize}px`;
        switch (face) {
          case "front": // 0
            return `${szs}; transform: translateZ(${rtz}px)`;
          case "back": // 5
            return `${szs}; transform: rotateY(180deg) rotateZ(180deg) translateZ(${rtz}px)`;
          case "right": // 2
            return `${szs}; transform: rotateY(90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
          case "left": // 3
            return `${szs}; transform: rotateY(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
          case "top": // 4
            return `${szs}; transform: rotateX(90deg) rotateZ(90deg) translateZ(${rtz}px)`;
          case "bottom": // 1
            return `${szs}; transform: rotateX(-90deg) rotateZ(-90deg) translateZ(${rtz}px)`;
        }
      },
      closeStats() {
        store.setStatsVisibility(false);
      },
      handleKeyPress(e) {
        switch (e.keyCode) {
          case 32: // space
          case 13: // enter
            store.playerActions.doAction();
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
</style>
