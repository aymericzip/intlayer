# Integração com Next.js: Documentação do Hook `useIntlayer`

O hook `useIntlayer` é projetado para aplicações Next.js para buscar e gerenciar conteúdo localizado de forma eficiente. Esta documentação se concentrará em como utilizar o hook dentro de projetos Next.js, garantindo práticas adequadas de localização.

## Importando `useIntlayer` no Next.js

Dependendo se você está trabalhando em componentes do lado do cliente ou do lado do servidor em uma aplicação Next.js, você pode importar o hook `useIntlayer` da seguinte forma:

- **Componente do Cliente:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Usado em componentes do lado do cliente
  ```

- **Componente do Servidor:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Usado em componentes do lado do servidor
  ```

## Parâmetros

1. **`key`**: Um identificador de string para a chave do dicionário da qual você deseja recuperar conteúdo.
2. **`locale`** (opcional): Um local específico a ser utilizado. Se omitido, o hook usa o local definido no contexto do cliente ou do servidor.

## Arquivos de Declaração de Conteúdo

É crucial que todas as chaves de conteúdo sejam definidas dentro de arquivos de declaração de conteúdo para prevenir erros em tempo de execução e garantir segurança de tipos. Esta abordagem também facilita a integração com TypeScript para validação em tempo de compilação.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

## Exemplo de Uso no Next.js

Aqui está como você pode implementar o hook `useIntlayer` dentro de uma página Next.js para carregar dinamicamente conteúdo localizado com base no local atual da aplicação:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

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

## Tratamento de Localização de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., certifique-se de referenciar o conteúdo corretamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Mais Informações

- **Editor Visual do Intlayer**: Aprenda a usar o editor visual para facilitar o gerenciamento de conteúdo [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

Esta documentação descreve o uso do hook `useIntlayer` especificamente em ambientes Next.js, fornecendo uma solução robusta para gerenciar a localização em suas aplicações Next.js.
