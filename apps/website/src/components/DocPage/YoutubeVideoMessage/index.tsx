import { Link } from '@components/Link/Link';
import { Popover, YoutubeLogo } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

type YoutubeVideoMessageProps = {
  youtubeVideoUrl: string;
};

export const YoutubeVideoMessage: FC<YoutubeVideoMessageProps> = ({
  youtubeVideoUrl,
}) => {
  const { title, description, link } = useIntlayer('youtube-video-message');

  return (
    <Popover identifier="mcp">
      <Link
        href={youtubeVideoUrl}
        label={link.label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <YoutubeLogo className="size-4" />
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
