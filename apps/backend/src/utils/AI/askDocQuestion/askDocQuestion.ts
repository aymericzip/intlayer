import { readAsset } from 'utils:asset';
import type { AIConfig, ChatCompletionRequestMessage } from '@intlayer/ai';
import { streamText } from '@intlayer/ai';
import { getMarkdownMetadata } from '@intlayer/core';
import { getBlogs, getDocs, getFrequentQuestions } from '@intlayer/docs';
import { OpenAI } from 'openai';

const readEmbeddingsForFile = (fileKey: string): Record<string, number[]> => {
  try {
    return JSON.parse(
      readAsset(`./embeddings/${fileKey.replace('.md', '.json')}`, 'utf-8')
    ) as Record<string, number[]>;
  } catch {
    return {};
  }
};

type VectorStoreEl = {
  fileKey: string;
  chunkNumber: number;
  content: string;
  embedding?: number[];
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
const MAX_RELEVANT_CHUNKS_NB: number = 20; // Maximum number of relevant chunks to attach to chatGPT context
const MIN_RELEVANT_CHUNKS_SIMILARITY: number = 0.42; // Minimum similarity required for a chunk to be considered relevant

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
 * Calculates the cosine similarity between two vectors.
 * Cosine similarity measures the cosine of the angle between two vectors in an inner product space.
 * Used to determine the similarity between chunks of text.
 *
 * @param vecA - The first vector
 * @param vecB - The second vector
 * @returns The cosine similarity score
 */
const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  // Calculate the dot product of the two vectors
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);

  // Calculate the magnitude (Euclidean norm) of each vector
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  // Compute and return the cosine similarity
  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Indexes all Markdown documents by generating embeddings for each chunk and storing them in memory.
 * Persists per-document embeddings under `embeddings/<fileKey>.json`.
 * Handles cases where files have been updated and chunk counts have changed.
 */
export const loadMarkdownFiles = async (): Promise<void> => {
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
    let resultForFile: Record<string, number[] | undefined> = {};
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

      const embedding = docEmbedding; // Use existing embedding if available and valid

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

      console.info(`- Loaded: ${fileKey}/${chunkKeyName}/${chunksNumber}`);
    }
  }
};

// Automatically index Markdown files
loadMarkdownFiles();

/**
 * Searches the indexed documents for the most relevant chunks based on a query.
 * Utilizes cosine similarity to find the closest matching embeddings.
 *
 * @param query - The search query provided by the user
 * @returns An array of the top matching document chunks' content
 */
export const searchChunkReference = async (
  query: string,
  maxResults: number = MAX_RELEVANT_CHUNKS_NB,
  minSimilarity: number = MIN_RELEVANT_CHUNKS_SIMILARITY
): Promise<VectorStoreEl[]> => {
  // Generate an embedding for the user's query
  const queryEmbedding = await generateEmbedding(query);

  // Calculate similarity scores between the query embedding and each document's embedding
  const selection = vectorStore
    .filter((chunk) => chunk.embedding)
    .map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding!), // Add similarity score to each doc
    }))
    .filter((chunk) => chunk.similarity > minSimilarity) // Filter out documents with low similarity scores
    .sort((a, b) => b.similarity - a.similarity) // Sort documents by highest similarity first
    .slice(0, maxResults); // Select the top 6 most similar documents

  const orderedDocKeys = new Set(selection.map((chunk) => chunk.fileKey));

  const orderedVectorStore = vectorStore.sort((a, _b) =>
    orderedDocKeys.has(a.fileKey) ? -1 : 1
  );

  const results = orderedVectorStore.filter((chunk) =>
    selection.some(
      (v) => v.fileKey === chunk.fileKey && v.chunkNumber === chunk.chunkNumber
    )
  );

  // Return the content of the top matching documents
  return results;
};

const CHAT_GPT_PROMPT = readAsset('./PROMPT.md');

// Initial prompt configuration for the chatbot
export const initPrompt: ChatCompletionRequestMessage = {
  role: 'system',
  content: CHAT_GPT_PROMPT,
};

export type AskDocQuestionResult = {
  response: string;
  relatedFiles: string[];
};

export type AskDocQuestionOptions = {
  onMessage?: (chunk: string) => void;
};

/**
 * Handles the "Ask a question" endpoint in an Express.js route.
 * Processes user messages, retrieves relevant documents, and interacts with AI models to generate responses.
 *
 * @param messages - An array of chat messages from the user and assistant
 * @returns The assistant's response as a string
 */
export const askDocQuestion = async (
  messages: ChatCompletionRequestMessage[],
  aiConfig: AIConfig,
  options?: AskDocQuestionOptions
): Promise<AskDocQuestionResult> => {
  // Format the user's question to keep only the relevant keywords
  const query = messages
    .filter((message) => message.role === 'user')
    .map((message) => `- ${message.content}`)
    .join('\n');

  // 1) Find relevant documents based on the user's question
  const relevantFilesReferences = await searchChunkReference(query);

  // 2) Integrate the relevant documents into the initial system prompt
  const systemPrompt = initPrompt.content.replace(
    '{{relevantFilesReferences}}',
    relevantFilesReferences.length === 0
      ? 'Not relevant file found related to the question.'
      : relevantFilesReferences
          .map((doc, idx) =>
            [
              '-----',
              '---',
              `chunkId: ${idx}`,
              `docChunk: "${doc.chunkNumber}/${doc.fileKey.length}"`,
              `docName: "${doc.docName}"`,
              `docUrl: "${doc.docUrl}"`,
              `---`,
              doc.content,
              `-----`,
            ].join('\n')
          )
          .join('\n\n') // Insert relevant docs into the prompt
  );

  // Format messages for AI SDK
  const aiMessages = [
    {
      role: 'system' as const,
      content: systemPrompt,
    },
    ...messages.slice(-8),
  ];

  if (!aiConfig) {
    throw new Error('Failed to initialize AI configuration');
  }

  // 3) Use the AI SDK to stream the response
  let fullResponse = '';
  const stream = streamText({
    ...aiConfig,
    messages: aiMessages,
  });

  // Process the stream
  for await (const chunk of stream.textStream) {
    fullResponse += chunk;
    options?.onMessage?.(chunk);
  }

  // 4) Extract unique related files
  const relatedFiles = [
    ...new Set(relevantFilesReferences.map((doc) => doc.fileKey)),
  ];

  // 5) Return the assistant's response to the user
  return {
    response: fullResponse ?? 'Error: No result found',
    relatedFiles,
  };
};
