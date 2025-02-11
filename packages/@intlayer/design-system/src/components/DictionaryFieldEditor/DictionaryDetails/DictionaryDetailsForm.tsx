'use client';

import type {
  DictionaryAPI,
  Dictionary as DistantDictionary,
} from '@intlayer/backend';
import type { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { ArrowUpFromLine, Download, Save, WandSparkles } from 'lucide-react';
import { type FC, useEffect, useMemo } from 'react';
import { useDictionary } from 'react-intlayer';
import {
  useAuditContentDeclarationMetadata,
  useGetProjects,
  useGetTags,
  usePushDictionaries,
  useWriteDictionary,
} from '../../../hooks';
import { useAuth } from '../../Auth';
import { Container } from '../../Container';
import { Form, useForm } from '../../Form';
import { Loader } from '../../Loader';
import { MultiSelect, Select } from '../../Select';
import { dictionaryDetailsContent } from './dictionaryDetails.content';
import {
  type DictionaryDetailsFormData,
  useDictionaryDetailsSchema,
} from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: 'local' | 'remote';
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
}) => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { pushDictionaries } = usePushDictionaries();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();
  const { data: tags, isLoading: isLoadingTags } = useGetTags();
  const dictionaryValue = {
    ...dictionary,
    version: dictionary.version ?? '-1',
  };

  const DictionaryDetailsSchema = useDictionaryDetailsSchema(
    String(project?._id)
  );
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionaryValue,
  });
  const {
    titleInput,
    keyInput,
    descriptionInput,
    publishedVersionSelect,
    publishButton,
    saveButton,
    projectInput,
    tagsSelect,
    auditButton,
    downloadButton,
  } = useDictionary(dictionaryDetailsContent);
  const { auditContentDeclaration, isLoading: isAuditing } =
    useAuditContentDeclarationMetadata();
  const { writeDictionary } = useWriteDictionary();

  useEffect(() => {
    form.reset(dictionaryValue);
  }, [dictionary, form?.reset]);

  const isFormEdited = form.formState.isDirty;
  const isLocalDictionary =
    typeof (dictionary as DistantDictionary)?._id === 'undefined';

  const onSubmitSuccess = async (data: DictionaryDetailsFormData) => {
    const updatedDictionary = {
      ...dictionary,
      ...data,
    };

    if (mode === 'remote') {
      await pushDictionaries([updatedDictionary]);
    } else {
      await writeDictionary(updatedDictionary);
    }

    setLocaleDictionary(updatedDictionary);
  };

  const handleOnAuditFile = async () => {
    const updatedDictionary = form.getValues();
    await auditContentDeclaration({
      fileContent: JSON.stringify({ ...dictionary, ...updatedDictionary }),
    }).then((response) => {
      if (!response.data) return;

      try {
        const editedDictionary = JSON.parse(response.data.fileContent) as
          | Partial<Dictionary>
          | undefined;

        form.reset({
          ...updatedDictionary,
          ...editedDictionary,
          publishedVersion: updatedDictionary.publishedVersion ?? '-1',
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const isLoading = isSubmitting || isLoadingTags;

  const { editedContent } = useEditedContent();
  const editedDictionary = useMemo(
    () => editedContent?.[dictionary.key],
    [editedContent, dictionary.key]
  );
  const isEdited = useMemo(
    () =>
      editedDictionary &&
      dictionary &&
      JSON.stringify(editedDictionary.content) !==
        JSON.stringify(dictionary.content),
    [dictionary, editedDictionary]
  );

  return (
    <Container
      background="none"
      border
      roundedSize="2xl"
      className="w-full px-5 pb-3 pt-5"
    >
      <Form
        className="flex w-full flex-col gap-8"
        {...form}
        schema={DictionaryDetailsSchema}
        onSubmitSuccess={onSubmitSuccess}
      >
        <div className="flex w-full flex-1 gap-8 max-md:flex-col">
          <Form.EditableFieldInput
            name="key"
            label={keyInput.label}
            placeholder={keyInput.label.value}
            description={keyInput.description}
            disabled={isSubmitting}
            isRequired
          />
          <Form.EditableFieldInput
            name="title"
            label={titleInput.label}
            placeholder={titleInput.placeholder.value}
            description={titleInput.description}
            disabled={isSubmitting}
          />
        </div>
        <Form.EditableFieldTextArea
          name="description"
          label={descriptionInput.label}
          placeholder={descriptionInput.placeholder.value}
          description={descriptionInput.description}
          disabled={isSubmitting}
        />
        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <Form.MultiSelect
            name="projectIds"
            label={projectInput.label.value}
            description={projectInput.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) =>
                projects?.data?.find((project) => String(project._id) === value)
                  ?.name ?? value
              }
            >
              <MultiSelect.Input placeholder={projectInput.placeholder.value} />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <Loader isLoading={isLoadingProjects}>
                <MultiSelect.List>
                  {projects?.data?.map((project) => (
                    <MultiSelect.Item
                      key={String(project._id)}
                      value={String(project._id)}
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
            description={tagsSelect.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) =>
                projects?.data?.find((project) => String(project._id) === value)
                  ?.name ?? value
              }
            >
              <MultiSelect.Input placeholder={tagsSelect.placeholder.value} />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <Loader isLoading={isLoadingProjects}>
                <MultiSelect.List>
                  {tags?.data?.map((tag) => (
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
        {((dictionary as DictionaryAPI).availableVersions?.length ?? 0) > 1 && (
          <div className="flex size-full flex-1 gap-8 max-md:flex-col">
            <Form.Select
              name="publishedVersion"
              description={publishedVersionSelect.description.value}
              label={publishedVersionSelect.label}
            >
              <Select.Trigger>
                <Select.Value
                  placeholder={publishedVersionSelect.placeholder.value}
                />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="-1">LTS</Select.Item>
                {(dictionary as DictionaryAPI).availableVersions?.map(
                  (version) => (
                    <Select.Item value={version} key={version}>
                      {version}
                    </Select.Item>
                  )
                )}
              </Select.Content>
            </Form.Select>
            <div className="w-full" />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2 max-md:flex-col">
          <Form.Button
            type="button"
            label={auditButton.label.value}
            Icon={WandSparkles}
            variant="outline"
            color="text"
            className="max-md:w-full"
            onClick={handleOnAuditFile}
            disabled={isSubmitting || isAuditing}
            isLoading={isAuditing}
          >
            {auditButton.text}
          </Form.Button>

          {mode === 'remote' ? (
            isLocalDictionary ? (
              <Form.Button
                type="submit"
                label={publishButton.label.value}
                disabled={isSubmitting || !isFormEdited || isLoading}
                Icon={ArrowUpFromLine}
                color="text"
                className="max-md:w-full"
                isLoading={isSubmitting}
              >
                {publishButton.text}
              </Form.Button>
            ) : (
              isEdited && (
                <Form.Button
                  type="submit"
                  label={saveButton.label.value}
                  disabled={isSubmitting || !isFormEdited || isLoading}
                  Icon={Save}
                  color="text"
                  className="max-md:w-full"
                  isLoading={isSubmitting}
                >
                  {saveButton.text}
                </Form.Button>
              )
            )
          ) : (
            <Form.Button
              type="submit"
              label={downloadButton.label.value}
              disabled={isSubmitting || !isFormEdited || isLoading}
              Icon={Download}
              color="text"
              className="max-md:w-full"
              isLoading={isSubmitting}
            >
              {downloadButton.text}
            </Form.Button>
          )}
        </div>
      </Form>
    </Container>
  );
};
