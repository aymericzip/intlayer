---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Construindo um Assistente de Documentação com RAG (Fragmentação, Embeddings e Busca)
description: Construindo um Assistente de Documentação com RAG (Fragmentação, Embeddings e Busca)
keywords:
  - RAG
  - Documentação
  - Assistente
  - Fragmentação
  - Embeddings
  - Busca
slugs:
  - blog
  - rag-powered-documentation-assistant
---

# Construindo um Assistente de Documentação com RAG (Fragmentação, Embeddings e Busca)

## O que você recebe

Eu construí um assistente de documentação com RAG e o empacotei em um boilerplate que você pode usar imediatamente.

- Vem com uma aplicação pronta para uso (Next.js + OpenAI API)
- Inclui um pipeline RAG funcional (fragmentação, embeddings, similaridade cosseno)
- Fornece uma interface completa de chatbot construída em React
- Todos os componentes da interface são totalmente editáveis com Tailwind CSS
- Registra todas as consultas dos usuários para ajudar a identificar documentação faltante, pontos problemáticos dos usuários e oportunidades de produto

👉 [Demo ao vivo](https://intlayer.org/doc/why) 👉 [Boilerplate do código](https://github.com/aymericzip/smart_doc_RAG)

## Introdução

Se você já se perdeu na documentação, rolando infinitamente em busca de uma resposta, sabe o quão frustrante isso pode ser. Documentações são úteis, mas são estáticas e a busca nelas muitas vezes parece desajeitada.

É aí que entra o **RAG (Geração Aumentada por Recuperação)**. Em vez de forçar os usuários a vasculhar o texto, podemos combinar **recuperação** (encontrar as partes certas da documentação) com **geração** (permitir que um LLM explique de forma natural).

Neste post, vou mostrar como construí um chatbot de documentação alimentado por RAG e como ele não apenas ajuda os usuários a encontrar respostas mais rapidamente, mas também oferece às equipes de produto uma nova forma de entender os pontos problemáticos dos usuários.

## Por que usar RAG para documentação?

RAG tornou-se uma abordagem popular por um motivo: é uma das maneiras mais práticas de tornar os grandes modelos de linguagem realmente úteis.

Para documentação, os benefícios são claros:

- Respostas instantâneas: os usuários perguntam em linguagem natural e recebem respostas relevantes.
- Melhor contexto: o modelo vê apenas as seções mais relevantes da documentação, reduzindo alucinações.
- Busca que parece humana: mais como Algolia + FAQ + chatbot, tudo em um.
- Ciclo de feedback: ao armazenar consultas, você descobre com o que os usuários realmente têm dificuldades.

Esse último ponto é crucial. Um sistema RAG não apenas responde perguntas, ele mostra o que as pessoas estão perguntando. Isso significa:

- Você descobre informações faltantes na sua documentação.
- Você vê surgirem pedidos de funcionalidades.
- Você identifica padrões que podem até orientar a estratégia do produto.

Portanto, RAG não é apenas uma ferramenta de suporte. É também um **motor de descoberta de produto**.

## Como funciona o pipeline RAG

Em um nível geral, aqui está a receita que usei:

1.  **Dividir a documentação em partes** Grandes arquivos Markdown são divididos em partes. Dividir permite fornecer como contexto apenas as partes relevantes da documentação.
2.  **Gerar embeddings** Cada parte é transformada em um vetor usando a API de embedding da OpenAI (text-embedding-3-large) ou um banco de dados vetorial (Chroma, Qdrant, Pinecone).
3.  **Indexação e armazenamento** Os embeddings são armazenados em um arquivo JSON simples (para minha demonstração), mas em produção, provavelmente você usaria um banco de dados vetorial.
4.  **Recuperação (R em RAG)** A consulta do usuário é transformada em embedding, a similaridade cosseno é calculada, e os chunks mais relevantes são recuperados.
5.  **Aumento + Geração (AG em RAG)** Esses chunks são injetados no prompt para o ChatGPT, para que o modelo responda com o contexto real da documentação.
6.  **Registro de consultas para feedback** Cada consulta do usuário é armazenada. Isso é ouro para entender pontos problemáticos, documentação faltante ou novas oportunidades.

## Passo 1: Lendo a Documentação

O primeiro passo foi simples: eu precisava de uma forma de escanear uma pasta docs/ para todos os arquivos .md. Usando Node.js e glob, eu busquei o conteúdo de cada arquivo Markdown para a memória.

Isso mantém o pipeline flexível: em vez de Markdown, você poderia buscar documentos de um banco de dados, um CMS ou até mesmo uma API.

## Passo 2: Dividindo a Documentação em Partes

Por que dividir em partes? Porque os modelos de linguagem têm **limites de contexto**. Alimentá-los com um livro inteiro de documentação não funciona.

Então, a ideia é quebrar o texto em partes gerenciáveis (por exemplo, 500 tokens cada) com sobreposição (por exemplo, 100 tokens). A sobreposição garante continuidade para que você não perca o significado nas fronteiras das partes.

**Exemplo:**

- Parte 1 → “…a velha biblioteca que muitos haviam esquecido. Suas prateleiras imponentes estavam cheias de livros…”
- Parte 2 → “…as prateleiras estavam cheias de livros de todos os gêneros imagináveis, cada um sussurrando histórias…”

A sobreposição garante que ambas as partes contenham contexto compartilhado, para que a recuperação permaneça coerente.

Esse equilíbrio (tamanho do chunk vs sobreposição) é fundamental para a eficiência do RAG:

- Muito pequeno → você obtém ruído.
- Muito grande → você estoura o tamanho do contexto.

## Passo 3: Gerando Embeddings

Uma vez que os documentos são divididos em chunks, geramos **embeddings** — vetores de alta dimensão que representam cada chunk.

Usei o modelo text-embedding-3-large da OpenAI, mas você pode usar qualquer modelo moderno de embedding.

**Exemplo de embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elementos
];
```

Cada vetor é uma impressão digital matemática do texto, permitindo a busca por similaridade.

## Passo 4: Indexando e Armazenando Embeddings

Para evitar regenerar embeddings várias vezes, eu os armazenei em embeddings.json.

Em produção, você provavelmente vai querer um banco de dados vetorial como:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, etc.

Bancos de dados vetoriais lidam com indexação, escalabilidade e busca rápida. Mas para meu protótipo, um JSON local funcionou bem.

## Passo 5: Recuperação com Similaridade Cosseno

Quando um usuário faz uma pergunta:

1. Gere um embedding para a consulta.
2. Compare-o com todos os embeddings dos documentos usando **similaridade cosseno**.
3. Mantenha apenas os N chunks mais similares.

A similaridade cosseno mede o ângulo entre dois vetores. Uma correspondência perfeita tem pontuação **1.0**.

Dessa forma, o sistema encontra as passagens do documento mais próximas da consulta.

## Passo 6: Aumento + Geração

Agora vem a mágica. Pegamos os chunks principais e os injetamos no **prompt do sistema** para o ChatGPT.

Isso significa que o modelo responde como se esses trechos fizessem parte da conversa.

O resultado: respostas precisas e **baseadas na documentação**.

## Passo 7: Registro das Consultas dos Usuários

Este é o superpoder oculto.

Cada pergunta feita é armazenada. Com o tempo, você constrói um conjunto de dados de:

- Perguntas mais frequentes (ótimo para FAQs)
- Perguntas sem resposta (documentação ausente ou pouco clara)
- Solicitações de funcionalidades disfarçadas de perguntas (“Integra com X?”)
- Casos de uso emergentes que você não havia planejado

Isso transforma seu assistente RAG em uma **ferramenta contínua de pesquisa com usuários**.

## Quanto Custa?

Uma objeção comum ao RAG é o custo. Na prática, é surpreendentemente barato:

- Gerar embeddings para cerca de 200 documentos leva cerca de **5 minutos** e custa **1–2 euros**.
- O recurso de busca na documentação é 100% gratuito.
- Para consultas, usamos o gpt-4o-latest sem o modo “thinking”. No Intlayer, vemos cerca de **300 consultas de chat por mês**, e a fatura da API OpenAI raramente ultrapassa **10 dólares**.

Além disso, você pode incluir o custo de hospedagem.

## Detalhes da Implementação

Stack:

- Monorepo: workspace pnpm
- Pacote de documentação: Node.js / TypeScript / API OpenAI
- Frontend: Next.js / React / Tailwind CSS
- Backend: rota API Node.js / API OpenAI

O pacote `@smart-doc/docs` é um pacote TypeScript que lida com o processamento da documentação. Quando um arquivo markdown é adicionado ou modificado, o pacote inclui um script `build` que reconstrói a lista de documentação em cada idioma, gera embeddings e os armazena em um arquivo `embeddings.json`.

Para o frontend, usamos uma aplicação Next.js que fornece:

- Renderização de Markdown para HTML
- Uma barra de pesquisa para encontrar documentação relevante
- Uma interface de chatbot para fazer perguntas sobre a documentação

Para realizar uma busca na documentação, a aplicação Next.js inclui uma rota de API que chama uma função do pacote `@smart-doc/docs` para recuperar fragmentos de documentação que correspondem à consulta. Usando esses fragmentos, podemos retornar uma lista de páginas de documentação relevantes para a busca do usuário.

Para a funcionalidade do chatbot, seguimos o mesmo processo de busca, mas além disso, injetamos os fragmentos de documentação recuperados no prompt enviado ao ChatGPT.

Aqui está um exemplo de um prompt enviado ao ChatGPT:

Prompt do sistema:

```txt
Você é um assistente prestativo que pode responder perguntas sobre a documentação do Intlayer.

Fragmentos relacionados:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/pt/getting-started"
---

# Como começar

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/pt/another-doc"
---

# Outro documento

...
```

Consulta do usuário :

```txt
Como começar?
```

Usamos SSE para transmitir a resposta da rota da API.

Como mencionado, usamos gpt-4-turbo sem o modo "thinking". As respostas são relevantes e a latência é baixa.
Experimentamos com o gpt-5, mas a latência era muito alta (às vezes até 15 segundos para uma resposta). Mas revisaremos isso no futuro.

👉 [Experimente a demonstração aqui](https://intlayer.org/doc/why) 👉 [Confira o modelo de código no GitHub](https://github.com/aymericzip/smart_doc_RAG)

## Indo Além

Este projeto é uma implementação mínima. Mas você pode estendê-lo de várias maneiras:

- Servidor MCP → a função de pesquisa de documentação para um servidor MCP para conectar a documentação a qualquer assistente de IA

- Bancos de Dados Vetoriais → escalar para milhões de pedaços de documentação
- LangChain / LlamaIndex → frameworks prontos para pipelines RAG
- Painéis de análise → visualizar consultas dos usuários e pontos problemáticos
- Recuperação multi-fonte → buscar não apenas documentos, mas entradas de banco de dados, posts de blog, tickets, etc.
- Melhoria no prompting → reclassificação, filtragem e busca híbrida (palavra-chave + semântica)

## Limitações que Encontramos

- A segmentação e sobreposição são empíricas. O equilíbrio correto (tamanho do pedaço, porcentagem de sobreposição, número de pedaços recuperados) requer iteração e testes.
- Embeddings não são regenerados automaticamente quando os documentos mudam. Nosso sistema redefine os embeddings para um arquivo somente se o número de pedaços for diferente do que está armazenado.
- Neste protótipo, os embeddings são armazenados em JSON. Isso funciona para demonstrações, mas polui o Git. Em produção, um banco de dados ou um armazenamento vetorial dedicado é melhor.

## Por Que Isso Importa Além da Documentação

A parte interessante não é apenas o chatbot. É o **ciclo de feedback**.

Com RAG, você não apenas responde:

- Você aprende o que confunde os usuários.
- Você descobre quais recursos eles esperam.
- Você adapta sua estratégia de produto com base em consultas reais.

**Exemplo:**

Imagine lançar um novo recurso e ver instantaneamente:

- 50% das perguntas são sobre o mesmo passo de configuração pouco claro
- Usuários pedem repetidamente por uma integração que você ainda não suporta
- Pessoas buscam termos que revelam um novo caso de uso

Isso é **inteligência de produto** diretamente dos seus usuários.

## Conclusão

RAG é uma das formas mais simples e poderosas de tornar os LLMs práticos. Ao combinar **recuperação + geração**, você pode transformar documentos estáticos em um **assistente inteligente** e, ao mesmo tempo, obter um fluxo contínuo de insights sobre o produto.

Para mim, este projeto mostrou que RAG não é apenas um truque técnico. É uma forma de transformar a documentação em:

- um sistema de suporte interativo
- um canal de feedback
- uma ferramenta de estratégia de produto

👉 [Experimente a demonstração aqui](https://intlayer.org/doc/why) 👉 [Confira o modelo de código no GitHub](https://github.com/aymericzip/smart_doc_RAG)

E se você também estiver experimentando com RAG, adoraria saber como está usando.
