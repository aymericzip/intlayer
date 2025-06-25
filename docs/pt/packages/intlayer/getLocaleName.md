---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação da função getLocaleName | intlayer
description: Veja como usar a função getLocaleName para o pacote intlayer
keywords:
  - getLocaleName
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getLocaleName` em `intlayer`

## Descrição

A função `getLocaleName` retorna o nome localizado de um determinado locale (`targetLocale`) no locale de exibição (`displayLocale`). Se nenhum `targetLocale` for fornecido, ela retorna o nome do `displayLocale` em seu próprio idioma.

## Parâmetros

- `displayLocale: Locales`

  - **Descrição**: O locale no qual o nome do locale alvo será exibido.
  - **Tipo**: Enum ou string representando locales válidos.

- `targetLocale?: Locales`
  - **Descrição**: O locale cujo nome será localizado.
  - **Tipo**: Opcional. Enum ou string representando locales válidos.

## Retorno

- **Tipo**: `string`
- **Descrição**: O nome localizado do `targetLocale` no `displayLocale`, ou o próprio nome do `displayLocale` se `targetLocale` não for fornecido. Se nenhuma tradução for encontrada, retorna `"Unknown locale"`.

## Exemplo de Uso

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Saída: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Saída: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Saída: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Saída: "English"

getLocaleName(Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Saída: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Saída: "French"

getLocaleName(Locales.CHINESE); // Saída: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Saída: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Saída: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Saída: "Chinese"

getLocaleName("unknown-locale"); // Saída: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Saída: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Saída: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Saída: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Saída: "English"

getLocaleName(Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Saída: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Saída: "French"

getLocaleName(Locales.CHINESE); // Saída: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Saída: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Saída: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Saída: "Chinese"

getLocaleName("unknown-locale"); // Saída: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Saída: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Saída: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Saída: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Saída: "English"

getLocaleName(Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Saída: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Saída: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Saída: "French"

getLocaleName(Locales.CHINESE); // Saída: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Saída: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Saída: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Saída: "Chinese"

getLocaleName("unknown-locale"); // Saída: "Unknown locale"
```

## Casos de Borda

- **Nenhum `targetLocale` fornecido:**
  - A função retorna o próprio nome do `displayLocale`.
- **Traduções ausentes:**
  - Se `localeNameTranslations` não contiver uma entrada para o `targetLocale` ou o `displayLocale` específico, a função retorna o `ownLocalesName` ou `"Unknown locale"`.
