<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn outline @click="onNext()" class="self-center game-btn" flat
      >Leave Hangar</q-btn
    >
  </div>
</template>

<script>
import { Game } from "src/game/main";
export default {
  name: "HangarControl",
  setup() {
    return {
      onNext() {
        Game.events.emit("next");
      },
    };
  },
};
</script>
