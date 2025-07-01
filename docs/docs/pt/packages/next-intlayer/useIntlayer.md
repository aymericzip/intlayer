---
docName: package__next-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Hook useIntlayer | next-intlayer
description: Veja como usar o hook useIntlayer para o pacote next-intlayer
keywords:
  - useIntlayer
  - dicionário
  - chave
  - Intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
---

# Integração com Next.js: Documentação do Hook `useIntlayer`

O hook `useIntlayer` é projetado para aplicações Next.js para buscar e gerenciar conteúdo localizado de forma eficiente. Esta documentação focará em como utilizar o hook dentro de projetos Next.js, garantindo práticas adequadas de localização.

## Importando `useIntlayer` no Next.js

Dependendo se você está trabalhando em componentes do lado do cliente ou do lado do servidor em uma aplicação Next.js, você pode importar o hook `useIntlayer` da seguinte forma:

- **Componente Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Usado em componentes do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Usado em componentes do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Usado em componentes do lado do cliente
  ```

- **Componente Servidor:**

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

1. **`key`**: Um identificador string para a chave do dicionário da qual você deseja recuperar o conteúdo.
2. **`locale`** (opcional): Um locale específico para usar. Se omitido, o hook utiliza o locale definido no contexto do cliente ou servidor.

## Arquivos de Dicionário

É crucial que todas as chaves de conteúdo estejam definidas dentro dos arquivos de declaração de conteúdo para evitar erros em tempo de execução e garantir a segurança de tipos. Essa abordagem também facilita a integração com TypeScript para validação em tempo de compilação.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

## Exemplo de Uso no Next.js

Veja como você pode implementar o hook `useIntlayer` dentro de uma página Next.js para carregar dinamicamente conteúdo localizado com base no locale atual da aplicação:

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

## Tratamento da Localização de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., assegure-se de referenciar o conteúdo corretamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Mais Informações

- **Editor Visual Intlayer**: Aprenda a usar o editor visual para facilitar o gerenciamento de conteúdo [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

Esta documentação descreve o uso do hook `useIntlayer` especificamente em ambientes Next.js, fornecendo uma solução robusta para gerenciar a localização em suas aplicações Next.js.

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
