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
import { z } from 'zod/mini';
import type { McpServer } from './docs';

const configOptionsSchema = z
  .optional(
    z.object({
      baseDir: z.optional(z.string()).register(z.globalRegistry, {
        description: 'Base directory for the project',
      }),
      env: z
        .optional(z.string())
        .register(z.globalRegistry, { description: 'Environment name' }),
      envFile: z.optional(z.string()).register(z.globalRegistry, {
        description: 'Path to the environment file',
      }),
      override: z
        .optional(
          z.object({
            editor: z.optional(
              z.object({
                clientId: z.optional(z.string()).register(z.globalRegistry, {
                  description: 'Intlayer CMS client ID',
                }),
                clientSecret: z
                  .optional(z.string())
                  .register(z.globalRegistry, {
                    description: 'Intlayer CMS client secret',
                  }),
                backendURL: z.optional(z.string()).register(z.globalRegistry, {
                  description: 'Intlayer CMS backend URL',
                }),
              })
            ),
            internationalization: z.optional(
              z.object({
                locales: z
                  .optional(z.array(z.enum(ALL_LOCALES)))
                  .register(z.globalRegistry, {
                    description: 'Available locales',
                  }),
                defaultLocale: z
                  .optional(z.enum(ALL_LOCALES))
                  .register(z.globalRegistry, {
                    description: 'Default locale',
                  }),
              })
            ),
            log: z.optional(
              z.object({
                mode: z
                  .optional(z.enum(['default', 'verbose', 'disabled']))
                  .register(z.globalRegistry, { description: 'Log mode' }),
                prefix: z
                  .optional(z.string())
                  .register(z.globalRegistry, { description: 'Log prefix' }),
              })
            ),
          })
        )
        .register(z.globalRegistry, {
          description:
            'Config override - use when running remotely or without a local config file',
        }),
    })
  )
  .register(z.globalRegistry, {
    description:
      'Configuration options. Required when running remotely or when no intlayer config file is present',
  });

type LoadCLITools = (server: McpServer) => Promise<void>;

export const loadCLITools: LoadCLITools = async (server) => {
  server.registerTool(
    'intlayer-init',
    {
      title: 'Initialize Intlayer',
      description: 'Initialize Intlayer in the project',
      inputSchema: {
        projectRoot: z.string().register(z.globalRegistry, {
          description: 'Project root directory',
        }),
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
        watch: z
          .optional(z.boolean())
          .register(z.globalRegistry, { description: 'Watch for changes' }),
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
          .optional(z.enum(ALL_LOCALES))
          .register(z.globalRegistry, { description: 'Source locale' }),
        outputLocales: z
          .optional(
            z.union([z.enum(ALL_LOCALES), z.array(z.enum(ALL_LOCALES))])
          )
          .register(z.globalRegistry, { description: 'Output locales' }),
        file: z
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, { description: 'File path' }),
        mode: z
          .optional(z.enum(['complete', 'review']))
          .register(z.globalRegistry, { description: 'Fill mode' }),
        keys: z
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, { description: 'Keys to include' }),
        excludedKeys: z
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, { description: 'Keys to exclude' }),
        pathFilter: z
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, { description: 'Path filter' }),
        gitOptions: z
          .optional(
            z.object({
              gitDiff: z.optional(z.boolean()),
              gitDiffBase: z.optional(z.string()),
              gitDiffCurrent: z.optional(z.string()),
              uncommitted: z.optional(z.boolean()),
              unpushed: z.optional(z.boolean()),
              untracked: z.optional(z.boolean()),
            })
          )
          .register(z.globalRegistry, { description: 'Git options' }),
        aiOptions: z
          .optional(
            z.object({
              provider: z.optional(z.string()),
              temperature: z.optional(z.number()),
              model: z.optional(z.string()),
              apiKey: z.optional(z.string()),
              customPrompt: z.optional(z.string()),
              applicationContext: z.optional(z.string()),
            })
          )
          .register(z.globalRegistry, { description: 'AI options' }),
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
          .optional(z.boolean())
          .register(z.globalRegistry, {
            description: 'Delete local dictionary after push',
          }),
        keepLocaleDictionary: z
          .optional(z.boolean())
          .register(z.globalRegistry, {
            description: 'Keep local dictionary after push',
          }),
        dictionaries: z
          .optional(z.array(z.string()))
          .register(z.globalRegistry, {
            description: 'List of dictionaries to push',
          }),
        gitOptions: z
          .optional(
            z.object({
              gitDiff: z.optional(z.boolean()),
              gitDiffBase: z.optional(z.string()),
              gitDiffCurrent: z.optional(z.string()),
              uncommitted: z.optional(z.boolean()),
              unpushed: z.optional(z.boolean()),
              untracked: z.optional(z.boolean()),
            })
          )
          .register(z.globalRegistry, { description: 'Git options' }),
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
          .optional(z.array(z.string()))
          .register(z.globalRegistry, {
            description: 'List of dictionaries to pull',
          }),
        newDictionariesPath: z.optional(z.string()).register(z.globalRegistry, {
          description: 'Path to save new dictionaries',
        }),
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
        absolute: z.optional(z.boolean()).register(z.globalRegistry, {
          description:
            'Output the results as absolute paths instead of relative paths',
        }),
        json: z.optional(z.boolean()).register(z.globalRegistry, {
          description: 'Output the results as JSON instead of formatted text',
        }),
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
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, {
            description: 'List of files to extract',
          }),
        outputContentDeclarations: z
          .optional(z.string())
          .register(z.globalRegistry, {
            description: 'Path to output content declaration files',
          }),
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
        url: z.string().register(z.globalRegistry, {
          description: 'Absolute URL of the website to scan',
        }),
        deep: z.optional(z.boolean()).register(z.globalRegistry, {
          description:
            'Attempt a deeper render-based scan using a locally installed puppeteer. Falls back to a basic fetch scan when puppeteer is not installed.',
        }),
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
        baseDir: z.optional(z.string()).register(z.globalRegistry, {
          description: 'Base directory to search from',
        }),
        gitRoot: z.optional(z.boolean()).register(z.globalRegistry, {
          description:
            'Search from the git root directory instead of the base directory',
        }),
        absolute: z.optional(z.boolean()).register(z.globalRegistry, {
          description:
            'Output the results as absolute paths instead of relative paths',
        }),
        json: z.optional(z.boolean()).register(z.globalRegistry, {
          description: 'Output the results as JSON instead of formatted text',
        }),
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
