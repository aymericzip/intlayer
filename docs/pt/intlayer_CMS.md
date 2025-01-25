# Intlayer Sistema de Gerenciamento de Conteúdo (CMS) Documentação

O Intlayer CMS é um aplicativo que permite externalizar seu conteúdo de um projeto Intlayer.

Para isso, o Intlayer introduz o conceito de 'dicionários distantes'.

## Entendendo dicionários distantes

O Intlayer faz diferença entre dicionários 'locais' e 'distantes'.

- Um dicionário 'local' é um dicionário que é declarado em seu projeto Intlayer. Como por exemplo, o arquivo de declaração de um botão ou sua barra de navegação. Externalizar seu conteúdo não faz sentido nesse caso, pois esse conteúdo não deve mudar com frequência.

- Um dicionário 'distante' é um dicionário que é gerenciado através do Intlayer CMS. Pode ser útil para permitir que sua equipe gerencie seu conteúdo diretamente em seu site e também visa usar recursos de testes A/B e otimização automática de SEO.

## Editor visual vs CMS

O [Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez que uma alteração é feita, o conteúdo será substituído na base do código. Isso significa que o aplicativo será reconstruído e a página será recarregada para exibir o novo conteúdo.

Em contraste, o Intlayer CMS é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários distantes. Uma vez que uma alteração é feita, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integração

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).

## Configuração

### 1. Ative o Editor em seu arquivo intlayer.config.ts

Em seu arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações de configuração
  editor: {
    /**
     * O Client ID e o client secret são necessários para ativar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor para ambientes específicos por razões de segurança, como produção.
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
  // ... outras configurações de configuração
  editor: {
    /**
     * O Client ID e o client secret são necessários para ativar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor para ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações de configuração
  editor: {
    /**
     * O Client ID e o client secret são necessários para ativar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor para ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Se você não tem um Client ID e client secret, você pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projetos](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Usando o CMS

Quando o editor está instalado, você pode visualizar cada campo indexado pelo Intlayer passando o cursor sobre seu conteúdo.

![Passando o cursor sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se seu conteúdo estiver contornado, você pode pressioná-lo longamente para exibir a gaveta de edição.
