/* eslint-disable @typescript-eslint/no-explicit-any */
const REACT_ELEMENT_TYPE = Symbol.for('react.element');

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param object
 * @return True if `object` is a ReactElement.
 * @final
 */

export const isValidElement = (object: any): boolean =>
  typeof object === 'object' &&
  object !== null &&
  object.$$typeof === REACT_ELEMENT_TYPE;
