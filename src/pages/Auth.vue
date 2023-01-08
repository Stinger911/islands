<template>
  <q-page class="backed row items-center justify-center">
    <q-card flat bordered class="my-card bg-grey-8" style="width: 50%">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-center">Local Login</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-center" style="width: 80%; margin: auto">
          <q-input
            outlined
            v-model="text"
            label="Use local login"
            dense
            :rules="[(val) => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="settings" @click.stop.prevent="newName()" />
            </template>
          </q-input>
          <q-btn style="width: 50%; margin-bottom: 0.7em" @click="localLogin()"
            >Login</q-btn
          >
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-center">
        <div>-- OR --</div>
        <q-btn style="width: 66%; margin-bottom: 0.7em">Google</q-btn>
        <q-btn style="width: 66%">Telegram</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useMainStore } from "../stores/main";
import { useUserStore } from "../stores/user";
import seedrandom from "seedrandom";
import { makeName } from "../game/support";

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

    return {
      rng: rng,
      text: ref(makeName(rng) + " " + makeName(rng)),

      newName() {
        this.text = makeName(this.rng) + " " + makeName(this.rng);
      },
      localLogin() {
        const rng = seedrandom(this.text, { state: true });
        const user = useUserStore();
        const main = useMainStore();
        user.newGame();
        user.display = this.text;
        user.key = rng();
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
</style>
