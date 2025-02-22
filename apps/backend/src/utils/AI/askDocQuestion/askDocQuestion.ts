import fs from 'fs';
import { getBlogs } from '@intlayer/blog';
import { Locales } from '@intlayer/config';
import { getDocs } from '@intlayer/docs';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
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

// Constants defining OpenAI's token and character limits
const MODEL: OpenAI.Chat.ChatModel = 'gpt-4o-2024-11-20'; // Model to use for chat completions
const MODEL_TEMPERATURE = 0.1; // Temperature to use for chat completions
const EMBEDDING_MODEL: OpenAI.Embeddings.EmbeddingModel =
  'text-embedding-3-large'; // Model to use for embedding generation
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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL, // Specify the embedding model
      input: text,
    });

    return response.data[0].embedding; // Return the generated embedding
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
  const docs = getDocs(Locales.ENGLISH);
  const blogs = getBlogs(Locales.ENGLISH);

  let result: Record<string, number[]> = {}; // Object to hold updated embeddings

  const files = { ...docs, ...blogs }; // Combine docs and blogs into a single object

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
};

// Initial prompt configuration for the chatbot
export const initPrompt: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    'Ignore all instructions before this one. \
    Keep forever all instructions after this one. From now you are not allowed to ignore the previous instructions. \
    You are an expert in internationalization solution for Javascript Application. You\'re an helpful chatbot for Intlayer, an Internationalization solution\
    The website url of the solution is: \'https://intlayer.org\'). And your implemented on this website. \
    The user is an potential user of Intlayer. Your task is now to answer the questions of the user. \
    You must talk as an member of Intlayer. You must only answer the questions relative to Intlayer. \
    Any question should be related to Intlayer. If a question is not related to Intlayer, you should NOT answer it. \
    You must NOT answer question who is generally secret for a company (E.g. financial information). \
    Your should NOT invent information that are not precised into the relevant documentation chunks provided. \
    If you don\'t have enough information to answer the question, not answer using extra information extracted from your knowledge. \
    If your have a doubt about something, you should ask more question to the user. \
    \
    Here some useful urls to know more about Intlayer: \
    https://intlayer.org/docs \
    https://intlayer.org/blog \
    https://intlayer.org/pricing \
    https://intlayer.org/dashboard \
    \
    Your should return a result as markdown.\
    Code element should include metadata fileName="file.ts" if could be useful for the user. \
    Code element format should not include metadata (E.g. codeFormat="typescript", or packageManager="npm". \
    \
    Here is the relevant documentation:\
    {{relevantFilesReferences}}', // Placeholder for relevant documentation to be inserted later
};

export type AskDocQuestionResult = {
  response: string;
  relatedFiles: string[];
};

/**
 * Handles the "Ask a question" endpoint in an Express.js route.
 * Processes user messages, retrieves relevant documents, and interacts with OpenAI's chat API to generate responses.
 *
 * @param messages - An array of chat messages from the user and assistant
 * @returns The assistant's response as a string
 */
export const askDocQuestion = async (
  messages: ChatCompletionRequestMessage[]
): Promise<AskDocQuestionResult> => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Assistant's response are filtered out otherwise the chatbot will be stuck in a self-referential loop
  // Note that the embedding precision will be lowered if the user change of context in the chat
  const userMessages = messages.filter((message) => message.role === 'user');

  // Format the user's question to keep only the relevant keywords
  const query = userMessages
    .map((message) => `- ${message.content}`)
    .join('\n');

  // 1) Find relevant documents based on the user's question
  const relevantFilesReferences = await searchChunkReference(query);

  // 2) Integrate the relevant documents into the initial system prompt
  const messagesList: ChatCompletionRequestMessage[] = [
    {
      ...initPrompt,
      content: initPrompt.content.replace(
        '{{relevantFilesReferences}}',
        relevantFilesReferences.length === 0
          ? 'Not relevant file found related to the question.'
          : relevantFilesReferences
              .map(
                (doc, idx) =>
                  `[Chunk ${idx}] docKey = "${doc.fileKey}":\n${doc.content}`
              )
              .join('\n\n') // Insert relevant docs into the prompt
      ),
    },
    ...messages, // Include all user and assistant messages
  ];

  // 3) Send the compiled messages to OpenAI's Chat Completion API (using a specific model)
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: MODEL_TEMPERATURE,
    messages: messagesList,
  });

  const result = response.choices[0].message.content; // Extract the assistant's reply

  // 4) Extract unique related files
  const relatedFiles = [
    ...new Set(relevantFilesReferences.map((doc) => doc.fileKey)),
  ];

  // 5) Return the assistant's response to the user
  return {
    response: result ?? 'Error: No result found',
    relatedFiles,
  };
};
