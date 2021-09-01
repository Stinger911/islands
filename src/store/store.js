import { reactive } from 'vue';
import player, {playerActions} from "src/store/player";
import {makePlanet} from "src/store/planet";

const defaultPlanet = makePlanet(9);

const store = {
    state: reactive({
        showStats: false,
        player,
        game: {},
        planet: defaultPlanet,
    }),
    setStatsVisibility,
    playerActions,
}

export default store;

function setStatsVisibility(param) {
    console.log(param);
    store.state.showStats = param;
}
