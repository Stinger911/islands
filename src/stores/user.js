import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    display: "",
    key: 0,
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2
    // }
  },

  actions: {
    // increment () {
    //   this.counter++
    // }
  },
});
