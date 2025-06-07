import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../types';

export const getMCPServerData = (locale: LocalesValues): DocData => ({
  docName: 'mcp_server',
  url: PagesRoutes.MCP_Server,
  githubUrl: GithubRoutes['MCP_Server'],
  createdAt: new Date('2025-06-07'),
  updatedAt: new Date('2025-06-07'),
  ...getIntlayer('doc-mcp-server-metadata', locale),
});
