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
  }),

  getters: {
    loc(state) {
      console.log(state);
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
    json(state) {
      let obj = { ...state };
      return JSON.stringify(obj);
    },
  },

  actions: {
    newGame() {
      this.rng = seedrandom(Date.now());
      this.home_name = makeName();
      const ss = makeSystem(seedrandom(70));
      this.loc_planet = ss.main;
      // DEBUG code below this line
      window.mss = (s) => {
        return makeSystem(seedrandom(s));
      };
      window.plook = (s) => {
        for (let i = s; i < 1000000; i++) {
          let ss = makeSystem(seedrandom(i));
          let p = ss.planets[ss.main];
          if (
            (ss.color == 1 || ss.color == 2) &&
            ss.main > 1 &&
            ss.planets.length > 4 &&
            ss.planets.length < 11 &&
            p.mass > 7 &&
            p.orbit > 1 &&
            p.orbit < 4
          ) {
            console.log(i, ss.str(), ss);
            break;
          }
        }
      };
    },
  },
});
