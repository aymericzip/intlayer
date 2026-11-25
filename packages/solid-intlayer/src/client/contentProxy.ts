/**
 * Exposes reactive content through a proxy that reads `accessor` on every
 * access, so each field read stays tracked — shared by `useDictionary`,
 * `useIntlayer` and the dynamic collection read.
 *
 * Collections must behave like real arrays: Solid 2's `<For>` copies its list
 * with `list.slice(0)`, which checks every index with `in`. Answering those
 * checks for the function target would yield holes (`undefined` rows), so `in`
 * is answered for the content, and inherited methods (`slice`, `map`…) run
 * against it. Own fields are returned untouched: content nodes carry their
 * own properties (`.value`, `.raw`) that a bound copy would lose.
 *
 * @param accessor - Returns the current content (a memo).
 */
export const createContentProxy = <Content>(accessor: () => Content): Content =>
  new Proxy(accessor, {
    get(target, property) {
      const content = target() as Record<PropertyKey, unknown> | null;

      if (content == null) return undefined;

      const value = Reflect.get(Object(content), property);

      return typeof value === 'function' && !Object.hasOwn(content, property)
        ? value.bind(content)
        : value;
    },
    has(target, property) {
      const content = target();

      return (
        content != null &&
        typeof content === 'object' &&
        property in (content as object)
      );
    },
    apply(target) {
      return target();
    },
  }) as Content;
