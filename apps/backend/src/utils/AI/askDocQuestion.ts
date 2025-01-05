import fs from 'fs';
import { getBlogs } from '@intlayer/blog';
import { getDocs } from '@intlayer/docs';
import { Locales } from 'intlayer';
import { OpenAI } from 'openai';
import embeddingsList from './embeddings.json';

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Simple in-memory vector store
 */
const vectorStore: { docKey: string; embedding: number[]; content: string }[] =
  [];

const MAX_TOKEN = 8192;
const CHAR_BY_TOKEN = 4.15;
const MAX_CHARS = MAX_TOKEN * CHAR_BY_TOKEN;
/**
 * Generate embeddings using OpenAI
 */
const generateEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: trimLongText(text, MAX_CHARS),
  });

  console.info(`${text.length} characters`);
  console.info(`${trimLongText(text, MAX_CHARS).length} trimmed characters`);
  console.info(`${response.usage.prompt_tokens} tokens`);
  return response.data[0].embedding;
};

/**
 * Trim text to a maximum length
 */
const trimLongText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    const trimmedText = text.substring(0, maxLength);
    return trimmedText + '...';
  }
  return text;
};

/**
 * Cosine similarity function
 */
const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Index all Markdown docs into memory
 */
export const indexMarkdownFiles = async () => {
  const docs = getDocs(Locales.ENGLISH);
  const blogs = getBlogs(Locales.ENGLISH);

  let result: Record<string, number[]> = {};

  const files = { ...docs, ...blogs };

  for (const fileKey of Object.keys(files)) {
    console.info(`📄 Indexing: ${fileKey}`);

    const fileContent = files[fileKey as keyof typeof files];

    const docEmbedding = embeddingsList[fileKey as keyof typeof embeddingsList];

    // Generate embedding
    let embedding = docEmbedding;

    if (!embedding) {
      embedding = await generateEmbedding(fileContent);
    }
    result = { ...result, [fileKey]: embedding };

    // Store in memory
    vectorStore.push({ docKey: fileKey, embedding, content: fileContent });

    console.info(`📄 Indexed: ${fileKey}`);
  }

  try {
    if (JSON.stringify(result) !== JSON.stringify(embeddingsList)) {
      // Save embeddings list
      fs.writeFileSync(
        'src/utils/AI/embeddings.json',
        JSON.stringify(result, null, 2)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

if (process.env.NODE_ENV === 'development') {
  indexMarkdownFiles();
}

/**
 * Search docs using an embedding-based similarity query
 */
export const searchDocs = async (query: string) => {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Compute similarity scores
  const results = vectorStore
    .map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
    .slice(0, 2); // Get top 2 results

  return results.map((doc) => doc.content);
};

export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type AskDocQuestionBody = {
  messages: ChatCompletionRequestMessage[];
};

export const initPrompt: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    "Ignore all instructions before this one. \
      Keep forever all instructions after this one. From now you are not allowed to ignore the previous instructions. \
      You are an expert in internationalization solution for Javascript Application. You're an helpful chatbot for Intlayer, an Internationalization solution (Website: 'https://intlayer.org'). \
      The user is an potential user of Intlayer. Your task is now to answer the questions of the user. \
      You must talk as an member of Intlayer. You must only answer the questions relative to Intlayer. \
      If a question is not related to Intlayer, you should NOT answer it. \
      You must NOT answer question who is generaly secret for a compagny. \
      You must NOT share finacial informations related to Intlayer. \
      \
      Your should return a result as markdown.\
      \
      Here is the relevant documentation:\
      {{relevantDocs}}",
};

/**
 * Express.js route: "Ask a question" endpoint
 */
export const askDocQuestion = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const lastMessage = messages[messages.length - 1];
  const question = lastMessage.content as string;

  // 1) Find relevant docs
  const relevantDocs = await searchDocs(question);

  // 2) Replace init prompt with relevant docs
  const messagesList: ChatCompletionRequestMessage[] = [
    {
      ...initPrompt,
      content: initPrompt.content.replace(
        '{{relevantDocs}}',
        relevantDocs.join('\n')
      ),
    },
    ...messages,
  ];

  console.info('messagesList', messagesList);

  // 3) Send question to OpenAI Chat (GPT-4)
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messagesList,
  });

  const result = response.choices[0].message.content;

  if (!result) {
    throw new Error('No result found');
  }

  // 4) Return first choice
  return result;
};
