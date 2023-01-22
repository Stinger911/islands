<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn-group outline class="self-center">
      <q-btn outline label="-" @click="onZoomOut" />
      <q-btn outline label="0" @click="onZoomZero" />
      <q-btn outline label="+" @click="onZoomIn" />
    </q-btn-group>
    <q-btn @click="onNext()" class="self-center game-btn" flat
      >Enter Hangar</q-btn
    >
    <div
      class="row"
      style="
        background: url(./assets/images/btn_move.png);
        background-size: 100% 100%;
      "
    >
      <q-btn
        label="⬅️"
        flat
        class="self-center btn-move"
        style="padding-right: 0"
        @click="onMove5()"
      >
        <q-tooltip>⬅️, A</q-tooltip>
      </q-btn>
      <div class="column">
        <q-btn label="↖️" flat @click="onMove6()" class="btn-move">
          <q-tooltip>⬆️, W</q-tooltip>
        </q-btn>
        <q-btn label="↙️" flat @click="onMove4()" class="btn-move">
          <q-tooltip>Z</q-tooltip>
        </q-btn>
      </div>
      <div class="column">
        <q-btn label="↗️" flat @click="onMove1()" class="btn-move">
          <q-tooltip>E</q-tooltip>
        </q-btn>
        <q-btn label="↘️" flat @click="onMove3()" class="btn-move">
          <q-tooltip>⬇️, X</q-tooltip>
        </q-btn>
      </div>
      <q-btn
        label="➡️"
        flat
        class="self-center btn-move"
        style="padding-left: 0"
        @click="onMove2()"
      >
        <q-tooltip>➡️, D</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Game } from "src/game/main";
export default {
  name: "PlanetControl",
  setup() {
    return {
      onNext() {
        Game.events.emit("next");
      },
      onZoomIn() {
        Game.events.emit("zoomIn");
      },
      onZoomOut() {
        Game.events.emit("zoomOut");
      },
      onZoomZero() {
        Game.events.emit("zoomReset");
      },
      onMove1() {
        Game.events.emit("onMove", 1);
      },
      onMove2() {
        Game.events.emit("onMove", 2);
      },
      onMove3() {
        Game.events.emit("onMove", 3);
      },
      onMove4() {
        Game.events.emit("onMove", 4);
      },
      onMove5() {
        Game.events.emit("onMove", 5);
      },
      onMove6() {
        Game.events.emit("onMove", 6);
      },
    };
  },
};
</script>

<style>
.btn-move {
  height: 3em;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
