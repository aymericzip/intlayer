---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Jak budować słowniki?
description: Dowiedz się, jak budować słowniki.
keywords:
  - build
  - dictionaries
  - intlayer
  - command
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Budowanie słowników

## Jak budować słowniki

Intlayer udostępnia narzędzie wiersza poleceń do budowania słowników.

```bash
npx intlayer dictionaries build
```

To polecenie:

- Skanuje wszystkie pliki deklaracji treści (`.content.{ts,tsx,js,mjs,cjs,json,...}`) w Twoim projekcie.
- Generuje słowniki i zapisuje je w folderze `.intlayer/dictionary`.

### Tryb obserwacji

Jeśli chcesz automatycznie aktualizować słowniki, gdy w plikach deklaracji treści zostaną wprowadzone zmiany, uruchom następujące polecenie:

```bash
npx intlayer dictionaries build --watch
```

W tym trybie Intlayer będzie skanować i budować słowniki za każdym razem, gdy w plikach deklaracji treści zostaną wprowadzone zmiany, oraz automatycznie aktualizować folder `.intlayer/dictionary`.

### Korzystanie z rozszerzenia VSCode

Możesz również użyć [rozszerzenia Intlayer dla VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/pl/vs_code_extension.md), aby ulepszyć swoje doświadczenie z Intlayer w VSCode.

### Korzystanie z wtyczki dla Twojego ulubionego frameworka aplikacji

Jeśli używasz frameworka takiego jak Next.js (Webpack / Turbopack), Vite, React Native, Lynx itp., Intlayer dostarcza wtyczkę, którą możesz wykorzystać do integracji Intlayer z Twoją aplikacją.

Intlayer zbuduje słowniki przed kompilacją Twojej aplikacji.
W ten sam sposób, w trybie deweloperskim, Intlayer będzie monitorować zmiany w plikach deklaracji treści i automatycznie przebudowywać słowniki.

Zapoznaj się ze specyficzną dokumentacją swojego frameworka, aby dowiedzieć się, jak zintegrować wtyczkę.
