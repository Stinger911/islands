<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn-group outline class="self-center">
      <q-btn outline label="-" @click="onZoomOut" />
      <q-btn outline label="0" @click="onZoomZero" />
      <q-btn outline label="+" @click="onZoomIn" />
    </q-btn-group>
    <q-btn outline @click="onNext()" class="self-center">Enter Hangar</q-btn>
    <div class="row">
      <q-btn outline label="⬅️" class="self-center" @click="onMove5()" />
      <div class="column">
        <q-btn outline label="↖️" @click="onMove6()" />
        <q-btn outline label="↙️" @click="onMove4()" />
      </div>
      <div class="column">
        <q-btn outline label="↗️" @click="onMove1()" />
        <q-btn outline label="↘️" @click="onMove3()" />
      </div>
      <q-btn outline label="➡️" class="self-center" @click="onMove2()" />
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
