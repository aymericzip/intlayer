'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { ArrowUpFromLine, Save } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useDictionary } from 'react-intlayer';
import { useAuth } from '../../../components/Auth';
import { MultiSelect } from '../../../components/Select';
import { useGetProjects, usePushDictionaries } from '../../../hooks';
import { cn } from '../../../utils/cn';
import { Form, useForm } from '../../Form';
import { useToast } from '../../Toaster';
import { dictionaryDetailsContent } from './dictionaryDetails.content';
import {
  getDictionaryDetailsSchema,
  DictionaryDetailsFormData,
} from './DictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
}) => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { pushDictionaries } = usePushDictionaries();
  const { data: projects } = useGetProjects();

  const DictionaryDetailsSchema = getDictionaryDetailsSchema(
    String(project?._id)
  );
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionary,
  });
  const {
    pushDictionariesToasts,
    updateDictionaryToasts,
    titleInput,
    keyInput,
    descriptionInput,
    publishButton,
    saveButton,
    projectInput,
  } = useDictionary(dictionaryDetailsContent);
  const { toast } = useToast();

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
    ])
      .then(() => {
        if (isLocalDictionary) {
          toast({
            title: pushDictionariesToasts.updated.title.value,
            description: pushDictionariesToasts.updated.description.value,
            variant: 'success',
          });
        } else {
          toast({
            title: updateDictionaryToasts.updated.title.value,
            description: updateDictionaryToasts.updated.description.value,
            variant: 'success',
          });
        }
      })
      .catch((error) => {
        if (isLocalDictionary) {
          toast({
            title: pushDictionariesToasts.failed.title.value,
            description: pushDictionariesToasts.failed.description.value,
            variant: 'error',
          });
        } else {
          toast({
            title: updateDictionaryToasts.failed.title.value,
            description: error.message,
            variant: 'error',
          });
        }
      });
  };

  return (
    <Form
      className="flex size-full flex-1 flex-col gap-8"
      {...form}
      schema={DictionaryDetailsSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      <div className="flex size-full flex-1 gap-8 max-md:flex-col">
        <Form.EditableFieldInput
          name="title"
          label={titleInput.label.value}
          placeholder={titleInput.placeholder.value}
          description={titleInput.description.value}
          disabled={isSubmitting}
        />
        <Form.EditableFieldInput
          name="key"
          label={keyInput.label.value}
          placeholder={keyInput.label.value}
          description={keyInput.description.value}
          disabled={isSubmitting}
          required
        />
      </div>

      <Form.EditableFieldTextArea
        name="description"
        label={descriptionInput.label.value}
        placeholder={descriptionInput.placeholder.value}
        description={descriptionInput.description.value}
        disabled={isSubmitting}
      />

      <Form.MultiSelect name="projectIds" label={projectInput.label.value}>
        <MultiSelect.Trigger
          getBadgeValue={(value) =>
            projects?.data?.find((project) => String(project._id) === value)
              ?.name ?? value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder.value} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
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
        </MultiSelect.Content>
      </Form.MultiSelect>

      {isLocalDictionary ? (
        <Form.Button
          type="submit"
          label={publishButton.label.value}
          disabled={isSubmitting || !isFormEdited}
          Icon={ArrowUpFromLine}
          isFullWidth={false}
          color="text"
          isLoading={isSubmitting}
          className="ml-auto"
        >
          {publishButton.text}
        </Form.Button>
      ) : (
        <Form.Button
          type="submit"
          label={saveButton.label.value}
          disabled={isSubmitting}
          isFullWidth={false}
          className={cn('ml-auto', isFormEdited ? '' : 'invisible')}
          Icon={Save}
          color="text"
          isLoading={isSubmitting}
        >
          {saveButton.text}
        </Form.Button>
      )}
    </Form>
  );
};
