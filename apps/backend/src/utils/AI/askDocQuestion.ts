import { getDocs } from '@intlayer/docs';
import { Locales } from 'intlayer';
import { OpenAI } from 'openai';

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Simple in-memory vector store
 */
const vectorStore: { id: string; embedding: number[]; content: string }[] = [];

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

  for (const docKey of Object.keys(docs)) {
    console.info(`📄 Indexing: ${docKey}`);
    const docContent = docs[docKey as keyof typeof docs];

    // Generate embedding
    const embedding = await generateEmbedding(docContent);

    // Store in memory
    vectorStore.push({ id: docKey, embedding, content: docContent });

    console.info(`📄 Indexed: ${docKey}`);
  }
};

/**
 * Search docs using an embedding-based similarity query
 */
export const searchDocs = async (query: string) => {
  if (vectorStore.length === 0) {
    throw new Error('No documents indexed.');
  }

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

/**
 * Express.js route: "Ask a question" endpoint
 */
export const askDocQuestion = async (query: string) => {
  // 1) Find relevant docs
  const relevantDocs = await searchDocs(query);

  // 2) Build a prompt
  const prompt = `
      You are an expert assistant. Here is the relevant documentation:
      ${relevantDocs.join('\n')}

      Answer this question precisely:
      "${query}"
    `;

  // 3) Send question to OpenAI Chat (GPT-4)
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  // 4) Return first choice
  return response.choices[0].message.content;
};
