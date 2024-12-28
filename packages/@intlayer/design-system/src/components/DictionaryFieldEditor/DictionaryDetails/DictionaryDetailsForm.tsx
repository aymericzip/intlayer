'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { ArrowUpFromLine, Save, WandSparkles } from 'lucide-react';
import { type FC, useEffect } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import {
  useAuditContentDeclarationMetadata,
  useGetProjects,
  useGetTags,
  usePushDictionaries,
} from '../../../hooks';
import { useAuth } from '../../Auth';
import { Form, useForm } from '../../Form';
import { Loader } from '../../Loader';
import { MultiSelect } from '../../Select';
import { dictionaryDetailsContent } from './dictionaryDetails.content';
import {
  useDictionaryDetailsSchema,
  DictionaryDetailsFormData,
} from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
}) => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { pushDictionaries } = usePushDictionaries();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();
  const { data: tags, isLoading: isLoadingTags } = useGetTags();

  const DictionaryDetailsSchema = useDictionaryDetailsSchema(
    String(project?._id)
  );
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionary,
  });
  const {
    titleInput,
    keyInput,
    descriptionInput,
    publishButton,
    saveButton,
    projectInput,
    tagsSelect,
    auditButton,
  } = useDictionary(dictionaryDetailsContent);
  const { auditContentDeclaration, isLoading: isAuditing } =
    useAuditContentDeclarationMetadata();

  useEffect(() => {
    form.reset(dictionary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionary, form?.reset]);

  const isFormEdited = form.formState.isDirty;
  const isLocalDictionary =
    typeof (dictionary as DistantDictionary)?._id === 'undefined';

  const onSubmitSuccess = async (data: DictionaryDetailsFormData) => {
    await pushDictionaries([
      {
        ...dictionary,
        ...data,
      },
    ]);
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

        console.log('editedDictionary', editedDictionary);

        form.reset({ ...updatedDictionary, ...editedDictionary });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const isLoading = isSubmitting || isLoadingTags;

  return (
    <Form
      className="flex size-full flex-1 flex-col gap-8"
      {...form}
      schema={DictionaryDetailsSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      <div className="flex size-full flex-1 gap-8 max-md:flex-col">
        <Form.EditableFieldInput
          name="key"
          label={keyInput.label}
          placeholder={keyInput.label}
          description={keyInput.description}
          disabled={isSubmitting}
          isRequired
        />
        <Form.EditableFieldInput
          name="title"
          label={titleInput.label}
          placeholder={titleInput.placeholder}
          description={titleInput.description}
          disabled={isSubmitting}
        />
      </div>
      <Form.EditableFieldTextArea
        name="description"
        label={descriptionInput.label}
        placeholder={descriptionInput.placeholder}
        description={descriptionInput.description}
        disabled={isSubmitting}
      />
      <div className="flex size-full flex-1 gap-8 max-md:flex-col">
        <Form.MultiSelect
          name="projectIds"
          label={projectInput.label}
          description={projectInput.description}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) =>
              projects?.data?.find((project) => String(project._id) === value)
                ?.name ?? value
            }
          >
            <MultiSelect.Input placeholder={projectInput.placeholder} />
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
          label={tagsSelect.label}
          description={tagsSelect.description}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) =>
              projects?.data?.find((project) => String(project._id) === value)
                ?.name ?? value
            }
          >
            <MultiSelect.Input placeholder={tagsSelect.placeholder} />
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

      <div className="flex flex-wrap items-center justify-end gap-2 max-md:flex-col">
        <Form.Button
          type="button"
          label={auditButton.label}
          Icon={WandSparkles}
          variant="outline"
          color="text"
          onClick={handleOnAuditFile}
          disabled={isSubmitting || isAuditing}
          isLoading={isAuditing}
        >
          {auditButton.text}
        </Form.Button>
        {isLocalDictionary ? (
          <Form.Button
            type="submit"
            label={publishButton.label}
            disabled={isSubmitting || !isFormEdited || isLoading}
            Icon={ArrowUpFromLine}
            isFullWidth={false}
            color="text"
            isLoading={isSubmitting}
          >
            {publishButton.text}
          </Form.Button>
        ) : (
          <Form.Button
            type="submit"
            label={saveButton.label}
            disabled={isSubmitting || !isFormEdited || isLoading}
            isFullWidth={false}
            Icon={Save}
            color="text"
            isLoading={isSubmitting}
          >
            {saveButton.text}
          </Form.Button>
        )}
      </div>
    </Form>
  );
};
