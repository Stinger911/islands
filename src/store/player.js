import store from "src/store/store";

export default {
    status: 'active',
    hp: 5,
    xp: 0,
    location: { 'face': 0, 'row': 4, 'col': 0 },
    direction: 'right',
    items: ['torch'],
    hacking: false
}

export const playerActions = {
    moveLeft() {
        console.log(store.state.player.location);
        if (store.state.player.location.col > 0) {
            store.state.player.location.col -= 1;
        }
    },
    moveRight() {
        console.log(store.state.player.location);
        if (store.state.player.location.col < store.state.planet.size) {
            store.state.player.location.col += 1;
        }
    },
    moveUp() {
        console.log(store.state.player.location);
        if (store.state.player.location.row > 0) {
            store.state.player.location.row -= 1;
        }
    },
    moveDown() {
        console.log(store.state.player.location);
        if (store.state.player.location.row < store.state.planet.size) {
            store.state.player.location.row += 1;
        }
    },
}
