import { Link } from '@components/Link/Link';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { Globe } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

type ApplicationShowcaseMessageProps = {
  applicationShowcaseUrl: string;
};

export const ApplicationShowcaseMessage: FC<
  ApplicationShowcaseMessageProps
> = ({ applicationShowcaseUrl }) => {
  const { title, description, label } = useIntlayer(
    'application-showcase-message'
  );

  return (
    <PopoverStatic identifier="application-showcase">
      <Link
        href={applicationShowcaseUrl}
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
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
