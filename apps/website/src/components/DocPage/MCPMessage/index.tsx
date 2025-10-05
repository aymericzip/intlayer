import { Link } from '@components/Link/Link';
import { Popover } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { McpLogo } from './McpLogo';

export const MCPMessage: FC = () => {
  const { title, description, link } = useIntlayer('mcp-message');

  return (
    <Popover identifier="mcp">
      <Link
        href={PagesRoutes.Doc_MCP}
        label={link.label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <McpLogo className="size-4" />
      </Link>
      <Popover.Detail
        identifier="mcp"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
        <Link
          href={PagesRoutes.Doc_MCP}
          label={link.label.value}
          color="text"
          className="flex flex-row items-center gap-2 p-3"
        >
          {link.test}
        </Link>
      </Popover.Detail>
    </Popover>
  );
};
