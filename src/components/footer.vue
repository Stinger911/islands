<template>
  <q-toolbar v-if="path !== '404'">
    <q-toolbar-title class="fit row wrap justify-center items-start content-start">
      <div style="max-width: 700px; width: 100%" v-if="path === '/game'">Info:</div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import {useRoute} from 'vue-router';
import {computed} from 'vue';

export default {
  name: "GameFooter",
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