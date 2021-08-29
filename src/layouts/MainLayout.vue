<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat round dense class="q-mr-sm">
            <q-avatar>
              <img src="icons/favicon-96x96.png" alt="logo">
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 200px">
                <q-item clickable v-close-popup>
                  <q-item-section>About</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          Islands in the Void
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Info:</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>


import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    return {
    }
  }
})
</script>
