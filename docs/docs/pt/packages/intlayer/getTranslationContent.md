# Documentação: Função `getTranslation` em `intlayer`

## Descrição

A função `getTranslation` recupera o conteúdo correspondente a um locale específico a partir de um conjunto de conteúdos de idioma personalizáveis. Se o locale especificado não for encontrado, ela retorna o conteúdo do locale padrão configurado no projeto.

## Parâmetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para vários locales. Cada chave representa um locale, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser de qualquer tipo, sendo `string` o padrão.

- `locale: Locales`

  - **Descrição**: O locale para o qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retornos

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente ao locale especificado. Se o locale não for encontrado, o conteúdo do locale padrão será retornado.

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
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
    pt: "Olá",
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
    pt: "Olá",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

### Locale Ausente:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do locale padrão)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do locale padrão)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do locale padrão)
```

### Usando Tipos de Conteúdo Personalizados:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    pt: { greeting: "Olá" },
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
    pt: { greeting: "Olá" },
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
    pt: { greeting: "Olá" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Saída: "Bonjour"
```

## Casos de Borda

- **Locale Não Encontrado:**
  - Quando o `locale` não é encontrado em `languageContent`, a função retorna o conteúdo do locale padrão.
- **Conteúdo de Idioma Incompleto:**
  - Se um locale estiver parcialmente definido, a função não mescla conteúdos. Ela recupera estritamente o valor do locale especificado ou retorna ao padrão.
- **Enforcement do TypeScript:**
  - Se os locales em `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todos os locales necessários sejam definidos, garantindo que o conteúdo seja completo e seguro em termos de tipo.

[Documentação em Português](https://github.com/aymericzip/intlayer/blob/main/docs/pt/**/*.md)
