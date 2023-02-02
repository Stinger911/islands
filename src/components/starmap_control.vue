<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn outline @click="onLeave()" class="self-center game-btn" flat>
      Close
    </q-btn>
  </div>
</template>

<script>
import { Game } from "src/game/main";
import { useGameStore } from "src/stores/game";
export default {
  name: "StarmapControl",
  setup() {
    const game = useGameStore();
    return {
      onLeave() {
        Game.events.emit("close");
      },
    };
  },
};
</script>
