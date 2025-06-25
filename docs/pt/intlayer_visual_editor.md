---
docName: intlayer_visual_editor
url: https://intlayer.org/doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Editor Visual Intlayer | Edite seu conteúdo usando um editor visual
description: Descubra como usar o Editor Intlayer para gerenciar seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
keywords:
  - Editor
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Documentação do Editor Visual Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

O Editor Visual Intlayer é uma ferramenta que envolverá seu site para interagir com seus arquivos de declaração de conteúdo usando um editor visual.

![Interface do Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

## Editor visual vs CMS

O Editor Visual Intlayer é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez feita uma alteração, o conteúdo será substituído na base de código. Isso significa que a aplicação será reconstruída e a página será recarregada para exibir o novo conteúdo.

Em contraste, o [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários remotos. Uma vez feita uma alteração, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integrar o Intlayer na sua aplicação

Para mais detalhes sobre como integrar o Intlayer, consulte a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).

## Como o Editor Intlayer Funciona

O editor visual em uma aplicação inclui duas coisas:

- Uma aplicação frontend que exibirá seu site em um iframe. Se seu site usa o Intlayer, o editor visual detectará automaticamente seu conteúdo e permitirá que você interaja com ele. Uma vez feita uma modificação, você poderá baixar suas alterações.

- Após clicar no botão de download, o editor visual enviará uma solicitação ao servidor para substituir seus arquivos de declaração de conteúdo pelo novo conteúdo (onde quer que esses arquivos estejam declarados em seu projeto).

> Observe que, por enquanto, o Editor Intlayer gravará seus arquivos de declaração de conteúdo como arquivos JSON.

## Instalação

Depois que o Intlayer estiver configurado em seu projeto, basta instalar o `intlayer-editor` como uma dependência de desenvolvimento:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## Configuração

No arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     * Exemplo: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor em ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     * Exemplo: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor em ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opcional
     * Padrão como `8000`.
     * A porta usada pelo servidor do editor visual.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Padrão como "http://localhost:8000"
     * A URL do servidor do editor para acessar a partir da aplicação. Usado para restringir as origens que podem interagir com a aplicação por razões de segurança. Se definido como `'*'`, o editor é acessível de qualquer origem. Deve ser configurado se a porta for alterada ou se o editor estiver hospedado em um domínio diferente.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
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
     * Pode ser usado para desativar o editor em ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Usando o Editor

1. Quando o editor estiver instalado, você pode iniciá-lo usando o seguinte comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Observe que você deve executar sua aplicação em paralelo.** A URL da aplicação deve corresponder à que você configurou no editor (`applicationURL`).

2. Em seguida, abra a URL fornecida. Por padrão `http://localhost:8000`.

   Você pode visualizar cada campo indexado pelo Intlayer passando o cursor sobre seu conteúdo.

   ![Passando o cursor sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se o seu conteúdo estiver destacado, você pode pressioná-lo por um longo tempo para exibir a gaveta de edição.

## Depuração

Se você encontrar problemas com o editor visual, verifique o seguinte:

- O editor visual e a aplicação estão em execução.

- As configurações do [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) estão corretamente definidas no arquivo de configuração do Intlayer.

  - Campos obrigatórios:
    - A URL da aplicação deve corresponder à que você configurou no editor (`applicationURL`).

- O editor visual usa um iframe para exibir seu site. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu site permite a URL do CMS como `frame-ancestors` ('http://localhost:8000' por padrão). Verifique o console do editor para quaisquer erros.
