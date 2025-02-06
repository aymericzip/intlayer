# Integração com Next.js: Documentação do Hook `useIntlayer`

O hook `useIntlayer` é destinado a aplicações Next.js para buscar e gerenciar conteúdo localizado de forma eficiente. Esta documentação se concentrará em como utilizar o hook dentro de projetos Next.js, garantindo práticas de localização adequadas.

## Importando `useIntlayer` no Next.js

Dependendo se você está trabalhando em componentes do lado do cliente ou do servidor em uma aplicação Next.js, você pode importar o hook `useIntlayer` da seguinte forma:

- **Componente do Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Usado em componentes do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Usado em componentes do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Usado em componentes do lado do cliente
  ```

- **Componente do Servidor:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Usado em componentes do lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Usado em componentes do lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Usado em componentes do lado do servidor
  ```

## Parâmetros

1. **`key`**: Um identificador de string para a chave do dicionário de onde você deseja recuperar o conteúdo.
2. **`locale`** (opcional): Um local específico a ser utilizado. Se omitido, o hook usa o locale definido no contexto do cliente ou do servidor.

## Arquivos de Declaração de Conteúdo

É crucial que todas as chaves de conteúdo sejam definidas dentro de arquivos de declaração de conteúdo para evitar erros em tempo de execução e garantir segurança de tipo. Essa abordagem também facilita a integração com TypeScript para validação em tempo de compilação.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

## Exemplo de Uso no Next.js

Aqui está como você pode implementar o hook `useIntlayer` dentro de uma página Next.js para carregar dinamicamente o conteúdo localizado com base no locale atual da aplicação:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Manipulando a Localização de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., assegure-se de referenciar o conteúdo corretamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Mais Informações

- **Editor Visual do Intlayer**: Aprenda como usar o editor visual para facilitar a gestão de conteúdo [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

Esta documentação descreve o uso do hook `useIntlayer` especificamente dentro de ambientes Next.js, fornecendo uma solução robusta para gerenciar localização em suas aplicações Next.js.
