# Documentação: `getLocaleName` Função em `intlayer`

## Descrição:

A função `getLocaleName` retorna o nome localizável de um determinado locale (`targetLocale`) no locale de exibição (`displayLocale`). Se nenhum `targetLocale` for fornecido, ela retorna o nome do `displayLocale` em seu próprio idioma.

## Parâmetros:

- `displayLocale: Locales`

  - **Descrição**: O locale no qual o nome do locale alvo será exibido.
  - **Tipo**: Enum ou string representando locales válidos.

- `targetLocale?: Locales`
  - **Descrição**: O locale cujo nome deve ser localizado.
  - **Tipo**: Opcional. Enum ou string representando locales válidos.

## Retornos:

- **Tipo**: `string`
- **Descrição**: O nome localizado do `targetLocale` no `displayLocale`, ou o próprio nome do `displayLocale` se `targetLocale` não for fornecido. Se nenhuma tradução for encontrada, retorna `"Unknown locale"`.

## Exemplo de Uso:

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

## Casos de Extremidade:

- **Nenhum `targetLocale` fornecido:**
  - A função retorna como padrão o próprio nome do `displayLocale`.
- **Faltando traduções:**
  - Se `localeNameTranslations` não contém uma entrada para o `targetLocale` ou o específico `displayLocale`, a função recorre ao `ownLocalesName` ou retorna `"Unknown locale"`.
