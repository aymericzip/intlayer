import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type AIConfig,
  type AIOptions,
  AIProvider,
  type ChatCompletionRequestMessage,
  stepCountIs,
  streamText,
} from '@intlayer/ai';
import { loadMCPToolsInProcess } from './mcpInProcessTools';

export type ChatOptions = {
  onMessage?: (chunk: string) => void;
  tools?: Record<string, any>;
};

export type ChatTokenUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
};

export type ChatResultData = {
  response: string;
  /** Token consumption for the last completed step. */
  tokenUsage?: ChatTokenUsage;
  /** AI model identifier used for this completion. */
  aiModel?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROMPT = readFileSync(join(__dirname, './PROMPT.md'), 'utf-8');

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: 'gpt-4o-mini',
};

// Keep last ≤8 messages, always starting on a 'user' turn (required by Anthropic).
// Injects a user-role note so the model knows earlier context was dropped.
const truncateMessages = (
  messages: ChatCompletionRequestMessage[]
): ChatCompletionRequestMessage[] => {
  if (messages.length <= 8) return messages;
  const truncatedCount = messages.length - 7;
  let tail = messages.slice(-7);
  if (tail[0]?.role !== 'user') tail = messages.slice(-6);
  const note: ChatCompletionRequestMessage = {
    role: 'user',
    content: `[Note: ${truncatedCount} earlier message(s) were omitted to stay within the context limit.]`,
  };
  return [note, ...tail];
};

let cachedMCPTools: Record<string, any> | undefined;

const getMCPTools = async (): Promise<Record<string, any>> => {
  if (!cachedMCPTools) {
    cachedMCPTools = await loadMCPToolsInProcess();
  }
  return cachedMCPTools;
};

export const chat = async (
  messages: ChatCompletionRequestMessage[],
  aiConfig: AIConfig,
  options?: ChatOptions
): Promise<ChatResultData> => {
  if (!aiConfig) {
    throw new Error('Failed to initialize AI configuration');
  }

  const [mcpTools] = await Promise.all([getMCPTools()]);

  const allTools: Record<string, any> = {
    ...mcpTools,
    ...(options?.tools ?? {}),
  };
  const hasTools = Object.keys(allTools).length > 0;

  let fullResponse = '';

  const stream = streamText({
    ...aiConfig,
    system: PROMPT,
    messages: truncateMessages(messages),
    ...(hasTools && {
      tools: allTools,
      stopWhen: stepCountIs(5),
    }),
  });

  for await (const chunk of stream.textStream) {
    fullResponse += chunk;
    options?.onMessage?.(chunk);
  }

  const usage = await stream.usage;

  return {
    response: fullResponse || 'Error: No result found',
    tokenUsage: usage
      ? {
          inputTokens:
            (usage as any).inputTokens ?? (usage as any).promptTokens ?? 0,
          outputTokens:
            (usage as any).outputTokens ?? (usage as any).completionTokens ?? 0,
          totalTokens: usage.totalTokens ?? 0,
        }
      : undefined,
    aiModel: aiConfig.model as string | undefined,
  };
};
