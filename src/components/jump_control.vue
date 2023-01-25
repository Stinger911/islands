<template>
  <div class="fit row wrap justify-around items-start content-center"></div>
</template>

<script>
import { useQuasar } from "quasar";
import { Game } from "src/game/main";
import { useGameStore } from "src/stores/game";
export default {
  name: "JumpControl",
  setup() {
    const game = useGameStore();
    return {
      onLeave() {
        game.loc_bld = -1;
        Game.events.emit("exit");
      },
    };
  },
  mounted() {
    const $q = useQuasar();
    $q.dialog({
      title: "Observation Point",
      message: "Choose your destination",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {})
      .onCancel(() => {
        Game.events.emit("exit");
      });
  },
};
</script>
