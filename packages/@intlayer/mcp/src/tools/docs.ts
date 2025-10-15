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

  server.tool(
    'get-doc-list',
    'Get the list of docs names and their metadata to get more details about what doc to retrieve',
    {},
    async () => {
      const docsMetadataRecord = await getDocMetadataRecord();

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
      docKey: z.enum(docsKeys as [string, ...string[]]),
    },
    async ({ docKey }) => {
      const doc = await getDoc(docKey as any);
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
      strict: z
        .boolean()
        .optional()
        .describe(
          'Strict mode - only return docs that match all slugs, by excluding additional slugs'
        ),
      description: 'Get an array of docs by their slugs',
    },
    async ({ slug, strict }) => {
      const doc = await getDocBySlug(slug, undefined, strict);
      return {
        content: doc.map((d) => ({ type: 'text', text: d })),
      };
    }
  );
};
