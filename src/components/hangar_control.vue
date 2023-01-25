<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn outline @click="onLeave()" class="self-center game-btn" flat>
      Leave Hangar
    </q-btn>
  </div>
</template>

<script>
import { Game } from "src/game/main";
import { useGameStore } from "src/stores/game";
export default {
  name: "HangarControl",
  setup() {
    const game = useGameStore();
    return {
      onLeave() {
        game.loc_bld = -1;
        Game.events.emit("exit");
      },
    };
  },
};
</script>
