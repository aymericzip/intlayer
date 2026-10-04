import type { Types } from 'mongoose';

/**
 * Shape of a backend value once sent as JSON (what clients receive):
 * ObjectIds and Dates become strings, recursively.
 */
export type Serialized<Value> = Value extends
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  ? Value
  : // Functions are dropped by JSON.stringify
    Value extends (...args: never[]) => unknown
    ? never
    : Value extends Types.ObjectId
      ? string
      : Value extends Date
        ? string
        : Value extends (infer Item)[]
          ? Serialized<Item>[]
          : Value extends object
            ? { [Key in keyof Value]: Serialized<Value[Key]> }
            : Value;

/**
 * Compile-time bridge between the mongoose and zod worlds: resolves only
 * when the serialized backend shape satisfies the contract type, otherwise
 * the constraint error names the drifting fields.
 * @example type ProjectWire = AssertWire<ContractProjectAPI, Serialized<ProjectAPI>>;
 */
export type AssertWire<
  Contract,
  SerializedBackend extends Contract,
> = SerializedBackend;
