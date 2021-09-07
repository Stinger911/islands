<template>
  <q-page
    class="flex flex-center"
    style="background: url('img/background02.jpg')"
  >
    <div class="column">
      <img
        alt="logo"
        src="../../public/img/island.png"
        style="width: 200px; height: 200px"
      />
      <q-btn color="primary" glossy class="q-mt-sm" @click="newGame"
        >Start new game</q-btn
      >
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import { makeGame, makeName } from "src/store/game";
  import store from "src/store/store";

  export default defineComponent({
    name: "MainPage",
    setup() {
      return {
        seed: ref(""),
      };
    },
    methods: {
      newGame() {
        let seed = makeName();
        this.$q
          .dialog({
            title: "New game",
            message: "You may identify this game:",
            prompt: {
              model: seed,
              type: "text", // optional
            },
            cancel: true,
            persistent: true,
          })
          .onOk((data) => {
            const game = makeGame(data);
            store.state.player.location.face = 0;
            store.state.player.location.row = 4; // first planet MUST be 9 size
            store.state.player.location.col = 4;
            store.state.player.coords.x = 0;
            store.state.player.coords.y = 0;
            store.state.player.coords.s = 0;
            const startSys = game.getSystem(0, 0);
            store.state.planet = startSys.planets[0];
            store.state.game = game;
            this.$router.push("/game");
          });
      },
    },
  });
</script>
