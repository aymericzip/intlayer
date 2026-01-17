'use client';

import { ButtonColor, ButtonSize, ButtonVariant } from '@components/Button';
import { Container } from '@components/Container';
import { Form, useForm } from '@components/Form';
import { Checkbox } from '@components/Input';
import { Loader } from '@components/Loader';
import { MultiSelect } from '@components/Select';
import {
  useAuditContentDeclarationMetadata,
  useGetProjects,
  useGetTags,
} from '@hooks/reactQuery';
import { useSession } from '@hooks/useAuth';
import { useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { AnimatePresence, motion } from 'framer-motion';
import { WandSparkles } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { useDictionaryDetailsSchema } from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
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
    filePathInput,
    auditButton,
  } = useIntlayer('dictionary-details');
  const { mutate: auditContentDeclaration, isPending: isAuditing } =
    useAuditContentDeclarationMetadata();
  const updatedDictionary =
    editedContent?.[dictionary.localId as LocalDictionaryId];

  useEffect(() => {
    form.reset({
      ...dictionary,
      location: dictionary.location ?? 'remote',
    });
  }, [dictionary, form?.reset]);

  useEffect(() => {
    if (typeof updatedDictionary === 'undefined') {
      form.reset({
        ...dictionary,
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

          try {
            const auditedDictionary = response.data.fileContent;

            setEditedDictionary((prev) => ({
              ...prev,
              ...dictionaryToAudit,
              ...auditedDictionary,
            }));
            form.reset({
              ...dictionaryToAudit,
              ...auditedDictionary,
            });
          } catch (error) {
            console.error(error);
          }
        },
      }
    );
  };

  const watchedLocation = useWatch({
    control: form.control,
    name: 'location',
  });
  const isLocalChecked =
    watchedLocation === 'local' || watchedLocation === 'local&remote';

  return (
    <Form
      className="flex w-full flex-col gap-8"
      {...form}
      schema={DictionaryDetailsSchema}
    >
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <Form.EditableFieldInput
          name="key"
          label={keyInput.label}
          placeholder={keyInput.label.value}
          description={keyInput.description}
          disabled={isSubmitting}
          isRequired
          onSave={(value) => {
            form.setValue('key', value, { shouldDirty: true });
            setEditedDictionary((prev) => ({
              ...dictionary,
              ...(prev ?? {}),
              key: value,
            }));
          }}
        />
        <Form.EditableFieldInput
          name="title"
          label={titleInput.label}
          placeholder={titleInput.placeholder.value}
          description={titleInput.description}
          disabled={isSubmitting}
          onSave={(value) => {
            form.setValue('title', value, { shouldDirty: true });
            setEditedDictionary((prev) => ({
              ...dictionary,
              ...(prev ?? {}),
              title: value,
            }));
          }}
        />
      </div>
      <Form.EditableFieldTextArea
        name="description"
        label={descriptionInput.label}
        placeholder={descriptionInput.placeholder.value}
        description={descriptionInput.description}
        disabled={isSubmitting}
        onSave={(value) => {
          form.setValue('description', value, { shouldDirty: true });
          setEditedDictionary((prev) => ({
            ...dictionary,
            ...(prev ?? {}),
            description: value,
          }));
        }}
      />
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <Form.Field
          control={form.control}
          name="location"
          render={({ field }) => {
            const value = field.value;
            const isLocal = value === 'local' || value === 'local&remote';
            const isRemote = value === 'remote' || value === 'local&remote';

            const handleLocalToggle = (isChecked: boolean) => {
              if (!isChecked && !isRemote) return;

              const newValue: Dictionary['location'] = isChecked
                ? isRemote
                  ? 'local&remote'
                  : 'local'
                : 'remote';

              field.onChange(newValue);

              const newFilePath = isChecked
                ? (form.getValues('filePath') ?? dictionary.filePath)
                : undefined;

              if (!isChecked) {
                form.setValue('filePath', undefined);
              }

              setEditedDictionary((prev) => ({
                ...dictionary,
                ...(prev ?? {}),
                location: newValue,
                filePath: newFilePath,
              }));
            };

            const handleRemoteToggle = (isChecked: boolean) => {
              if (!isChecked && !isLocal) return;

              const newValue: Dictionary['location'] = isChecked
                ? isLocal
                  ? 'local&remote'
                  : 'remote'
                : 'local';

              field.onChange(newValue);

              setEditedDictionary((prev) => ({
                ...dictionary,
                ...(prev ?? {}),
                location: newValue,
              }));
            };

            return (
              <Form.Item className="flex flex-col gap-2">
                <Form.Label>{locationSelect.label}</Form.Label>
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="location-local"
                    name="location-local"
                    label={locationSelect.local.value}
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
                    checked={isRemote}
                    disabled={
                      !mode.includes('remote') &&
                      dictionary.location !== 'remote' &&
                      dictionary.location !== 'local&remote'
                    }
                    onChange={(e) => handleRemoteToggle(e.target.checked)}
                  />
                </div>
                <Form.Description>
                  {locationSelect.testDescription}
                </Form.Description>
                <Form.Message />
              </Form.Item>
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
              className="overflow-hidden"
            >
              <Form.Input
                name="filePath"
                label={filePathInput.label.value}
                placeholder={filePathInput.placeholder.value}
                description={filePathInput.description.value}
                disabled={isSubmitting || !isLocalChecked}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditedDictionary((prev) => ({
                    ...dictionary,
                    ...(prev ?? {}),
                    filePath: value,
                  }));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <Form.MultiSelect
          name="projectIds"
          label={projectInput.label.value}
          description={projectInput.description}
          onValueChange={(value) => {
            const valueArray = [value].flat();
            form.setValue('projectIds', valueArray, { shouldDirty: true });
            setEditedDictionary((prev) => ({
              ...dictionary,
              ...(prev ?? {}),
              projectIds: valueArray,
            }));
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
        </Form.MultiSelect>

        <Form.MultiSelect
          name="tags"
          label={tagsSelect.label.value}
          description={tagsSelect.description}
          onValueChange={(value) => {
            const valueArray = [value].flat();
            form.setValue('tags', valueArray, { shouldDirty: true });
            setEditedDictionary((prev) => ({
              ...dictionary,
              ...(prev ?? {}),
              tags: valueArray,
            }));
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
        </Form.MultiSelect>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 max-md:flex-col">
        <Form.Button
          type="button"
          size={ButtonSize.ICON_MD}
          label={auditButton.label.value}
          Icon={WandSparkles}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.TEXT}
          className="max-md:w-full"
          onClick={handleOnAuditFile}
          disabled={isSubmitting || isAuditing}
          isLoading={isAuditing}
        />
      </div>
    </Form>
  );
};
