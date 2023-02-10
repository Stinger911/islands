<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h5 text-center cosmogen text-ui">
        Observation Point
      </q-card-section>

      <q-card-section v-if="hasAstro == 0">
        You don't have any knowledge of <b>Astrology</b>, so only blind jump is
        possible. But your chances to success is
        <q-chip outline dense square color="red" text-color="white">
          50 // 50
        </q-chip>
        . <br /><br />
        Are you ready to Jump?
      </q-card-section>

      <q-card-section v-if="hasAstro != 0">
        Setting inspired by <b>"Hermeticon"</b> series by Vadim Panov
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn
          color="negative"
          label="Yes!"
          v-if="hasAstro == 0"
          @click="onBlindJump"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { BLIND_RATE, Game } from "src/game/main";
import { randint } from "src/game/support";
import { useGameStore } from "src/stores/game";

export default {
  name: "JumpDlg",
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const store = useGameStore();

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK();
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick() {
        onDialogCancel();
      },
      onBlindJump() {
        console.log("do the blind jump");
        if (Math.random < BLIND_RATE) {
          this.$router.push("/lost");
        }
        store.loc_planet = randint(Math.random, 0, store.ss.planets.length);
        const planet = store.ss.planets[store.loc_planet];
        planet.map.generate();
        let tri = randint(Math.random, 0, 4);
        let hex = randint(Math.random, 0, planet.map.triangles[tri].hex.length);
        while (planet.map.triangles[tri].hex[hex] == 4) {
          tri = randint(Math.random, 0, 4);
          hex = randint(Math.random, 0, planet.map.triangles[tri].hex.length);
        }
        store.loc_tri = tri;
        store.loc_hex = hex;
        planet.map.zone(tri);
        console.log(store.loc_planet, planet, store.ss);
        onDialogOK();
      },
    };
  },
  computed: {
    planetName() {
      return this.store.planet.name;
    },
    hasAstro() {
      return 0;
    },
  },
};
</script>
