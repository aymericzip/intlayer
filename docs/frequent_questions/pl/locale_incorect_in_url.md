---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Niepoprawny lokalizator pobrany z URL
description: Dowiedz się, jak naprawić problem z niepoprawnym lokalizatorem pobieranym z URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Niepoprawny lokalizator pobrany z URL

## Opis problemu

Podczas próby uzyskania parametru locale z URL możesz napotkać problem, gdzie wartość locale jest niepoprawna:

```js
const { locale } = await params;
console.log(locale); // zwraca "about" zamiast oczekiwanego lokalizatora
```

## Rozwiązanie

### 1. Sprawdź strukturę plików

Upewnij się, że ścieżka routera aplikacji Next.js ma następującą strukturę:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Sprawdź konfigurację middleware

Problem często występuje, gdy middleware nie jest obecny lub nie jest wywoływany. Plik middleware powinien znajdować się w lokalizacji:

```bash
src/middleware.ts
```

Ten middleware odpowiada za przepisywanie tras, gdy `prefixDefault` jest ustawione na `false`. Na przykład, przepisuje `/en/about` na `/about`.

### 3. Wzorce URL w zależności od konfiguracji

#### Domyślna konfiguracja (`prefixDefault: false`, `noPrefix: false`)

- Angielski: `/about`
- Francuski: `/fr/about`
- Hiszpański: `/es/about`

#### Z `prefixDefault: true`

- Angielski: `/en/about`
- Francuski: `/fr/about`
- Hiszpański: `/es/about`

#### Z `noPrefix: true`

- Angielski: `/about`
- Francuski: `/about`
- Hiszpański: `/about`

Aby uzyskać więcej informacji na temat tych opcji konfiguracji, zobacz [Dokumentację Konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
