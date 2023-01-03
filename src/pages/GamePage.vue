<template>
  <q-page class="flex flex-center">
    <div id="gamediv"></div>
  </q-page>
</template>

<script>
import { createAssignmentExpression } from "@vue/compiler-core";
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
});
</script>

<style scoped>
gamediv {
  height: 100vh !important;
}
</style>
