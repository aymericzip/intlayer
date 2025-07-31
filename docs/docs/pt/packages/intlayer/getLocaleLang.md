---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getLocaleLang | intlayer
description: Veja como usar a função getLocaleLang do pacote intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
---

# Documentação: Função `getLocaleLang` em `intlayer`

## Descrição

A função `getLocaleLang` extrai o código do idioma a partir de uma string de localidade. Ela suporta localidades com ou sem códigos de país. Se nenhuma localidade for fornecida, retorna uma string vazia por padrão.

## Parâmetros

- `locale?: Locales`

  - **Descrição**: A string de localidade (por exemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da qual o código do idioma é extraído.
  - **Tipo**: `Locales` (opcional)

## Retorno

- **Tipo**: `string`
- **Descrição**: O código do idioma extraído da localidade. Se a localidade não for fornecida, retorna uma string vazia (`''`).

## Exemplo de Uso

### Extraindo Códigos de Idioma:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Saída: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Saída: "fr"
getLocaleLang(Locales.FRENCH); // Saída: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Saída: "en"
getLocaleLang(Locales.ENGLISH); // Saída: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Saída: "fr"
getLocaleLang(Locales.FRENCH); // Saída: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Saída: "en"
getLocaleLang(Locales.ENGLISH); // Saída: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Saída: "fr"
getLocaleLang(Locales.FRENCH); // Saída: "fr"
```

## Casos Especiais

- **Nenhuma Localidade Fornecida:**

  - A função retorna uma string vazia quando `locale` é `undefined`.

- **Strings de Localidade Malformadas:**
  - Se o `locale` não seguir o formato `idioma-país` (por exemplo, `Locales.ENGLISH-US`), a função retorna com segurança a parte antes do `'-'` ou a string inteira se nenhum `'-'` estiver presente.

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
