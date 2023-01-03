<template>
  <q-toolbar v-if="path !== '404'">
    <q-toolbar-title
      class="fit row wrap justify-center items-start content-start"
    >
      <!-- <game-controls v-if="path === '/game'" /> -->
      <div v-if="path === '/'" class="text-center">Version: {{ version }}</div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
// import GameControls from "components/GameControls";

export default {
  name: "GameFooter",
  // components: { GameControls },
  setup() {
    const route = useRoute();

    const path = computed(() => route.path);

    console.log(process.env.MAIN_BUILD_DATE, process.env.MAIN_BUILD_GIT);

    return {
      path,
      version: process.env.PACKAGE_VERSION,
    };
  },
};
</script>

<style scoped></style>
