<template>
  <q-page class="flex flex-center"  style="background: url('/background02.jpg')">
    <cube />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Cube from "components/cube";

export default defineComponent({
  components: { Cube  },
  name: 'MainView',
  setup () {
    return { }
  },
  methods: {
  }
})
</script>
