<template>
  <q-toolbar v-if="path !== '404'">
    <q-toolbar-title
      class="fit row wrap justify-center items-start content-start"
    >
      <!-- <game-controls v-if="path === '/game'" /> -->
      <div v-if="path === '/'" class="text-center">Version: {{ version }}</div>
      <template v-else>
        <hangar-control v-if="view == 'Hangar'"></hangar-control>
        <planet-control v-else-if="view == 'Planet'"></planet-control>
        <jump-control v-else-if="view == 'Jump'"></jump-control>
        <starmap-control v-else-if="view == 'StarMap'"></starmap-control>
        <p v-else>{{ view }}</p>
      </template>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useMainStore } from "src/stores/main";
import HangarControl from "./hangar_control";
import PlanetControl from "./planet_control";
import JumpControl from "./jump_control.vue";
import StarmapControl from "./starmap_control.vue";

export default {
  name: "GameFooter",
  components: { HangarControl, PlanetControl, JumpControl, StarmapControl },
  props: {
    space: Number,
  },
  setup() {
    const state = useMainStore();
    const route = useRoute();

    const path = computed(() => route.path);

    return {
      path,
      view: computed(() => state.scene),
      version: process.env.PACKAGE_VERSION,
    };
  },
};
</script>

<style scoped></style>
