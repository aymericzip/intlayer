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
import { Pagination } from '@components/Pagination';
import { MultiSelect, Select } from '@components/Select';
import { useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { WandSparkles } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { useDictionaryDetailsSchema } from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
  onSelectSibling?: (dictionary: Dictionary) => void;
  isDarkMode?: boolean;
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

/**
 * A variant can be a named string or a structured object. The CMS edits it as
 * text: a value starting with `{` is parsed as JSON (object variant), anything
 * else is kept as a named-variant string.
 */
const formatVariant = (
  variant: string | Record<string, string | number> | undefined
): string =>
  variant !== null && typeof variant === 'object'
    ? JSON.stringify(variant)
    : (variant ?? '');

const parseVariantInput = (
  raw: string
): { variant: string | Record<string, string | number>; error: boolean } => {
  if (raw.trim().startsWith('{')) {
    try {
      return {
        variant: JSON.parse(raw) as Record<string, string | number>,
        error: false,
      };
    } catch {
      return { variant: raw, error: true };
    }
  }
  return { variant: raw, error: false };
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
  onSelectSibling,
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
      location: dictionary.location ?? 'remote',
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
      { enabled: !!dictionary.key }
    );

  const siblings = useMemo<Dictionary[]>(
    () =>
      ((siblingsData?.data ?? []) as unknown as Dictionary[]).filter(
        (d: Dictionary) => d.localId !== dictionary.localId
      ),
    [siblingsData, dictionary.localId]
  );

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

  const allVariantDicts = useMemo<Dictionary[]>(() => {
    if (dictionary.variant !== undefined) {
      return [dictionary, ...variantSiblings];
    }
    return variantSiblings;
  }, [dictionary, variantSiblings]);

  useEffect(() => {
    form.reset({
      ...dictionary,
      tags: dictionary.tags ?? [],
      location: dictionary.location ?? 'remote',
    });
    setSelectedTypes(deriveQualifierTypes(dictionary));
    setItemValue(dictionary.item ?? 1);
    setVariantValue(formatVariant(dictionary.variant));
    setVariantJsonError(false);
    setShowSiblingPicker(false);
  }, [dictionary, form?.reset]);

  useEffect(() => {
    if (typeof updatedDictionary === 'undefined') {
      form.reset({
        ...dictionary,
        tags: dictionary.tags ?? [],
        location: dictionary.location ?? 'remote',
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
          form.reset(merged);
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

  const hasSiblings = siblings.length > 0;

  const [selectedTypes, setSelectedTypes] = useState<QualifierType[]>(() =>
    deriveQualifierTypes(dictionary)
  );
  const [itemValue, setItemValue] = useState<number>(dictionary.item ?? 1);
  const [variantValue, setVariantValue] = useState<string>(
    formatVariant(dictionary.variant)
  );
  const [variantJsonError, setVariantJsonError] = useState(false);
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
        base = { ...base, variant: parseVariantInput(newVariant).variant };
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
      className="flex w-full flex-col gap-8"
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
                <FormLabel className="ml-1">{locationSelect.label}</FormLabel>
                <div className="ml-2 flex items-center gap-4 py-2">
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
            <motion.div
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
            </motion.div>
          )}
        </AnimatePresence>
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
          <p className="ml-1 font-semibold text-sm">{typeSwitch.label}</p>
          <p className="ml-1 text-muted text-xs">{typeSwitch.description}</p>
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
            <motion.div
              key="item-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2 px-1">
                <label
                  htmlFor="qualifier-item-value"
                  className="ml-1 font-medium text-sm"
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
            </motion.div>
          )}

          {selectedTypes.includes('variant') && (
            <motion.div
              key="variant-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2 px-1">
                <label
                  htmlFor="qualifier-variant-value"
                  className="ml-1 font-medium text-sm"
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
                    const { variant, error } = parseVariantInput(value);
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
                {variantJsonError && (
                  <p className="ml-1 text-destructive text-xs">
                    {typeSwitch.variantJsonError}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {selectedTypes.length === 0 && showSiblingPicker && (
            <motion.div
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
                <p className="font-medium text-sm">
                  {typeSwitch.disablePickerTitle}
                </p>
                <p className="text-muted text-xs">
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
                          {formatVariant(sibling.variant)}
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
            </motion.div>
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
        <p className="font-semibold text-sm">{siblingContent.title}</p>
        <Loader isLoading={isLoadingSiblings}>
          {!hasSiblings && (
            <p className="text-muted text-sm">{siblingContent.noSiblings}</p>
          )}

          {allItemDicts.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-muted text-xs uppercase tracking-wide">
                {siblingContent.collectionItems}
              </p>
              <Pagination
                currentPage={
                  allItemDicts.findIndex(
                    (dictionaryEl) =>
                      dictionaryEl.localId === dictionary.localId
                  ) + 1 || 1
                }
                totalPages={allItemDicts.length}
                onPageChange={(page) => {
                  const target = allItemDicts[page - 1];
                  if (target && onSelectSibling) {
                    onSelectSibling(target);
                  }
                }}
                showPrevNext
              />
              <div className="mt-1 flex flex-wrap gap-2">
                {allItemDicts.map((sibling) => {
                  const isActive = sibling.localId === dictionary.localId;
                  return (
                    <button
                      key={sibling.localId}
                      type="button"
                      onClick={() => !isActive && onSelectSibling?.(sibling)}
                      className={cn(
                        'rounded-lg px-3 py-1 text-xs transition-colors',
                        isActive
                          ? 'bg-text font-semibold text-text-opposite'
                          : 'cursor-pointer border border-border hover:bg-text/10'
                      )}
                    >
                      {siblingContent.itemIndex} {sibling.item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {allVariantDicts.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-muted text-xs uppercase tracking-wide">
                {siblingContent.variants}
              </p>
              <div className="flex flex-wrap gap-2">
                {allVariantDicts.map((sibling) => {
                  const isActive = sibling.localId === dictionary.localId;
                  return (
                    <button
                      key={sibling.localId}
                      type="button"
                      onClick={() => !isActive && onSelectSibling?.(sibling)}
                      className={cn(
                        'rounded-lg px-3 py-1 text-xs transition-colors',
                        isActive
                          ? 'bg-text font-semibold text-text-opposite'
                          : 'cursor-pointer border border-border hover:bg-text/10'
                      )}
                    >
                      {formatVariant(sibling.variant)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Loader>
      </Container>

      <div className="flex flex-wrap items-center justify-end gap-2 max-md:flex-col">
        <FormButton
          type="button"
          size="icon-md"
          label={auditButton.label.value}
          Icon={WandSparkles}
          variant="outline"
          color="text"
          className="max-md:w-full"
          onClick={handleOnAuditFile}
          disabled={isSubmitting || isAuditing}
          isLoading={isAuditing}
        />
      </div>
    </Form>
  );
};
