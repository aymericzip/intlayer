import { getBlogs } from '@intlayer/blog';
import { Locales } from '@intlayer/config';
import { getDocs, getFequentQuestions } from '@intlayer/docs';
import { streamText } from 'ai';
import dotenv from 'dotenv';
import fs, { readFileSync } from 'fs';
import { OpenAI } from 'openai';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIProvider, getAIConfig } from '../aiSdk';
import embeddingsList from './embeddings.json' with { type: 'json' };

type VectorStoreEl = {
  fileKey: string;
  chunkNumber: number;
  content: string;
  embedding: number[];
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

// Constants defining model and settings
const MODEL = 'gpt-4o-2024-11-20'; // Model to use for chat completions
const MODEL_TEMPERATURE = 0.1; // Temperature to use for chat completions
const EMBEDDING_MODEL = 'text-embedding-3-large'; // Model to use for embedding generation
const OVERLAP_TOKENS = 200; // Number of tokens to overlap between chunks
const MAX_CHUNK_TOKENS = 800; // Maximum number of tokens per chunk
const CHAR_BY_TOKEN = 4.15; // Approximate pessimistically the number of characters per token // Can use `tiktoken` or other tokenizers to calculate it more precisely
const MAX_CHARS = MAX_CHUNK_TOKENS * CHAR_BY_TOKEN;
const OVERLAP_CHARS = OVERLAP_TOKENS * CHAR_BY_TOKEN;
const MAX_RELEVANT_CHUNKS_NB = 8; // Maximum number of relevant chunks to attach to chatGPT context
const MIN_RELEVANT_CHUNKS_SIMILARITY = 0.25; // Minimum similarity required for a chunk to be considered relevant

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
    // Set API key through the SDK configuration
    await getAIConfig({
      provider: AIProvider.OPENAI,
      apiKey: process.env.OPENAI_API_KEY,
    });

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
 * Also updates the embeddings.json file if new embeddings are generated.
 */
export const indexMarkdownFiles = async (): Promise<void> => {
  const env = process.env.NODE_ENV;
  dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  });

  // Retrieve documentation and blog posts in English locale
  const frequentQuestions = getFequentQuestions();
  const docs = getDocs(Locales.ENGLISH);
  const blogs = getBlogs(Locales.ENGLISH);

  let result: Record<string, number[]> = {}; // Object to hold updated embeddings

  const files = { ...docs, ...blogs, ...frequentQuestions }; // Combine docs and blogs into a single object

  // Iterate over each file key (identifier) in the combined files
  for (const fileKey of Object.keys(files)) {
    // Split the document into chunks based on headings
    const fileChunks = chunkText(files[fileKey as keyof typeof files]);

    // Iterate over each chunk within the current file
    for (const chunkIndex of Object.keys(fileChunks)) {
      const chunkNumber = Number(chunkIndex) + 1; // Chunk number starts at 1
      const chunksNumber = fileChunks.length;

      const fileChunk = fileChunks[
        chunkIndex as keyof typeof fileChunks
      ] as string;

      const embeddingKeyName = `${fileKey}/chunk_${chunkNumber}`; // Unique key for the chunk

      // Retrieve precomputed embedding if available
      const docEmbedding = embeddingsList[
        embeddingKeyName as keyof typeof embeddingsList
      ] as number[] | undefined;

      let embedding = docEmbedding; // Use existing embedding if available

      if (!embedding) {
        embedding = await generateEmbedding(fileChunk); // Generate embedding if not present
      }

      // Update the result object with the new embedding
      result = { ...result, [embeddingKeyName]: embedding };

      // Store the embedding and content in the in-memory vector store
      vectorStore.push({
        fileKey,
        chunkNumber,
        embedding,
        content: fileChunk,
      });

      console.info(`- Indexed: ${embeddingKeyName}/${chunksNumber}`);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    try {
      // Compare the newly generated embeddings with existing ones
      if (JSON.stringify(result) !== JSON.stringify(embeddingsList)) {
        // If there are new embeddings, save them to embeddings.json
        fs.writeFileSync(
          'src/utils/AI/askDocQuestion/embeddings.json',
          JSON.stringify(result, null, 2)
        );
      }
    } catch (error) {
      console.error(error); // Log any errors during the file write process
    }
  }
};

// Automatically index Markdown files
indexMarkdownFiles();

/**
 * Searches the indexed documents for the most relevant chunks based on a query.
 * Utilizes cosine similarity to find the closest matching embeddings.
 *
 * @param query - The search query provided by the user
 * @returns An array of the top matching document chunks' content
 */
export const searchChunkReference = async (
  query: string
): Promise<VectorStoreEl[]> => {
  // Generate an embedding for the user's query
  const queryEmbedding = await generateEmbedding(query);

  // Calculate similarity scores between the query embedding and each document's embedding
  const results = vectorStore
    .map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding), // Add similarity score to each doc
    }))
    .filter((chunk) => chunk.similarity > MIN_RELEVANT_CHUNKS_SIMILARITY) // Filter out documents with low similarity scores
    .sort((a, b) => b.similarity - a.similarity) // Sort documents by highest similarity first
    .slice(0, MAX_RELEVANT_CHUNKS_NB); // Select the top 6 most similar documents

  // Return the content of the top matching documents
  return results;
};

// Define the structure of messages used in chat completions
export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant'; // The role of the message sender
  content: string; // The text content of the message
  timestamp?: Date; // The timestamp of the message
};

/**
 * Reads the content of a file synchronously.
 *
 * @function
 * @param relativeFilePath - The relative or absolute path to the target file.
 * @returns The entire contents of the specified file as a UTF-8 encoded string.
 */
const getFileContent = (relativeFilePath: string): string => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const absolutePath = join(__dirname, relativeFilePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return fileContent;
};

const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

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
  options?: AskDocQuestionOptions
): Promise<AskDocQuestionResult> => {
  // Format the user's question to keep only the relevant keywords
  const query = messages.map((message) => `- ${message.content}`).join('\n');

  // 1) Find relevant documents based on the user's question
  const relevantFilesReferences = await searchChunkReference(query);

  // 2) Integrate the relevant documents into the initial system prompt
  const systemPrompt = initPrompt.content.replace(
    '{{relevantFilesReferences}}',
    relevantFilesReferences.length === 0
      ? 'Not relevant file found related to the question.'
      : relevantFilesReferences
          .map(
            (doc, idx) =>
              `[Chunk ${idx}] docKey = "${doc.fileKey}":\n${doc.content}`
          )
          .join('\n\n') // Insert relevant docs into the prompt
  );

  // Format messages for AI SDK
  const aiMessages = [
    { role: 'system' as const, content: systemPrompt },
    ...messages,
  ];

  // Get AI configuration
  const aiConfig = await getAIConfig({
    provider: AIProvider.OPENAI,
    model: MODEL,
    temperature: MODEL_TEMPERATURE,
    apiKey: process.env.OPENAI_API_KEY!,
  });

  if (!aiConfig) {
    throw new Error('Failed to initialize AI configuration');
  }

  // 3) Use the AI SDK to stream the response
  let fullResponse = '';
  const stream = streamText({
    model: aiConfig.model,
    temperature: aiConfig.temperature,
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
