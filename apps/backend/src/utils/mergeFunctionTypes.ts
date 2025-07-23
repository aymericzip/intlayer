/**
 * Convert a union to an intersection
 */
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

/**
 * Extract the (single) parameter type from a function
 */
type Arg<T> = T extends (arg: infer A) => any
  ? A extends object
    ? A
    : {}
  : never;

/**
 * Extract the return type from a function (keeps unions)
 */
type Ret<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Merge the parameter objects and keep the return‑type union
 */
export type MergeFunctions<U extends (arg: any) => any> = (
  arg: UnionToIntersection<Arg<U>>
) => Ret<U>;
