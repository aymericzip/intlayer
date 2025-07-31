---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Função getTranslation - Documentação JavaScript do Intlayer
description: Documentação da função getTranslation no Intlayer, que recupera conteúdo localizado para locais específicos com fallback para o local padrão.
keywords:
  - getTranslation
  - intlayer
  - função
  - localização
  - i18n
  - JavaScript
  - tradução
  - localidade
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
---

# Documentação: Função `getTranslation` em `intlayer`

## Descrição

A função `getTranslation` recupera o conteúdo correspondente a uma localidade específica a partir de um conjunto de conteúdo de idioma personalizável. Se a localidade especificada não for encontrada, ela retorna por padrão o conteúdo da localidade padrão configurada no projeto.

## Parâmetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para várias localidades. Cada chave representa uma localidade, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser de qualquer tipo, padrão para `string`.

- `locale: Locales`

  - **Descrição**: A localidade para a qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retorno

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente à localidade especificada. Se a localidade não for encontrada, o conteúdo da localidade padrão será retornado.

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

### Localidade Ausente:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo da localidade padrão)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo da localidade padrão)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo da localidade padrão)
```

### Usando Tipos de Conteúdo Personalizados:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

## Casos Especiais

- **Localidade Não Encontrada:**
  - Quando a `locale` não é encontrada em `languageContent`, a função retorna o conteúdo da localidade padrão.
- **Conteúdo de Idioma Incompleto:**
  - Se uma localidade está parcialmente definida, a função não mescla conteúdos. Ela recupera estritamente o valor da localidade especificada ou recai para a padrão.
- **Aplicação do TypeScript:**
  - Se as localidades em `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todas as localidades necessárias sejam definidas, garantindo que o conteúdo esteja completo e com tipagem segura.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
