import { Form, MultiSelect } from '@intlayer/design-system';
import type { UseFormReturn } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import type { SubmitProjectFormData } from './useSubmitProjectFormSchema';

const useCasesList = [
  'Blog',
  'E-commerce',
  'SaaS',
  'Dashboard',
  'Documentation',
  'Portfolio',
  'Social',
  'Developer Tool',
  'Marketing',
  'Media',
];

interface ProjectFormFieldsProps {
  form: UseFormReturn<SubmitProjectFormData>;
}

export const ProjectFormFields = ({ form }: ProjectFormFieldsProps) => {
  const content = useIntlayer('submit-project-form');

  return (
    <>
      <Form.Input
        name="name"
        label={content.projectNameInput.label}
        placeholder={content.projectNameInput.placeholder.value}
        maxLength={255}
        isRequired
      />

      <Form.Input
        name="url"
        label={content.projectUrlInput.label}
        placeholder={content.projectUrlInput.placeholder.value}
        type="url"
        isRequired
      />

      <Form.Input
        name="githubUrl"
        label={content.githubUrlInput.label}
        placeholder={content.githubUrlInput.placeholder.value}
        type="url"
      />

      <Form.Input
        name="tagline"
        label={content.taglineInput.label}
        placeholder={content.taglineInput.placeholder.value}
        maxLength={500}
        description={content.taglineInput.charactersInfo({
          count: form.watch('tagline')?.length ?? 0,
        })}
        isRequired
      />

      <Form.AutoSizedTextArea
        name="description"
        label={content.descriptionInput.label}
        placeholder={content.descriptionInput.placeholder.value}
        rows={4}
      />

      <Form.MultiSelect
        name="useCases"
        label={content.useCasesInput.label}
        description={content.useCasesInput.description}
      >
        <MultiSelect.Trigger>
          <MultiSelect.Input
            placeholder={content.useCasesInput.placeholder.value}
          />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {useCasesList.map((useCase) => (
              <MultiSelect.Item key={useCase} value={useCase}>
                {useCase}
              </MultiSelect.Item>
            ))}
          </MultiSelect.List>
        </MultiSelect.Content>
      </Form.MultiSelect>
    </>
  );
};
