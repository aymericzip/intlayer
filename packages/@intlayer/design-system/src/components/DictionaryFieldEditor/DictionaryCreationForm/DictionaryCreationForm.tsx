'use client';

import { type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import {
  useAddDictionary,
  useGetProjects,
} from '../../../hooks/intlayerAPIHooks';
import { useAuth } from '../../Auth';
import { Form, useForm } from '../../Form';
import { MultiSelect } from '../../Select';
import { dictionaryFormContent } from './dictionaryCreationForm.content';
import {
  useDictionarySchema,
  type DictionaryFormData,
} from './useDictionaryFormSchema';

export const DictionaryCreationForm: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { addDictionary } = useAddDictionary();
  const { data: projects } = useGetProjects();
  const DictionarySchema = useDictionarySchema(String(project?._id));
  const { form, isSubmitting } = useForm(DictionarySchema);
  const { keyInput, createDictionaryButton, projectInput } = useDictionary(
    dictionaryFormContent
  );

  const onSubmitSuccess = async (data: DictionaryFormData) => {
    await addDictionary(data);
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
        placeholder={keyInput.placeholder}
        isRequired
      />

      <Form.MultiSelect name="projectIds" label={projectInput.label}>
        <MultiSelect.Trigger
          getBadgeValue={(value) =>
            projects?.data?.find((project) => String(project._id) === value)
              ?.name ?? value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder} />
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
        label={createDictionaryButton.ariaLabel}
      >
        {createDictionaryButton.text}
      </Form.Button>
    </Form>
  );
};
