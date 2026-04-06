import { PopoverStatic } from '@intlayer/design-system/popover';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '../../Link';

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
    <PopoverStatic identifier="mcp">
      <Link
        href={applicationTemplateUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <TechLogos.GITHUB className="size-4" />
      </Link>
      <PopoverStatic.Detail
        identifier="mcp"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
