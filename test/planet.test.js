import seedrandom from "seedrandom";
import { fillPlane, makePlanet } from "../src/store/planet";

describe("Planet Generation Tests", () => {
  const rng = seedrandom("test");

  it("Make lines", () => {
    const plane = fillPlane(9, 0.2, rng, 0, 0);
    console.log("|" + plane.join("|\n|") + "|");
  });

  it("Make spots", () => {
    const plane = fillPlane(9, 0.2, rng, 1, 1);
    console.log("|" + plane.join("|\n|") + "|");
  });

  it("Make random", () => {
    const plane = fillPlane(9, 0.2, rng);
    console.log("|" + plane.join("|\n|") + "|");
  });

  it("Make random small", () => {
    const plane = fillPlane(5, 0.2, rng);
    console.log("|" + plane.join("|\n|") + "|");
  });

  it("Make big planet", () => {
    const sz = 9;
    const planet = makePlanet(sz, rng);
    let out = `{\n  name: ${planet.name},\n  type: ${planet.type}\n}`;
    console.log(out);
    const pad = String(" ").repeat(sz - 1) + "|";
    out = "";
    for (let r = 0; r < sz; r++) {
      out = out + pad + planet.faces[4][r] + "\n";
    }
    for (let r = 0; r < sz; r++) {
      out = out + planet.faces[3][r];
      out = out + planet.faces[0][r];
      out = out + planet.faces[2][r];
      out = out + planet.faces[5][r];
      out = out + "\n";
    }
    for (let r = 0; r < sz; r++) {
      out = out + pad + planet.faces[1][r] + "\n";
    }
    console.log(out);
  });

  it("Make small planet", () => {
    const sz = 5;
    const planet = makePlanet(sz, rng);
    let out = `{\n  name: ${planet.name},\n  type: ${planet.type}\n}`;
    console.log(out);
    const pad = String(" ").repeat(sz - 1) + "|";
    out = "";
    for (let r = 0; r < sz; r++) {
      out = out + pad + planet.faces[4][r] + "\n";
    }
    for (let r = 0; r < sz; r++) {
      out = out + planet.faces[3][r];
      out = out + planet.faces[0][r];
      out = out + planet.faces[2][r];
      out = out + planet.faces[5][r];
      out = out + "\n";
    }
    for (let r = 0; r < sz; r++) {
      out = out + pad + planet.faces[1][r] + "\n";
    }
    console.log(out);
  });
});
