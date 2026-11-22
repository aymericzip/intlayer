import { useAddProject } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { FolderPlus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type CliProjectQuickCreateProps = {
  /** Name suggested by the CLI (package.json name, repository or folder) */
  projectName: string;
};

/**
 * One-click CMS project for the local folder the CLI runs in. The backend
 * selects the created project, which moves the login flow to the key step.
 */
export const CliProjectQuickCreate: FC<CliProjectQuickCreateProps> = ({
  projectName,
}) => {
  const { quickCreateProject } = useIntlayer('cli-login-flow');
  const { mutate: addProject, isPending } = useAddProject();

  return (
    <Container
      roundedSize="3xl"
      padding="md"
      border
      borderColor="text"
      className="gap-3"
    >
      <strong className="text-base">
        {quickCreateProject.title({ projectName })}
      </strong>
      <span className="text-sm text-neutral">
        {quickCreateProject.description}
      </span>
      <Button
        color="text"
        Icon={FolderPlus}
        isLoading={isPending}
        label={quickCreateProject.button.value}
        onClick={() => addProject({ name: projectName })}
        className="w-full"
      >
        {quickCreateProject.button}
      </Button>
    </Container>
  );
};
