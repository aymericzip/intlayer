import { Form, MultiSelect } from '@intlayer/design-system';
import { useIntlayer } from 'react-intlayer';

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

export const ProjectFormFields = () => {
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
