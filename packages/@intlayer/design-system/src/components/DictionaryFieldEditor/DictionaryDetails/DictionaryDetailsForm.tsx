'use client';

import type { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { WandSparkles } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useDictionary } from 'react-intlayer';
import {
  useAuditContentDeclarationMetadata,
  useGetProjects,
  useGetTags,
} from '../../../hooks';
import { useAuth } from '../../../hooks/useAuth';
import { Container } from '../../Container';
import { Form, useForm } from '../../Form';
import { Loader } from '../../Loader';
import { MultiSelect } from '../../Select';
import { dictionaryDetailsContent } from './dictionaryDetails.content';
import { useDictionaryDetailsSchema } from './useDictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
}) => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();
  const { data: tags } = useGetTags();

  const DictionaryDetailsSchema = useDictionaryDetailsSchema(
    String(project?.id)
  );
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionary,
  });
  const { editedContent, setEditedDictionary } = useEditedContent();
  const {
    titleInput,
    keyInput,
    descriptionInput,

    projectInput,
    tagsSelect,
    auditButton,
  } = useDictionary(dictionaryDetailsContent);
  const { auditContentDeclaration, isLoading: isAuditing } =
    useAuditContentDeclarationMetadata();
  const updatedDictionary = editedContent?.[dictionary.key];

  useEffect(() => {
    form.reset(dictionary);
  }, [dictionary, form?.reset]);

  useEffect(() => {
    if (typeof updatedDictionary === 'undefined') {
      form.reset(dictionary);
    }
  }, [updatedDictionary]);

  const handleOnAuditFile = async () => {
    const dictionaryToAudit = {
      ...dictionary,
      ...updatedDictionary,
    };

    await auditContentDeclaration({
      fileContent: JSON.stringify(dictionaryToAudit),
    }).then((response) => {
      if (!response?.data) return;

      try {
        const auditedDictionary = JSON.parse(response.data.fileContent) as
          | Partial<Dictionary>
          | undefined;

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
    });
  };

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
        onChange={(data) =>
          setEditedDictionary((prev) => ({
            ...prev,
            ...data,
          }))
        }
      >
        <div className="flex w-full flex-1 gap-8 max-md:flex-col">
          <Form.EditableFieldInput
            name="key"
            label={keyInput.label}
            placeholder={keyInput.label.value}
            description={keyInput.description}
            disabled={isSubmitting}
            isRequired
            onSave={(value) => {
              form.setValue('key', value);
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
              form.setValue('title', value);
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
            form.setValue('description', value);
            setEditedDictionary((prev) => ({
              ...dictionary,
              ...(prev ?? {}),
              description: value,
            }));
          }}
        />
        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <Form.MultiSelect
            name="projectIds"
            label={projectInput.label.value}
            description={projectInput.description.value}
            onValueChange={(value) => {
              const valueArray = [value].flat();
              form.setValue('projectIds', valueArray);
              setEditedDictionary((prev) => ({
                ...dictionary,
                ...(prev ?? {}),
                projectIds: valueArray,
              }));
            }}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) =>
                projects?.data?.find((project) => String(project.id) === value)
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
            description={tagsSelect.description.value}
            onValueChange={(value) => {
              form.setValue('tags', [value].flat());
              setEditedDictionary((prev) => ({
                ...dictionary,
                ...(prev ?? {}),
                tags: [value].flat(),
              }));
            }}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) =>
                projects?.data?.find((project) => String(project.id) === value)
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
        </div>
      </Form>
    </Container>
  );
};
