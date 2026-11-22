import { Button } from '@intlayer/design-system/button';
import { H3 } from '@intlayer/design-system/headers';
import { Plus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { GitImportPrompt } from './GitImportPrompt';

type NoProjectViewProps = {
  onClickCreateProject: () => void;
};

export const NoProjectView: FC<NoProjectViewProps> = ({
  onClickCreateProject,
}) => {
  const { createProjectButton, createProjectTitle, createProjectDescription } =
    useIntlayer('project-form');

  return (
    <div className="flex size-full max-w-120 flex-1 flex-col items-center justify-center gap-3">
      <H3>{createProjectTitle}</H3>
      <span className="mb-3 text-sm text-neutral">
        {createProjectDescription}
      </span>
      <GitImportPrompt mode="create" />
      <hr className="my-4 w-full border-neutral/30" />
      <Button
        color="text"
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
