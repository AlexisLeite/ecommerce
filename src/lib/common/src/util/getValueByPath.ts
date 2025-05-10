/**
 * Tries to get a value from an object, nested according to path.
 *
 * @example
 *
 * getValueByPath({person: { name: 'Ee' }}, 'person.name') // Ee
 */
export function getValueByPath(object: any, path: string) {
  const steps = path.split(".");
  let obj = object;
  try {
    let step = steps.shift();
    while (step) {
      if (typeof obj === "object" && obj) obj = obj[step];
      step = steps.shift();
    }
    return obj;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
