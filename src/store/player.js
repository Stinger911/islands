import store from "src/store/store";

export default {
    hp: 5,
    xp: 0,
    location: { 'face': 0, 'row': 4, 'col': 0 },
    coords: {x: 0, y: 0, s: 0}
}

export const playerActions = {
    moveLeft() {
        if (store.state.player.location.col > 0) {
            store.state.player.location.col -= 1;
        }
    },
    moveRight() {
        if (store.state.player.location.col < store.state.planet.size - 1) {
            store.state.player.location.col += 1;
        }
    },
    moveUp() {
        if (store.state.player.location.row > 0) {
            store.state.player.location.row -= 1;
        }
    },
    moveDown() {
        if (store.state.player.location.row < store.state.planet.size - 1) {
            store.state.player.location.row += 1;
        }
    },
}
