<template>
  <q-toolbar>
    <q-toolbar-title>
      <q-btn flat round dense class="q-mr-sm">
        <q-avatar>
          <img src="icons/favicon-96x96.png" alt="logo" />
        </q-avatar>
        <q-menu>
          <q-list style="min-width: 200px">
            <q-item v-close-popup clickable @click="aboutDlg()">
              <q-item-section>About</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              class="text-negative"
              @click="resetGame()"
            >
              <q-item-section>Reset game</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      Islands in the Void
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
  import AboutDlg from "./AboutDlg.vue";
  import store from "src/store/store";

  export default {
    name: "GameHeader",
    methods: {
      resetGame() {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Would you like to reset current game and start new one?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            store.state.game = {};
            this.$router.push("/");
          });
      },
      aboutDlg() {
        this.$q.dialog({
          component: AboutDlg,
        });
      },
    },
  };
</script>

<style scoped></style>
