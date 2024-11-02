'use client';

import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import {
  useAddDictionary,
  useGetProjects,
} from '../../../hooks/intlayerAPIHooks';
import { useAuth } from '../../Auth';
import { Form, useForm } from '../../Form';
import { MultiSelect } from '../../Select';
import { useToast } from '../../Toaster';
import { dictionaryFormContent } from './dictionaryCreationForm.content';
import {
  getDictionarySchema,
  type DictionaryFormData,
} from './dictionaryFormSchema';

export const DictionaryCreationForm: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { addDictionary } = useAddDictionary();
  const { data: projects } = useGetProjects();
  const DictionarySchema = getDictionarySchema(String(project?._id));
  const { form, isSubmitting } = useForm(DictionarySchema);
  const {
    keyInput,
    createDictionaryButton,
    createDictionaryToasts,
    projectInput,
  } = useDictionary(dictionaryFormContent);
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

      <Form.Button
        className="ml-auto mt-12"
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
