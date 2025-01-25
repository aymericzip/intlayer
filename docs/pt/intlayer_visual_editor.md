# Intlayer Visual Editor Documentation

O Intlayer Visual Editor é uma ferramenta que irá encapsular seu site para interagir com seus arquivos de declaração de conteúdo usando um editor visual.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

## Editor visual vs CMS

O editor visual Intlayer é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez feita uma alteração, o conteúdo será substituído na base de código. Isso significa que a aplicação será reconstruída e a página será recarregada para exibir o novo conteúdo.

Em contraste, o [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários distantes. Uma vez feita uma alteração, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integrar o Intlayer na sua aplicação

Para mais detalhes sobre como integrar o intlayer, consulte a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).

## Como o Intlayer Editor Funciona

O editor visual em uma aplicação que inclui duas coisas:

- Uma aplicação frontend que exibirá seu site em um iframe. Se seu site usar o Intlayer, o editor visual irá detectar automaticamente seu conteúdo e permitirá que você interaja com ele. Uma vez feita uma modificação, você poderá baixar suas alterações.

- Uma vez que você clicar no botão de download, o editor visual enviará um pedido ao servidor para substituir seus arquivos de declaração de conteúdo pelo novo conteúdo (onde quer que esses arquivos estejam declarados em seu projeto).

> Note que por enquanto, o Intlayer Editor irá gravar seus arquivos de declaração de conteúdo como arquivos JSON.

## Instalação

Uma vez que o Intlayer está configurado em seu projeto, simplesmente instale `intlayer-editor` como uma dependência de desenvolvimento:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuração

### 1. Habilite o Editor no seu arquivo intlayer.config.ts

Em seu arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `8000`.
     * A porta do servidor do editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Padrão como "http://localhost:8000"
     * A URL do servidor do editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desabilitar o editor para ambientes específicos por motivos de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
   /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `8000`.
     * A porta do servidor do editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Padrão como "http://localhost:8000"
     * A URL do servidor do editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desabilitar o editor para ambientes específicos por motivos de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
   /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `8000`.
     * A porta do servidor do editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Padrão como "http://localhost:8000"
     * A URL do servidor do editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desabilitar o editor para ambientes específicos por motivos de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Usando o Editor

1. Quando o editor estiver instalado, você pode iniciar o editor usando o seguinte comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. Em seguida, abra a URL fornecida. Por padrão `http://localhost:8000`.

   Você pode visualizar cada campo indexado pelo Intlayer passando o cursor sobre seu conteúdo.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se seu conteúdo estiver destacado, você pode pressioná-lo longamente para exibir a gaveta de edição.
