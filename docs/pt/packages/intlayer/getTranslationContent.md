# Documentação: Função `getTranslationContent` em `intlayer`

## Descrição:

A função `getTranslationContent` recupera o conteúdo correspondente a um local específico de um conjunto de conteúdo de linguagem personalizável. Se o local especificado não for encontrado, ele retorna por padrão o conteúdo para o local padrão configurado no projeto.

## Parâmetros:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrição**: Um objeto contendo traduções para vários locais. Cada chave representa um local, e seu valor é o conteúdo correspondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` pode ser de qualquer tipo, padrão para `string`.

- `locale: Locales`

  - **Descrição**: O local para o qual o conteúdo deve ser recuperado.
  - **Tipo**: `Locales`

## Retorna:

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente ao local especificado. Se o local não for encontrado, o conteúdo do local padrão é retornado.

## Exemplo de Uso:

### Uso Básico:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Saída: "Bonjour"
```

### Local Ausente:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Saída: "Hello" (conteúdo do local padrão)
```

### Usando Tipos de Conteúdo Personalizados:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
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
  - Quando o `locale` não é encontrado em `languageContent`, a função retorna o conteúdo para o local padrão.
- **Conteúdo de Linguagem Incompleto:**

  - Se um local estiver parcialmente definido, a função não mescla conteúdos. Ela recupera estritamente o valor do local especificado ou recorre ao padrão.

- **Aplicação do TypeScript:**
  - Se os locais em `languageContent` não corresponderem à configuração do projeto, o TypeScript exigirá que todos os locais necessários sejam definidos, garantindo que o conteúdo seja completo e seguro em termos de tipo.
