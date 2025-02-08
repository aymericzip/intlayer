# Documentação: `getTranslation` Função em `intlayer`

## Descrição:

A função `getTranslation` recupera o conteúdo correspondente a um local específico a partir de um conjunto de conteúdos de linguagem personalizáveis. Se o local especificado não for encontrado, ele retorna, por padrão, o conteúdo para o local padrão configurado no projeto.

## Parâmetros:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para vários locais. Cada chave representa um local, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser qualquer tipo, padrão para `string`.

- `locale: Locales`

  - **Descrição**: O local para o qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retornos:

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente ao local especificado. Se o local não for encontrado, o conteúdo do local padrão é retornado.

## Exemplo de Uso:

### Uso Básico:

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

### Locale Ausente:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
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

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
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

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
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

## Casos Limite:

- **Local Não Encontrado:**
  - Quando o `locale` não é encontrado no `languageContent`, a função retorna o conteúdo para o local padrão.
- **Conteúdo de Linguagem Incompleto:**

  - Se um local estiver parcialmente definido, a função não mescla conteúdos. Ela estritamente recupera o valor do local especificado ou recua para o padrão.

- **Aplicação do TypeScript:**
  - Se os locais no `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todos os locais necessários sejam definidos, garantindo que o conteúdo esteja completo e seguro em termos de tipos.
