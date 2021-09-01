import { reactive } from 'vue';
import player, {playerActions} from "src/store/player";
import {makePlanet} from "src/store/planet";

const defaultPlanet = makePlanet(9);

export default {
    state: reactive({
        player,
        planet: defaultPlanet,
    }),
    playerActions,
}