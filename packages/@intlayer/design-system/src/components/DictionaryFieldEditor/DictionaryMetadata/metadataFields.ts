import type { DictionaryMetadata } from '@intlayer/types/dictionary';

/** A metadata field being edited: its name, its value as text, its saved value. */
export type MetadataFieldEntry = {
  name: string;
  text: string;
  /** Value the field held before the edit; decides how `text` is read back. */
  value: unknown;
};

/** Renders a metadata value as editable text: strings as is, the rest as JSON. */
export const formatMetadataValue = (value: unknown): string =>
  typeof value === 'string' ? value : (JSON.stringify(value) ?? '');

/**
 * Reads edited text back with the field's type: a string (or new) field stays
 * a string, any other value is read as JSON, kept as text while invalid.
 */
export const parseMetadataValue = (
  text: string,
  previousValue: unknown
): unknown => {
  if (previousValue === undefined || typeof previousValue === 'string') {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/** Lists the fields of a metadata record, in declaration order. */
export const toMetadataFieldEntries = (
  metadata: DictionaryMetadata | undefined
): MetadataFieldEntry[] =>
  Object.entries(metadata ?? {})
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => ({
      name,
      text: formatMetadataValue(value),
      value,
    }));

/** Builds the metadata record back from the rows; unnamed rows are skipped. */
export const toMetadataRecord = (
  entries: MetadataFieldEntry[]
): DictionaryMetadata =>
  Object.fromEntries(
    entries
      .filter((entry) => entry.name.trim() !== '')
      .map((entry) => [
        entry.name.trim(),
        parseMetadataValue(entry.text, entry.value),
      ])
  );
