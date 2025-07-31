import { build } from '@intlayer/cli';
import { Locales, LogConfig } from '@intlayer/config';
import { getDoc, getDocBySlug, getDocMetadataRecord } from '@intlayer/docs';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';

export const loadDocsTools = async (server: McpServer) => {
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
};
