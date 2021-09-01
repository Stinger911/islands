<template>
  <q-toolbar v-if="path !== '404'">
    <q-toolbar-title class="fit row wrap justify-center items-start content-start">
      <game-controls v-if="path === '/game'" />
      <div class="text-center" v-if="path === '/'">Version: {{ version }}</div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import GameControls from "components/GameControls";

export default {
  name: "GameFooter",
  components: {GameControls},
  setup() {
    const route=useRoute();

    const path = computed(() => route.path)

    return {
      path,
      version: process.env.PACKAGE_VERSION,
    };
  },
}
</script>

<style scoped>

</style>