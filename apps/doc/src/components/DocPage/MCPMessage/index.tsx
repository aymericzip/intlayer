'use client';

import { PopoverStatic } from '@intlayer/design-system/popover';
import { Doc_MCP_Path, Doc_Path } from '@intlayer/design-system/routes';
import { useRouterState } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { McpLogo } from './McpLogo';

export const MCPMessage: FC = () => {
  const { title, description, link } = useIntlayer('mcp-message');
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname !== Doc_Path) return <></>;

  return (
    <PopoverStatic identifier="mcp">
      <Link
        to={Doc_MCP_Path}
        label={link.label.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <McpLogo className="size-4" />
      </Link>
      <PopoverStatic.Detail
        identifier="mcp"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
        <Link
          to={Doc_MCP_Path}
          label={link.label.value}
          color="text"
          className="flex flex-row items-center gap-2 p-3"
        >
          {link.test}
        </Link>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
