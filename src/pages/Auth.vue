<template>
  <q-page class="backed row items-center justify-center">
    <q-card flat bordered class="my-card bg-grey-8" style="width: 50%">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-center">Login</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-select
          rounded
          outlined
          dense
          options-dense
          v-model="gtype"
          :options="options"
          emit-value
          map-options
        />
      </q-card-section>

      <q-separator />

      <q-card-section v-if="gtype == 'local'" class="text-center">
        <q-input
          outlined
          v-model="text"
          label="Use local login"
          dense
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:append>
            <q-icon name="settings" @click.stop.prevent="newName()">
              <q-tooltip>Generate Name</q-tooltip>
            </q-icon>
          </template>
          <template v-slot:after>
            <q-btn
              label="New Game"
              class="game-btn"
              flat
              @click="localLogin()"
            />
          </template>
        </q-input>
        <div
          v-if="games.length == 0"
          class="items-center text-center text-warning"
          style="height: 150px"
        >
          <q-icon name="warning" /> <b>No saved games found</b>
        </div>
        <q-markup-table
          v-if="games.length > 0"
          style="max-height: 150px; scroll: auto"
        >
          <tbody>
            <tr v-for="i in games" v-bind:key="i.name">
              <td class="text-left">{{ i.name }}</td>
              <td class="text-right date-time">{{ i.date }}</td>
              <td class="text-right">
                <q-btn round dense flat color="negative" icon="cancel" />
                <q-btn round dense flat icon="send" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useMainStore } from "../stores/main";
import seedrandom from "seedrandom";
import { makeName } from "../game/support";
import { useGameStore } from "src/stores/game";

export default {
  name: "AuthPage",
  preFetch({ store, redirect }) {
    // ToDo: check the Telegram embedded auth
    const state = useMainStore();
    // console.log(store, state, redirect);
    if (state.logged) {
      redirect("/game");
    }
  },
  setup() {
    const rng = seedrandom(Date.now(), { state: true });

    let data = window.localStorage.getItem("savedGames");
    if (data == null) {
      data = "[]";
    }
    const saved = JSON.parse(data);

    return {
      rng: rng,
      text: ref(makeName(rng) + " " + makeName(rng)),
      gtype: ref("local"),
      options: [
        {
          label: "Local Roguelike",
          value: "local",
        },
        {
          label: "Network Roguelike",
          value: "network",
        },
        {
          label: "Network Sandbox",
          value: "sandbox",
        },
      ],
      games: saved,

      newName() {
        this.text = makeName(this.rng) + " " + makeName(this.rng);
      },
      localLogin() {
        const game = useGameStore();
        const main = useMainStore();
        game.newGame(this.text);
        main.login();
      },
    };
  },
};
</script>

<style scoped>
.backed {
  background: url(../assets/back1.jpg);
  background-size: cover;
  background-position: 50% 50%;
}
.date-time {
  white-space: break-spaces !important;
  font-size: 0.7em;
}
</style>
