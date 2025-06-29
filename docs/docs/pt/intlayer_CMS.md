---
docName: intlayer_CMS
url: https://intlayer.org/doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CMS Intlayer | Externe seu conteúdo no CMS Intlayer
description: Externe seu conteúdo no CMS Intlayer para delegar a gestão do seu conteúdo ao seu time.
keywords:
  - CMS
  - Editor visual
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Sistema de Gerenciamento de Conteúdo (CMS) Documentação

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

O Intlayer CMS é um aplicativo que permite externalizar o conteúdo de um projeto Intlayer.

Para isso, o Intlayer introduz o conceito de 'dicionários distantes'.

![Interface do Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Entendendo os dicionários distantes

O Intlayer faz uma distinção entre dicionários 'locais' e 'distantes'.

- Um dicionário 'local' é um dicionário declarado no seu projeto Intlayer. Como o arquivo de declaração de um botão ou sua barra de navegação. Externalizar seu conteúdo não faz sentido neste caso, pois este conteúdo não deve mudar frequentemente.

- Um dicionário 'distante' é um dicionário gerenciado através do Intlayer CMS. Ele pode ser útil para permitir que sua equipe gerencie seu conteúdo diretamente no site e também tem como objetivo usar recursos de teste A/B e otimização automática de SEO.

## Editor visual vs CMS

O [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez feita uma alteração, o conteúdo será substituído na base de código. Isso significa que o aplicativo será reconstruído e a página será recarregada para exibir o novo conteúdo.

Em contraste, o Intlayer CMS é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários distantes. Uma vez feita uma alteração, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integração

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md).

## Configuração

No arquivo de configuração do Intlayer, você pode personalizar as configurações do CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     *
     * A URL do aplicativo.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * O ID do cliente e o segredo do cliente são necessários para habilitar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definido como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do backend.
     *
     * A URL do backend do Intlayer CMS.
     * Por padrão, está definido como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * A URL do aplicativo.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * O ID do cliente e o segredo do cliente são necessários para habilitar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definido como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do backend.
     *
     * A URL do backend do Intlayer CMS.
     * Por padrão, está definido como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * A URL do aplicativo.
     * Esta é a URL direcionada pelo editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * O ID do cliente e o segredo do cliente são necessários para habilitar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Eles podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projetos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definido como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * Caso você esteja hospedando o Intlayer CMS, pode definir a URL do backend.
     *
     * A URL do backend do Intlayer CMS.
     * Por padrão, está definido como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Se você não tiver um ID de cliente e um segredo de cliente, pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projetos](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Usando o CMS

### Enviar sua configuração

Para configurar o Intlayer CMS, você pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/intlayer_cli.md).

```bash
npx intlayer config push
```

> Se você usar variáveis de ambiente no arquivo `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash
npx intlayer config push --env production
```

Este comando carrega sua configuração para o Intlayer CMS.

### Enviar um dicionário

Para transformar seus dicionários locais em um dicionário distante, você pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Se você usar variáveis de ambiente no arquivo `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando carrega seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca assíncrona e edição através da plataforma Intlayer.

### Editar o dicionário

Então, você poderá ver e gerenciar seu dicionário no [Intlayer CMS](https://intlayer.org/dashboard/content).

## Hot reloading

O Intlayer CMS é capaz de recarregar os dicionários automaticamente quando uma alteração é detectada.

Sem o hot reloading, será necessário um novo build do aplicativo para exibir o novo conteúdo.

Ao ativar a configuração [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration), o aplicativo substituirá automaticamente o conteúdo atualizado quando detectado.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    // ... outras configurações

    /**
     * Indica se o aplicativo deve recarregar automaticamente as configurações de localidade quando uma alteração for detectada.
     * Por exemplo, quando um novo dicionário é adicionado ou atualizado, o aplicativo atualizará o conteúdo exibido na página.
     *
     * Como o hot reloading requer uma conexão contínua com o servidor, ele está disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    // ... outras configurações

    /**
     * Indica se o aplicativo deve recarregar automaticamente as configurações de localidade quando uma alteração for detectada.
     * Por exemplo, quando um novo dicionário é adicionado ou atualizado, o aplicativo atualizará o conteúdo exibido na página.
     *
     * Como o hot reloading requer uma conexão contínua com o servidor, ele está disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... outras configurações
  editor: {
    // ... outras configurações

    /**
     * Indica se o aplicativo deve recarregar automaticamente as configurações de localidade quando uma alteração for detectada.
     * Por exemplo, quando um novo dicionário é adicionado ou atualizado, o aplicativo atualizará o conteúdo exibido na página.
     *
     * Como o hot reloading requer uma conexão contínua com o servidor, ele está disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

O hot reloading substitui o conteúdo tanto no lado do servidor quanto no lado do cliente.

- No lado do servidor, você deve garantir que o processo do aplicativo tenha acesso de gravação ao diretório `.intlayer/dictionaries`.
- No lado do cliente, o hot reloading permite que o aplicativo recarregue o conteúdo no navegador, sem a necessidade de recarregar a página. No entanto, este recurso está disponível apenas para componentes clientes.

> Como o hot reloading requer uma conexão contínua com o servidor usando um `EventListener`, ele está disponível apenas para clientes do plano `enterprise`.

## Depuração

Se você encontrar problemas com o CMS, verifique o seguinte:

- O aplicativo está em execução.

- As configurações do [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) estão corretamente definidas no arquivo de configuração do Intlayer.

  - Campos obrigatórios:
    - A URL do aplicativo deve corresponder à que você definiu na configuração do editor (`applicationURL`).
    - A URL do CMS.

- Certifique-se de que a configuração do projeto foi enviada para o Intlayer CMS.

- O editor visual usa um iframe para exibir seu site. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu site permite a URL do CMS como `frame-ancestors` ('https://intlayer.org' por padrão). Verifique o console do editor para quaisquer erros.
