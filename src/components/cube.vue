<template>
  <div :style="sizeStyle()" style="background: bisque" :data-size="size" />
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "cube",
  setup () {
    return {
      size: 200,
    }
  },
  mounted() {
    let sz = window.innerHeight - 100;
    if(window.innerWidth < sz) sz = window.innerWidth;
    sz = sz * 0.95;
    if (sz > 700) sz = 700;
    this.size = sz;
    console.log("Set size:", sz);
    this.$forceUpdate();
  },
  methods: {
    sizeStyle () {
      return `width: ${this.size}px; height: ${this.size}px`;
    }
  }
})
</script>

<style scoped>

</style>