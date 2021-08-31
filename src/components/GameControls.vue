<template>
  <div style="max-width: 700px; width: 100%" class="row no-wrap items-center">
    <q-btn outline>
      Stats Icons
    </q-btn>
    <q-space />
    <q-btn outline icon="group_work">
      <q-tooltip>
        <b>Action</b><br/>
        Keys: <b>SPACE</b>, <b>ENTER</b>
      </q-tooltip>
    </q-btn>
    <q-btn-group outline>
      <q-btn outline icon="keyboard_arrow_left" @click="moveLeft()">
        <q-tooltip>
          <b>Move left</b><br/>
          Keys: <b>&leftarrow;</b>, <b>A</b>, <b>H</b>
        </q-tooltip>
      </q-btn>
      <q-btn outline icon="keyboard_arrow_down" @click="moveDown()">
        <q-tooltip>
          <b>Move down</b><br/>
          Keys: <b>&downarrow;</b>, <b>S</b>, <b>J</b>
        </q-tooltip>
      </q-btn>
      <q-btn outline icon="keyboard_arrow_up" @click="moveUp()">
        <q-tooltip>
          <b>Move up</b><br/>
          Keys: <b>&uparrow;</b>, <b>W</b>, <b>K</b>
        </q-tooltip>
      </q-btn>
      <q-btn outline icon="keyboard_arrow_right" @click="moveRight()">
        <q-tooltip>
          <b>Move right</b><br/>
          Keys: <b>&rightarrow;</b>, <b>D</b>, <b>L</b>
        </q-tooltip>
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import store from "src/store/store";

export default defineComponent({
  name: "GameControls",
  methods:  {
    moveLeft() {
      console.log(store.state.player.location);
      if (store.state.player.location.col > 0) {
        store.state.player.location.col -= 1;
      }
    },
    moveRight() {
      console.log(store.state.player.location);
      if (store.state.player.location.col < store.state.planet.size) {
        store.state.player.location.col += 1;
      }
    },
    moveUp() {
      console.log(store.state.player.location);
      if (store.state.player.location.row > 0) {
        store.state.player.location.row -= 1;
      }
    },
    moveDown() {
      console.log(store.state.player.location);
      if (store.state.player.location.row < store.state.planet.size) {
        store.state.player.location.row += 1;
      }
    },
  }
})
</script>

<style scoped>

</style>