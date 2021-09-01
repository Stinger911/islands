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
            <q-separator/>
            <q-item clickable v-close-popup class="text-negative" @click="resetGame()">
              <q-item-section>Reset game</q-item-section>
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
  name: "GameHeader",
  methods: {
    resetGame() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to reset current game and start new one?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$router.push("/");
      })
    }
  }
}
</script>

<style scoped>

</style>