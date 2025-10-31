import { readAsset } from 'utils:asset';
import { getMarkdownMetadata } from '@intlayer/core';
import { getBlogs, getDocs, getFrequentQuestions } from '@intlayer/docs';
import { streamText } from 'ai';
import { OpenAI } from 'openai';
import {
  type AIConfig,
  type AIOptions,
  AIProvider,
  type ChatCompletionRequestMessage,
} from '../aiSdk';

const EMBEDDING_MODEL: OpenAI.EmbeddingModel = 'text-embedding-3-large';
const MODEL: AIOptions['model'] = 'chatgpt-4o-latest';
const MODEL_TEMPERATURE: AIOptions['temperature'] = 0.1;
const MAX_RELEVANT_CHUNKS_NB = 20;
const MIN_RELEVANT_CHUNKS_SIMILARITY = 0.42;

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: MODEL,
  temperature: MODEL_TEMPERATURE,
};

type VectorStoreEl = {
  fileKey: string;
  chunkNumber: number;
  content: string;
  embedding?: number[];
  docUrl: string;
  docName: string;
};
type VectorStoreElWithSimilarity = VectorStoreEl & { similarity: number };

const vectorStore: VectorStoreEl[] = [];

/** Read stored embeddings per file from /embeddings/*.json */
const readEmbeddingsForFile = (fileKey: string): Record<string, number[]> => {
  try {
    return JSON.parse(
      readAsset(`./embeddings/${fileKey.replace('.md', '.json')}`, 'utf-8')
    ) as Record<string, number[]>;
  } catch {
    return {};
  }
};

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dot = vecA.reduce((s, a, i) => s + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((s, a) => s + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((s, b) => s + b * b, 0));
  return dot / (magA * magB);
};

const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
    });
    return res.data[0].embedding;
  } catch (err) {
    console.error('Error generating embedding:', err);
    return [];
  }
};

export const loadMarkdownFiles = async (): Promise<void> => {
  const docs = await getDocs();
  const blogs = await getBlogs();
  const faq = await getFrequentQuestions();
  const files = { ...docs, ...blogs, ...faq };

  for await (const fileKey of Object.keys(files)) {
    const metadata = getMarkdownMetadata(files[fileKey]);
    const embeddings = readEmbeddingsForFile(fileKey);

    Object.entries(embeddings).forEach(([chunkKey, emb], idx) => {
      vectorStore.push({
        fileKey,
        chunkNumber: idx + 1,
        embedding: emb,
        content: files[fileKey],
        docUrl: metadata.url,
        docName: metadata.title,
      });
    });
  }
};

// Don’t rebuild embeddings in production build
if (process.env.NODE_ENV !== 'production') {
  loadMarkdownFiles().catch(console.error);
}

/** Semantic chunk search using cosine similarity */
export const searchChunkReference = async (
  query: string,
  maxResults = MAX_RELEVANT_CHUNKS_NB,
  minSimilarity = MIN_RELEVANT_CHUNKS_SIMILARITY
): Promise<VectorStoreElWithSimilarity[]> => {
  const queryEmbedding = await generateEmbedding(query);

  const ranked = vectorStore
    .filter((v) => v.embedding)
    .map((v) => ({
      ...v,
      similarity: cosineSimilarity(queryEmbedding, v.embedding!),
    }))
    .filter((v) => v.similarity > minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxResults);

  return ranked;
};

/** Q&A handler */
export const askDocQuestion = async (
  messages: ChatCompletionRequestMessage[],
  aiConfig: AIConfig
): Promise<{ response: string; relatedFiles: string[] }> => {
  const query = messages
    .filter((m) => m.role === 'user')
    .map((m) => `- ${m.content}`)
    .join('\n');

  const relevant = await searchChunkReference(query);
  const systemPrompt = readAsset('./PROMPT.md').replace(
    '{{relevantFilesReferences}}',
    relevant.length
      ? relevant
          .map(
            (r, i) =>
              `---\nchunkId: ${i}\nname: ${r.docName}\nurl: ${r.docUrl}\n${r.content}`
          )
          .join('\n\n')
      : 'No relevant docs found.'
  );

  let full = '';
  const stream = streamText({
    ...aiConfig,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
  });
  for await (const chunk of stream.textStream) full += chunk;

  return {
    response: full,
    relatedFiles: [...new Set(relevant.map((d) => d.fileKey))],
  };
};
