<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <h6>You found something</h6>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import { useDialogPluginComponent } from "quasar";
  import { ref } from "vue";
  import store from "src/store/store";
  import seedrandom from "seedrandom";
  import { makeName } from "src/store/game";

  export default {
    name: "GatheringDlg",
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
          store.state.inGather = false;
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
    methods: {},
  };
</script>

<style scoped>
  .beacon-dlg {
    background-color: #4e4e4e;
    max-width: 95vw;
  }
</style>
