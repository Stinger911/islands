<template>
  <q-page class="flex flex-center" style="background: url('img/background02.jpg')">
    <div class="column">
      <img alt="logo" src="~assets/island.png" style="width: 200px; height: 200px" />
      <q-btn color="primary" glossy class="q-mt-sm" @click="newGame">Start new game</q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { makeGame } from "src/store/game";
import store from "src/store/store";

export default defineComponent({
  name: "MainPage",
  setup() {
    return {};
  },
  methods: {
    newGame() {
      const game = makeGame();
      store.state.player.location.face = 0;
      store.state.player.location.row = 4; // first planet MUST be 9 size
      store.state.player.location.col = 4;
      store.state.player.coords.x = 0;
      store.state.player.coords.y = 0;
      store.state.player.coords.s = 0;
      const startSys = game.getSystem(0, 0);
      console.log(startSys);
      store.state.planet = startSys.planets[0];
      store.state.game = game;
      console.log(store);
      this.$router.push("/game");
    },
  },
});
</script>
