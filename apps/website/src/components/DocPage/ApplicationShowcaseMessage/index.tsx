import {
  PopoverStatic,
  type PopoverXAlign,
} from '@intlayer/design-system/popover';
import { Globe } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

type ApplicationShowcaseMessageProps = {
  applicationShowcaseUrl: string;
  xAlign?: PopoverXAlign;
};

export const ApplicationShowcaseMessage: FC<
  ApplicationShowcaseMessageProps
> = ({ applicationShowcaseUrl, xAlign = 'end' }) => {
  const { title, description, label } = useIntlayer(
    'application-showcase-message'
  );

  return (
    <PopoverStatic identifier="application-showcase">
      <Link
        to={applicationShowcaseUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <Globe className="size-4" aria-hidden />
      </Link>
      <PopoverStatic.Detail
        identifier="application-showcase"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign={xAlign}
      >
        <strong>{title}</strong>
        <p className="text-muted-foreground">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
