---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Locale Errato Recuperato dall'URL
description: Scopri come correggere il locale errato recuperato dall'URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configurazione
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# Locale Errato Recuperato dall'URL

## Descrizione del Problema

Quando si tenta di accedere al parametro locale dall'URL, potresti incontrare un problema in cui il valore del locale è errato:

```js
const { locale } = await params;
console.log(locale); // restituisce "about" invece del locale previsto
```

## Soluzione

### 1. Verifica la Struttura dei File

Assicurati che il percorso del router della tua app Next.js segua questa struttura:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Verifica la Configurazione del Middleware

Il problema si verifica spesso quando il middleware non è presente o non viene attivato. Il file del middleware dovrebbe trovarsi in:

```bash
src/middleware.ts
```

Questo middleware è responsabile della riscrittura delle rotte quando `prefixDefault` è impostato su `false`. Ad esempio, riscrive `/en/about` in `/about`.

### 3. Modelli di URL Basati sulla Configurazione

#### Configurazione Predefinita (`prefixDefault: false`, `noPrefix: false`)

- Inglese: `/about`
- Francese: `/fr/about`
- Spagnolo: `/es/about`

#### Con `prefixDefault: true`

- Inglese: `/en/about`
- Francese: `/fr/about`
- Spagnolo: `/es/about`

#### Con `noPrefix: true`

- Inglese: `/about`
- Francese: `/about`
- Spagnolo: `/about`

Per maggiori dettagli su queste opzioni di configurazione, consulta la [Documentazione sulla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
