import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    logged: false,
    online: false,
    scene: "",
    blds: false,
    objs: false,
    beforeMap: "",
    zoom: 0.5,
  }),

  getters: {
    isLoggedIn(state) {
      return state.logged;
    },
  },

  actions: {
    login() {
      this.logged = true;
      this.router.push("game");
    },
  },
});
