import { jsonSchema, tool } from '@intlayer/ai';
import { loadAPITools, loadDocsTools } from '@intlayer/mcp/tools';
import z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

type ZodShape = Record<string, z.ZodTypeAny>;

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
        if (value instanceof z.ZodType) {
          inputShape[key] = value as z.ZodTypeAny;
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
  const raw = zodToJsonSchema(z.object(shape) as any, {
    target: 'jsonSchema7',
  }) as Record<string, any>;
  return jsonSchema({ type: 'object', ...raw });
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
