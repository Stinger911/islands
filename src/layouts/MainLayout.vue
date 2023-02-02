<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="semi-trans-panel" :style="{ paddingLeft: headPad }">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="img:assets/icons/eagle-24.png"
          aria-label="Menu"
        >
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item v-close-popup clickable @click="aboutDlg()">
                <q-item-section>About</q-item-section>
              </q-item>
              <q-item v-close-popup clickable @click="saveGame()">
                <q-item-section>Save</q-item-section>
              </q-item>
              <q-separator />
              <!-- Restor in dependency of skills -->
              <!-- q-item v-close-popup clickable @click="starMap()">
                <q-item-section class="text-lumi">Star Map</q-item-section>
              </q-item -->
              <q-separator />
              <q-item
                v-close-popup
                clickable
                class="text-negative"
                @click="resetGame()"
              >
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title>
          {{ game.userName }} {{ userLocation }}
        </q-toolbar-title>

        <div>App v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="semi-trans-panel">
      <game-footer :space="wid"></game-footer>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import GameFooter from "components/footer";
import { useMainStore } from "../stores/main";
import { useGameStore } from "src/stores/game";
import AboutDlg from "src/components/AboutDlg.vue";
import { Game } from "src/game/main";

export default defineComponent({
  components: { GameFooter },
  name: "MainLayout",

  setup() {
    const $q = useQuasar();
    const game = useGameStore();
    const main = useMainStore();

    $q.dark.set(true);
    return {
      game: game,
      wid: ref(window.innerWidth),
      headPad: ref("0px"),
      version: process.env.PACKAGE_VERSION,
      aboutDlg() {
        $q.dialog({
          component: AboutDlg,
        });
      },
      resetGame() {
        $q.dialog({
          title: "Confirm",
          message:
            "Would you like to log out from current game?" +
            "If you logged locally and want to continue this game you should remember the name.",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          main.logged = false;
          this.$router.push("/");
        });
      },
      saveGame() {
        let sg = {};
        try {
          sg = JSON.parse(window.localStorage.getItem("savedGames"));
          if (sg == null) sg = {};
        } catch {
          sg = {};
        }
        console.log(this.game.userName, this.game.json);
        sg[this.game.userName] = this.game.json;
        window.localStorage.setItem("savedGames", JSON.stringify(sg));
      },
      onResize(win, evt) {
        const aspect =
          window.innerWidth -
          Math.min(window.innerWidth / 800, window.innerHeight / 600) * 800;
        if (!isNaN(aspect)) {
          this.wid = Math.round(aspect);
          this.headPad = "" + aspect / 2 + "px";
        }
        // console.log(this.wid);
      },
      starMap() {
        const view = Game.scene.getScenes(true)[0];
        main.beforeMap = view.scene.key;
        console.log(main.beforeMap);
        view.scene.stop(main.beforeMap);
        view.scene.start("StarMapView");
      },
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize(window, null);
  },
  computed: {
    userLocation() {
      const l = this.game.loc;
      // console.log(l);
      return l.name();
    },
  },
});
</script>
