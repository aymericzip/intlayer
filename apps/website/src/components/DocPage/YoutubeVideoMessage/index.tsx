import {
  PopoverStatic,
  type PopoverXAlign,
} from '@intlayer/design-system/popover';
import { YoutubeLogo } from '@intlayer/design-system/social-networks';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

type YoutubeVideoMessageProps = {
  youtubeVideoUrl: string;
  xAlign?: PopoverXAlign;
};

export const YoutubeVideoMessage: FC<YoutubeVideoMessageProps> = ({
  youtubeVideoUrl,
  xAlign = 'end',
}) => {
  const { title, description, label } = useIntlayer('youtube-video-message');

  return (
    <PopoverStatic identifier="youtube-video">
      <Link
        to={youtubeVideoUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <YoutubeLogo className="size-4" />
      </Link>
      <PopoverStatic.Detail
        identifier="youtube-video"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign={xAlign}
      >
        <strong>{title}</strong>
        <p className="text-muted-foreground">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
