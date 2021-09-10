export const MOVE_NONE = -1;
export const MOVE_UP = 0;
export const MOVE_RIGHT = 1;
export const MOVE_DOWN = 2;
export const MOVE_LEFT = 3;

export function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}
