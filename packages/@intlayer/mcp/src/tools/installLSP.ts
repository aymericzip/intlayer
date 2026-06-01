import { installLSP } from '@intlayer/chokidar/cli';
import z from 'zod';
import type { McpServer } from './docs';

export const loadInstallLSPTool = (server: McpServer): void => {
  server.registerTool(
    'intlayer-install-lsp',
    {
      title: 'Install Intlayer LSP',
      description:
        'Configure the Intlayer Language Server in the project. ' +
        'Writes `intlayer.languageServer.command` and `intlayer.languageServer.args` to `.vscode/settings.json` ' +
        'so that VS Code, Cursor, and Windsurf automatically start the language server, enabling Go-to-Definition ' +
        'for `useIntlayer` and `getIntlayer` calls. ' +
        'Returns next-step instructions for installing the `@intlayer/lsp` binary and, optionally, ' +
        'registering the Intlayer Claude Code plugin.',
      inputSchema: {
        projectRoot: z
          .string()
          .describe(
            'Root directory of the project. Defaults to current working directory.'
          )
          .optional(),
      },
      annotations: {
        destructiveHint: true,
      },
    },
    async ({ projectRoot }) => {
      try {
        const root = projectRoot ?? process.cwd();
        const message = await installLSP(root);

        return {
          content: [{ type: 'text', text: message }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to configure LSP: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
};
