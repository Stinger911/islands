<template>
  <q-toolbar v-if="path !== '404'">
    <q-toolbar-title class="fit row wrap justify-center items-start content-start">
      <game-controls v-if="path === '/game'" />
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
      path
    };
  },
}
</script>

<style scoped>

</style>