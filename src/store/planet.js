export function makePlanet(sz) {
    const fc = [];
    for (let f = 0; f < 6; f++) {
        const fx = [];
        for (let r = 0; r < sz; r ++) {
            let rw = "";
            for (let c = 0; c < sz; c++) {
                rw = rw + c;
            }
            fx.push(rw);
        }
        fc.push(fx);
    }
    return {
        name: "Random Planet",
        size: sz,
        faces: fc,
    }
}