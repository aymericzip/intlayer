import { GithubLogo } from '@components/GithubLogo';
import { Link } from '@components/Link/Link';
import { Popover } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

type ApplicationTemplateMessageProps = {
  applicationTemplateUrl: string;
};

export const ApplicationTemplateMessage: FC<
  ApplicationTemplateMessageProps
> = ({ applicationTemplateUrl }) => {
  const { title, description, label } = useIntlayer(
    'application-template-message'
  );

  return (
    <Popover identifier="mcp">
      <Link
        href={applicationTemplateUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <GithubLogo className="size-4" />
      </Link>
      <Popover.Detail
        identifier="mcp"
        className="flex flex-col gap-3 p-3 min-w-64 text-sm"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </Popover.Detail>
    </Popover>
  );
};
