<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <game-header />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <game-footer />
    </q-footer>
  </q-layout>
</template>

<script>
  import { defineComponent } from "vue";
  import GameFooter from "components/footer";
  import GameHeader from "components/header";

  export default defineComponent({
    name: "MainLayout",
    components: { GameHeader, GameFooter },
    setup() {
      return {};
    },
  });
</script>
