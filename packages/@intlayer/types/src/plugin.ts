import type { IntlayerConfig } from './config';
import type { LocalesValues } from './module_augmentation';

/**
 * This is a temporary type to avoid cross-package type coupling.
 *
 * Use Module augmentation to extend the Dictionary type.
 */
interface PluginDictionary {
  key: string;
  locale?: LocalesValues;
  location?: string;
  content: unknown;
  filePath?: string;
}

export type UnmergedDictionaryResult = {
  dictionaryPath: string;
  dictionaries: PluginDictionary[];
};

export type UnmergedDictionaryOutput = Record<string, UnmergedDictionaryResult>;

export type MergedDictionaryResult = {
  dictionary: PluginDictionary;
};

export type MergedDictionaryOutput = Record<string, MergedDictionaryResult>;

/**
 * Extension points for Intlayer plugins.
 *
 * Typical use-cases:
 * - loadDictionaries: ingest external formats (e.g., ICU JSON) and convert to Intlayer `Dictionary[]`
 * - afterBuild: transform/write back merged dictionaries to external formats/locations (e.g., write ICU JSON)
 */
export type Plugin = {
  /**
   * Name of the plugin
   */
  name: string;

  /**
   * Optional hook to load dictionaries from custom sources.
   * Return additional dictionaries derived from the provided declaration file paths.
   * The returned dictionaries will be merged alongside local and remote ones.
   */
  loadDictionaries?: (args: {
    configuration: IntlayerConfig;
  }) => Promise<PluginDictionary[]> | PluginDictionary[];

  /**
   * Optional hook called after dictionaries have been built/merged.
   * Implementations can write the final content back to custom destinations (e.g., ICU files).
   *
   * buildOutput is intentionally untyped here to avoid cross-package type coupling.
   */
  afterBuild?: (args: {
    dictionaries: {
      unmergedDictionaries: UnmergedDictionaryOutput;
      mergedDictionaries: MergedDictionaryOutput;
    };
    configuration: IntlayerConfig;
  }) => Promise<void> | void;

  /**
   * Optional hook called after dictionaries have been formatted.
   * Implementations can transform the final content before it is written to the output.
   */
  formatOutput?: (args: {
    dictionary: PluginDictionary;
    configuration: IntlayerConfig;
  }) => Promise<PluginDictionary> | PluginDictionary;
};
