import { PopoverStatic } from '@intlayer/design-system/popover';
import { YoutubeLogo } from '@intlayer/design-system/social-networks';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';

type YoutubeVideoMessageProps = {
  youtubeVideoUrl: string;
};

export const YoutubeVideoMessage: FC<YoutubeVideoMessageProps> = ({
  youtubeVideoUrl,
}) => {
  const { title, description, label } = useIntlayer('youtube-video-message');

  return (
    <PopoverStatic identifier="mcp">
      <Link
        href={youtubeVideoUrl}
        label={label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <YoutubeLogo className="size-4" />
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
