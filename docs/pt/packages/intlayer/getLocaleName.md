# Documentação: `getLocaleName` Função em `intlayer`

## Descrição:

A função `getLocaleName` retorna o nome localizado de um determinado local (`targetLocale`) no local de exibição (`displayLocale`). Se nenhum `targetLocale` for fornecido, a função retorna o nome do `displayLocale` em sua própria língua.

## Parâmetros:

- `displayLocale: Locales`

  - **Descrição**: O local no qual o nome do local alvo será exibido.
  - **Tipo**: Enum ou string representando locais válidos.

- `targetLocale?: Locales`
  - **Descrição**: O local cujo nome deve ser localizado.
  - **Tipo**: Opcional. Enum ou string representando locais válidos.

## Retornos:

- **Tipo**: `string`
- **Descrição**: O nome localizado do `targetLocale` no `displayLocale`, ou o próprio nome do `displayLocale` se o `targetLocale` não for fornecido. Se nenhuma tradução for encontrada, retorna `"Unknown locale"`.

## Exemplo de Uso:

```typescript
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

## Casos de Extremidade:

- **Nenhum `targetLocale` fornecido:**
  - A função retorna por padrão o próprio nome do `displayLocale`.
- **Traduções ausentes:**
  - Se `localeNameTranslations` não contém uma entrada para o `targetLocale` ou o `displayLocale` específico, a função recorre ao `ownLocalesName` ou retorna `"Unknown locale"`.
