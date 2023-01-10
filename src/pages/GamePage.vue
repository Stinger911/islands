<template>
  <q-page class="flex flex-center">
    <div id="gamediv" @planet="onPlanet()"></div>
  </q-page>
</template>

<script>
import { CreateGame } from "../game/main";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePage",

  mounted() {
    CreateGame("gamediv");
  },

  setup() {
    return {};
  },

  methods: {
    onPlanet() {
      alert("Planet!!!");
    },
  },
});
</script>

<style scoped>
gamediv {
  height: 100vh !important;
}
</style>
