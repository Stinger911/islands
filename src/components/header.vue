<template>
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
</template>

<script>
export default {
  name: "GameHeader"
}
</script>

<style scoped>

</style>