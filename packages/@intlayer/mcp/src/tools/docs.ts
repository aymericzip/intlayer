import type { DocKey } from '@intlayer/docs';
import {
  getDoc,
  getDocBySlug,
  getDocMetadataRecord,
  getDocsKeys,
} from '@intlayer/docs';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod/v3';

type LoadDocsTools = (server: McpServer) => Promise<void>;

export const loadDocsTools: LoadDocsTools = async (server) => {
  const docsKeys = getDocsKeys();

  server.registerTool(
    'get-doc-list',
    {
      title: 'Get Doc List',
      description:
        'Get the list of docs names and their metadata to get more details about what doc to retrieve',
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      try {
        const docsMetadataRecord = await getDocMetadataRecord();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(docsMetadataRecord, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Get doc list failed: ${errorMessage}` },
          ],
        };
      }
    }
  );

  server.registerTool(
    'get-doc',
    {
      title: 'Get Doc by Key',
      description:
        'Get a doc by his key. Example: `./docs/en/getting-started.md`. List all docs metadata first to get more details about what doc key to retrieve.',
      inputSchema: {
        docKey: z.enum(docsKeys as [string, ...string[]]),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ docKey }) => {
      try {
        const doc = await getDoc(docKey as DocKey);
        return {
          content: [{ type: 'text', text: doc }],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [{ type: 'text', text: `Get doc failed: ${errorMessage}` }],
        };
      }
    }
  );

  server.registerTool(
    'get-doc-by-slug',
    {
      title: 'Get Doc by Slug',
      description:
        'Get an array of docs by their slugs. If not slug is provided, return all docs (1.2Mb). List all docs metadata first to get more details about what doc to retrieve.',
      inputSchema: {
        slug: z
          .union([z.string(), z.array(z.string())])
          .optional()
          .describe(
            'Slug of the docs. If not provided, return all docs. If not provided, return all docs.'
          ),
        strict: z
          .boolean()
          .optional()
          .describe(
            'Strict mode - only return docs that match all slugs, by excluding additional slugs'
          ),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ slug, strict }) => {
      try {
        const doc = await getDocBySlug(slug, undefined, strict);
        return {
          content: doc.map((d) => ({ type: 'text', text: d })),
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Get doc by slug failed: ${errorMessage}` },
          ],
        };
      }
    }
  );
};
