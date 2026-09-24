import {
  PopoverStatic,
  type PopoverXAlign,
} from '@intlayer/design-system/popover';
import { Website_Doc, Website_Doc_MCP } from '@intlayer/design-system/routes';
import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { McpLogo } from './McpLogo';

type MCPMessageProps = {
  xAlign?: PopoverXAlign;
};

export const MCPMessage: FC<MCPMessageProps> = ({ xAlign = 'end' }) => {
  const { title, description, link } = useIntlayer('mcp-message');
  const pathname = useLocation().pathname;

  if (pathname !== Website_Doc) return <></>;

  return (
    <PopoverStatic identifier="mcp">
      <Link
        to={Website_Doc_MCP}
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
        xAlign={xAlign}
      >
        <strong>{title}</strong>
        <p className="text-muted-foreground">{description}</p>
        <Link
          to={Website_Doc_MCP}
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
