# Integração React: Documentação do Hook `useIntlayer`

Esta seção fornece orientação detalhada sobre o uso do hook `useIntlayer` em aplicativos React, permitindo a localização eficiente de conteúdo.

## Importando `useIntlayer` no React

O hook `useIntlayer` pode ser integrado em aplicativos React importando-o com base no contexto:

- **Componente do Cliente:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

- **Componente do Servidor:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`key`**: A chave do dicionário para recuperar conteúdo localizado.
2. **`locale`** (opcional): O local desejado. Padrão para o local do contexto, se não especificado.

## Declaração de Conteúdo

Todas as chaves do dicionário devem ser declaradas dentro de arquivos de declaração de conteúdo para melhorar a segurança de tipo e evitar erros. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

## Exemplo de Uso no React

Demonstrando o hook `useIntlayer` dentro de um componente React:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

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

## Manipulando Atributos

Ao localizar atributos, acesse os valores de conteúdo adequadamente:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Recursos Adicionais

- **Editor Visual do Intlayer**: Para uma experiência de gerenciamento de conteúdo mais intuitiva, consulte a documentação do editor visual [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

Esta seção se destina especificamente à integração do hook `useIntlayer` em aplicativos React, simplificando o processo de localização e garantindo consistência de conteúdo entre diferentes locais.
