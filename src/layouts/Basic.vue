<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="semi-trans-panel">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="img:assets/icons/eagle-24.png"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> App {{ version }} </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  name: "BasicLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    $q.dark.set(true);

    return {
      version: process.env.PACKAGE_VERSION,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
