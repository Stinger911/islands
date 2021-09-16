<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" seamless position="bottom" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin"
      style="width: 350px; position: absolute; left: 20px; bottom: 70px"
    >
      <h6 class="q-ma-xs">On {{ planet().name }}</h6>

      <q-card-section class="q-px-none">
        <q-list dense>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Zeppeline status</q-item-label>
              <q-item-label caption lines="1">
                <span class="q-mx-sm text-yellow"> 75 </span> /
                <span class="q-mx-sm text-green"> 5 </span> /
                <span class="q-mx-sm text-red"> 80 </span> /
                <span class="q-mx-sm text-blue"> 40 </span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <q-menu anchor="bottom end" self="bottom start">
              <q-list dense style="width: 150px">
                <q-item class="text-yellow">
                  <q-item-section> Durability </q-item-section>
                  <q-item-section side> 75 </q-item-section>
                </q-item>
                <q-item class="text-green">
                  <q-item-section> Speed </q-item-section>
                  <q-item-section side> 5 </q-item-section>
                </q-item>
                <q-item class="text-red">
                  <q-item-section> Attack </q-item-section>
                  <q-item-section side> 80 </q-item-section>
                </q-item>
                <q-item class="text-blue">
                  <q-item-section> Defense </q-item-section>
                  <q-item-section side> 40 </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable>
            <q-item-section>
              <q-item-label>Crew information</q-item-label>
              <q-item-label caption lines="1"> No crew onboard </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <q-menu anchor="bottom end" self="bottom start">
              <q-list dense style="width: 150px">
                <q-item class="text-cyan">
                  <q-item-section> Navigator </q-item-section>
                  <q-item-section side> 75 </q-item-section>
                </q-item>
                <q-item class="text-red">
                  <q-item-section> Guns </q-item-section>
                  <q-item-section side> 5 </q-item-section>
                </q-item>
                <q-item class="text-yellow">
                  <q-item-section> Technic </q-item-section>
                  <q-item-section side> 80 </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-separator spaced inset />
          <q-item>
            <q-item-section>
              <q-item-label>Mission details</q-item-label>
              <q-item-label caption lines="1">
                Position, score, current mission
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import { useDialogPluginComponent } from "quasar";
  import store from "src/store/store";

  export default {
    name: "StatsDlg",
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
        onCancelClick: onDialogCancel,
      };
    },
    computed: {
      inGame() {
        if (store.state.game && store.state.game.seed) {
          return store.state.game.seed;
        }
        return false;
      },
    },
    methods: {
      planet() {
        return store.state.planet;
      },
    },
  };
</script>
