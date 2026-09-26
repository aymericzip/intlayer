import { getSearchAPI } from '@intlayer/api';
import type { DocKey, DocMetadata } from '@intlayer/docs';
import {
  getDoc,
  getDocMetadataBySlug,
  getDocMetadataRecord,
  getDocsKeys,
} from '@intlayer/docs';
import {
  buildReviewReport,
  formatReviewReport,
} from '@intlayer/engine/docReview';
import { z } from 'zod/mini';

export type ToolResult = {
  content: { type: string; text: string }[];
  isError?: boolean;
};
export type McpServer = {
  registerTool(
    name: string,
    config: any,
    handler: (params: any) => Promise<ToolResult>
  ): void;
};

type LoadDocsTools = (server: McpServer) => Promise<void>;

/** A documentation chunk returned by the search endpoint with `returnContent`. */
type SearchDocChunk = Exclude<
  NonNullable<
    Awaited<ReturnType<ReturnType<typeof getSearchAPI>['searchDoc']>>['data']
  >,
  string[]
>[number];

/** Priority assumed for a doc without `priority` front matter. */
const DEFAULT_DOC_PRIORITY = 5;

/**
 * Orders docs by their `priority` front matter, most important first, so an
 * agent reads the main guides before the reference pages.
 *
 * @param docsMetadata - Metadata of the docs to order.
 * @returns A new array, sorted by descending priority.
 */
const sortByPriority = <MetadataType extends Pick<DocMetadata, 'priority'>>(
  docsMetadata: MetadataType[]
): MetadataType[] =>
  [...docsMetadata].sort(
    (metadataA, metadataB) =>
      (metadataB.priority ?? DEFAULT_DOC_PRIORITY) -
      (metadataA.priority ?? DEFAULT_DOC_PRIORITY)
  );

export const loadDocsTools: LoadDocsTools = async (server) => {
  const docsKeys = getDocsKeys();

  server.registerTool(
    'get-doc-list',
    {
      title: 'Get Doc List',
      description:
        'Get the list of docs names and their metadata to get more details about what doc to retrieve. Docs are sorted by `priority` (1 to 10, higher is more important): prefer the higher priority docs when several match.',
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      try {
        const docsMetadataRecord = Object.fromEntries(
          sortByPriority(Object.values(await getDocMetadataRecord())).map(
            (docMetadata) => [docMetadata.docKey, docMetadata]
          )
        );

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
        'Get an array of docs by their slugs, most important (highest `priority`) first. If not slug is provided, return all docs (1.2Mb). List all docs metadata first to get more details about what doc to retrieve.',
      inputSchema: {
        slug: z
          .optional(z.union([z.string(), z.array(z.string())]))
          .register(z.globalRegistry, {
            description:
              'Slug of the docs. If not provided, return all docs. If not provided, return all docs.',
          }),
        strict: z.optional(z.boolean()).register(z.globalRegistry, {
          description:
            'Strict mode - only return docs that match all slugs, by excluding additional slugs',
        }),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ slug, strict }) => {
      try {
        const docsMetadata = await getDocMetadataBySlug(
          slug ?? [],
          undefined,
          strict
        );
        const docs = await Promise.all(
          sortByPriority(docsMetadata).map(({ docKey }) =>
            getDoc(docKey as DocKey)
          )
        );

        return {
          content: docs.map((doc) => ({ type: 'text', text: doc })),
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

  server.registerTool(
    'fetch-doc-chunks',
    {
      title: 'Fetch Doc Chunks',
      description:
        'Fetch related doc chunks using keywords or questions. This tool will return the most relevant chunks of documentation based on the input query, best first. Relevance is weighted by the doc `priority` (1 to 10, higher is more important).',
      inputSchema: {
        query: z.string().register(z.globalRegistry, {
          description: 'The keywords or question to search for',
        }),
        limit: z.optional(z.number()).register(z.globalRegistry, {
          description: 'The number of chunks to retrieve (default: 10)',
        }),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ query, limit }) => {
      try {
        const { searchDoc } = getSearchAPI(undefined);
        const response = await searchDoc({
          input: query,
          limit: limit?.toString(),
          returnContent: 'true',
        });

        if (!response.data || !Array.isArray(response.data)) {
          return {
            content: [{ type: 'text', text: 'No relevant chunks found.' }],
          };
        }

        const chunks = response.data as SearchDocChunk[];

        return {
          content: chunks.map((chunk) => ({
            type: 'text',
            text: [
              `File: ${chunk.fileKey}`,
              `Title: ${chunk.docName}`,
              `URL: ${chunk.docUrl}`,
              `Chunk: ${chunk.chunkNumber}`,
              `Priority: ${chunk.priority ?? DEFAULT_DOC_PRIORITY}`,
              `Content:`,
              chunk.content,
            ].join('\n'),
          })),
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Fetch doc chunks failed: ${errorMessage}` },
          ],
        };
      }
    }
  );

  server.registerTool(
    'review-doc-blocks',
    {
      title: 'Review Doc Blocks',
      description:
        'Compare a base markdown document with its translation and return only the blocks that diverge (changed, missing, or stale), with their line ranges and content. Use this to translate a large document incrementally without retranslating it from scratch: it tells you exactly which blocks to (re)translate. Optionally pass the base line numbers that changed (for example from a git diff) so aligned-but-edited blocks are flagged for review.',
      inputSchema: {
        baseContent: z.string().register(z.globalRegistry, {
          description: 'The base (source) markdown document, used as reference',
        }),
        targetContent: z.string().register(z.globalRegistry, {
          description:
            'The existing translated markdown document (may be empty for a brand new translation)',
        }),
        changedLines: z
          .optional(z.array(z.number()))
          .register(z.globalRegistry, {
            description:
              '1-based line numbers that changed in the base document. When omitted, only inserted and deleted blocks are reported.',
          }),
        baseLabel: z.optional(z.string()).register(z.globalRegistry, {
          description: 'Label for the base locale in the formatted output',
        }),
        targetLabel: z.optional(z.string()).register(z.globalRegistry, {
          description: 'Label for the target locale in the formatted output',
        }),
        format: z
          .optional(z.enum(['text', 'json']))
          .register(z.globalRegistry, {
            description: 'Output format. Defaults to "text".',
          }),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({
      baseContent,
      targetContent,
      changedLines,
      baseLabel,
      targetLabel,
      format,
    }) => {
      try {
        const report = buildReviewReport({
          baseText: baseContent,
          targetText: targetContent,
          changedLines,
        });

        const text =
          format === 'json'
            ? JSON.stringify(report, null, 2)
            : formatReviewReport(report, { baseLabel, targetLabel });

        return {
          content: [{ type: 'text', text }],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Review doc blocks failed: ${errorMessage}` },
          ],
          isError: true,
        };
      }
    }
  );
};
