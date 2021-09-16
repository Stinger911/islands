<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin beacon-dlg" :style="setSize()">
      <!-- buttons example -->
      <q-card-actions>
        <q-tabs v-model="tabs">
          <q-tab name="local" label="Local" />
          <q-tab name="system" label="Global" />
        </q-tabs>
        <q-space />
        <span class="text-h6">Navigation</span>
        <q-space />
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
      <q-card class="text-align-center">
        <div id="navMap" :style="setSize(true)"></div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script>
  import { useDialogPluginComponent } from "quasar";
  import { ref } from "vue";
  import store from "src/store/store";

  export default {
    name: "BeaconDlg",
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

      const tabs = ref("local");
      return {
        // This is REQUIRED;
        // Need to inject these (from useDialogPluginComponent() call)
        // into the vue scope for the vue html template
        dialogRef,
        onDialogHide,

        tabs,

        // other methods that we used in our vue html template;
        // these are part of our example (so not required)
        onOKClick() {
          store.state.showBeacon = false;
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
    methods: {
      setSize(isIn = false) {
        const style = [];
        let sz = window.innerHeight - 200;
        if (window.innerWidth < sz) sz = window.innerWidth;
        sz = Math.floor(sz * 0.9);

        style.push(`width: ${sz}px`);
        if (isIn) style.push(`height: ${sz}px`);
        return style.join("; ");
      },
    },
  };
</script>

<style scoped>
  .beacon-dlg {
    background-color: #4e4e4e;
    max-width: 95vw;
  }
</style>
