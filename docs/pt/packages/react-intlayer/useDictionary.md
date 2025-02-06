# Integração React: Documentação do Hook `useDictionary`

Esta seção fornece orientações detalhadas sobre o uso do hook `useDictionary` em aplicações React, permitindo o manuseio eficiente de conteúdo localizado sem um editor visual.

## Importando `useDictionary` no React

O hook `useDictionary` pode ser integrado em aplicações React importando-o com base no contexto:

- **Componente do Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Usado em componentes React do lado do cliente
  ```

- **Componente do Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Usado em componentes React do lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`dictionary`**: Um objeto dicionário declarado contendo conteúdo localizado para chaves específicas.
2. **`locale`** (opcional): O locale desejado. Padrão para o locale do contexto atual se não especificado.

## Declaração de Conteúdo

Todos os objetos dicionário devem ser declarados em arquivos de conteúdo estruturados para garantir a segurança de tipo e prevenir erros em tempo de execução. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md). Aqui está um exemplo de declaração de conteúdo:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      pt: "Exemplo de Componente do Cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente do cliente",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      pt: "Exemplo de Componente do Cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente do cliente",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      pt: "Exemplo de Componente do Cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente do cliente",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "pt": "Exemplo de Componente do Cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "pt": "Este é o conteúdo de um exemplo de componente do cliente"
      }
    }
  }
}
```

## Exemplo de Uso no React

Abaixo está um exemplo de como usar o hook `useDictionary` em um componente React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Integração no Servidor

Se você estiver usando o hook `useDictionary` fora do `IntlayerProvider`, o locale deve ser fornecido explicitamente como um parâmetro ao renderizar o componente:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notas sobre Atributos

Diferente das integrações usando editores visuais, atributos como `buttonTitle.value` não se aplicam aqui. Em vez disso, acesse diretamente as strings localizadas como declaradas em seu conteúdo.

```jsx
<button title={content.title}>{content.content}</button>
```

## Dicas Adicionais

- **Segurança de Tipo**: Sempre utilize `DeclarationContent` para definir seus dicionários para garantir segurança de tipo.
- **Atualizações de Localização**: Ao atualizar o conteúdo, certifique-se de que todos os locales estão consistentes para evitar traduções perdidas.

Esta documentação foca na integração do hook `useDictionary`, proporcionando uma abordagem simplificada para gerenciar conteúdo localizado sem depender de funcionalidades de editor visual.
