<template>
  <q-page class="flex flex-center"  style="background: url('/background02.jpg')">
    <img
      alt="Quasar logo"
      src="~assets/island.png"
      v-if="!loaded"
      style="width: 200px; height: 200px"
      @click="load()"
    >
    <cube v-if="loaded" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import cube from "components/cube";

export default defineComponent({
  components: { cube  },
  name: 'MainPage',
  setup () {
    return {
      loaded: true,
    }
  },
  methods: {
    load() {
      this.loaded = !this.loaded;
      console.log("load", this.loaded);
      this.$forceUpdate();
    }
  }
})
</script>
