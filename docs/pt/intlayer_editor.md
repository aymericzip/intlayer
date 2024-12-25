# Intlayer Editor Documentation

O Intlayer Editor é uma ferramenta que transforma sua aplicação em um editor visual. Com o Intlayer Editor, suas equipes podem gerenciar o conteúdo do seu site em todos os idiomas configurados.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

## Integrando

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integrando com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integrando com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Integrando com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).

## Como o Intlayer Editor Funciona

Cada vez que você faz uma alteração usando o Intlayer Editor, o servidor automaticamente insere suas alterações em seus [arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md), onde quer que esses arquivos sejam declarados em seu projeto.

Dessa forma, você não precisa se preocupar sobre onde o arquivo está declarado ou sobre encontrar sua chave em sua coleção de dicionário.

## Instalação

Uma vez que o Intlayer está configurado em seu projeto, basta instalar `intlayer-editor` como uma dependência de desenvolvimento:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Configuração

### 1. Habilitar o Editor no seu arquivo intlayer.config.ts

No seu arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se falso, o editor está inativo e não pode ser acessado.
    // Client ID e client secret são necessários para habilitar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se falso, o editor está inativo e não pode ser acessado.
    // Client ID e client secret são necessários para habilitar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se falso, o editor está inativo e não pode ser acessado.
    // Client ID e client secret são necessários para habilitar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Se você não tiver um client ID e client secret, pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### 2. Insira o Intlayer Editor Provider na sua aplicação

Para habilitar o editor, você precisa inserir o Intlayer Editor Provider na sua aplicação.

Exemplo para aplicações React JS ou Vite + React:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Exemplo para aplicações Next.js:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Adicione as folhas de estilo à sua aplicação

Para exibir os estilos do editor, você precisa adicionar as folhas de estilo à sua aplicação.

Se o Tailwind for usado, você pode adicionar as folhas de estilo ao seu arquivo `tailwind.config.js`:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... resto do seu conteúdo
  ],
  // ...
};
```

Caso contrário, você pode importar as folhas de estilo na sua aplicação:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

Ou

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Usando o Editor

Quando o editor está instalado, habilitado e iniciado, você pode visualizar cada campo indexado pelo Intlayer movendo o cursor sobre seu conteúdo.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se seu conteúdo estiver destacado, você pode pressioná-lo por um tempo para exibir o painel de edição.
