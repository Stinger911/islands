<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background-color: #4e4e4e">
      <q-card-section class="text-h5 text-center cosmogen text-ui"
        >About</q-card-section
      >

      <q-card-section>
        Steampunk roguelike game. You found yourself onboard of zeppeline in the
        strange world. Now you try to find way home through cubes placed in the
        void.
      </q-card-section>

      <q-card-section>
        Setting inspired by <b>"Hermeticon"</b> series by Vadim Panov
      </q-card-section>

      <q-card-section v-if="inGame">
        <div class="text-caption text-center">Current game ID</div>
        <div
          class="full-width q-badge q-badge--outline text-purple-11 text-weight-bolder text-center"
        >
          {{ inGame }}
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useGameStore } from "src/stores/game";

export default {
  name: "AboutDlg",
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
      store: store,

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
      onCancelClick: onDialogCancel,
    };
  },
  computed: {
    inGame() {
      return this.store.userName;
    },
  },
};
</script>
