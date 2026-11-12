'use client';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Plus, Trash2 } from 'lucide-react';
import { type FC, useState } from 'react';
import type { VariantDimensionValue } from '../SiblingSwitcher/siblingSelection';

/** Fields of a structured variant (`{ id: 'apple-watch', category: … }`). */
export type StructuredVariantFields = Record<string, VariantDimensionValue>;

type FieldEntry = { name: string; value: string; isNumber: boolean };

export type StructuredVariantFieldsEditorProps = {
  fields: StructuredVariantFields;
  onChange: (fields: StructuredVariantFields) => void;
  labels: {
    title: string;
    fieldName: string;
    fieldValue: string;
    addField: string;
    removeField: string;
  };
};

const toFieldEntries = (fields: StructuredVariantFields): FieldEntry[] =>
  Object.entries(fields).map(([name, value]) => ({
    name,
    value: String(value),
    isNumber: typeof value === 'number',
  }));

/**
 * Builds the variant object back from the edited rows. Rows without a name
 * are dropped; a field declared as a number stays a number while numeric.
 */
export const toStructuredVariantFields = (
  entries: FieldEntry[]
): StructuredVariantFields =>
  Object.fromEntries(
    entries
      .filter((entry) => entry.name.trim() !== '')
      .map((entry) => {
        const numericValue = Number(entry.value);
        const isNumeric =
          entry.value.trim() !== '' && !Number.isNaN(numericValue);

        return [
          entry.name.trim(),
          entry.isNumber && isNumeric ? numericValue : entry.value,
        ];
      })
  );

/**
 * Edits a structured variant as one name / value row per field instead of a
 * raw JSON string. Remount it (`key`) to load another dictionary's variant.
 */
export const StructuredVariantFieldsEditor: FC<
  StructuredVariantFieldsEditorProps
> = ({ fields, onChange, labels }) => {
  const [entries, setEntries] = useState<FieldEntry[]>(() =>
    toFieldEntries(fields)
  );

  const updateEntries = (nextEntries: FieldEntry[]) => {
    setEntries(nextEntries);
    onChange(toStructuredVariantFields(nextEntries));
  };

  const updateEntry = (index: number, patch: Partial<FieldEntry>) =>
    updateEntries(
      entries.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry
      )
    );

  return (
    <div className="flex flex-col gap-2" dir="ltr">
      <span className="ms-1 text-sm font-medium">{labels.title}</span>
      {entries.map((entry, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- rows have no identity while the field name is being typed
        <div key={index} className="flex items-center gap-2">
          <Input
            type="text"
            value={entry.name}
            placeholder={labels.fieldName}
            aria-label={labels.fieldName}
            className="font-mono"
            onChange={(event) =>
              updateEntry(index, { name: event.target.value })
            }
          />
          <Input
            type="text"
            value={entry.value}
            placeholder={labels.fieldValue}
            aria-label={labels.fieldValue}
            className="font-mono"
            onChange={(event) =>
              updateEntry(index, { value: event.target.value })
            }
          />
          <Button
            variant="hoverable"
            color="text"
            size="icon-sm"
            Icon={Trash2}
            label={labels.removeField}
            className="shrink-0"
            disabled={entries.length <= 1}
            onClick={() =>
              updateEntries(
                entries.filter((_, entryIndex) => entryIndex !== index)
              )
            }
          />
        </div>
      ))}
      <Button
        variant="outline"
        color="text"
        size="sm"
        Icon={Plus}
        label={labels.addField}
        className="self-start"
        onClick={() =>
          setEntries([...entries, { name: '', value: '', isNumber: false }])
        }
      >
        {labels.addField}
      </Button>
    </div>
  );
};
