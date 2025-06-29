---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do hook useIntlayer | react-intlayer
description: Veja como usar o hook useIntlayer para o pacote react-intlayer
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

# Integração com React: Documentação do Hook `useIntlayer`

Esta seção fornece orientações detalhadas sobre como usar o hook `useIntlayer` em aplicações React, permitindo uma localização de conteúdo eficiente.

## Importando `useIntlayer` no React

O hook `useIntlayer` pode ser integrado em aplicações React importando-o com base no contexto:

- **Componente Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Usado em componentes React no lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Usado em componentes React no lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Usado em componentes React no lado do cliente
  ```

- **Componente Servidor:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Usado em componentes React no lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Usado em componentes React no lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Usado em componentes React no lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`key`**: A chave do dicionário para recuperar o conteúdo localizado.
2. **`locale`** (opcional): O idioma desejado. Por padrão, usa o idioma do contexto se não especificado.

## Dicionário

Todas as chaves do dicionário devem ser declaradas em arquivos de declaração de conteúdo para melhorar a segurança de tipos e evitar erros. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

## Exemplo de Uso no React

Demonstração do hook `useIntlayer` em um componente React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Manipulando Atributos

Ao localizar atributos, acesse os valores de conteúdo adequadamente:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Recursos Adicionais

- **Editor Visual do Intlayer**: Para uma experiência de gerenciamento de conteúdo mais intuitiva, consulte a documentação do editor visual [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

Esta seção foca especificamente na integração do hook `useIntlayer` em aplicações React, simplificando o processo de localização e garantindo a consistência do conteúdo entre diferentes idiomas.
