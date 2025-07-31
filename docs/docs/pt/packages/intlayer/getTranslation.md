---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getTranslation | intlayer
description: Veja como usar a função getTranslation para o pacote intlayer
keywords:
  - getTranslation
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getTranslation
---

# Documentação: Função `getTranslationContent` em `intlayer`

## Descrição

A função `getTranslationContent` recupera o conteúdo correspondente a um local específico a partir de um conjunto de conteúdo de idioma personalizável. Se o local especificado não for encontrado, ela retorna por padrão o conteúdo do local padrão configurado no projeto.

## Parâmetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para vários locais. Cada chave representa um local, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser qualquer tipo, com padrão `string`.

- `locale: Locales`

  - **Descrição**: O local para o qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retorno

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente ao local especificado. Se o local não for encontrado, o conteúdo do local padrão é retornado.

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
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
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

### Localização Ausente:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
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
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

## Casos Especiais

- **Localização Não Encontrada:**
  - Quando o `locale` não é encontrado no `languageContent`, a função retorna o conteúdo do local padrão.
- **Conteúdo de Idioma Incompleto:**
  - Se um locale estiver parcialmente definido, a função não mescla os conteúdos. Ela recupera estritamente o valor do locale especificado ou retorna ao padrão.
- **Aplicação do TypeScript:**
  - Se os locales em `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todos os locales necessários sejam definidos, garantindo que o conteúdo seja completo e seguro em termos de tipos.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
