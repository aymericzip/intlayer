# Documentação: `getLocaleLang` Função em `intlayer`

## Descrição:

A função `getLocaleLang` extrai o código de idioma de uma string de localidade. Ela suporta localidades com ou sem códigos de país. Se nenhuma localidade for fornecida, ela retorna, por padrão, uma string vazia.

## Parâmetros:

- `locale?: Locales`

  - **Descrição**: A string de localidade (por exemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da qual o código de idioma é extraído.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `string`
- **Descrição**: O código de idioma extraído da localidade. Se a localidade não for fornecida, retorna uma string vazia (`''`).

## Exemplo de Uso:

### Extraindo Códigos de Idioma:

```typescript
import { getLocaleLang, Locales } from "intlayer";

// Retorna: "en"
getLocaleLang(Locales.ENGLISH_UNITED_STATES);
// Retorna: "en"
getLocaleLang(Locales.ENGLISH);
// Retorna: "fr"
getLocaleLang(Locales.FRENCH_CANADA);
// Retorna: "fr"
getLocaleLang(Locales.FRENCH);
```

## Casos Limite:

- **Nenhuma Localidade Fornecida:**

  - A função retorna uma string vazia quando `locale` é `undefined`.

- **Strings de Localidade Malformadas:**
  - Se a `locale` não seguir o formato `idioma-país` (por exemplo, `Locales.ENGLISH-US`), a função retorna, com segurança, a parte antes de `'-'` ou a string inteira se `'-'` não estiver presente.
