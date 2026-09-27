---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "Jak naprawić błędy builda Intlayer w CI/CD"
description: "Napraw błędy renderowania Server Components występujące tylko w CI/CD, upewniając się, że słowniki Intlayer są budowane podczas builda."
keywords:
  - build
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
author: aymericzip
---

# Błąd podczas kompilacji w CI/CD

Jeśli otrzymujesz taki błąd w Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Oto kilka rozwiązań:

## 1. Brakujące słowniki

Upewnij się, że słowniki są budowane na etapie kompilacji.

Często zdarza się, że kompilacja działa lokalnie, ale nie na CI/CD. Powodem jest to, że lokalnie katalog `.intlayer` jest obecny, natomiast na CI/CD go nie ma, ponieważ jest wykluczony z kompilacji.

Możesz to naprawić, dodając skrypt prebuild w pliku `package.json` Twojego projektu.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Zostanie uruchomiony przed kompilacją
    "build": "next build",
  },
}
```

> Zauważ, że jeśli używasz funkcji `withIntlayer` lub równoważnego pluginu bundlera dla Twojego frameworka, skrypt prebuild zostanie uruchomiony przed kompilacją.

## 2. Brakujące zmienne środowiskowe podczas kompilacji / uruchamiania

W kontenerze lub na platformie z automatycznym wdrażaniem zaleca się wykluczenie pliku `.env` z procesu budowania.

```text fileName=".gitignore or .dockerignore"
# Zmienne środowiskowe
.env
**/.env
.env.*
**/.env.*
```

Jeśli Twoje zmienne środowiskowe nie są dostępne w czasie budowania, zostanie zgłoszony błąd.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL), // Tworzy bazowy URL metadanych z zmiennej środowiskowej
});
```

Prawdopodobnie nie jest to związane z Intlayer. Sprawdź więc swoje zmienne środowiskowe w czasie budowania na platformie CI/CD.
