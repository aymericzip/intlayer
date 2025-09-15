---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Costruire un Assistente alla Documentazione Potenziato da RAG (Chunking, Embeddings e Ricerca)
description: Costruire un Assistente alla Documentazione Potenziato da RAG (Chunking, Embeddings e Ricerca)
keywords:
  - RAG
  - Documentazione
  - Assistente
  - Chunking
  - Embeddings
  - Ricerca
slugs:
  - blog
  - rag-powered-documentation-assistant
---

# Costruire un Assistente alla Documentazione Potenziato da RAG (Chunking, Embeddings e Ricerca)

## Cosa ottieni

Ho costruito un assistente alla documentazione potenziato da RAG e l'ho confezionato in un boilerplate che puoi usare immediatamente.

- Include un'applicazione pronta all'uso (Next.js + OpenAI API)
- Include una pipeline RAG funzionante (chunking, embeddings, similarità coseno)
- Fornisce un'interfaccia chatbot completa costruita in React
- Tutti i componenti UI sono completamente modificabili con Tailwind CSS
- Registra ogni query dell'utente per aiutare a identificare documentazione mancante, punti dolenti degli utenti e opportunità di prodotto

👉 [Demo live](https://intlayer.org/doc/why) 👉 [Boilerplate del codice](https://github.com/aymericzip/smart_doc_RAG)

## Introduzione

Se ti sei mai perso nella documentazione, scorrendo all'infinito alla ricerca di una risposta, sai quanto può essere frustrante. La documentazione è utile, ma è statica e la ricerca spesso risulta macchinosa.

Ed è qui che entra in gioco **RAG (Retrieval-Augmented Generation)**. Invece di costringere gli utenti a scavare nel testo, possiamo combinare **retrieval** (trovare le parti giuste della documentazione) con **generation** (permettendo a un LLM di spiegarla in modo naturale).

In questo post, ti guiderò attraverso il modo in cui ho costruito un chatbot per la documentazione alimentato da RAG e come questo non solo aiuta gli utenti a trovare risposte più velocemente, ma offre anche ai team di prodotto un nuovo modo per comprendere i punti dolenti degli utenti.

## Perché usare RAG per la documentazione?

RAG è diventato un approccio popolare per una ragione: è uno dei modi più pratici per rendere i modelli di linguaggio di grandi dimensioni realmente utili.

Per la documentazione, i vantaggi sono chiari:

- Risposte istantanee: gli utenti chiedono in linguaggio naturale e ricevono risposte pertinenti.
- Contesto migliore: il modello vede solo le sezioni della documentazione più rilevanti, riducendo le allucinazioni.
- Ricerca che sembra umana: più simile a una combinazione di Algolia + FAQ + chatbot.
- Ciclo di feedback: memorizzando le query, si scopre ciò con cui gli utenti hanno davvero difficoltà.

Quel ultimo punto è cruciale. Un sistema RAG non si limita a rispondere alle domande, ma ti dice cosa le persone stanno chiedendo. Questo significa:

- Scopri informazioni mancanti nella tua documentazione.
- Vedi emergere richieste di funzionalità.
- Individui schemi che possono persino guidare la strategia di prodotto.

Quindi, RAG non è solo uno strumento di supporto. È anche un **motore di scoperta del prodotto**.

## Come funziona la pipeline RAG

![RAG Pipeline](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

Ad alto livello, ecco la ricetta che ho usato:

1.  **Suddivisione della documentazione in chunk** Grandi file Markdown vengono divisi in chunk. La suddivisione permette di fornire come contesto solo le parti rilevanti della documentazione.
2.  **Generazione degli embeddings** Ogni chunk viene trasformato in un vettore usando l’API di embedding di OpenAI (text-embedding-3-large) o un database vettoriale (Chroma, Qdrant, Pinecone).
3.  **Indicizzazione e memorizzazione** Gli embeddings vengono memorizzati in un semplice file JSON (per la mia demo), ma in produzione probabilmente useresti un database vettoriale.
4.  **Recupero (R in RAG)** La query dell’utente viene trasformata in embedding, si calcola la similarità coseno e si recuperano i chunk più pertinenti.
5.  **Aumento + Generazione (AG in RAG)** Quei chunk vengono inseriti nel prompt per ChatGPT, così il modello risponde con il contesto reale della documentazione.
6.  **Registrazione delle query per feedback** Ogni query utente viene memorizzata. Questo è prezioso per capire i punti critici, la documentazione mancante o nuove opportunità.

## Passo 1: Lettura della Documentazione

Il primo passo è stato semplice: avevo bisogno di un modo per scansionare una cartella docs/ per tutti i file .md. Usando Node.js e glob, ho recuperato il contenuto di ogni file Markdown in memoria.

Questo mantiene la pipeline flessibile: invece di Markdown, potresti recuperare la documentazione da un database, un CMS o anche un'API.

## Passo 2: Suddividere la Documentazione in Chunk

Perché suddividere in chunk? Perché i modelli linguistici hanno **limiti di contesto**. Fornire loro un intero libro di documentazione non funzionerà.

Quindi l'idea è di spezzare il testo in chunk gestibili (ad esempio 500 token ciascuno) con sovrapposizione (ad esempio 100 token). La sovrapposizione garantisce continuità così da non perdere il significato ai confini dei chunk.

**Esempio:**

- Chunk 1 → “…la vecchia biblioteca che molti avevano dimenticato. Le sue scaffalature imponenti erano piene di libri…”
- Chunk 2 → “…le scaffalature erano piene di libri di ogni genere immaginabile, ognuno sussurrando storie…”

La sovrapposizione assicura che entrambi i chunk contengano un contesto condiviso, così il recupero rimane coerente.

Questo compromesso (dimensione del chunk vs sovrapposizione) è fondamentale per l’efficienza di RAG:

- Troppo piccolo → si genera rumore.
- Troppo grande → si satura la dimensione del contesto.

## Passo 3: Generazione degli Embeddings

Una volta che i documenti sono stati suddivisi in chunk, generiamo gli **embeddings** — vettori ad alta dimensione che rappresentano ogni chunk.

Ho utilizzato il modello text-embedding-3-large di OpenAI, ma potresti usare qualsiasi modello moderno di embedding.

**Esempio di embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elementi
];
```

Ogni vettore è un’impronta matematica del testo, che permette la ricerca per similarità.

## Passo 4: Indicizzazione e Memorizzazione degli Embeddings

Per evitare di rigenerare gli embeddings più volte, li ho memorizzati in embeddings.json.

In produzione, probabilmente vorresti un database vettoriale come:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, ecc.

I database vettoriali gestiscono indicizzazione, scalabilità e ricerca veloce. Ma per il mio prototipo, un JSON locale ha funzionato bene.

## Passo 5: Recupero con Similarità Coseno

Quando un utente fa una domanda:

1. Genera un embedding per la query.
2. Confrontalo con tutti gli embedding dei documenti usando la **similarità coseno**.
3. Conserva solo i primi N chunk più simili.

La similarità coseno misura l'angolo tra due vettori. Una corrispondenza perfetta ottiene un punteggio di **1.0**.

In questo modo, il sistema trova i passaggi del documento più vicini alla query.

## Passo 6: Aggiunta + Generazione

Ora arriva la magia. Prendiamo i chunk migliori e li inseriamo nel **prompt di sistema** per ChatGPT.

Ciò significa che il modello risponde come se quei frammenti facessero parte della conversazione.

Il risultato: risposte accurate e **basate sulla documentazione**.

## Passo 7: Registrazione delle Query degli Utenti

Questa è la superpotenza nascosta.

Ogni domanda posta viene memorizzata. Nel tempo, si costruisce un dataset di:

- Domande più frequenti (ottimo per le FAQ)
- Domande senza risposta (documentazione mancante o poco chiara)
- Richieste di funzionalità mascherate da domande (“Si integra con X?”)
- Casi d’uso emergenti che non avevi previsto

Questo trasforma il tuo assistente RAG in uno **strumento continuo di ricerca utenti**.

## Quanto Costa?

Una comune obiezione al RAG è il costo. In pratica, è sorprendentemente economico:

- Generare embedding per circa 200 documenti richiede circa **5 minuti** e costa **1–2 euro**.
- La funzione di ricerca nei documenti è completamente gratuita.
- Per le query, utilizziamo gpt-4o-latest senza la modalità “thinking”. Su Intlayer, registriamo circa **300 query chat al mese**, e la fattura dell’API OpenAI raramente supera i **10$**.

Oltre a questo, puoi includere il costo dell’hosting.

## Dettagli di Implementazione

Stack:

- Monorepo: workspace pnpm
- Pacchetto Doc: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: route API Node.js / OpenAI API

Il pacchetto `@smart-doc/docs` è un pacchetto TypeScript che gestisce l’elaborazione della documentazione. Quando un file markdown viene aggiunto o modificato, il pacchetto include uno script `build` che ricostruisce la lista della documentazione in ogni lingua, genera gli embeddings e li memorizza in un file `embeddings.json`.

Per il frontend, utilizziamo un’applicazione Next.js che fornisce:

- Rendering da Markdown a HTML
- Una barra di ricerca per trovare la documentazione rilevante
- Un'interfaccia chatbot per porre domande sulla documentazione

Per eseguire una ricerca nella documentazione, l'applicazione Next.js include una route API che chiama una funzione nel pacchetto `@smart-doc/docs` per recuperare i frammenti di documentazione corrispondenti alla query. Utilizzando questi frammenti, possiamo restituire una lista di pagine della documentazione rilevanti per la ricerca dell'utente.

Per la funzionalità chatbot, seguiamo lo stesso processo di ricerca ma in aggiunta iniettiamo i frammenti di documentazione recuperati nel prompt inviato a ChatGPT.

Ecco un esempio di prompt inviato a ChatGPT:

Prompt di sistema:

```txt
Sei un assistente utile che può rispondere a domande sulla documentazione di Intlayer.

Frammenti correlati:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/it/getting-started"
---

# Come iniziare

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/it/another-doc"
---

# Un altro documento

...
```

Query utente :

```txt
Come iniziare?
```

Usiamo SSE per trasmettere la risposta dalla route API.

Come accennato, utilizziamo gpt-4-turbo senza la modalità "thinking". Le risposte sono pertinenti e la latenza è bassa.
Abbiamo sperimentato con gpt-5, ma la latenza era troppo alta (a volte fino a 15 secondi per una risposta). Tuttavia, lo rivaluteremo in futuro.

👉 [Prova la demo qui](https://intlayer.org/doc/why) 👉 [Controlla il modello di codice su GitHub](https://github.com/aymericzip/smart_doc_RAG)

## Andare oltre

Questo progetto è una implementazione minima. Ma puoi estenderlo in molti modi:

- Server MCP → la funzione di ricerca nella documentazione verso un server MCP per connettere la documentazione a qualsiasi assistente AI

- Database vettoriali → scalare a milioni di frammenti di documenti
- LangChain / LlamaIndex → framework pronti all'uso per pipeline RAG
- Cruscotti di analisi → visualizzare le query degli utenti e i punti critici
- Recupero multi-sorgente → estrarre non solo documenti, ma anche voci di database, post di blog, ticket, ecc.
- Prompting migliorato → riordinamento, filtraggio e ricerca ibrida (parola chiave + semantica)

## Limitazioni che abbiamo incontrato

- La suddivisione in frammenti e la sovrapposizione sono empiriche. Il giusto equilibrio (dimensione del frammento, percentuale di sovrapposizione, numero di frammenti recuperati) richiede iterazione e test.
- Gli embeddings non vengono rigenerati automaticamente quando i documenti cambiano. Il nostro sistema resetta gli embeddings per un file solo se il numero di frammenti differisce da quello memorizzato.
- In questo prototipo, gli embeddings sono memorizzati in JSON. Questo funziona per le demo ma inquina Git. In produzione, è meglio utilizzare un database o un archivio vettoriale dedicato.

## Perché Questo È Importante Oltre la Documentazione

La parte interessante non è solo il chatbot. È il **ciclo di feedback**.

Con RAG, non ti limiti a rispondere:

- Impari cosa confonde gli utenti.
- Scopri quali funzionalità si aspettano.
- Adatti la tua strategia di prodotto basandoti sulle query reali.

**Esempio:**

Immagina di lanciare una nuova funzionalità e vedere immediatamente:

- Il 50% delle domande riguarda lo stesso passaggio di configurazione poco chiaro
- Gli utenti chiedono ripetutamente un’integrazione che ancora non supporti
- Le persone cercano termini che rivelano un nuovo caso d’uso

Questa è **intelligenza di prodotto** direttamente dai tuoi utenti.

## Conclusione

RAG è uno dei modi più semplici e potenti per rendere pratici i LLM. Combinando **recupero + generazione**, puoi trasformare documenti statici in un **assistente intelligente** e, allo stesso tempo, ottenere un flusso continuo di approfondimenti sul prodotto.

Per me, questo progetto ha dimostrato che RAG non è solo un trucco tecnico. È un modo per trasformare la documentazione in:

- un sistema di supporto interattivo
- un canale di feedback
- uno strumento di strategia di prodotto

👉 [Prova la demo qui](https://intlayer.org/doc/why) 👉 [Controlla il modello di codice su GitHub](https://github.com/aymericzip/smart_doc_RAG)

E se anche tu stai sperimentando con RAG, mi piacerebbe sapere come lo stai usando.
