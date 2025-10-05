'use client';

import { Button, useForm } from '@intlayer/design-system';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useProjectSchema } from './useProjectFormSchema';

type NoProjectViewProps = {
  onClickCreateProject: () => void;
};

export const NoProjectView: FC<NoProjectViewProps> = ({
  onClickCreateProject,
}) => {
  const ProjectSchema = useProjectSchema();
  const { isSubmitting } = useForm(ProjectSchema);
  const { createProjectButton, createProjectTitle, createProjectDescription } =
    useIntlayer('project-form');

  return (
    <div className="flex size-full max-w-[400px] flex-1 flex-col items-center justify-center gap-3">
      <span className="font-bold">{createProjectTitle}</span>
      <span className="text-neutral mb-3 text-sm">
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
        Icon={Plus}
      >
        {createProjectButton.text}
      </Button>
    </div>
  );
};
