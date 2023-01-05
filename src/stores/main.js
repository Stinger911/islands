import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    logged: false,
    online: false,
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
