'use client';

import type { Project } from '@intlayer/backend';
import {
  useForm,
  Form,
  useToast,
  useAuth,
  Select,
  MultiSelect,
} from '@intlayer/design-system';
import {
  useAddDictionary,
  useGetProjects,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';
import {
  getDictionarySchema,
  type DictionaryFormData,
} from './DictionaryFormSchema';

export const DictionaryCreationForm: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { addDictionary } = useAddDictionary();
  const { getProjects } = useGetProjects();
  const DictionarySchema = getDictionarySchema(String(project?._id));
  const [projects, setProjects] = useState<Project[]>([]);
  const { form, isSubmitting } = useForm(DictionarySchema);
  const {
    keyInput,
    createDictionaryButton,
    createDictionaryToasts,
    projectInput,
  } = useIntlayer('dictionary-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: DictionaryFormData) => {
    await addDictionary(data)
      .then(() => {
        toast({
          title: createDictionaryToasts.dictionaryCreated.title.value,
          description:
            createDictionaryToasts.dictionaryCreated.description.value,
          variant: 'success',
        });
      })
      .catch((error) => {
        toast({
          title: createDictionaryToasts.dictionaryCreationFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    getProjects({}).then((response) => {
      setProjects(response.data ?? []);
    });
  }, [getProjects]);

  return (
    <Form
      schema={DictionarySchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px]"
      {...form}
    >
      <Form.Input
        name="key"
        label={keyInput.label}
        placeholder={keyInput.placeholder.value}
        isRequired
      />

      <Form.MultiSelect name="projectIds" label={projectInput.label.value}>
        <MultiSelect.Trigger
          getBadgeValue={(value) =>
            projects.find((project) => String(project._id) === value)?.name ??
            value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder.value} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {projects.map((project) => (
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

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createDictionaryButton.ariaLabel.value}
      >
        {createDictionaryButton.text}
      </Form.Button>
    </Form>
  );
};
