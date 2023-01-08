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
        >
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
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title>
          {{ user.display }} {{ userLocation }}
        </q-toolbar-title>

        <div>App v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="semi-trans-panel">
      <game-footer></game-footer>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import GameFooter from "components/footer";
import { useUserStore } from "../stores/user";
import { useMainStore } from "../stores/main";

export default defineComponent({
  components: { GameFooter },
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const user = useUserStore();
    const main = useMainStore();

    $q.dark.set(true);
    return {
      user: user,
      version: process.env.PACKAGE_VERSION,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
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
    };
  },
  computed: {
    userLocation() {
      const l = this.user.loc;
      console.log(l);
      return l.name();
    },
  },
});
</script>
