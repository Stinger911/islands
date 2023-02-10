<template>
  <q-page class="backed column items-center justify-center">
    <h1 class="text-ui cosmogen">Game Over</h1>
    <h3 class="spacefont">You were lost in space...</h3>
    <br />
    <q-btn class="game-btn" @click="this.$router.push('/')">Play Again</q-btn>
  </q-page>
</template>

<script>
import { useMainStore } from "src/stores/main";

export default {
  name: "LostName",
  setup() {
    const state = useMainStore();
    state.logged = false;
    return {};
  },
};
</script>

<style scoped>
.backed {
  background: url(../assets/nebula-wallpaper.jpeg);
  background-size: cover;
  background-position: 50% 50%;
}
</style>
