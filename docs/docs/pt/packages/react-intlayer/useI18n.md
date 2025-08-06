---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Hook useI18n | react-intlayer
description: Aprenda como usar o hook useI18n no pacote react-intlayer
keywords:
  - useI18n
  - i18n
  - tradução
  - dicionário
  - Intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# Integração com React: Documentação do Hook `useI18n`

Esta seção fornece orientações detalhadas sobre como usar o hook `useI18n` em aplicações React, permitindo uma localização eficiente de conteúdo.

## Importando `useI18n` no React

O hook `useI18n` pode ser importado e integrado em aplicações React conforme o contexto, da seguinte forma:

- **Componentes Cliente:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Use em componentes React do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Use em componentes React do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Use em componentes React do lado do cliente
  ```

- **Componentes Servidor:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Use em componentes React do lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Use em componentes React do lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Use em componentes React do lado do servidor
  ```

## Parâmetros

Este hook aceita dois parâmetros:

1. **`namespace`**: Um namespace de dicionário para delimitar as chaves de tradução.
2. **`locale`** (opcional): O locale desejado. Se não especificado, o locale do contexto será usado como padrão.

## Dicionário

Todas as chaves do dicionário devem ser declaradas dentro dos arquivos de declaração de conteúdo para aumentar a segurança de tipos e evitar erros. [Instruções de configuração podem ser encontradas aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

## Exemplos de Uso em React

Exemplos de uso do hook `useI18n` dentro de componentes React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Exibe o título */}
      <p>{t("description")}</p> {/* Exibe a descrição */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Exibe o título */}
      <p>{t("description")}</p> {/* Exibe a descrição */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Exibe o título */}
      <p>{t("description")}</p> {/* Exibe a descrição */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Exibe o título */}
      <p>{t("description")}</p> {/* Exibe a descrição */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Exibe o título */}
      <p>{t("description")}</p> {/* Exibe a descrição */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Manipulação de Atributos

Ao localizar atributos, acesse os valores de tradução de forma apropriada:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Para atributos de acessibilidade (ex.: aria-label), use .value pois são necessárias strings puras -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Recursos Adicionais

- **Editor Visual Intlayer**: Para uma experiência de gerenciamento de conteúdo mais intuitiva, consulte a documentação do editor visual [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

Esta seção cobre especificamente a integração do hook `useI18n` em aplicações React, simplificando o processo de localização e garantindo a consistência do conteúdo entre diferentes locais.

## Histórico da Documentação

- 6.0.0 - 2025-06-29: Escrita inicial da documentação do hook `useI18n`
