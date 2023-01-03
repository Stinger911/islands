<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="semi-trans-panel">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="semi-trans-panel">
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    $q.dark.set(true);
    return {
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.semi-trans-panel {
  background-color: #00000020;
  backdrop-filter: blur(6px);
}
.q-page-container {
  padding-top: 0 !important;
  height: 100vh;
}
.q-page-container main {
  height: 100vh;
}
</style>
