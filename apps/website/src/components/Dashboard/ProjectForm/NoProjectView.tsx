'use client';

import { useForm, Button } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getProjectSchema } from './ProjectFormSchema';

type NoProjectViewProps = {
  onClickCreateProject: () => void;
};

export const NoProjectView: FC<NoProjectViewProps> = ({
  onClickCreateProject,
}) => {
  const SignInSchema = getProjectSchema();
  const { isSubmitting } = useForm(SignInSchema);
  const { createProjectButton, createProjectTitle, createProjectDescription } =
    useIntlayer('project-form');

  return (
    <div className="flex size-full max-w-[400px] flex-1 flex-col items-center justify-center gap-3">
      <span className="font-bold">{createProjectTitle}</span>
      <span className="text-neutral dark:text-neutral-dark mb-3 text-sm">
        {createProjectDescription}
      </span>
      <Button
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createProjectButton.ariaLabel.value}
        isFullWidth={false}
        variant="outline"
        onClick={onClickCreateProject}
      >
        {createProjectButton.text}
      </Button>
    </div>
  );
};
