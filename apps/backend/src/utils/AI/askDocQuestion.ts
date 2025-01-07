import fs from 'fs';
import { getBlogs } from '@intlayer/blog';
import { getDocs } from '@intlayer/docs';
import { Locales } from 'intlayer';
import { OpenAI } from 'openai';
import embeddingsList from './embeddings.json';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Simple in-memory vector store to hold document embeddings and their content.
 * Each entry contains:
 * - docKey: A unique key identifying the document section
 * - embedding: The numerical embedding vector for the section
 * - content: The actual text content of the section
 */
const vectorStore: {
  fileKey: string;
  chunkNumber: number;
  embedding: number[];
  content: string;
}[] = [];

// Constants defining OpenAI's token and character limits
const MODEL: OpenAI.Chat.ChatModel = 'gpt-4o-2024-11-20'; // Model to use for chat completions
const EMBEDDING_MODEL: OpenAI.Embeddings.EmbeddingModel =
  'text-embedding-ada-002'; // Model to use for embedding generation
const OVERLAP_TOKENS = 200; // Number of tokens to overlap between chunks
const MAX_CHUNK_TOKENS = 800; // Maximum number of tokens per chunk
const CHAR_BY_TOKEN = 4.15; // Approximate pessimistic number of characters per token // Can use `tiktoken` or other tokenizers to calculate it more precisely
const MAX_CHARS = MAX_CHUNK_TOKENS * CHAR_BY_TOKEN;
const OVERLAP_CHARS = OVERLAP_TOKENS * CHAR_BY_TOKEN;
const MAX_RELEVANT_SECTION_NB = 15; // Maximum number of relevant sections to display
const MIN_SIMILARITY = 0.77; // Minimum similarity required for a section to be considered relevant

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
const generateEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL, // Specify the embedding model
    input: text, // Ensure text fits within token limits
  });

  return response.data[0].embedding; // Return the generated embedding
};

/**
 * Calculates the cosine similarity between two vectors.
 * Cosine similarity measures the cosine of the angle between two vectors in an inner product space.
 * Used to determine the similarity between sections of text.
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
 * Indexes all Markdown documents by generating embeddings for each section and storing them in memory.
 * Also updates the embeddings.json file if new embeddings are generated.
 */
export const indexMarkdownFiles = async () => {
  // Retrieve documentation and blog posts in English locale
  const docs = getDocs(Locales.ENGLISH);
  const blogs = getBlogs(Locales.ENGLISH);

  let result: Record<string, number[]> = {}; // Object to hold updated embeddings

  const files = { ...docs, ...blogs }; // Combine docs and blogs into a single object

  // Iterate over each file key (identifier) in the combined files
  for (const fileKey of Object.keys(files)) {
    // Split the document into sections based on headings
    const fileChunks = chunkText(files[fileKey as keyof typeof files]);

    console.info(`📄 Indexing: ${fileKey}`); // Log the file being indexed

    // Iterate over each section within the current file
    for (const chunkIndex of Object.keys(fileChunks)) {
      const chunkNumber = Number(chunkIndex) + 1; // Chunk number starts at 1
      const chunksNumber = fileChunks.length;

      const fileSection = fileChunks[
        chunkIndex as keyof typeof fileChunks
      ] as string;

      const embeddingKeyName = `${fileKey}/chunk_${chunkNumber}`; // Unique key for the section

      // Retrieve precomputed embedding if available
      const docEmbedding = embeddingsList[
        embeddingKeyName as keyof typeof embeddingsList
      ] as number[] | undefined;

      let embedding = docEmbedding; // Use existing embedding if available

      if (!embedding) {
        embedding = await generateEmbedding(fileSection); // Generate embedding if not present
      }

      // Update the result object with the new embedding
      result = { ...result, [embeddingKeyName]: embedding };

      // Store the embedding and content in the in-memory vector store
      vectorStore.push({
        fileKey,
        chunkNumber,
        embedding,
        content: fileSection,
      });

      console.info(`- Indexed: chunk ${fileKey}/${chunksNumber}`);
    }
  }

  try {
    // Compare the newly generated embeddings with existing ones
    if (JSON.stringify(result) !== JSON.stringify(embeddingsList)) {
      // If there are new embeddings, save them to embeddings.json
      fs.writeFileSync(
        'src/utils/AI/embeddings.json',
        JSON.stringify(result, null, 2)
      );
    }
  } catch (error) {
    console.error(error); // Log any errors during the file write process
  }
};

// Automatically index Markdown files when in development mode
if (process.env.NODE_ENV === 'development') {
  indexMarkdownFiles();
}

/**
 * Searches the indexed documents for the most relevant sections based on a query.
 * Utilizes cosine similarity to find the closest matching embeddings.
 *
 * @param query - The search query provided by the user
 * @returns An array of the top matching document sections' content
 */
export const searchFileReference = async (query: string) => {
  // Generate an embedding for the user's query
  const queryEmbedding = await generateEmbedding(query);

  // Calculate similarity scores between the query embedding and each document's embedding
  const results = vectorStore
    .map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding), // Add similarity score to each doc
    }))

    .filter((doc) => doc.similarity > MIN_SIMILARITY) // Filter out documents with low similarity scores
    .sort((a, b) => b.similarity - a.similarity) // Sort documents by highest similarity first
    .slice(0, MAX_RELEVANT_SECTION_NB); // Select the top 6 most similar documents

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
      You are an expert in internationalization solution for Javascript Application. You\'re an helpful chatbot for Intlayer, an Internationalization solution (Website: \'https://intlayer.org\'). \
      The user is an potential user of Intlayer. Your task is now to answer the questions of the user. \
      You must talk as an member of Intlayer. You must only answer the questions relative to Intlayer. \
      Any question should be related to Intlayer. If a question is not related to Intlayer, you should NOT answer it. \
      You must NOT answer question who is generally secret for a company (E.g. financial information). \
      Your should not invent information that are not precised. If your have a doubt about something, you should ask more question to the user. If you don\'t have enough information, you should say that you don\'t know. \
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
  const userMessages = messages.filter((message) => message.role === 'user');

  const query = userMessages
    .map((message) => `- ${message.content}`)
    .join('\n');

  // 1) Find relevant documents based on the user's question
  const relevantFilesReferences = await searchFileReference(query);

  // 2) Integrate the relevant documents into the initial system prompt
  const messagesList: ChatCompletionRequestMessage[] = [
    {
      ...initPrompt,
      content: initPrompt.content.replace(
        '{{relevantFilesReferences}}',
        relevantFilesReferences
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
    messages: messagesList,
  });

  const result = response.choices[0].message.content; // Extract the assistant's reply

  // 5) Extract unique related files
  const relatedFiles = [
    ...new Set(relevantFilesReferences.map((doc) => doc.fileKey)),
  ];

  // 4) Return the assistant's response to the user
  return {
    response: result ?? 'Error: No result found',
    relatedFiles,
  };
};
