import {
  build,
  fill,
  listContentDeclarationRows,
  listMissingTranslations,
  pull,
  push,
} from '@intlayer/cli';
import { Locales, type LogConfig } from '@intlayer/config';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod/v3';

type LoadCLITools = (server: McpServer) => Promise<void>;

export const loadCLITools: LoadCLITools = async (server) => {
  server.tool(
    'intlayer-build',
    'Build the dictionaries. List all content declarations files `.content.{ts,tsx,js,json,...}` to update the content callable using the `useIntlayer` hook.',
    {
      watch: z.boolean().optional().describe('Watch for changes'),
      baseDir: z.string().optional().describe('Base directory'),
      env: z.string().optional().describe('Environment'),
      envFile: z.string().optional().describe('Environment file'),
      verbose: z.boolean().optional().describe('Verbose output'),
      prefix: z.string().optional().describe('Log prefix'),
    },
    async ({ watch, baseDir, env, envFile, verbose, prefix }) => {
      try {
        const log: Partial<LogConfig> = {};
        if (verbose) {
          log.mode = 'verbose';
        }
        if (prefix) {
          log.prefix = prefix;
        }

        await build({
          watch,
          configOptions: {
            baseDir,
            env,
            envFile,
            override: {
              log,
            },
          },
        });

        return {
          content: [
            {
              type: 'text',
              text: 'Build successful.',
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
              text: `Build failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

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
    'Push local dictionaries to the server',
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

  server.tool(
    'intlayer-content-list',
    'List the content declaration (.content.{ts,tsx,js,json,...}) files present in the project. That files contain the multilingual content of the application and are used to build the dictionaries.',
    {
      configOptions: z
        .object({
          baseDir: z.string().optional(),
          env: z.string().optional(),
          envFile: z.string().optional(),
          override: z
            .object({
              log: z
                .object({
                  prefix: z.string().optional(),
                  verbose: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
        })
        .optional()
        .describe('Configuration options'),
    },
    async (props) => {
      try {
        const rows = listContentDeclarationRows(props);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(rows, null, 2),
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
              text: `Content list failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'intlayer-content-test',
    'Test if there are missing translations in the content declaration files. That files contain the multilingual content of the application and are used to build the dictionaries.',
    {
      configOptions: z
        .object({
          baseDir: z.string().optional(),
          env: z.string().optional(),
          envFile: z.string().optional(),
          override: z
            .object({
              log: z
                .object({
                  prefix: z.string().optional(),
                  verbose: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
        })
        .optional()
        .describe('Configuration options'),
    },
    async (props) => {
      try {
        const missingTranslations = listMissingTranslations(
          undefined,
          props?.configOptions
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(missingTranslations, null, 2),
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
              text: `Content test failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
};
