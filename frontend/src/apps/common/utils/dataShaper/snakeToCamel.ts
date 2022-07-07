/**
 *
 * @param {string} key A snake case string to be converted into camel case
 *
 */

export const snakeToCamel = (key: string): string =>
  key.replace(
    /^(__|_)|_(\w)/g,
    (match: any, firstCapture: any, secondCapture: string) => {
      if (firstCapture) {
        return match;
      }
      return secondCapture.toUpperCase();
    }
  );

export const camelToSnake = (key: String): string =>
  key.replace(/([a-z])([A-Z])/g, "$1_$2").toLocaleLowerCase();
