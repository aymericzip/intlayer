import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMarkdownMetadata } from '@intlayer/core';
import { getBlogs, getDocs, getFrequentQuestions } from '@intlayer/docs';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { type AIOptions, AIProvider } from '../aiSdk';

const OUTPUT_EMBEDDINGS_DIR = 'src/utils/AI/askDocQuestion/embeddings';
const __dirname = dirname(fileURLToPath(import.meta.url));

const readEmbeddingsForFile = (fileKey: string): Record<string, number[]> => {
  try {
    return JSON.parse(
      readFileSync(
        `${__dirname}/embeddings/${fileKey.replace('.md', '.json')}`,
        'utf-8'
      )
    ) as Record<string, number[]>;
  } catch {
    return {};
  }
};

const writeEmbeddingsForFile = (
  fileKey: string,
  data: Record<string, number[]>
): void => {
  const filePath = join(
    OUTPUT_EMBEDDINGS_DIR,
    `${fileKey.replace('.md', '.json')}`
  );
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, JSON.stringify(data));
};

type VectorStoreEl = {
  fileKey: string;
  chunkNumber: number;
  content: string;
  embedding: number[];
  docUrl: string;
  docName: string;
};

/**
 * Simple in-memory vector store to hold document embeddings and their content.
 * Each entry contains:
 * - fileKey: A unique key identifying the file
 * - chunkNumber: The number of the chunk within the document
 * - content: The chunk content
 * - embedding: The numerical embedding vector for the chunk
 */
const vectorStore: VectorStoreEl[] = [];

/*
 * Ask question AI configuration
 */
const MODEL: AIOptions['model'] = 'chatgpt-4o-latest'; // Model to use for chat completions
const MODEL_TEMPERATURE: AIOptions['temperature'] = 0.1; // Temperature to use for chat completions

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: MODEL,
  temperature: MODEL_TEMPERATURE,
};

/*
 * Embedding model configuration
 */
const EMBEDDING_MODEL: OpenAI.EmbeddingModel = 'text-embedding-3-large'; // Model to use for embedding generation
const OVERLAP_TOKENS: number = 200; // Number of tokens to overlap between chunks
const MAX_CHUNK_TOKENS: number = 800; // Maximum number of tokens per chunk
const CHAR_BY_TOKEN: number = 4.15; // Approximate pessimistically the number of characters per token // Can use `tiktoken` or other tokenizers to calculate it more precisely
const MAX_CHARS: number = MAX_CHUNK_TOKENS * CHAR_BY_TOKEN;
const OVERLAP_CHARS: number = OVERLAP_TOKENS * CHAR_BY_TOKEN;

const skipDocEmbeddingsIndex = process.env.SKIP_DOC_EMBEDDINGS_INDEX === 'true';

/**
 * Splits a given text into chunks ensuring each chunk does not exceed MAX_CHARS.
 * @param text - The input text to split.
 * @returns - Array of text chunks.
 */
const chunkText = (text: string): string[] => {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + MAX_CHARS, text.length);

    // Ensure we don't cut words in the middle (find nearest space)
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(' ', end);
      if (lastSpace > start) {
        end = lastSpace;
      }
    }

    chunks.push(text.substring(start, end));

    // Move start forward correctly
    const nextStart = end - OVERLAP_CHARS;
    if (nextStart <= start) {
      // Prevent infinite loop if overlap is too large
      start = end;
    } else {
      start = nextStart;
    }
  }

  return chunks;
};

/**
 * Generates an embedding for a given text using OpenAI's embedding API.
 * Trims the text if it exceeds the maximum allowed characters.
 *
 * @param text - The input text to generate an embedding for
 * @returns The embedding vector as a number array
 */
const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openaiClient.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return [];
  }
};

/**
 * Indexes all Markdown documents by generating embeddings for each chunk and storing them in memory.
 * Persists per-document embeddings under `embeddings/<fileKey>.json`.
 * Handles cases where files have been updated and chunk counts have changed.
 */
export const indexMarkdownFiles = async (): Promise<void> => {
  const env = process.env.NODE_ENV;
  dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  });

  // Retrieve documentation and blog posts in English locale
  const frequentQuestions = await getFrequentQuestions();
  const docs = await getDocs();
  const blogs = await getBlogs();

  const files = { ...docs, ...blogs, ...frequentQuestions }; // Combine docs and blogs into a single object

  // Iterate over each file key (identifier) in the combined files
  for await (const fileKey of Object.keys(files)) {
    // Get the metadata of the file
    const fileMetadata = getMarkdownMetadata(
      files[fileKey as keyof typeof files] as string
    );

    // Split the document into chunks based on headings
    const fileChunks = chunkText(
      files[fileKey as keyof typeof files] as string
    );

    // Read existing embeddings for this file
    const existingEmbeddings = readEmbeddingsForFile(fileKey);

    // Check if the number of chunks has changed for this file
    const existingChunksForFile = Object.keys(existingEmbeddings);
    const currentChunkCount = fileChunks.length;
    const previousChunkCount = existingChunksForFile.length;

    let shouldRegenerateFileEmbeddings = false;

    // If chunk count differs, we need to regenerate embeddings for this file
    if (currentChunkCount !== previousChunkCount) {
      console.info(
        `File "${fileKey}" chunk count changed: ${previousChunkCount} -> ${currentChunkCount}. Regenerating embeddings.`
      );

      shouldRegenerateFileEmbeddings = !skipDocEmbeddingsIndex;
    }

    // Iterate over each chunk within the current file
    let resultForFile: Record<string, number[]> = {};
    for await (const chunkIndex of Object.keys(fileChunks)) {
      const chunkNumber = Number(chunkIndex) + 1; // Chunk number starts at 1
      const chunksNumber = fileChunks.length;

      const fileChunk = fileChunks[
        chunkIndex as keyof typeof fileChunks
      ] as string;

      const chunkKeyName = `chunk_${chunkNumber}`; // Unique key for the chunk within the file

      // Retrieve precomputed embedding if available and file hasn't changed
      const docEmbedding = !shouldRegenerateFileEmbeddings
        ? (existingEmbeddings[
            chunkKeyName as keyof typeof existingEmbeddings
          ] as number[] | undefined)
        : undefined;

      let embedding = docEmbedding; // Use existing embedding if available and valid

      if (!embedding) {
        embedding = await generateEmbedding(fileChunk); // Generate embedding if not present or file changed
        console.info(`- Generated new embedding: ${fileKey}/${chunkKeyName}`);
      }

      // Update the file-scoped result object with the embedding
      resultForFile = { ...resultForFile, [chunkKeyName]: embedding };

      // Store the embedding and content in the in-memory vector store
      vectorStore.push({
        fileKey,
        chunkNumber,
        embedding,
        content: fileChunk,
        docUrl: fileMetadata.url,
        docName: fileMetadata.title,
      });

      console.info(`- Indexed: ${fileKey}/${chunkKeyName}/${chunksNumber}`);
    }

    // Persist per-file embeddings if changed
    try {
      if (
        JSON.stringify(resultForFile) !== JSON.stringify(existingEmbeddings)
      ) {
        writeEmbeddingsForFile(fileKey, resultForFile);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
