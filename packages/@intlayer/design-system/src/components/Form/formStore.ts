import type { z } from 'zod/mini';
import { getValueAtPath, isPathWithin, setValueAtPath } from './formPath';

type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date
  | File
  | Blob;

/** Recursion budget for {@link FieldPath}, keeps deep types (dictionaries) cheap. */
type PathDepth = [never, 0, 1, 2, 3];

type IsAny<TValue> = 0 extends 1 & TValue ? true : false;

/** Dot paths of an object type: `'name' | 'grants' | `grants.${string}``. */
export type FieldPath<TValues, TDepth extends number = 4> =
  IsAny<TValues> extends true
    ? string
    : [TDepth] extends [never]
      ? never
      : TValues extends Primitive | readonly unknown[]
        ? never
        : {
            [Key in keyof TValues & string]:
              | Key
              | (NonNullable<TValues[Key]> extends
                  | Primitive
                  | readonly unknown[]
                  ? never
                  : `${Key}.${FieldPath<NonNullable<TValues[Key]>, PathDepth[TDepth]>}`);
          }[keyof TValues & string];

/** Type of the value stored at a {@link FieldPath}. */
export type FieldPathValue<TValues, TPath extends string> =
  IsAny<TValues> extends true
    ? unknown
    : TPath extends keyof TValues
      ? TValues[TPath]
      : TPath extends `${infer Key}.${infer RemainingPath}`
        ? Key extends keyof TValues
          ? FieldPathValue<NonNullable<TValues[Key]>, RemainingPath>
          : unknown
        : unknown;

/** Like `Partial`, recursively, array items included (mirrors react-hook-form). */
export type DeepPartial<TValue> = TValue extends Primitive
  ? TValue
  : { [Key in keyof TValue]?: DeepPartial<TValue[Key]> };

/** First validation message of every invalid field, keyed by dot path. */
export type FormErrors = Record<string, string>;

export type FormState<TValues> = {
  values: TValues;
  errors: FormErrors;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
};

/**
 * - `onSubmit`: errors appear on submit, then follow each change.
 * - `onChange`: errors follow each change from the start.
 */
export type FormMode = 'onSubmit' | 'onChange';

export type FormOptions<TValues> = {
  defaultValues?: DeepPartial<TValues>;
  mode?: FormMode;
};

export type FormInstance<TValues> = {
  getState: () => FormState<TValues>;
  /** Notified on every state change. Returns the unsubscribe function. */
  subscribe: (listener: () => void) => () => void;
  getValues: {
    (): TValues;
    <TPath extends FieldPath<TValues>>(
      path: TPath
    ): FieldPathValue<TValues, TPath>;
  };
  setValue: <TPath extends FieldPath<TValues>>(
    path: TPath,
    value: FieldPathValue<TValues, TPath>
  ) => void;
  /** Restores the default values. Passing values also makes them the new defaults. */
  reset: (values?: DeepPartial<TValues>) => void;
  /** Called with the new values on each value change. Returns the unsubscribe function. */
  watch: (callback: (values: TValues) => void) => () => void;
  /**
   * Validates, then calls `onValid` with the parsed schema output, or focuses
   * the first invalid field.
   */
  handleSubmit: (
    onValid: (data: TValues) => unknown,
    onInvalid?: (errors: FormErrors) => unknown
  ) => (event?: { preventDefault?: () => void }) => Promise<void>;
  /** Links a field to its DOM element, so submit can focus the first error. */
  registerElement: (path: string, element: HTMLElement | null) => void;
};

/** Loosely typed control, as seen by fields that only know a string `name`. */
export type AnyFormInstance = FormInstance<Record<string, unknown>>;

type ValidationResult<TValues> =
  | { isValid: true; data: TValues; errors: FormErrors }
  | { isValid: false; data?: undefined; errors: FormErrors };

const validate = <TValues>(
  schema: z.ZodMiniType<TValues>,
  values: unknown
): ValidationResult<TValues> => {
  const result = schema.safeParse(values);

  if (result.success) return { isValid: true, data: result.data, errors: {} };

  const errors: FormErrors = {};

  for (const issue of result.error.issues) {
    const path = issue.path.map(String).join('.');
    errors[path] ??= issue.message;
  }

  return { isValid: false, errors };
};

/** Replaces the errors at or below `path` with the matching ones of `nextErrors`. */
const mergeFieldErrors = (
  currentErrors: FormErrors,
  nextErrors: FormErrors,
  path: string
): FormErrors => {
  const mergedErrors: FormErrors = {};

  for (const [errorPath, message] of Object.entries(currentErrors)) {
    if (!isPathWithin(errorPath, path)) mergedErrors[errorPath] = message;
  }
  for (const [errorPath, message] of Object.entries(nextErrors)) {
    if (isPathWithin(errorPath, path)) mergedErrors[errorPath] = message;
  }

  return mergedErrors;
};

/**
 * Framework-free form state: values, schema errors and submit status,
 * observable through `subscribe` (shaped for `useSyncExternalStore`).
 */
export const createFormInstance = <TValues>(
  schema: z.ZodMiniType<TValues>,
  { defaultValues, mode = 'onSubmit' }: FormOptions<TValues> = {}
): FormInstance<TValues> => {
  let currentDefaultValues = (defaultValues ?? {}) as TValues;
  const listeners = new Set<() => void>();
  const elements = new Map<string, HTMLElement>();

  let state: FormState<TValues> = {
    values: currentDefaultValues,
    errors: {},
    isValid: validate(schema, currentDefaultValues).isValid,
    isSubmitting: false,
    isSubmitted: false,
  };

  const setState = (partialState: Partial<FormState<TValues>>) => {
    state = { ...state, ...partialState };
    for (const listener of listeners) listener();
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getValues = ((path?: string) =>
    path === undefined
      ? state.values
      : getValueAtPath(
          state.values,
          path
        )) as FormInstance<TValues>['getValues'];

  const setValue = (path: string, value: unknown) => {
    const values = setValueAtPath(state.values, path, value);
    const validation = validate(schema, values);
    const shouldShowErrors = mode === 'onChange' || state.isSubmitted;

    setState({
      values,
      isValid: validation.isValid,
      errors: shouldShowErrors
        ? mergeFieldErrors(state.errors, validation.errors, path)
        : state.errors,
    });
  };

  const reset = (values?: DeepPartial<TValues>) => {
    if (values) currentDefaultValues = values as TValues;

    setState({
      values: currentDefaultValues,
      errors: {},
      isValid: validate(schema, currentDefaultValues).isValid,
      isSubmitted: false,
    });
  };

  const watch = (callback: (values: TValues) => void) => {
    let previousValues = state.values;

    return subscribe(() => {
      if (state.values === previousValues) return;
      previousValues = state.values;
      callback(state.values);
    });
  };

  const focusFirstError = (errors: FormErrors) => {
    for (const errorPath of Object.keys(errors)) {
      const element = elements.get(errorPath);

      if (element) {
        element.focus();
        return;
      }
    }
  };

  const handleSubmit: FormInstance<TValues>['handleSubmit'] =
    (onValid, onInvalid) => async (event) => {
      event?.preventDefault?.();

      const validation = validate(schema, state.values);

      setState({
        errors: validation.errors,
        isValid: validation.isValid,
        isSubmitting: true,
      });

      try {
        if (validation.isValid) {
          await onValid(validation.data);
        } else {
          await onInvalid?.(validation.errors);
          focusFirstError(validation.errors);
        }
      } finally {
        setState({ isSubmitting: false, isSubmitted: true });
      }
    };

  const registerElement = (path: string, element: HTMLElement | null) => {
    if (element) elements.set(path, element);
    else elements.delete(path);
  };

  return {
    getState: () => state,
    subscribe,
    getValues,
    setValue: setValue as FormInstance<TValues>['setValue'],
    reset,
    watch,
    handleSubmit,
    registerElement,
  };
};
