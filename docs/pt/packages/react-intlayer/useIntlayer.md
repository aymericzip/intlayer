# Integração com React: Documentação do Hook `useIntlayer`

Esta seção fornece orientações detalhadas sobre o uso do hook `useIntlayer` em aplicações React, permitindo a localização eficiente de conteúdo.

## Importando `useIntlayer` no React

O hook `useIntlayer` pode ser integrado em aplicações React importando-o com base no contexto:

- **Componente do Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Usado em componentes React do lado do cliente
  ```

- **Componente do Servidor:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Usado em componentes React do lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`key`**: A chave do dicionário para recuperar conteúdo localizado.
2. **`locale`** (opcional): O local desejado. Por padrão, usa o local do contexto se não especificado.

## Declaração de Conteúdo

Todas as chaves do dicionário devem ser declaradas dentro de arquivos de declaração de conteúdo para aumentar a segurança de tipo e evitar erros. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

## Exemplo de Uso no React

Demonstrando o hook `useIntlayer` dentro de um componente React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale); // Usando o hook para recuperar conteúdo

  return (
    <>
      <p>{content.introduction}</p> // Introdução do conteúdo
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
  const content = useIntlayer("homepage", locale); // Usando o hook para recuperar conteúdo

  return (
    <>
      <p>{content.introduction}</p> // Introdução do conteúdo
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
  const content = useIntlayer("homepage", locale); // Usando o hook para recuperar conteúdo

  return (
    <>
      <p>{content.introduction}</p> // Introdução do conteúdo
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
  const content = useIntlayer("component-example"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente
      <p>{content.description}</p> // Descrição do componente
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente
      <p>{content.description}</p> // Descrição do componente
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente
      <p>{content.description}</p> // Descrição do componente
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente do servidor
      <p>{content.description}</p> // Descrição do componente do servidor
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente do servidor
      <p>{content.description}</p> // Descrição do componente do servidor
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // Usando o hook para recuperar conteúdo

  return (
    <div>
      <h1>{content.title}</h1> // Título do componente do servidor
      <p>{content.description}</p> // Descrição do componente do servidor
    </div>
  );
};
```

## Manipulando Atributos

Ao localizar atributos, acesse os valores do conteúdo adequadamente:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button> // Utilizando título local
```

## Recursos Adicionais

- **Editor Visual do Intlayer**: Para uma experiência mais intuitiva de gerenciamento de conteúdo, consulte a documentação do editor visual [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

Esta seção visa especificamente a integração do hook `useIntlayer` em aplicações React, simplificando o processo de localização e garantindo consistência de conteúdo entre diferentes locais.
