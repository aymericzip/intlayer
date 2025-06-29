---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da função getTranslation | intlayer
description: Veja como usar a função getTranslation para o pacote intlayer
keywords:
  - getTranslation
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getTranslationContent` em `intlayer`

## Descrição

A função `getTranslationContent` recupera o conteúdo correspondente a um local específico de um conjunto de conteúdos de idioma personalizáveis. Se o local especificado não for encontrado, ela retorna por padrão o conteúdo do local padrão configurado no projeto.

## Parâmetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para vários locais. Cada chave representa um local, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser de qualquer tipo, com padrão como `string`.

- `locale: Locales`

  - **Descrição**: O local para o qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retornos

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente ao local especificado. Se o local não for encontrado, o conteúdo do local padrão será retornado.

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

### Local Ausente:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
```

### Usando Tipos de Conteúdo Personalizados:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    pt: { greeting: "Olá" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    pt: { greeting: "Olá" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    pt: { greeting: "Olá" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

## Casos de Borda

- **Local Não Encontrado:**
  - Quando o `locale` não é encontrado no `languageContent`, a função retorna o conteúdo do local padrão.
- **Conteúdo de Idioma Incompleto:**
  - Se um local estiver parcialmente definido, a função não mescla conteúdos. Ela recupera estritamente o valor do local especificado ou retorna ao padrão.
- **Aplicação do TypeScript:**
  - Se os locais em `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todos os locais necessários sejam definidos, garantindo que o conteúdo seja completo e seguro em termos de tipo.
