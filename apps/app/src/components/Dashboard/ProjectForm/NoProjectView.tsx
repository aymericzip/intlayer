import { Button } from '@intlayer/design-system/button';
import { useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { Plus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
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
      <H3>{createProjectTitle}</H3>
      <span className="mb-3 text-neutral text-sm">
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
