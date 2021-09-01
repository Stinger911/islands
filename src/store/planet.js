export function makePlanet(sz, rng = null) {
    if (rng == null) {
        rng = Math.random;
    }
    const fc = [];
    for (let f = 0; f < 6; f++) {
        const fx = [];
        for (let r = 0; r < sz; r ++) {
            let rw = "";
            for (let c = 0; c < sz; c++) {
                let cell = " ";
                if (rng() < 0.2) {
                    cell = "X";  //  wall
                }
                if (cell === " " && rng() < 0.2) {
                    cell = "T";  // "forest"
                }
                if (cell === " " && rng() < 0.2) {
                    cell = "g";  // "grass"
                }
                if (cell === " " && rng() < 0.2) {
                    cell = "w";  // "water"
                }
                rw = rw + cell;
            }
            fx.push(rw);
        }
        fc.push(fx);
    }
    return {
        name: "Random Planet",
        size: sz,
        type: "grass",
        faces: fc,
    }
}