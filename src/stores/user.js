import { defineStore } from "pinia";
import seedrandom from "seedrandom";
import { makeSystem } from "src/game/cosmos";
import { makeName, romanize } from "src/game/support";
import { ref } from "vue";

export const useUserStore = defineStore("user", {
  state: () => ({
    display: "",
    key: "0",
    home_name: "",
    loc_segment: -1,
    loc_star: 0,
    loc_planet: -1,
    loc_tri: -1,
    loc_hex: -1,
    loc_bld: 0,
    rng: null,
    ss: null,
  }),

  getters: {
    loc(state) {
      // console.log(state);
      let star = state.home_name;
      return {
        segment: state.loc_segment,
        star: state.loc_star,
        planet: state.loc_planet,
        tri: state.loc_tri,
        hex: state.loc_hex,
        bld: state.loc_bld,
        name: function () {
          let name = "on the " + star;
          if (state.loc_planet < 0) {
            name = "somthere in the " + star + " system";
          } else {
            name = name + " " + romanize(state.loc_planet + 1);
          }
          return name;
        },
      };
    },
    planet(state) {
      console.log(state.ss.planets[state.loc_planet]);
      return {
        name: state.home_name + " " + romanize(state.loc_planet + 1),
        map: state.ss.planets[state.loc_planet].map,
      };
    },
    json(state) {
      let obj = { ...state };
      return JSON.stringify(obj);
    },
  },

  actions: {
    newGame() {
      this.rng = seedrandom(Date.now());
      this.home_name = makeName();
      this.ss = makeSystem(seedrandom(70));
      this.loc_planet = this.ss.main;
      this.ss.planets[this.loc_planet].map.generate();
    },
  },
});
