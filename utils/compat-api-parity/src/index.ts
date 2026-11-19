/**
 * Helpers asserting that a compat adapter (`@intlayer/react-i18next`, …)
 * exposes the same API as the library it replaces, so that a dependency
 * update adding or changing an upstream export makes a test fail.
 *
 * Runtime helpers compare export and member *names* and their kind, which is
 * what a cast such as `as unknown as I18n` hides from the type checker. Type
 * helpers compare signatures and run in `*.test-d.ts` files.
 */

/** Runtime kind of a value, as compared between upstream and compat. */
export type ValueKind = 'function' | 'object' | 'primitive' | 'undefined';

/** A name the compat lacks, or exposes with another runtime kind. */
export type ApiDifference = {
  name: string;
  upstream: ValueKind;
  compat: ValueKind | 'missing';
};

/** Names deliberately left out of a compat, each with the reason why. */
export type KnownGaps = Readonly<Record<string, string>>;

/** Module-system keys that are not part of a library's API. */
const IGNORED_EXPORT_NAMES = new Set([
  'default',
  '__esModule',
  'module.exports',
]);

/** Returns the runtime kind of a value. */
export const getValueKind = (value: unknown): ValueKind => {
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return 'function';
  if (typeof value === 'object' && value !== null) return 'object';
  return 'primitive';
};

/**
 * Whether a name is private by convention (`_locale`, `_createCache`), as
 * opposed to a public single-character method such as lingui's `i18n._()`.
 */
const isConventionallyPrivate = (name: string): boolean =>
  /^_[\w$]/.test(name) || name.startsWith('#');

/** Lists the public named exports of a module namespace, sorted. */
export const getExportNames = (moduleNamespace: object): string[] =>
  Object.keys(moduleNamespace)
    .filter(
      (name) =>
        !IGNORED_EXPORT_NAMES.has(name) && !isConventionallyPrivate(name)
    )
    .sort();

/**
 * Lists the public members of an instance: its own properties plus the
 * methods and accessors of its prototype chain, `Object.prototype` excluded.
 */
export const getMemberNames = (instance: object): string[] => {
  const names = new Set<string>();
  let current: object | null = instance;

  while (current && current !== Object.prototype) {
    for (const name of Object.getOwnPropertyNames(current)) {
      if (name !== 'constructor' && !isConventionallyPrivate(name)) {
        names.add(name);
      }
    }
    current = Object.getPrototypeOf(current) as object | null;
  }

  return [...names].sort();
};

/** Reads a member without triggering an accessor that throws. */
const readMember = (target: object, name: string): unknown => {
  try {
    return (target as Record<string, unknown>)[name];
  } catch {
    return undefined;
  }
};

/**
 * Compares `names` between an upstream and a compat object and returns every
 * name the compat lacks or exposes with another kind, `knownGaps` excluded.
 */
const compareNames = (
  names: readonly string[],
  upstream: object,
  compat: object,
  compatNames: ReadonlySet<string>,
  knownGaps: KnownGaps
): ApiDifference[] =>
  names
    .filter((name) => !Object.hasOwn(knownGaps, name))
    .flatMap((name): ApiDifference[] => {
      const upstreamKind = getValueKind(readMember(upstream, name));

      if (!compatNames.has(name)) {
        return [{ name, upstream: upstreamKind, compat: 'missing' }];
      }

      const compatKind = getValueKind(readMember(compat, name));
      // `undefined` upstream means "not set yet", not a kind to match.
      if (upstreamKind === 'undefined' || upstreamKind === compatKind) {
        return [];
      }
      return [{ name, upstream: upstreamKind, compat: compatKind }];
    });

/**
 * Returns the upstream exports the compat module lacks or exposes with
 * another runtime kind. Empty when the compat covers the upstream surface.
 *
 * @example
 * ```ts
 * expect(
 *   getExportDifferences(upstream, compat, { IcuTrans: 'ICU macro only' })
 * ).toEqual([]);
 * ```
 */
export const getExportDifferences = (
  upstream: object,
  compat: object,
  knownGaps: KnownGaps = {}
): ApiDifference[] =>
  compareNames(
    getExportNames(upstream),
    upstream,
    compat,
    new Set(getExportNames(compat)),
    knownGaps
  );

/**
 * Returns the public upstream instance members (methods, accessors, fields)
 * the compat instance lacks or exposes with another runtime kind.
 */
export const getMemberDifferences = (
  upstream: object,
  compat: object,
  knownGaps: KnownGaps = {}
): ApiDifference[] =>
  compareNames(
    getMemberNames(upstream),
    upstream,
    compat,
    new Set(getMemberNames(compat)),
    knownGaps
  );

/**
 * Returns the `knownGaps` entries the compat now covers, so a stale entry is
 * removed instead of silently hiding a future regression.
 */
export const getResolvedGaps = (
  upstream: object,
  compat: object,
  knownGaps: KnownGaps,
  listNames: (target: object) => string[] = getExportNames
): string[] => {
  const upstreamNames = new Set(listNames(upstream));
  const compatNames = new Set(listNames(compat));

  return Object.keys(knownGaps).filter(
    (name) =>
      !upstreamNames.has(name) ||
      (compatNames.has(name) &&
        getValueKind(readMember(upstream, name)) ===
          getValueKind(readMember(compat, name)))
  );
};

/** Upstream names left out of comparisons: ignored ones and `_private` ones. */
type ComparedNames<Upstream, IgnoredName extends PropertyKey> = Exclude<
  keyof Upstream,
  IgnoredName | `_${string}`
>;

/** Maps each compared upstream name to itself when it is incompatible. */
type FlaggedNames<
  Compat,
  Upstream,
  IgnoredName extends PropertyKey,
  Mode extends 'assignable' | 'parameters',
> = {
  [Name in ComparedNames<Upstream, IgnoredName>]: Name extends keyof Compat
    ? Mode extends 'parameters'
      ? Upstream[Name] extends (...args: infer UpstreamArgs) => unknown
        ? Compat[Name] extends (...args: infer CompatArgs) => unknown
          ? UpstreamArgs extends CompatArgs
            ? never
            : Name
          : Name
        : never
      : IsAssignableMember<Compat[Name], Upstream[Name]> extends true
        ? never
        : Name
    : Name;
}[ComparedNames<Upstream, IgnoredName>];

/** Whether `Compat` accepts every argument list `Upstream` accepts. */
type AcceptsUpstreamArguments<CompatArgs, UpstreamArgs> = [
  UpstreamArgs,
] extends [CompatArgs]
  ? true
  : false;

/**
 * Whether a compat member can stand in for the upstream one. Classes are
 * compared by constructor and instance method parameters, since private
 * fields make any other class nominally unassignable.
 */
type IsAssignableMember<CompatMember, UpstreamMember> = [
  UpstreamMember,
] extends [abstract new (...args: infer UpstreamArgs) => infer UpstreamInstance]
  ? [CompatMember] extends [
      abstract new (...args: infer CompatArgs) => infer CompatInstance,
    ]
    ? AcceptsUpstreamArguments<CompatArgs, UpstreamArgs> extends true
      ? [
          FlaggedNames<CompatInstance, UpstreamInstance, never, 'parameters'>,
        ] extends [never]
        ? true
        : false
      : false
    : false
  : [CompatMember] extends [UpstreamMember]
    ? true
    : false;

/**
 * Names of the `Upstream` members that `Compat` lacks or types incompatibly;
 * `never` when every one is covered by an assignable compat member.
 *
 * The template literal makes TypeScript print the names in errors instead of
 * the alias.
 *
 * @example
 * ```ts
 * expectTypeOf<
 *   ExpectNoIncompatibleMembers<
 *     IncompatibleMembers<typeof compat, typeof upstream, 'IcuTrans'>
 *   >
 * >().toBeNever();
 * ```
 */
export type IncompatibleMembers<
  Compat,
  Upstream,
  IgnoredName extends PropertyKey = never,
> = `${FlaggedNames<Compat, Upstream, IgnoredName, 'assignable'> & string}`;

/**
 * Names of the `Upstream` methods that `Compat` lacks, or whose parameters do
 * not accept every upstream call. Return types are not compared: use it for
 * class instances, where private fields make `this`-returning methods
 * nominally incompatible even when their shape matches.
 */
export type IncompatibleParameters<
  Compat,
  Upstream,
  IgnoredName extends PropertyKey = never,
> = `${FlaggedNames<Compat, Upstream, IgnoredName, 'parameters'> & string}`;

/**
 * Accepts only `never`, so a type error names every incompatible member:
 * `Type '"formatters"' does not satisfy the constraint 'never'`.
 */
export type ExpectNoIncompatibleMembers<IncompatibleName extends never> =
  IncompatibleName;
