---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Errore di build in CI/CD
description: Scopri come risolvere gli errori di build che si verificano negli ambienti CI/CD.
keywords:
  - build
  - errore
  - ci
  - cd
  - pipeline
  - intlayer
  - dizionari
  - next.js
  - prebuild
  - automazione
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Errore di build in CI/CD

Se ricevi un errore come questo su Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Ecco alcune soluzioni:

## 1. Dizionari mancanti

Assicurati che i dizionari siano costruiti nella fase di build.

È frequente che la build funzioni localmente ma non su CI/CD. Il motivo è che localmente la directory `.intlayer` è presente, mentre su CI/CD non lo è perché è esclusa dalla build.

Puoi risolvere aggiungendo uno script di prebuild nel `package.json` del tuo progetto.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Verrà eseguito prima della build
    "build": "next build",
  },
}
```

> Nota che se usi la funzione `withIntlayer`, o il plugin bundler equivalente per il tuo framework, lo script di prebuild verrà eseguito prima della build.

## 2. Variabili d'ambiente mancanti al momento della build o dell'esecuzione

In un container, o su una piattaforma con deploy automatico, è consigliato escludere il file `.env` dalla build.

```text fileName=".gitignore or .dockerignore"
# Variabili d'ambiente
.env
**/.env
.env.*
**/.env.*
```

Se le tue variabili d'ambiente non sono disponibili al momento della build, verrà generato un errore.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Probabilmente non è correlato a Intlayer. Quindi verifica le tue variabili d'ambiente al momento della build sulla tua piattaforma CI/CD.
