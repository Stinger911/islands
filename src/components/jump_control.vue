<template>
  <div class="fit row wrap justify-around items-start content-center">
    <!-- q-btn @click="show()">Take a look into the Void</q-btn -->
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { Game } from "src/game/main";
import { useGameStore } from "src/stores/game";
import JumpDlg from "./JumpDlg.vue";

export default {
  name: "JumpControl",
  setup() {
    const $q = useQuasar();
    const game = useGameStore();
    return {
      dialog: $q.dialog,
      onLeave() {
        game.loc_bld = -1;
        Game.events.emit("exit");
      },
    };
  },
  mounted() {
    this.dialog({
      component: JumpDlg,
    })
      .onOk(() => {
        this.onLeave();
      })
      .onCancel(() => {
        this.onLeave();
      });
  },
};
</script>
