import {
  PopoverStatic,
  type PopoverXAlign,
} from '@intlayer/design-system/popover';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

type ApplicationTemplateMessageProps = {
  applicationTemplateUrl: string;
  xAlign?: PopoverXAlign;
};

export const ApplicationTemplateMessage: FC<
  ApplicationTemplateMessageProps
> = ({ applicationTemplateUrl, xAlign = 'end' }) => {
  const { title, description, label } = useIntlayer(
    'application-template-message'
  );

  return (
    <PopoverStatic identifier="application-template">
      <Link
        to={applicationTemplateUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <TechLogos.GITHUB className="size-4" />
      </Link>
      <PopoverStatic.Detail
        identifier="application-template"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign={xAlign}
      >
        <strong>{title}</strong>
        <p className="text-muted-foreground">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
