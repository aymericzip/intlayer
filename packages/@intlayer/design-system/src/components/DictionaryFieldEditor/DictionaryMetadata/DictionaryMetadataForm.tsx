'use client';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { Plus, Trash2 } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type MetadataFieldEntry,
  toMetadataFieldEntries,
  toMetadataRecord,
} from './metadataFields';

export type DictionaryMetadataFormProps = {
  dictionary: Dictionary;
};

/**
 * Edits the `metadata` of a dictionary as name / value rows. The edits go to
 * the edited dictionary, saved with its content.
 */
export const DictionaryMetadataForm: FC<DictionaryMetadataFormProps> = ({
  dictionary,
}) => {
  const { description, fieldName, fieldValue, addField, removeField } =
    useIntlayer('dictionary-metadata-form');
  const { editedContent, setEditedDictionary } = useEditedContent();
  const editedDictionary =
    editedContent?.[dictionary.localId as LocalDictionaryId];
  const metadata = editedDictionary?.metadata ?? dictionary.metadata ?? {};

  const [entries, setEntries] = useState<MetadataFieldEntry[]>(() =>
    toMetadataFieldEntries(metadata)
  );

  // Edits discarded or saved elsewhere: start again from the stored metadata
  if (JSON.stringify(metadata) !== JSON.stringify(toMetadataRecord(entries))) {
    setEntries(toMetadataFieldEntries(metadata));
  }

  const updateEntries = (nextEntries: MetadataFieldEntry[]) => {
    setEntries(nextEntries);
    setEditedDictionary({
      ...dictionary,
      ...editedDictionary,
      metadata: toMetadataRecord(nextEntries),
    });
  };

  const updateEntry = (index: number, patch: Partial<MetadataFieldEntry>) =>
    updateEntries(
      entries.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry
      )
    );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-neutral">{description}</p>
      <div className="flex flex-col gap-2" dir="ltr">
        {entries.map((entry, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- rows have no identity while the field name is being typed
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={entry.name}
              placeholder={fieldName.value}
              aria-label={fieldName.value}
              className="max-w-56 font-mono"
              onChange={(event) =>
                updateEntry(index, { name: event.target.value })
              }
            />
            <Input
              type="text"
              value={entry.text}
              placeholder={fieldValue.value}
              aria-label={fieldValue.value}
              onChange={(event) =>
                updateEntry(index, { text: event.target.value })
              }
            />
            <Button
              variant="hoverable"
              color="text"
              size="icon-sm"
              Icon={Trash2}
              label={removeField.value}
              className="shrink-0"
              onClick={() =>
                updateEntries(
                  entries.filter((_, entryIndex) => entryIndex !== index)
                )
              }
            />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        color="text"
        size="sm"
        Icon={Plus}
        label={addField.value}
        className="self-start"
        onClick={() =>
          setEntries([...entries, { name: '', text: '', value: undefined }])
        }
      >
        {addField}
      </Button>
    </div>
  );
};
