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
import { WandSparkles } from 'lucide-react';
import { type FC, useEffect } from 'react';
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
    locationSelect,
    filePathInput,
    auditButton,
  } = useIntlayer('dictionary-details');
  const { mutate: auditContentDeclaration, isPending: isAuditing } =
    useAuditContentDeclarationMetadata();
  const updatedDictionary =
    editedContent?.[dictionary.localId as LocalDictionaryId];

  useEffect(() => {
    form.reset(dictionary);
  }, [dictionary, form?.reset]);

  useEffect(() => {
    if (typeof updatedDictionary === 'undefined') {
      form.reset(dictionary);
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

  return (
    <Container
      background="none"
      border
      roundedSize="2xl"
      className="w-full px-5 pt-5 pb-3"
    >
      <Form
        className="flex w-full flex-col gap-8"
        {...form}
        schema={DictionaryDetailsSchema}
        onChange={(data) => {
          setEditedDictionary((prev) => ({
            ...prev,
            ...data,
          }));
        }}
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
          <div className="flex flex-col gap-2">
            <Form.Label info={locationSelect.description.value}>
              {locationSelect.label}
            </Form.Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="location-local"
                  name="location-local"
                  checked={
                    form.watch('location') === 'local' ||
                    form.watch('location') === 'local&remote'
                  }
                  disabled={!mode.includes('local')}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const isRemote =
                      form.getValues('location') === 'remote' ||
                      form.getValues('location') === 'local&remote';
                    let newLocation: Dictionary['location'];
                    if (isChecked) {
                      newLocation = isRemote ? 'local&remote' : 'local';
                    } else {
                      newLocation = isRemote ? 'remote' : 'local';
                    }
                    form.setValue('location', newLocation);
                    setEditedDictionary((prev) => ({
                      ...dictionary,
                      ...(prev ?? {}),
                      location: newLocation,
                    }));
                  }}
                />
                <label htmlFor="location-local" className="text-sm">
                  {locationSelect.local.value}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="location-remote"
                  name="location-remote"
                  checked={
                    form.watch('location') === 'remote' ||
                    form.watch('location') === 'local&remote'
                  }
                  disabled={!mode.includes('remote')}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const isLocal =
                      form.getValues('location') === 'local' ||
                      form.getValues('location') === 'local&remote';
                    let newLocation: Dictionary['location'];
                    if (isChecked) {
                      newLocation = isLocal ? 'local&remote' : 'remote';
                    } else {
                      newLocation = isLocal ? 'local' : 'remote';
                    }
                    form.setValue('location', newLocation);
                    setEditedDictionary((prev) => ({
                      ...dictionary,
                      ...(prev ?? {}),
                      location: newLocation,
                    }));
                  }}
                />
                <label htmlFor="location-remote" className="text-sm">
                  {locationSelect.remote}
                </label>
              </div>
            </div>
          </div>

          {(form.watch('location') === 'local' ||
            form.watch('location') === 'local&remote') && (
            <Form.EditableFieldInput
              name="filePath"
              label={filePathInput.label}
              placeholder={filePathInput.placeholder.value}
              description={filePathInput.description}
              disabled={isSubmitting}
              onSave={(value) => {
                form.setValue('filePath', value);
                setEditedDictionary((prev) => ({
                  ...dictionary,
                  ...(prev ?? {}),
                  filePath: value,
                }));
              }}
            />
          )}
        </div>
        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <Form.MultiSelect
            name="projectIds"
            label={projectInput.label.value}
            description={projectInput.description}
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
            description={tagsSelect.description}
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
    </Container>
  );
};
