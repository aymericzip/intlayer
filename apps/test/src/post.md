**Title**: Building a Smart Documentation, based on OpenAI Embeddings (Chunking, Indexing, and Searching)

---

Hey everyone! I wanted to share my approach to creating a “smart documentation” chatbot for a project I'm worked on. **I’m not an AI expert, so any suggestions or improvements are more than welcome!**

The purpose of this post is not to create another tutorial on building a chatbot based on OpenAI. There's already plenty of content on that topic.
Instead, the main idea is to **index documentation**, by splitting them into manageable **chunks**, generating **embeddings** with OpenAI, and **performing a similarity search** to find and return the most relevant information to a user's query.

In my case, the documentation will be Markdown files, but it can be any form of text, database object, etc.

Below, I’ll outline the three major parts of my solution:

1. Reading documentation files
2. Indexing the documentation (chunking, overlap, and embedding)
3. Searching the documentation (and hooking it up to a chatbot)

---

## 1. Reading Documentation Files

Instead of hardcoding your documentation text, you can scan a folder for `.md` (or `.mdx`) files. Tools like `glob` or Node.js `fs.readdirSync` and `fs.readFileSync` are handy. In my original code, I’m reading from “doc” folders—some from a “docs” set, some from “blog” posts—to unify them as potential search sources.

```ts
// Example snippet of fetching files from a folder:
import fs from "fs";
import path from "path";
import glob from "glob";

const DOC_FOLDER_PATH = "./docs";

function readAllMarkdownFiles(): Record<string, string> {
  const filesContent: Record<string, string> = {};
  const filePaths = glob.sync(`${DOC_FOLDER_PATH}/**/*.md`);

  filePaths.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    filesContent[path.basename(filePath, ".md")] = content;
  });

  return filesContent;
}
```

> As an alternative, you can fetch your documentation from your database or CMS etc.

---

## 2. Indexing the Documentation

### 2.1 Chunk Each File & Overlap

Large blocks of text can exceed model context limits or cause less relevant hits, so I split them into chunks. However, to preserve some continuity between chunks, we overlap them by a certain number of tokens (or characters). That way, chunk boundaries are less likely to cut off relevant context mid-sentence.

Why it’s efficient:

- **Smaller chunks** make the search more targeted, avoiding large embeddings.
- **Overlap** ensures continuity, so if a key piece of info is at the end of one chunk, it also appears at the beginning of the next chunk.

```ts
const CHARS_PER_TOKEN = 4.15; // Approximate pessimistically number of characters per token. Can use `tiktoken` or other tokenizers to calculate it more precisely

const MAX_TOKENS = 500; // Maximum number of tokens per chunk
const OVERLAP_TOKENS = 100; // Number of tokens to overlap between chunks

const maxChar = MAX_TOKENS * CHARS_PER_TOKEN;
const overlapChar = OVERLAP_TOKENS * CHARS_PER_TOKEN;

function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + maxChar, text.length);

    // Don’t cut a word in half if possible:
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start) end = lastSpace;
    }

    chunks.push(text.substring(start, end));
    // Overlap management
    const nextStart = end - overlapChar;
    start = nextStart <= start ? end : nextStart;
  }

  return chunks;
}
```

<!-- TODO: Show an example of chunking. -->

> To learn more about chunking, and the impact of the size on the embedding, you can check out [this article](https://www.restack.io/p/embeddings-answer-openai-embeddings-chunk-size-cat-ai).

### 2.2 Embedding Generation

<!-- TODO: Explain what is an embedding.  -->
<!-- TODO: Show an example of an embedding. -->

Once a file is chunked, we generate embeddings for each chunk using OpenAI’s API (e.g., `text-embedding-3-large`).

```ts
import { OpenAI } from "openai";

const EMBEDDING_MODEL: OpenAI.Embeddings.EmbeddingModel =
  "text-embedding-3-large"; // Model to use for embedding generation

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateEmbedding = async (textChunk: string) => {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: textChunk,
  });

  return response.data[0].embedding; // Return the generated embedding
};
```

### 2.4 Saving Embeddings

To avoid regenerating embeddings every time, We will store the embeddings.

It can be store in a database. But in this case, I will simply store it in a JSON file locally.

```ts
import embeddingsList from "./embeddings.json";
```

### 2.3 Generating Embeddings for the whole file

---

## 3. Searching the Documentation

### 3.1 Vector Similarity

To answer a user’s question, we first generate an embedding for the **query** and then compute the cosine similarity between the query embedding and each chunk’s embedding. We filter out anything below a certain similarity threshold (`MIN_SIMILARITY`) and keep only the top X matches.

```ts
const queryEmbedding = await generateEmbedding(userQuery);

const MAX_RELEVANT_CHUNKS_NB = 15; // Maximum number of relevant chunks to attach to chatGPT context
const MIN_RELEVANT_CHUNKS_SIMILARITY = 0.77; // Minimum similarity required for a chunk to be considered relevant

const results = vectorStore
  .map((doc) => ({
    ...doc,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }))
  .filter((doc) => doc.similarity > MIN_RELEVANT_CHUNKS_SIMILARITY)
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, 15); // top 15
```

### 3.2 Prompting OpenAI with Relevant Chunks

After sorting, we feed the **top** chunks into the system prompt of the ChatGPT request. This means ChatGPT sees the most relevant sections of your docs as if you had typed them into the conversation. Then we let ChatGPT form an answer for the user.

---

## 4. Implement OpenAI API for Chatbot Using Express

I have a small Express.js endpoint that:

1. Receives a user’s messages.
2. Converts them into a single **query** string.
3. Finds the relevant file references via the steps above.
4. Passes everything to the OpenAI API with a system prompt.
5. Returns ChatGPT’s reply.

(I’m not detailing it here because it’s fairly straightforward: just an Express route that calls the logic we’ve described.)

---

## 5. UI: Making a Chatbot Interface

On the frontend, I built a small React component with a chat-like interface. It sends messages to my Express backend and displays the replies. Nothing too fancy, so I’ll skip the details.

---

## Live Demo

If you want a quick peek or my chatbot, check out:  
[**Live demo**](https://intlayer.org/doc/chat)

## My Code

- **Backend**: [askDocQuestion.ts](https://github.com/aymericzip/intlayer/blob/main/apps/backend/src/utils/AI/askDocQuestion.ts)
- **Frontend**: [ChatBot components](https://github.com/aymericzip/intlayer/tree/main/apps/website/src/components/ChatBot)

I also stumbled upon [OpenAI’s Assistants File Search documentation](https://platform.openai.com/docs/assistants/tools/file-search), which might be interesting if you want an alternative approach.

---

## Conclusion

I hope this gives you an idea of how to handle documentation indexing for a chatbot:

- Using chunking + overlap so that the right context is found,
- Generating embeddings and storing them for quick vector similarity searches,
- Finally handing it off to ChatGPT with the relevant context.

I’m not an AI expert—this is just a solution that I found works well for my needs. If you have any tips on improving efficiency or a more polished approach, **please let me know**. I’d love to hear feedback on vector storage solutions, chunking strategies, or any other performance tips.

**Thanks for reading and feel free to share your thoughts!**
