<template>
  <q-page class="flex flex-center" style="background: url('img/background02.jpg')">
    <cube />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Cube from "components/cube";
import store from "src/store/store";

export default defineComponent({
  components: { Cube },
  name: "MainView",
  setup() {
    return {};
  },
  mounted() {
    if (!store.state.game.seed) {
      this.$router.push("/");
    }
  },
});
</script>
