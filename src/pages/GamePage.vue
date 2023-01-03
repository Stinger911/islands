<template>
  <q-page class="flex flex-center">
    <div id="gamediv">
      <PhaserGame title="gamediv"></PhaserGame>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PhaserGame from "components/PhaserGame.vue";

export default defineComponent({
  name: "GamePage",

  components: {
    PhaserGame,
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
gamediv {
  height: 100vh !important;
}
</style>
