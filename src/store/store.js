import { reactive } from "vue";
import player, { playerActions } from "./player";
import { makePlanet } from "./planet";

const defaultPlanet = makePlanet(9);

const store = {
  state: reactive({
    showStats: false,
    showBeacon: false,
    showCity: false,
    showObserve: false,
    inFight: false,
    inGather: false,
    player: player(),
    game: {},
    planet: defaultPlanet,
    pixi: null,
  }),
  setStatsVisibility,
  playerActions,
  resetGame: function () {
    this.state.game = {};
    this.state.player = player();
  },
};

export default store;

function setStatsVisibility(param) {
  console.log(param);
  store.state.showStats = param;
}
