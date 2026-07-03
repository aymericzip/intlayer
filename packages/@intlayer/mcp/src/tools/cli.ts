import { relative } from 'node:path';
import {
  build,
  extract,
  fill,
  init,
  listContentDeclarationRows,
  listMissingTranslations,
  pull,
  push,
} from '@intlayer/cli';
import { listProjects } from '@intlayer/engine/cli';
import { scanWebsite } from '@intlayer/engine/scan';
import { ALL_LOCALES } from '@intlayer/types/allLocales';
import z from 'zod';
import type { McpServer } from './docs';

const configOptionsSchema = z
  .object({
    baseDir: z.string().optional().describe('Base directory for the project'),
    env: z.string().optional().describe('Environment name'),
    envFile: z.string().optional().describe('Path to the environment file'),
    override: z
      .object({
        editor: z
          .object({
            clientId: z.string().optional().describe('Intlayer CMS client ID'),
            clientSecret: z
              .string()
              .optional()
              .describe('Intlayer CMS client secret'),
            backendURL: z
              .string()
              .optional()
              .describe('Intlayer CMS backend URL'),
          })
          .optional(),
        internationalization: z
          .object({
            locales: z
              .array(z.nativeEnum(ALL_LOCALES))
              .optional()
              .describe('Available locales'),
            defaultLocale: z
              .nativeEnum(ALL_LOCALES)
              .optional()
              .describe('Default locale'),
          })
          .optional(),
        log: z
          .object({
            mode: z
              .enum(['default', 'verbose', 'disabled'])
              .optional()
              .describe('Log mode'),
            prefix: z.string().optional().describe('Log prefix'),
          })
          .optional(),
      })
      .optional()
      .describe(
        'Config override - use when running remotely or without a local config file'
      ),
  })
  .optional()
  .describe(
    'Configuration options. Required when running remotely or when no intlayer config file is present'
  );

type LoadCLITools = (server: McpServer) => Promise<void>;

export const loadCLITools: LoadCLITools = async (server) => {
  server.registerTool(
    'intlayer-init',
    {
      title: 'Initialize Intlayer',
      description: 'Initialize Intlayer in the project',
      inputSchema: {
        projectRoot: z.string().describe('Project root directory'),
      },
      annotations: {
        destructiveHint: true,
      },
    },
    async ({ projectRoot }) => {
      try {
        await init(projectRoot);

        return {
          content: [
            {
              type: 'text',
              text: 'Initialization successful.',
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
              text: `Initialization failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.registerTool(
    'intlayer-build',
    {
      title: 'Build Dictionaries',
      description:
        'Build the dictionaries. List all content declarations files `.content.{ts,tsx,js,json,...}` to update the content callable using the `useIntlayer` hook.',
      inputSchema: {
        watch: z.boolean().optional().describe('Watch for changes'),
        configOptions: configOptionsSchema,
      },
      annotations: {
        destructiveHint: true,
      },
    },
    async ({ watch, configOptions }) => {
      try {
        await build({ watch, configOptions });

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

  server.registerTool(
    'intlayer-fill',
    {
      title: 'Fill Translations',
      description:
        'Fill the dictionaries with missing translations / review translations using Intlayer servers',
      inputSchema: {
        sourceLocale: z
          .nativeEnum(ALL_LOCALES)
          .optional()
          .describe('Source locale'),
        outputLocales: z
          .union([
            z.nativeEnum(ALL_LOCALES),
            z.array(z.nativeEnum(ALL_LOCALES)),
          ])
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
        configOptions: configOptionsSchema,
      },
      annotations: {
        destructiveHint: true,
      },
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

  server.registerTool(
    'intlayer-push',
    {
      title: 'Push Dictionaries',
      description: 'Push local dictionaries to the server',
      inputSchema: {
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
        configOptions: configOptionsSchema,
      },
      annotations: {
        destructiveHint: true,
      },
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

  server.registerTool(
    'intlayer-pull',
    {
      title: 'Pull Dictionaries',
      description: 'Pull dictionaries from the CMS',
      inputSchema: {
        dictionaries: z
          .array(z.string())
          .optional()
          .describe('List of dictionaries to pull'),
        newDictionariesPath: z
          .string()
          .optional()
          .describe('Path to save new dictionaries'),
        configOptions: configOptionsSchema,
      },
      annotations: {
        destructiveHint: true,
      },
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

  server.registerTool(
    'intlayer-content-list',
    {
      title: 'List Content Declarations',
      description:
        'List the content declaration (.content.{ts,tsx,js,json,...}) files present in the project. That files contain the multilingual content of the application and are used to build the dictionaries.',
      inputSchema: {
        configOptions: configOptionsSchema,
        absolute: z
          .boolean()
          .optional()
          .describe(
            'Output the results as absolute paths instead of relative paths'
          ),
        json: z
          .boolean()
          .optional()
          .describe('Output the results as JSON instead of formatted text'),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async (props) => {
      try {
        const rows = listContentDeclarationRows(props);
        return {
          content: [
            {
              type: 'text',
              text: props.json
                ? JSON.stringify(rows)
                : JSON.stringify(rows, null, 2),
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

  server.registerTool(
    'intlayer-content-test',
    {
      title: 'Test Translations',
      description:
        'Test if there are missing translations in the content declaration files. That files contain the multilingual content of the application and are used to build the dictionaries.',
      inputSchema: {
        configOptions: configOptionsSchema,
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async (props) => {
      try {
        const missingTranslations = listMissingTranslations(
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

  server.registerTool(
    'intlayer-extract',
    {
      title: 'Extract strings from Component',
      description:
        'Extract strings from an existing component to be placed in a .content file close to the component. Trigger this action to make an existing component multilingual. If the component does not exist, create a normal component including text in JSX, and then trigger this tool to extract it.',
      inputSchema: {
        file: z
          .union([z.string(), z.array(z.string())])
          .optional()
          .describe('List of files to extract'),
        outputContentDeclarations: z
          .string()
          .optional()
          .describe('Path to output content declaration files'),
        configOptions: configOptionsSchema,
      },
      annotations: {
        destructiveHint: true,
      },
    },
    async (props) => {
      try {
        await extract({
          files: Array.isArray(props.file)
            ? props.file
            : props.file
              ? [props.file]
              : undefined,
          configOptions: props.configOptions,
        });

        return {
          content: [
            {
              type: 'text',
              text: 'Extract successful.',
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
              text: `Extract failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.registerTool(
    'intlayer-scan',
    {
      title: 'Scan Website',
      description:
        'Scan a website to measure its page size and audit its i18n / SEO health (html lang/dir, canonical, hreflang, x-default, localized internal links, robots.txt, sitemap.xml, and unused bundle locale content). Returns a 0-100 score and per-check results.',
      inputSchema: {
        url: z.string().describe('Absolute URL of the website to scan'),
        deep: z
          .boolean()
          .optional()
          .describe(
            'Attempt a deeper render-based scan using a locally installed puppeteer. Falls back to a basic fetch scan when puppeteer is not installed.'
          ),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
      },
    },
    async ({ url, deep }) => {
      try {
        const result = await scanWebsite(url, { deep });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
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
              text: `Scan failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.registerTool(
    'intlayer-projects-list',
    {
      title: 'List Projects',
      description:
        'List all Intlayer projects in the directory. Search for configuration files to find all Intlayer projects.',
      inputSchema: {
        baseDir: z
          .string()
          .optional()
          .describe('Base directory to search from'),
        gitRoot: z
          .boolean()
          .optional()
          .describe(
            'Search from the git root directory instead of the base directory'
          ),
        absolute: z
          .boolean()
          .optional()
          .describe(
            'Output the results as absolute paths instead of relative paths'
          ),
        json: z
          .boolean()
          .optional()
          .describe('Output the results as JSON instead of formatted text'),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async (props) => {
      try {
        const { searchDir, projectsPath } = await listProjects({
          baseDir: props.baseDir,
          gitRoot: props.gitRoot,
        });

        const projectsRelativePath = projectsPath
          .map((projectPath) =>
            props.absolute ? projectPath : relative(searchDir, projectPath)
          )
          .map((projectPath) => (projectPath === '' ? '.' : projectPath));

        const outputPaths = props.absolute
          ? projectsPath
          : projectsRelativePath;

        return {
          content: [
            {
              type: 'text',
              text: props.json
                ? JSON.stringify(outputPaths)
                : JSON.stringify(
                    { searchDir, projectsPath: outputPaths },
                    null,
                    2
                  ),
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
              text: `Projects list failed: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
};
