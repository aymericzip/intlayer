'use client';

import {
  useAuditContentDeclarationMetadata,
  useGetDictionaries,
  useGetProjects,
  useGetTags,
} from '@api/index';
import { useSession } from '@api/useAuth';
import { Container } from '@components/Container';
import {
  Form,
  FormButton,
  FormDescription,
  FormEditableFieldInput,
  FormEditableFieldTextArea,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormMultiSelect,
  FormSelect,
  useForm,
} from '@components/Form';
import { Checkbox, Input } from '@components/Input';
import { Loader } from '@components/Loader';
import { PopoverStatic } from '@components/Popover';
import { MultiSelect, Select } from '@components/Select';
import {
  useDictionariesRecord,
  useEditedContent,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { AnimatePresence, m } from 'framer-motion';
import { WandSparkles } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import {
  formatDictionaryVariant,
  parseDictionaryVariant,
} from '../dictionaryVariant';
import { isSameDictionary } from '../SiblingSwitcher/siblingSelection';
import { LinkedDictionariesTable } from './LinkedDictionariesTable';
import { type LinkedTag, LinkedTagsTable } from './LinkedTagsTable';
import { StructuredVariantFieldsEditor } from './StructuredVariantFieldsEditor';
import { useDictionaryDetailsSchema } from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
  onSelectSibling?: (dictionary: Dictionary) => void;
  /** Dictionaries sharing the key; fetched by key when omitted. */
  siblings?: Dictionary[];
  /** Opens a dictionary of another key (same-tags table). */
  onOpenDictionary?: (dictionary: Dictionary) => void;
  /** Opens the page of a tag of the dictionary. */
  onOpenTag?: (tagKey: string) => void;
};

type QualifierType = 'collection' | 'variant';

const QUALIFIER_TYPES: QualifierType[] = ['collection', 'variant'];

/** Derive active qualifier types from dictionary qualifier fields. */
const deriveQualifierTypes = (dict: Dictionary): QualifierType[] => {
  const types: QualifierType[] = [];
  if (dict.item !== undefined) types.push('collection');
  if (dict.variant !== undefined) types.push('variant');
  return types;
};

/** Locations the form toggles between. */
const FORM_LOCATIONS = ['remote', 'local', 'hybrid', 'plugin'] as const;
type FormLocation = (typeof FORM_LOCATIONS)[number];

const isFormLocation = (location: string): location is FormLocation =>
  (FORM_LOCATIONS as readonly string[]).includes(location);

/**
 * Location shown by the form. Custom sources are plugin-managed (see
 * `DictionaryLocation`); the stored value only changes when a toggle does.
 */
const toFormLocation = (
  location: Dictionary['location'] | undefined
): FormLocation => {
  if (location === undefined) return 'remote';

  return isFormLocation(location) ? location : 'plugin';
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
  onSelectSibling,
  siblings: siblingsProp,
  onOpenDictionary,
  onOpenTag,
}) => {
  const { session } = useSession();
  const { project } = session ?? {};
  const { data: projectsData, isLoading: isLoadingProjects } =
    useGetProjects() as any;
  const { data: tagsData } = useGetTags() as any;

  const projects = (projectsData?.data ?? []) as any[];
  const allTags = (tagsData?.data ?? []) as any[];

  const DictionaryDetailsSchema = useDictionaryDetailsSchema(
    String(project?.id)
  );
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: {
      ...dictionary,
      location: toFormLocation(dictionary.location),
    },
  });
  const { editedContent, setEditedDictionary } = useEditedContent();
  const {
    titleInput,
    keyInput,
    descriptionInput,
    projectInput,
    tagsSelect,
    locationSelect,
    importModeSelect,
    filePathInput,
    componentFilePathField,
    auditButton,
    qualifierSection,
    siblingDictionaries: siblingContent,
    typeSwitch,
  } = useIntlayer('dictionary-details');
  const { mutate: auditContentDeclaration, isPending: isAuditing } =
    useAuditContentDeclarationMetadata();
  const updatedDictionary =
    editedContent?.[dictionary.localId as LocalDictionaryId];

  const { data: siblingsData, isLoading: isLoadingSiblings } =
    useGetDictionaries(
      { keys: [dictionary.key] },
      { enabled: !siblingsProp && Boolean(dictionary.key) }
    );

  const siblings = useMemo<Dictionary[]>(
    () =>
      (
        siblingsProp ?? ((siblingsData?.data ?? []) as unknown as Dictionary[])
      ).filter(
        (sibling) =>
          sibling.key === dictionary.key &&
          !isSameDictionary(sibling, dictionary)
      ),
    [siblingsProp, siblingsData, dictionary]
  );

  /** The dictionary and its same-key siblings: by variant, item, locale. */
  const linkedDictionaries = useMemo<Dictionary[]>(
    () =>
      [dictionary, ...siblings].sort(
        (firstDictionary, secondDictionary) =>
          formatDictionaryVariant(firstDictionary.variant).localeCompare(
            formatDictionaryVariant(secondDictionary.variant)
          ) ||
          (firstDictionary.item ?? -1) - (secondDictionary.item ?? -1) ||
          String(firstDictionary.locale ?? '').localeCompare(
            String(secondDictionary.locale ?? '')
          )
      ),
    [dictionary, siblings]
  );
  const dictionaryTags = dictionary.tags ?? [];

  /** Tags of the dictionary, with their name / description when known. */
  const linkedTags = useMemo<LinkedTag[]>(
    () =>
      dictionaryTags.map((tagKey) => {
        const tagRecord = (allTags as LinkedTag[]).find(
          (tag) => tag.key === tagKey
        );

        return {
          key: tagKey,
          name: tagRecord?.name,
          description: tagRecord?.description,
        };
      }),
    [dictionaryTags, allTags]
  );
  const {
    data: taggedDictionariesData,
    isLoading: isLoadingTaggedDictionaries,
  } = useGetDictionaries(
    { tags: dictionaryTags, pageSize: 100 },
    { enabled: dictionaryTags.length > 0 }
  );
  const { localeDictionaries } = useDictionariesRecord();

  /** Other keys sharing at least one tag (backend + local-only). */
  const sameTagDictionaries = useMemo<Dictionary[]>(() => {
    if (dictionaryTags.length === 0) return [];

    const localeOnlyDictionaries = Object.values(
      localeDictionaries ?? {}
    ).filter((localeDictionary) => !localeDictionary.id);

    return [
      ...((taggedDictionariesData?.data ?? []) as unknown as Dictionary[]),
      ...localeOnlyDictionaries,
    ]
      .filter(
        (taggedDictionary) =>
          taggedDictionary.key !== dictionary.key &&
          taggedDictionary.tags?.some((tag) => dictionaryTags.includes(tag))
      )
      .sort((firstDictionary, secondDictionary) =>
        firstDictionary.key.localeCompare(secondDictionary.key)
      );
  }, [
    taggedDictionariesData,
    localeDictionaries,
    dictionary.key,
    dictionaryTags,
  ]);

  const linkedDictionaryLabels = {
    key: siblingContent.keyColumn,
    locale: siblingContent.localeColumn,
    variant: siblingContent.variants,
    item: siblingContent.itemIndex,
    tags: siblingContent.tagsColumn,
    title: siblingContent.titleColumn,
    current: siblingContent.currentTag,
  };

  const itemSiblings = useMemo(
    () =>
      siblings
        .filter((d) => d.item !== undefined)
        .sort((a, b) => (a.item ?? 0) - (b.item ?? 0)),
    [siblings]
  );

  const variantSiblings = useMemo(
    () => siblings.filter((d) => d.variant !== undefined),
    [siblings]
  );

  const allItemDicts = useMemo<Dictionary[]>(() => {
    if (dictionary.item !== undefined) {
      const combined = [dictionary, ...itemSiblings].sort(
        (a, b) => (a.item ?? 0) - (b.item ?? 0)
      );
      return combined;
    }
    return itemSiblings;
  }, [dictionary, itemSiblings]);

  useEffect(() => {
    form.reset({
      ...dictionary,
      tags: dictionary.tags ?? [],
      location: toFormLocation(dictionary.location),
    });
    setSelectedTypes(deriveQualifierTypes(dictionary));
    setItemValue(dictionary.item ?? 1);
    setVariantValue(formatDictionaryVariant(dictionary.variant));
    setVariantJsonError(false);
    setShowSiblingPicker(false);
  }, [dictionary, form?.reset]);

  useEffect(() => {
    if (typeof updatedDictionary === 'undefined') {
      form.reset({
        ...dictionary,
        tags: dictionary.tags ?? [],
        location: toFormLocation(dictionary.location),
      });
    }
  }, [updatedDictionary]);

  const handleOnAuditFile = () => {
    const dictionaryToAudit = {
      ...dictionary,
      ...updatedDictionary,
    };

    auditContentDeclaration(
      {
        fileContent: JSON.stringify(dictionaryToAudit),
      },
      {
        onSuccess: (response) => {
          if (!response?.data) return;

          const auditedDictionary = response.data.fileContent;

          const merged = {
            ...dictionaryToAudit,
            ...auditedDictionary,
            tags: auditedDictionary.tags ?? dictionaryToAudit.tags ?? [],
          };

          setEditedDictionary(merged as Dictionary);
          form.reset({ ...merged, location: toFormLocation(merged.location) });
        },
      }
    );
  };

  const watchedLocation = useWatch({
    control: form.control,
    name: 'location',
  });
  const isLocalChecked =
    watchedLocation === 'local' || watchedLocation === 'hybrid';

  const [selectedTypes, setSelectedTypes] = useState<QualifierType[]>(() =>
    deriveQualifierTypes(dictionary)
  );
  const [itemValue, setItemValue] = useState<number>(dictionary.item ?? 1);
  const [variantValue, setVariantValue] = useState<string>(
    formatDictionaryVariant(dictionary.variant)
  );
  const [variantJsonError, setVariantJsonError] = useState(false);
  const parsedVariant = parseDictionaryVariant(variantValue);
  const structuredVariantFields =
    !parsedVariant.error &&
    typeof parsedVariant.variant === 'object' &&
    !Array.isArray(parsedVariant.variant)
      ? parsedVariant.variant
      : undefined;
  const [showSiblingPicker, setShowSiblingPicker] = useState(false);

  const allQualifiedSiblings = useMemo<Dictionary[]>(
    () => [...itemSiblings, ...variantSiblings],
    [itemSiblings, variantSiblings]
  );

  const handleTypesChange = (newTypes: string | string[]) => {
    const nextTypes = [newTypes].flat() as QualifierType[];
    const added = nextTypes.filter((t) => !selectedTypes.includes(t));
    const removed = selectedTypes.filter((t) => !nextTypes.includes(t));

    let base = { ...dictionary, ...(updatedDictionary ?? {}) };

    for (const qualifier of removed) {
      if (qualifier === 'collection') base = { ...base, item: undefined };
      if (qualifier === 'variant') base = { ...base, variant: undefined };
    }

    for (const qualifier of added) {
      if (qualifier === 'collection') {
        const nextItem =
          allItemDicts.length > 0
            ? Math.max(...allItemDicts.map((d) => d.item ?? 0)) + 1
            : 1;
        setItemValue(nextItem);
        base = { ...base, item: nextItem };
      } else if (qualifier === 'variant') {
        const newVariant = variantValue || 'default';
        setVariantValue(newVariant);
        base = { ...base, variant: parseDictionaryVariant(newVariant).variant };
      }
    }

    setSelectedTypes(nextTypes);
    setEditedDictionary(base);
    setVariantJsonError(false);

    if (nextTypes.length === 0 && allQualifiedSiblings.length > 0) {
      setShowSiblingPicker(true);
    } else {
      setShowSiblingPicker(false);
    }
  };

  return (
    <Form
      className="relative flex w-full flex-col gap-8"
      {...form}
      schema={DictionaryDetailsSchema}
    >
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <FormEditableFieldInput
          name="key"
          label={keyInput.label}
          placeholder={keyInput.label.value}
          description={keyInput.description}
          disabled={isSubmitting}
          isRequired
          onSave={(value) => {
            form.setValue('key', value, { shouldDirty: true });
            setEditedDictionary({
              ...dictionary,
              ...(updatedDictionary ?? {}),
              key: value,
            });
          }}
        />
        <FormEditableFieldInput
          name="title"
          label={titleInput.label}
          placeholder={titleInput.placeholder.value}
          description={titleInput.description}
          disabled={isSubmitting}
          onSave={(value) => {
            form.setValue('title', value, { shouldDirty: true });
            setEditedDictionary({
              ...dictionary,
              ...(updatedDictionary ?? {}),
              title: value,
            });
          }}
        />
      </div>
      <FormEditableFieldTextArea
        name="description"
        label={descriptionInput.label}
        placeholder={descriptionInput.placeholder.value}
        description={descriptionInput.description}
        disabled={isSubmitting}
        onSave={(value) => {
          form.setValue('description', value, { shouldDirty: true });
          setEditedDictionary({
            ...dictionary,
            ...(updatedDictionary ?? {}),
            description: value,
          });
        }}
      />
      <div className="grid grid-cols-2 gap-8 px-1 max-md:grid-cols-1">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            const value = field.value;
            const isLocal = value === 'local' || value === 'hybrid';
            const isRemote = value === 'remote' || value === 'hybrid';

            const handleLocalToggle = (isChecked: boolean) => {
              if (!isChecked && !isRemote) return;

              const newValue: Dictionary['location'] = isChecked
                ? isRemote
                  ? 'hybrid'
                  : 'local'
                : 'remote';

              field.onChange(newValue);

              const newFilePath = isChecked
                ? (form.getValues('filePath') ?? dictionary.filePath)
                : undefined;

              if (!isChecked) {
                form.setValue('filePath', undefined);
              }

              setEditedDictionary({
                ...dictionary,
                ...(updatedDictionary ?? {}),
                location: newValue,
                filePath: newFilePath,
              });
            };

            const handleRemoteToggle = (isChecked: boolean) => {
              if (!isChecked && !isLocal) return;

              const newValue: Dictionary['location'] = isChecked
                ? isLocal
                  ? 'hybrid'
                  : 'remote'
                : 'local';

              field.onChange(newValue);

              setEditedDictionary({
                ...dictionary,
                ...(updatedDictionary ?? {}),
                location: newValue,
              });
            };

            return (
              <FormItem className="flex flex-col gap-2 px-1">
                <FormLabel className="ms-1">{locationSelect.label}</FormLabel>
                <div className="ms-2 flex items-center gap-4 py-2">
                  <Checkbox
                    id="location-local"
                    name="location-local"
                    label={locationSelect.local.value}
                    color="text"
                    checked={isLocal}
                    disabled={
                      !mode.includes('local') && !mode.includes('remote')
                    }
                    onChange={(e) => handleLocalToggle(e.target.checked)}
                  />
                  <Checkbox
                    id="location-remote"
                    name="location-remote"
                    label={locationSelect.remote.value}
                    color="text"
                    checked={isRemote}
                    disabled={
                      !mode.includes('remote') &&
                      dictionary.location !== 'remote' &&
                      dictionary.location !== 'hybrid'
                    }
                    onChange={(e) => handleRemoteToggle(e.target.checked)}
                  />
                </div>
                <FormDescription>
                  {locationSelect.testDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <AnimatePresence mode="wait">
          {isLocalChecked && (
            <m.div
              key="filePath-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormInput
                name="filePath"
                label={filePathInput.label.value}
                placeholder={filePathInput.placeholder.value}
                description={filePathInput.description.value}
                disabled={isSubmitting || !isLocalChecked}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditedDictionary({
                    ...dictionary,
                    ...(updatedDictionary ?? {}),
                    filePath: value,
                  });
                }}
              />
            </m.div>
          )}
        </AnimatePresence>

        {dictionary.componentFilePath && (
          <div className="flex flex-col gap-2 px-1">
            <label
              htmlFor="component-file-path"
              className="ms-1 text-sm font-medium"
            >
              {componentFilePathField.label}
            </label>
            <Input
              id="component-file-path"
              type="text"
              dir="ltr"
              value={dictionary.componentFilePath}
              readOnly
            />
            <p className="ms-1 text-sm text-neutral">
              {componentFilePathField.description}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <FormSelect
          name="importMode"
          label={importModeSelect.label.value}
          description={importModeSelect.description.value}
          onValueChange={(value) => {
            form.setValue('importMode', value as any, { shouldDirty: true });
            setEditedDictionary({
              ...dictionary,
              ...(updatedDictionary ?? {}),
              importMode: value as any,
            });
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder={importModeSelect.label.value} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="static">
              {importModeSelect.static.value}
            </Select.Item>
            <Select.Item value="dynamic">
              {importModeSelect.dynamic.value}
            </Select.Item>
            <Select.Item value="live">
              {importModeSelect.live.value}
            </Select.Item>
          </Select.Content>
        </FormSelect>
      </div>
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <FormMultiSelect
          name="projectIds"
          label={projectInput.label.value}
          description={projectInput.description}
          onValueChange={(value) => {
            const valueArray = [value].flat();
            form.setValue('projectIds', valueArray, { shouldDirty: true });
            setEditedDictionary({
              ...dictionary,
              ...(updatedDictionary ?? {}),
              projectIds: valueArray,
            });
          }}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) =>
              projects?.find((project: any) => String(project.id) === value)
                ?.name ?? value
            }
          >
            <MultiSelect.Input placeholder={projectInput.placeholder.value} />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <Loader isLoading={isLoadingProjects}>
              <MultiSelect.List>
                {projects?.map((project: any) => (
                  <MultiSelect.Item
                    key={String(project.id)}
                    value={String(project.id)}
                  >
                    {project.name}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </Loader>
          </MultiSelect.Content>
        </FormMultiSelect>

        <FormMultiSelect
          name="tags"
          label={tagsSelect.label.value}
          description={tagsSelect.description}
          onValueChange={(value) => {
            const valueArray = [value].flat();
            form.setValue('tags', valueArray, { shouldDirty: true });
            setEditedDictionary({
              ...dictionary,
              ...(updatedDictionary ?? {}),
              tags: valueArray,
            });
          }}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) =>
              allTags?.find((tag: any) => String(tag.key) === value)?.name ??
              value
            }
          >
            <MultiSelect.Input placeholder={tagsSelect.placeholder.value} />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <Loader isLoading={isLoadingProjects}>
              <MultiSelect.List>
                {allTags?.map((tag: any) => (
                  <MultiSelect.Item
                    key={String(tag.key)}
                    value={String(tag.key)}
                  >
                    {tag.name ?? tag.key}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </Loader>
          </MultiSelect.Content>
        </FormMultiSelect>
      </div>

      {/* Type switcher */}
      <Container
        className="gap-4"
        padding="md"
        roundedSize="2xl"
        background="none"
        border
        borderColor="card"
      >
        <div className="flex flex-col gap-1">
          <p className="ms-1 text-sm font-semibold">{typeSwitch.label}</p>
          <p className="ms-1 text-xs text-neutral">{typeSwitch.description}</p>
        </div>
        <MultiSelect
          values={selectedTypes}
          onValueChange={handleTypesChange}
          className="max-w-xs"
        >
          <MultiSelect.Trigger
            getBadgeValue={(val) => {
              if (val === 'collection') return String(typeSwitch.collection);
              if (val === 'variant') return String(typeSwitch.variant);
              return val;
            }}
          >
            <MultiSelect.Input placeholder={typeSwitch.label.value} />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <MultiSelect.List>
              {QUALIFIER_TYPES.map((qualifier) => (
                <MultiSelect.Item key={qualifier} value={qualifier}>
                  {typeSwitch[qualifier].value}
                </MultiSelect.Item>
              ))}
            </MultiSelect.List>
          </MultiSelect.Content>
        </MultiSelect>
        <AnimatePresence>
          {selectedTypes.includes('collection') && (
            <m.div
              key="item-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2 px-1">
                <label
                  htmlFor="qualifier-item-value"
                  className="ms-1 text-sm font-medium"
                >
                  {typeSwitch.itemValueLabel}
                </label>
                <Input
                  id="qualifier-item-value"
                  type="number"
                  min={1}
                  value={itemValue}
                  placeholder={typeSwitch.itemValuePlaceholder.value}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!Number.isNaN(value) && value >= 1) {
                      setItemValue(value);
                      setEditedDictionary({
                        ...dictionary,
                        ...(updatedDictionary ?? {}),
                        item: value,
                      });
                    }
                  }}
                />
              </div>
            </m.div>
          )}

          {selectedTypes.includes('variant') && (
            <m.div
              key="variant-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2 px-1">
                {structuredVariantFields ? (
                  <StructuredVariantFieldsEditor
                    key={dictionary.localId}
                    fields={structuredVariantFields}
                    labels={{
                      title: typeSwitch.variantFieldsLabel.value,
                      fieldName: typeSwitch.variantFieldName.value,
                      fieldValue: typeSwitch.variantFieldValue.value,
                      addField: typeSwitch.addVariantField.value,
                      removeField: typeSwitch.removeVariantField.value,
                    }}
                    onChange={(fields) => {
                      setVariantValue(JSON.stringify(fields));
                      setEditedDictionary({
                        ...dictionary,
                        ...(updatedDictionary ?? {}),
                        variant: fields,
                      });
                    }}
                  />
                ) : (
                  <>
                    <label
                      htmlFor="qualifier-variant-value"
                      className="ms-1 text-sm font-medium"
                    >
                      {typeSwitch.variantValueLabel}
                    </label>
                    <Input
                      id="qualifier-variant-value"
                      type="text"
                      value={variantValue}
                      placeholder={typeSwitch.variantValuePlaceholder.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVariantValue(value);
                        const { variant, error } =
                          parseDictionaryVariant(value);
                        setVariantJsonError(error);
                        if (!error) {
                          setEditedDictionary({
                            ...dictionary,
                            ...(updatedDictionary ?? {}),
                            variant,
                          });
                        }
                      }}
                    />
                  </>
                )}
                {variantJsonError && (
                  <p className="text-destructive ms-1 text-xs">
                    {typeSwitch.variantJsonError}
                  </p>
                )}
              </div>
            </m.div>
          )}

          {selectedTypes.length === 0 && showSiblingPicker && (
            <m.div
              key="sibling-picker"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Container
                background="none"
                border
                borderColor="neutral"
                roundedSize="xl"
                padding="md"
                className="gap-3"
              >
                <p className="text-sm font-medium">
                  {typeSwitch.disablePickerTitle}
                </p>
                <p className="text-xs text-muted">
                  {typeSwitch.disablePickerDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allQualifiedSiblings.map((sibling) => (
                    <button
                      key={sibling.localId}
                      type="button"
                      onClick={() => {
                        onSelectSibling?.(sibling);
                        setShowSiblingPicker(false);
                      }}
                      className="cursor-pointer rounded-lg border border-border px-3 py-1 text-xs transition-colors hover:bg-text/10"
                    >
                      {sibling.variant !== undefined && (
                        <span>
                          {qualifierSection.variant}:{' '}
                          {formatDictionaryVariant(sibling.variant)}
                        </span>
                      )}
                      {sibling.item !== undefined && (
                        <span>
                          {qualifierSection.item}: {sibling.item}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </Container>
            </m.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Sibling dictionaries panel */}
      <Container
        className="gap-4"
        padding="md"
        roundedSize="2xl"
        background="none"
        border
        borderColor="neutral"
      >
        <p className="text-sm font-semibold">{siblingContent.title}</p>
        <Loader
          isLoading={
            (!siblingsProp && isLoadingSiblings) || isLoadingTaggedDictionaries
          }
        >
          {siblings.length === 0 &&
            sameTagDictionaries.length === 0 &&
            linkedTags.length === 0 && (
              <span className="m-auto text-sm text-neutral">
                {siblingContent.noSiblings}
              </span>
            )}
          {siblings.length > 0 && (
            <LinkedDictionariesTable
              title={siblingContent.sameKeyTitle}
              dictionaries={linkedDictionaries}
              currentDictionary={dictionary}
              onSelectDictionary={onSelectSibling}
              labels={linkedDictionaryLabels}
            />
          )}
          {sameTagDictionaries.length > 0 && (
            <LinkedDictionariesTable
              title={siblingContent.sameTagsTitle}
              dictionaries={sameTagDictionaries}
              currentDictionary={dictionary}
              onSelectDictionary={onOpenDictionary}
              labels={linkedDictionaryLabels}
            />
          )}
          {linkedTags.length > 0 && (
            <LinkedTagsTable
              title={siblingContent.tagsColumn}
              tags={linkedTags}
              onSelectTag={onOpenTag}
              labels={{
                key: siblingContent.keyColumn,
                name: siblingContent.nameColumn,
                description: siblingContent.descriptionColumn,
              }}
            />
          )}
        </Loader>
      </Container>

      <PopoverStatic
        identifier="audit-dictionary-details"
        className="absolute top-0 right-0"
      >
        <FormButton
          type="button"
          size="icon-md"
          label={auditButton.label.value}
          Icon={WandSparkles}
          variant="outline"
          color="text"
          onClick={handleOnAuditFile}
          disabled={isSubmitting || isAuditing}
          isLoading={isAuditing}
        />
        <PopoverStatic.Detail
          identifier="audit-dictionary-details"
          xAlign="end"
        >
          <Container padding="sm" roundedSize="xl">
            <span className="text-nowrap">{auditButton.popover}</span>
          </Container>
        </PopoverStatic.Detail>
      </PopoverStatic>
    </Form>
  );
};
