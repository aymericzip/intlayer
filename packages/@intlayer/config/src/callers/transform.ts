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
 * Whether the optimize pass can rewrite this caller's call sites at build time.
 *
 * Requires both replacement names and a call shape reachable through an import
 * specifier rename. Method-matched callers (`i18n.getFixedT`, `intl.formatMessage`)
 * and JSX components (`<Trans>`, `<FormattedMessage>`) are excluded — their call
 * sites keep resolving through the runtime dictionary registry.
 */
export const isRewritableCaller = (descriptor: CallerDescriptor): boolean =>
  descriptor.staticReplacement !== undefined &&
  descriptor.dynamicReplacement !== undefined &&
  descriptor.matchAsMethod !== true &&
  descriptor.jsxIdAttribute === undefined;

/**
 * Returns the callers of a registry slice that the optimize pass can rewrite
 * at build time. See {@link isRewritableCaller}.
 */
export const getRewritableCallers = (
  descriptors: CallerDescriptor[]
): CallerDescriptor[] => descriptors.filter(isRewritableCaller);

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
 * A caller with no statically readable namespace source is dropped: the plugin
 * binds a dictionary from an argument, an option property or a fixed value
 * only, so forwarding it would emit a descriptor no call site can match.
 *
 * @param descriptors - Registry slice, e.g. `REACT_I18NEXT_CALLERS`.
 * @returns Configs ready to pass as the plugin's `extraCallers` option.
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
