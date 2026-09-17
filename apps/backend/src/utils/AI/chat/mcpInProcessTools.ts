import { jsonSchema, tool } from '@intlayer/ai';
import { loadAPITools, loadDocsTools } from '@intlayer/mcp/tools';
import { z } from 'zod/mini';

type ZodShape = Record<string, z.ZodMiniType>;

/** The JSON schema shape `jsonSchema()` accepts (draft-7). */
type AcceptedJSONSchema = Extract<
  Parameters<typeof jsonSchema>[0],
  { type?: unknown }
>;

type CollectedTool = {
  description: string;
  inputShape: ZodShape;
  handler: (params: any) => Promise<{
    content: { type: string; text: string }[];
    isError?: boolean;
  }>;
};

const createToolCollector = () => {
  const collected: Record<string, CollectedTool> = {};

  const server = {
    registerTool(name: string, config: any, handler: CollectedTool['handler']) {
      const inputShape: ZodShape = {};
      for (const [key, value] of Object.entries(config.inputSchema ?? {})) {
        if (value instanceof z.ZodMiniType) {
          inputShape[key] = value as z.ZodMiniType;
        }
      }
      collected[name] = {
        description: config.description ?? config.title ?? name,
        inputShape,
        handler,
      };
    },
  };

  return { server, collected };
};

const shapeToJsonSchema = (shape: ZodShape) => {
  const { $schema: _schema, ...raw } = z.toJSONSchema(z.object(shape), {
    target: 'draft-7',
  });
  return jsonSchema({ type: 'object', ...raw } as AcceptedJSONSchema);
};

const resultToString = (result: {
  content: { type: string; text: string }[];
}) => result.content.map((c) => c.text).join('\n');

export type LoadMCPInProcessOptions = {
  includeAPI?: boolean;
};

export const loadMCPToolsInProcess = async (
  options?: LoadMCPInProcessOptions
): Promise<Record<string, any>> => {
  const { server, collected } = createToolCollector();

  await loadDocsTools(server);

  if (options?.includeAPI) {
    loadAPITools(server);
  }

  const tools: Record<string, any> = {};

  for (const [name, { description, inputShape, handler }] of Object.entries(
    collected
  )) {
    tools[name] = tool({
      description,
      inputSchema:
        Object.keys(inputShape).length > 0
          ? shapeToJsonSchema(inputShape)
          : jsonSchema({ type: 'object', properties: {} }),
      execute: async (params) => resultToString(await handler(params)),
    });
  }

  return tools;
};
