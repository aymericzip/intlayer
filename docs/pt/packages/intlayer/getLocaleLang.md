# Documentação: `getLocaleLang` Função em `intlayer`

## Descrição:

A função `getLocaleLang` extrai o código da língua de uma string de locale. Ela suporta locales com ou sem códigos de país. Se nenhum locale for fornecido, ela retorna, por padrão, uma string vazia.

## Parâmetros:

- `locale?: Locales`

  - **Descrição**: A string de locale (por exemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da qual o código da língua é extraído.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `string`
- **Descrição**: O código da língua extraído do locale. Se o locale não for fornecido, ela retorna uma string vazia (`''`).

## Exemplo de Uso:

### Extraindo Códigos de Língua:

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

## Casos Especiais:

- **Nenhum Locale Fornecido:**

  - A função retorna uma string vazia quando `locale` é `undefined`.

- **Strings de Locale Malformadas:**
  - Se o `locale` não seguir o formato `idioma-país` (por exemplo, `Locales.ENGLISH-US`), a função retorna com segurança a parte antes de `'-'` ou a string inteira se não houver `'-'` presente.
