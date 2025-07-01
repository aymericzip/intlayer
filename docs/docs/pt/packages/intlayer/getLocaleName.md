---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getLocaleName | intlayer
description: Veja como usar a função getLocaleName do pacote intlayer
keywords:
  - getLocaleName
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
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
  - **Descrição**: O locale cujo nome deve ser localizado.
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

## Casos Especiais

- **Nenhum `targetLocale` fornecido:**
  - A função retorna por padrão o próprio nome do `displayLocale`.
- **Traduções ausentes:**
  - Se `localeNameTranslations` não contiver uma entrada para o `targetLocale` ou para o `displayLocale` específico, a função recorre ao `ownLocalesName` ou retorna `"Unknown locale"`.

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
