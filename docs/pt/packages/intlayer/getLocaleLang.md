---
docName: package__intlayer__getLocaleLang
url: /doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação da função getLocaleLang | intlayer
description: Veja como usar a função getLocaleLang para o pacote intlayer
keywords:
  - getLocaleLang
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getLocaleLang` em `intlayer`

## Descrição

A função `getLocaleLang` extrai o código do idioma de uma string de localidade. Ela suporta localidades com ou sem códigos de país. Se nenhuma localidade for fornecida, ela retorna uma string vazia por padrão.

## Parâmetros

- `locale?: Locales`

  - **Descrição**: A string de localidade (por exemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da qual o código do idioma é extraído.
  - **Tipo**: `Locales` (opcional)

## Retornos

- **Tipo**: `string`
- **Descrição**: O código do idioma extraído da localidade. Se a localidade não for fornecida, retorna uma string vazia (`''`).

## Exemplo de Uso

### Extraindo Códigos de Idioma:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Saída: "en"
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

## Casos de Borda

- **Nenhuma Localidade Fornecida:**

  - A função retorna uma string vazia quando `locale` é `undefined`.

- **Strings de Localidade Malformadas:**
  - Se o `locale` não seguir o formato `idioma-país` (por exemplo, `Locales.ENGLISH-US`), a função retorna com segurança a parte antes de `'-'` ou a string inteira se não houver `'-'`.
