const { createPinia, setActivePinia } = require("pinia");
const { useGameStore } = require("../src/stores/game");

describe("GameStore Tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Basic Test", () => {
    const store = useGameStore();
    expect(store.gameWidth).toBe(800);
    expect(store.gameHeigth).toBe(600);
  });

  it("Create Test User", () => {
    const store = useGameStore();
    store.newGame("Test User");
    // console.log(store.json);
    // console.log(store.rng());
    expect(store.home_name).toBe("Enraloce");
    expect(store.rng()).toBe(0.4445926946003861);
  });

  it("Save & Restore Test", () => {
    const store = useGameStore();
    store.newGame("Test User");
    const save = store.json;
    const crn = store.rng();
    store.loc_segment = 11;
    store.loc_star = 2;
    store.fromJson(save);
    expect(store.rng()).toBe(crn);
    expect(store.loc_segment).toBe(-1);
    expect(store.loc_star).toBe(0);
    store.fromJson(JSON.parse(save));
    expect(store.rng()).toBe(crn);
    expect(() => {
      store.fromJson(42);
    }).toThrow("Argument neither string or object");
  });
});
