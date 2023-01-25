import { defineStore } from "pinia";
import seedrandom from "seedrandom";
import { makeSystem } from "src/game/cosmos";
import { makeName, romanize } from "src/game/support";

const HOME_SEED = 70;

export const useGameStore = defineStore("gameData", {
  state: () => ({
    userName: "",
    key: "0",
    ss: null,
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
    gameWidth(state) {
      return 800;
    },
    gameHeigth(state) {
      return 600;
    },
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
      // console.log(state.ss.planets[state.loc_planet]);
      return {
        name: state.home_name + " " + romanize(state.loc_planet + 1),
        map: state.ss.planets[state.loc_planet].map,
      };
    },
    json(state) {
      const dts = new Date().toString().split(" ").slice(0, 5).join(" ");
      let obj = {
        userName: state.userName,
        sDate: dts.substring(0, dts.length - 3),
        key: state.key,
        home_name: state.home_name,
        loc_segment: state.loc_segment,
        loc_star: state.loc_star,
        loc_planet: state.loc_planet,
        loc_tri: state.loc_tri,
        loc_hex: state.loc_hex,
        loc_bld: state.loc_bld,
        rng: state.rng.state(),
      };
      return JSON.stringify(obj);
    },
  },

  actions: {
    makeSS() {
      let rng;
      if (this.loc_segment == -1) {
        rng = seedrandom(HOME_SEED);
      }
      this.ss = makeSystem(rng);
    },
    newGame(seed) {
      this.userName = seed;
      this.rng = seedrandom(seed, { state: true });
      this.home_name = makeName(this.rng);
      this.loc_segment = -1;
      this.loc_star = 0;
      this.makeSS();
      this.loc_planet = this.ss.main;
      this.ss.planets[this.loc_planet].map.generate();
    },
    fromJson(json) {
      let js = {};
      if (typeof json === "string" || json instanceof String) {
        js = JSON.parse(json);
      } else if (typeof json === "object") {
        js = json;
      } else {
        throw "Argument neither string or object";
      }
      this.userName = js.userName;
      this.key = js.key;
      this.home_name = js.home_name;
      this.loc_segment = js.loc_segment;
      this.loc_star = js.loc_star;
      this.loc_planet = js.loc_planet;
      this.loc_tri = js.loc_tri;
      this.loc_hex = js.loc_hex;
      this.loc_bld = js.loc_bld;
      this.rng = seedrandom("", { state: js.rng });
      this.makeSS();
      this.ss.planets[this.loc_planet].map.generate();
    },
  },
});
