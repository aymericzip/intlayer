/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param object
 * @return True if `object` is a ReactElement.
 * @final
 */

export const isValidElement = (object: any): boolean =>
  typeof object === 'object' &&
  typeof object?.key !== 'undefined' &&
  typeof object?.props !== 'undefined';
