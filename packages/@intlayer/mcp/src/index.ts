#!/usr/bin/env node

import { build, fill, pull, push } from '@intlayer/cli';
import { isESModule, Locales, type LogConfig } from '@intlayer/config';
import { getDoc, getDocBySlug, getDocMetadataRecord } from '@intlayer/docs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'fs';
import { dirname as pathDirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

export const dirname = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson = JSON.parse(
  readFileSync(resolve(dirname, '../../package.json'), 'utf8')
);

const buildToolSchema = {
  watch: z.boolean().optional().describe('Watch for changes'),
  baseDir: z.string().optional().describe('Base directory'),
  env: z.string().optional().describe('Environment'),
  envFile: z.string().optional().describe('Environment file'),
  verbose: z.boolean().optional().describe('Verbose output'),
  prefix: z.string().optional().describe('Log prefix'),
};

type BuildToolProps = z.infer<z.ZodObject<typeof buildToolSchema>>;

const fillToolSchema = {
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
};

type FillToolProps = z.infer<z.ZodObject<typeof fillToolSchema>>;

const pushToolSchema = {
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
};

type PushToolProps = z.infer<z.ZodObject<typeof pushToolSchema>>;

const pullToolSchema = {
  dictionaries: z
    .array(z.string())
    .optional()
    .describe('List of dictionaries to pull'),
  newDictionariesPath: z
    .string()
    .optional()
    .describe('Path to save new dictionaries'),
};

type PullToolProps = z.infer<z.ZodObject<typeof pullToolSchema>>;

const server = new McpServer({
  name: 'intlayer',
  version: packageJson.version,
  capabilities: {
    resources: {},
  },
});

server.tool(
  'intlayer-build',
  'Build the dictionaries. List all content declarations files `.content.{ts,tsx,js,json,...}` to update the content callable using the `useIntlayer` hook.',
  buildToolSchema,
  async ({ watch, baseDir, env, envFile, verbose, prefix }: BuildToolProps) => {
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
  fillToolSchema,
  async (props: FillToolProps) => {
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
  pushToolSchema,
  async (props: PushToolProps) => {
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
  pullToolSchema,
  async (props: PullToolProps) => {
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
  'get-doc-list',
  'Get the list of docs names and their metadata to get more details about what doc to retrieve',
  {
    lang: z.nativeEnum(Locales).optional().describe('Language of the docs'),
  },
  async ({ lang }) => {
    const docsMetadataRecord = await getDocMetadataRecord(lang);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(docsMetadataRecord, null, 2),
        },
      ],
    };
  }
);

server.tool(
  'get-doc',
  'Get a doc by his key. Example: `./docs/en/getting-started.md`. List all docs metadata first to get more details about what doc key to retrieve.',
  {
    docKey: z.string(),
    lang: z.nativeEnum(Locales).optional().describe('Language of the docs'),
  },
  async ({ docKey, lang }) => {
    const doc = await getDoc(docKey as any, lang);
    return {
      content: [{ type: 'text', text: doc }],
    };
  }
);

server.tool(
  'get-doc-by-slug',
  'Get an array of docs by their slugs. If not slug is provided, return all docs (1.2Mb). List all docs metadata first to get more details about what doc to retrieve.',
  {
    slug: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .describe(
        'Slug of the docs. If not provided, return all docs. If not provided, return all docs.'
      ),
    lang: z.nativeEnum(Locales).optional().describe('Language of the docs'),
    strict: z
      .boolean()
      .optional()
      .describe(
        'Strict mode - only return docs that match all slugs, by excluding additional slugs'
      ),
    description: 'Get an array of docs by their slugs',
  },
  async ({ slug, lang, strict }) => {
    const doc = await getDocBySlug(slug, lang, strict);
    return {
      content: doc.map((d) => ({ type: 'text', text: d })),
    };
  }
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Intlayer MCP Server running on stdio');
};

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
