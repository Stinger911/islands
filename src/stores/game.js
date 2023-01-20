import { defineStore } from "pinia";
import seedrandom from "seedrandom";
import { makeSystem } from "src/game/cosmos";

export const useGameStore = defineStore("gameData", {
  state: () => ({
    starSys: null,
    planet: null,
  }),

  getters: {
    // doubleCount(state) {
    //   return state.counter * 2;
    // },
  },

  actions: {
    makeSS(key) {
      const rng = seedrandom(key);
      this.starSys = makeSystem(rng);
      this.planet = this.starSys.planets[this.starSys.main].map;
    },
  },
});
