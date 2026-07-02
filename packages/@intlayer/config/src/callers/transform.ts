import type { CallerDescriptor, CallerValueSource } from './types';

/**
 * Wire format of an extra caller forwarded to the `@intlayer/swc` plugin.
 *
 * Field names mirror the serde attributes of `ExtraCallerConfig` in
 * `packages/@intlayer/swc/src/lib.rs` — both sides must stay in sync.
 */
export type SwcExtraCallerConfig = {
  /** The function name the user calls, e.g. `"useTranslation"`. */
  callerName: string;
  /** Module specifiers exporting the function (original + `@intlayer/*`). */
  importSources: string[];
  /**
   * Zero-based index of the positional argument holding the namespace string.
   * Omitted for fixed/option namespace callers.
   */
  namespaceArgIndex?: number;
  /**
   * Compile-time constant namespace — the dictionary ident is inserted as a
   * new first argument (lingui's `useLingui()`).
   */
  fixedNamespace?: string;
  /**
   * Namespace read from a property of an options-object argument — the
   * dictionary ident is inserted as a new first argument and the property is
   * rewritten to the key-prefix remainder (vue-i18n's `useI18n({ namespace })`).
   */
  namespaceOption?: { argumentIndex: number; property: string };
  /** Replacement function name for static import mode, e.g. `"useDictionary"`. */
  staticReplacement: string;
  /** Replacement function name for dynamic/fetch mode, e.g. `"useDictionaryDynamic"`. */
  dynamicReplacement: string;
};

/**
 * Returns the callers of a registry slice that the optimize pass can rewrite
 * at build time: plain imported functions carrying both replacement names.
 *
 * Method-matched callers (`i18n.getFixedT`) and JSX components are excluded —
 * their call sites cannot be re-pointed through an import specifier rename.
 */
export const getRewritableCallers = (
  descriptors: CallerDescriptor[]
): CallerDescriptor[] =>
  descriptors.filter(
    (descriptor) =>
      descriptor.staticReplacement !== undefined &&
      descriptor.dynamicReplacement !== undefined &&
      descriptor.matchAsMethod !== true &&
      descriptor.jsxIdAttribute === undefined
  );

const findSource = <F extends CallerValueSource['from']>(
  sources: CallerValueSource[],
  from: F
): Extract<CallerValueSource, { from: F }> | undefined =>
  sources.find(
    (source): source is Extract<CallerValueSource, { from: F }> =>
      source.from === from
  );

/**
 * Serialises the rewritable callers of a registry slice into the
 * `@intlayer/swc` plugin wire format (`extraCallers` option).
 *
 * Callers whose namespace can only be derived per-message id
 * (`path-first-segment`) are skipped: the transform cannot bind a single
 * dictionary to the call site.
 *
 * @param descriptors - Registry slice, e.g. `REACT_I18NEXT_CALLERS`.
 * @returns Configs ready to pass as `swcExtraCallers` / `extraCallers`.
 */
export const toSwcExtraCallers = (
  descriptors: CallerDescriptor[]
): SwcExtraCallerConfig[] =>
  getRewritableCallers(descriptors).flatMap((descriptor) => {
    const argumentSource = findSource(descriptor.namespaceSources, 'argument');
    const optionSource = findSource(descriptor.namespaceSources, 'option');
    const fixedSource = findSource(descriptor.namespaceSources, 'fixed');

    if (!argumentSource && !optionSource && !fixedSource) return [];

    return [
      {
        callerName: descriptor.callerName,
        importSources: descriptor.importSources,
        ...(argumentSource ? { namespaceArgIndex: argumentSource.index } : {}),
        ...(fixedSource ? { fixedNamespace: fixedSource.value } : {}),
        ...(optionSource
          ? {
              namespaceOption: {
                argumentIndex: optionSource.argumentIndex,
                property: optionSource.property,
              },
            }
          : {}),
        staticReplacement: descriptor.staticReplacement!,
        dynamicReplacement: descriptor.dynamicReplacement!,
      },
    ];
  });
