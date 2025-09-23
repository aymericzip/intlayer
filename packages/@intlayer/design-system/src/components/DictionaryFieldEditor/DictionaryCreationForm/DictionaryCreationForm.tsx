'use client';

import { type FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useAddDictionary, useGetProjects } from '../../../hooks/reactQuery';
import { useAuth } from '../../../hooks/useAuth';
import { ButtonColor } from '../../Button';
import { Form, useForm } from '../../Form';
import { MultiSelect } from '../../Select';
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
  const { mutate: addDictionary, isPending } = useAddDictionary();
  const { data: projectsData } = useGetProjects();
  const DictionarySchema = useDictionarySchema(String(project?.id));
  const { form, isSubmitting } = useForm(DictionarySchema);
  const { keyInput, createDictionaryButton, projectInput } =
    useIntlayer('dictionary-form');

  const onSubmitSuccess = (data: DictionaryFormData) => {
    addDictionary(
      { dictionary: data },
      {
        onSuccess: () => {
          onDictionaryCreated?.();
        },
      }
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
            projectsData?.data?.find((project) => String(project.id) === value)
              ?.name ?? value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder.value} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {projectsData?.data?.map((project) => (
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
        color={ButtonColor.TEXT}
        isLoading={isSubmitting || isPending}
        label={createDictionaryButton.ariaLabel.value}
        isFullWidth
      >
        {createDictionaryButton.text}
      </Form.Button>
    </Form>
  );
};
