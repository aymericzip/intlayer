---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Building a RAG-Powered Documentation Assistant (Chunking, Embeddings, and Search)
description: Building a RAG-Powered Documentation Assistant (Chunking, Embeddings, and Search)
keywords:
  - RAG
  - Documentation
  - Assistant
  - Chunking
  - Embeddings
  - Search
slugs:
  - blog
  - rag-powered-documentation-assistant
author: aymericzip
---

# Building a RAG-Powered Documentation Assistant (Chunking, Embeddings, and Search)

## What you get

I built a RAG-powered documentation assistant and packaged it into a boilerplate you can use immediately.

- Comes with a ready-to-use application (Next.js + OpenAI API)
- Includes a working RAG pipeline (chunking, embeddings, cosine similarity)
- Provides a complete chatbot UI built in React
- All UI components are fully editable with Tailwind CSS
- Logs every user query to help identify missing docs, user pain points, and product opportunities

👉 [Live demo](https://intlayer.org/doc/why) 👉 [Code boilerplate](https://github.com/aymericzip/smart_doc_RAG)

## Introduction

If you’ve ever been lost in documentation, scrolling endlessly for one answer, you know how painful it can be. Docs are useful, but they’re static and searching them often feels clunky.

That’s where **RAG (Retrieval-Augmented Generation)** comes in. Instead of forcing users to dig through text, we can combine **retrieval** (finding the right parts of the doc) with **generation** (letting an LLM explain it naturally).

In this post, I’ll walk you through how I built a RAG-powered documentation chatbot and how it doesn’t just help users find answers faster, but also gives product teams a new way to understand user pain points.

## Why Use RAG for Documentation?

RAG has become a popular approach for a reason: it’s one of the most practical ways to make large language models actually useful.

For documentation, the benefits are clear:

- Instant answers: users ask in natural language, and get relevant replies.
- Better context: the model only sees the most relevant doc sections, reducing hallucinations.
- Search that feels human: more like Algolia + FAQ + chatbot, rolled into one.
- Feedback loop: by storing queries, you uncover what users really struggle with.

That last point is crucial. A RAG system doesn’t just answer questions, it tells you what people are asking. That means:

- You discover missing info in your docs.
- You see feature requests emerging.
- You spot patterns that can even guide product strategy.

So, RAG isn’t just a support tool. It’s also a **product discovery engine**.

## How the RAG Pipeline Works

![RAG Pipeline](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

At a high level, here’s the recipe I used:

1.  **Chunking the documentation** Large Markdown files are split into chunks. Chunking allows to provide as context only the relevant parts of the documentation.
2.  **Generating embeddings** Each chunk is turned into a vector using OpenAI’s embedding API (text-embedding-3-large) or a vector database (Chroma, Qdrant, Pinecone).
3.  **Indexing & storing** Embeddings are stored in a simple JSON file (for my demo), but in production, you’d likely use a vector DB.
4.  **Retrieval (R in RAG)** A user query is embedded, cosine similarity is computed, and the top-matching chunks are retrieved.
5.  **Augmentation + Generation (AG in RAG)** Those chunks are injected into the prompt for ChatGPT, so the model answers with actual doc context.
6.  **Logging queries for feedback** Every user query is stored. This is gold for understanding pain points, missing docs, or new opportunities.

<Steps>

<Step number={1} title="Reading the Docs">

The first step was simple: I needed a way to scan a docs/ folder for all .md files. Using Node.js and glob, I fetched the content of each Markdown file into memory.

This keeps the pipeline flexible: instead of Markdown, you could fetch docs from a database, a CMS, or even an API.

</Step>

<Step number={2} title="Chunking the Documentation">

Why chunk? Because language models have **context limits**. Feeding them an entire book of docs won’t work.

So the idea is to break text into manageable chunks (e.g. 500 tokens each) with overlap (e.g. 100 tokens). Overlap ensures continuity so you don’t lose meaning at chunk boundaries.

<p align="center">
  <img width="480" alt="Reliable data source" src="https://github.com/user-attachments/assets/ee548851-7206-4cc6-821e-de8a4366c6a3" />
</p>

**Example:**

- Chunk 1 → “…the old library that many had forgotten. Its towering shelves were filled with books…”
- Chunk 2 → “…shelves were filled with books from every imaginable genre, each whispering stories…”

The overlap ensures both chunks contain shared context, so retrieval remains coherent.

This trade-off (chunk size vs overlap) is key for RAG efficiency:

- Too small → you get noise.
- Too large → you blow up context size.

</Step>

<Step number={3} title="Generating Embeddings">

Once the docs are chunked, we generate **embeddings**, high-dimensional vectors representing each chunk.

I used OpenAI’s text-embedding-3-large model, but you could use any modern embedding model.

**Example embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elements
];
```

Each vector is a mathematical fingerprint of the text, enabling similarity search.

</Step>

<Step number={4} title="Indexing & Storing Embeddings">

To avoid regenerating embeddings multiple times, I stored them in embeddings.json.

In production, you’d likely want a vector database such as:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, etc.

Vector DBs handle indexing, scalability, and fast search. But for my prototype, a local JSON worked fine.

</Step>

<Step number={5} title="Retrieval with Cosine Similarity">

When a user asks a question:

1.  Generate an embedding for the query.
2.  Compare it to all doc embeddings using **cosine similarity**.
3.  Keep only the top N most similar chunks.

Cosine similarity measures the angle between two vectors. A perfect match scores **1.0**.

This way, the system finds the closest doc passages to the query.

</Step>

<Step number={6} title="Augmentation + Generation">

Now comes the magic. We take the top chunks and inject them into the **system prompt** for ChatGPT.

That means the model answers as if those chunks were part of the conversation.

The result: accurate, **doc-grounded responses**.

</Step>

<Step number={7} title="Logging User Queries">

This is the hidden superpower.

Every question asked is stored. Over time, you build a dataset of:

- Most frequent questions (great for FAQs)
- Unanswered questions (docs are missing or unclear)
- Feature requests disguised as questions (“Does it integrate with X?”)
- Emerging use cases you hadn’t planned for

This turns your RAG assistant into a **continuous user research tool**.

</Step>

<Step number={8} title="What Does It Cost?">

One common objection to RAG is cost. In practice, it’s surprisingly cheap:

- Generating embeddings for ~200 docs takes about **5 minutes** and costs **1–2 euros**.
- The searching doc feature is 100% free.
- For queries, we use gpt-4o-latest without “thinking” mode. On Intlayer, we see around **300 chats queries per month**, and the OpenAI API bill rarely exceeds **$10**.

On the top of that, you can include the hosting cost.

</Step>

<Step number={9} title="Implementation Details">

Stack:

- Monorepo: pnpm workspace
- Doc package: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API route / OpenAI API

The `@smart-doc/docs` package is a TypeScript package that handles documentation processing. When a markdown file is added or modified, the package includes a `build` script that rebuilds the documentation list in each language, generates embeddings, and stores them in an `embeddings.json` file.

For the frontend, we use a Next.js application that provides:

- Markdown to HTML rendering
- A search bar to find relevant documentation
- A chatbot interface for asking questions about the docs

To perform a documentation search, the Next.js application includes an API route that calls a function in the `@smart-doc/docs` package to retrieve doc chunks matching the query. Using these chunks, we can return a list of documentation pages relevant to the user's search.

For the chatbot functionality, we follow the same search process but additionally inject the retrieved doc chunks into the prompt sent to ChatGPT.

Here's an example of a prompt sent to ChatGPT:

System prompt :

```txt
You are a helpful assistant that can answer questions about the Intlayer documentation.

Related chunks :

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/en/getting-started"
---

# How to get started

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/en/another-doc"
---

# Another doc

...
```

User query :

```txt
How to get started?
```

We use SSE to stream the response from the API route.

As mentioned, we use gpt-4-turbo without "thinking" mode. Responses are relevant, and latency is low.
We experimented with gpt-5, but latency was too high (sometimes up to 15 seconds for a reply). But we’ll revisit that in the future.

👉 [Try the demo here](https://intlayer.org/doc/why) 👉 [Check the code template on GitHub](https://github.com/aymericzip/smart_doc_RAG)

</Step>

<Step number={10} title="Going Further">

This project is a minimal implementation. But you can extend it in many ways:

- MCP server → the doc reasearch function to a MCP server too connect the documentation to any AI assistant

- Vector DBs → scale to millions of doc chunks
- LangChain / LlamaIndex → ready-made frameworks for RAG pipelines
- Analytics dashboards → visualize user queries and pain points
- Multi-source retrieval → pull not just docs, but database entries, blog posts, tickets, etc.
- Improved prompting → reranking, filtering, and hybrid search (keyword + semantic)

</Step>

<Step number={11} title="Limitations We Hit">

- Chunking and overlap are empirical. The right balance (chunk size, overlap percentage, number of retrieved chunks) requires iteration and testing.
- Embeddings are not auto-regenerated when docs change. Our system resets embeddings for a file only if the number of chunks differs from what’s stored.
- In this prototype, embeddings are stored in JSON. This works for demos but pollutes Git. In production, a database or dedicated vector store is better.

</Step>

<Step number={12} title="Why This Matters Beyond Docs">

The interesting part is not just the chatbot. It’s the **feedback loop**.

With RAG, you don’t just answer:

- You learn what confuses users.
- You discover which features they expect.
- You adapt your product strategy based on real queries.

**Example:**

Imagine launching a new feature and instantly seeing:

- 50% of questions are about the same unclear setup step
- Users repeatedly ask for an integration you don’t support yet
- People search for terms that reveal a new use case

That’s **product intelligence** straight from your users.

</Step>

</Steps>

## Skip the Complexity with Sanity

Sanity is worth naming here as the CMS option the article points toward. Where Markdown files require arbitrary token splitting — with the chunk size and overlap trade-offs the article describes — Sanity's Content Lake stores documentation as typed, schema-defined JSON documents. Each field, heading, and content block is already a semantic unit, which means RAG retrieval operates on meaningful boundaries rather than approximate token counts.

Sanity's GROQ query language lets you retrieve exactly the document fields relevant to a user query — title, body, related sections — without fetching the whole document. The MCP server connects the Content Lake directly to AI agents, so the same structured content that powers your docs site also feeds your RAG pipeline without a separate ingestion step.

## Conclusion

RAG is one of the simplest, most powerful ways to make LLMs practical. By combining **retrieval + generation**, you can turn static docs into a **smart assistant** and, at the same time, gain a continuous stream of product insights.

For me, this project showed that RAG isn’t just a technical trick. It’s a way to transform documentation into:

- an interactive support system
- a feedback channel
- a product strategy tool

👉 [Try the demo here](https://intlayer.org/doc/why) 👉 [Check the code template on GitHub](https://github.com/aymericzip/smart_doc_RAG)

And if you’re experimenting with RAG too, I’d love to hear how you’re using it.
