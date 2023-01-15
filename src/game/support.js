export function makeName(rng = null) {
  if (rng == null) {
    rng = Math.random;
  }
  const digrams =
    "ABOUSEITILETSTONLONUTHNOALLEXEGEZACEBISOUSESARMAINDIREA?ERATENBERALAVETIEDORQUANTEISRION";
  let pName = "";
  let x = 0;
  const size = rng() < 0.15 ? 2 : rng() < 0.5 ? 3 : 4;
  for (let i = 0; i < size; i++) {
    x = Math.floor(rng() * 43) * 2;
    pName += digrams[x];
    if (digrams[x + 1] !== "?") {
      pName += digrams[x + 1];
    }
  }
  return pName.charAt(0) + pName.slice(1).toLowerCase();
}

export function romanize(num) {
  if (isNaN(num)) return "NaN";
  const lookup = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let roman = "";
  lookup.forEach((i) => {
    while (num >= i[1]) {
      roman += i[0];
      num -= i[1];
    }
  });
  return roman;
}

export function randint(rng, from, till) {
  return Math.floor(rng() * (till - from) + from);
}

export function dice(rng, mul, sides) {
  return Math.floor(mul * (randint(rng, 0, sides) + 1));
}

export function choice(rng, arr) {
  return arr[randint(rng, 0, arr.length)];
}

export function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}
