import { fill, pull, push } from '@intlayer/cli';
import { Locales } from '@intlayer/config';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';

export const loadCLITools = async (server: McpServer) => {
  server.tool(
    'intlayer-fill',
    'Fill the dictionaries with missing translations / review translations using Intlayer servers',
    {
      sourceLocale: z.nativeEnum(Locales).optional().describe('Source locale'),
      outputLocales: z
        .union([z.nativeEnum(Locales), z.array(z.nativeEnum(Locales))])
        .optional()
        .describe('Output locales'),
      file: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe('File path'),
      mode: z.enum(['complete', 'review']).optional().describe('Fill mode'),
      keys: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe('Keys to include'),
      excludedKeys: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe('Keys to exclude'),
      pathFilter: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe('Path filter'),
      gitOptions: z
        .object({
          gitDiff: z.boolean().optional(),
          gitDiffBase: z.string().optional(),
          gitDiffCurrent: z.string().optional(),
          uncommitted: z.boolean().optional(),
          unpushed: z.boolean().optional(),
          untracked: z.boolean().optional(),
        })
        .optional()
        .describe('Git options'),
      aiOptions: z
        .object({
          provider: z.string().optional(),
          temperature: z.number().optional(),
          model: z.string().optional(),
          apiKey: z.string().optional(),
          customPrompt: z.string().optional(),
          applicationContext: z.string().optional(),
        })
        .optional()
        .describe('AI options'),
    },
    async (props) => {
      try {
        const { gitOptions, ...rest } = props;
        const fillOptions: any = { ...rest, gitOptions: undefined };

        if (gitOptions) {
          const { gitDiff, uncommitted, unpushed, untracked, ...restGit } =
            gitOptions;
          const mode = [];
          if (gitDiff) mode.push('gitDiff');
          if (uncommitted) mode.push('uncommitted');
          if (unpushed) mode.push('unpushed');
          if (untracked) mode.push('untracked');

          fillOptions.gitOptions = { ...restGit, mode };
        }

        await fill(fillOptions);

        return {
          content: [
            {
              type: 'text',
              text: 'Fill successful.',
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Fill failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'intlayer-push',
    'Push locale dictionaries to the server',
    {
      deleteLocaleDictionary: z
        .boolean()
        .optional()
        .describe('Delete local dictionary after push'),
      keepLocaleDictionary: z
        .boolean()
        .optional()
        .describe('Keep local dictionary after push'),
      dictionaries: z
        .array(z.string())
        .optional()
        .describe('List of dictionaries to push'),
      gitOptions: z
        .object({
          gitDiff: z.boolean().optional(),
          gitDiffBase: z.string().optional(),
          gitDiffCurrent: z.string().optional(),
          uncommitted: z.boolean().optional(),
          unpushed: z.boolean().optional(),
          untracked: z.boolean().optional(),
        })
        .optional()
        .describe('Git options'),
    },
    async (props) => {
      try {
        const { gitOptions, ...rest } = props;
        const pushOptions: any = { ...rest, gitOptions: undefined };

        if (gitOptions) {
          const { gitDiff, uncommitted, unpushed, untracked, ...restGit } =
            gitOptions;
          const mode = [];
          if (gitDiff) mode.push('gitDiff');
          if (uncommitted) mode.push('uncommitted');
          if (unpushed) mode.push('unpushed');
          if (untracked) mode.push('untracked');

          pushOptions.gitOptions = { ...restGit, mode };
        }

        await push(pushOptions);

        return {
          content: [
            {
              type: 'text',
              text: 'Push successful.',
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Push failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'intlayer-pull',
    'Pull dictionaries from the CMS',
    {
      dictionaries: z
        .array(z.string())
        .optional()
        .describe('List of dictionaries to pull'),
      newDictionariesPath: z
        .string()
        .optional()
        .describe('Path to save new dictionaries'),
    },
    async (props) => {
      try {
        await pull(props);

        return {
          content: [
            {
              type: 'text',
              text: 'Pull successful.',
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Pull failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
};
