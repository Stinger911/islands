<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn-group outline>
      <q-btn outline label="-" @click="onZoomOut" />
      <q-btn outline label="+" @click="onZoomIn" />
    </q-btn-group>
    <q-btn outline @click="onNext()" class="self-center">Enter Hangar</q-btn>
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
    };
  },
};
</script>
