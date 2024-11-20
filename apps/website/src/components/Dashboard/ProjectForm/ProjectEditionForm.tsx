'use client';

import { useForm, Form, useAuth, H3 } from '@intlayer/design-system';
import { useUpdateProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getProjectSchema, type ProjectFormData } from './ProjectFormSchema';

export const ProjectEditionForm: FC = () => {
  const { session, isProjectAdmin } = useAuth();
  const { project } = session ?? {};
  const SignInSchema = getProjectSchema();
  const { updateProject } = useUpdateProject();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { title, nameInput, editButton } = useIntlayer('project-form');

  const onSubmitSuccess = async (data: ProjectFormData) => {
    await updateProject({ ...data, _id: String(project?._id) });
  };

  return (
    <>
      <H3 className="mb-8"> {title}</H3>

      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="w-full"
        {...form}
      >
        <Form.Input
          name="name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={project?.name}
          disabled={!isProjectAdmin}
        />

        {isProjectAdmin && (
          <Form.Button
            className="mt-12 w-full"
            type="submit"
            color="text"
            isLoading={isSubmitting}
            label={editButton.ariaLabel.value}
          >
            {editButton.text}
          </Form.Button>
        )}
      </Form>
    </>
  );
};
