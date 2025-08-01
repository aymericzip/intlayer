'use client';

import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import {
  useAddDictionary,
  useGetProjects,
} from '../../../hooks/intlayerAPIHooks';
import { useAuth } from '../../../hooks/useAuth';
import { Form, useForm } from '../../Form';
import { MultiSelect } from '../../Select';
import { dictionaryFormContent } from './dictionaryCreationForm.content';
import {
  useDictionarySchema,
  type DictionaryFormData,
} from './useDictionaryFormSchema';

type DictionaryCreationFormProps = {
  onDictionaryCreated?: () => void;
};

export const DictionaryCreationForm: FC<DictionaryCreationFormProps> = ({
  onDictionaryCreated,
}) => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const { addDictionary } = useAddDictionary();
  const { data: projects } = useGetProjects();
  const DictionarySchema = useDictionarySchema(String(project?.id));
  const { form, isSubmitting } = useForm(DictionarySchema);
  const { keyInput, createDictionaryButton, projectInput } = useDictionary(
    dictionaryFormContent
  );

  const onSubmitSuccess = async (data: DictionaryFormData) => {
    await addDictionary({ dictionary: data }).then(() =>
      onDictionaryCreated?.()
    );
  };

  return (
    <Form
      schema={DictionarySchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px] m-auto"
      {...form}
    >
      <Form.Input
        name="key"
        label={keyInput.label.value}
        placeholder={keyInput.placeholder.value}
        isRequired
      />

      <Form.MultiSelect name="projectIds" label={projectInput.label.value}>
        <MultiSelect.Trigger
          getBadgeValue={(value) =>
            projects?.data?.find((project) => String(project.id) === value)
              ?.name ?? value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder.value} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
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
        </MultiSelect.Content>
      </Form.MultiSelect>

      <Form.Button
        className="ml-auto mt-12"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createDictionaryButton.ariaLabel.value}
        isFullWidth
      >
        {createDictionaryButton.text}
      </Form.Button>
    </Form>
  );
};
