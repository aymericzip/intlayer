---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Externalize seu conteúdo no Intlayer CMS
description: Externalize seu conteúdo no Intlayer CMS para delegar a gestão do seu conteúdo para sua equipe.
keywords:
  - CMS
  - Editor Visual
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Adiciona documentação sobre live sync
  - version: 6.0.0
    date: 2025-09-04
    changes: Substitui o campo `hotReload` por `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação do Sistema de Gestão de Conteúdo (CMS) Intlayer

<iframe title="Editor Visual + CMS para sua Aplicação Web: Intlayer Explicado" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

O Intlayer CMS é uma aplicação que permite externalizar o conteúdo de um projeto Intlayer.

Para isso, o Intlayer introduz o conceito de 'dicionários distantes'.

![Interface do Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Entendendo os dicionários distantes

O Intlayer faz uma distinção entre dicionários 'locais' e 'distantes'.

- Um dicionário 'local' é um dicionário que é declarado no seu projeto Intlayer. Como o arquivo de declaração de um botão, ou sua barra de navegação. Externalizar seu conteúdo não faz sentido neste caso porque esse conteúdo não deve mudar com frequência.

- Um dicionário 'distante' é um dicionário que é gerenciado através do Intlayer CMS. Pode ser útil para permitir que sua equipe gerencie seu conteúdo diretamente no seu site, e também tem como objetivo usar recursos de testes A/B e otimização automática de SEO.

## Editor visual vs CMS

O editor [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez que uma alteração é feita, o conteúdo será substituído na base de código. Isso significa que a aplicação será reconstruída e a página será recarregada para exibir o novo conteúdo.

Em contraste, o Intlayer CMS é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários distantes. Uma vez que uma alteração é feita, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integração

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md).

## Configuração

No seu arquivo de configuração do Intlayer, você pode personalizar as configurações do CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     *
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * Client ID e client secret são necessários para ativar o editor.
     * Eles permitem identificar o usuário que está editando o conteúdo.
     * Podem ser obtidos criando um novo cliente no Painel do Intlayer - Projetos (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida para https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do backend.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida para https://back.intlayer.org
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
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * O ID do cliente e o segredo do cliente são necessários para ativar o editor.
     * Eles permitem identificar o utilizador que está a editar o conteúdo.
     * Podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do backend.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida como https://back.intlayer.org
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
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obrigatório
     *
     * O Client ID e o client secret são necessários para ativar o editor.
     * Eles permitem identificar o utilizador que está a editar o conteúdo.
     * Podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do CMS.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * No caso de estar a hospedar o Intlayer CMS por conta própria, pode definir a URL do backend.
     *
     * A URL do Intlayer CMS.
     * Por padrão, está definida como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Se não tiver um client ID e client secret, pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Usando o CMS

### Enviar a sua configuração

Para configurar o Intlayer CMS, pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/intlayer_cli.md).

```bash
npx intlayer config push
```

> Se usar variáveis de ambiente no seu ficheiro de configuração `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash
npx intlayer config push --env production
```

Este comando envia a sua configuração para o Intlayer CMS.

### Enviar um dicionário

Para transformar os seus dicionários de localidade num dicionário remoto, pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Se usar variáveis de ambiente no seu ficheiro de configuração `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando envia os seus dicionários de conteúdo iniciais, tornando-os disponíveis para obtenção e edição assíncronas através da plataforma Intlayer.

### Editar o dicionário

Depois, poderá ver e gerir o seu dicionário no [Intlayer CMS](https://app.intlayer.org/content).

## Sincronização ao vivo

A Sincronização ao Vivo permite que a sua aplicação reflita as alterações de conteúdo do CMS em tempo de execução. Não é necessário reconstruir ou reimplantar. Quando ativada, as atualizações são transmitidas para um servidor de Sincronização ao Vivo que atualiza os dicionários que a sua aplicação lê.

> A Sincronização ao Vivo requer uma conexão contínua com o servidor e está disponível no plano enterprise.

Ative a Sincronização ao Vivo atualizando a sua configuração Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Ativa o recarregamento a quente das configurações de localidade quando são detetadas alterações.
     * Por exemplo, quando um dicionário é adicionado ou atualizado, a aplicação atualiza
     * o conteúdo exibido na página.
     *
     * Como o recarregamento a quente requer uma conexão contínua com o servidor, está
     * disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controla como os dicionários são importados:
     *
     * - "live": Os dicionários são buscados dinamicamente usando a API de Sincronização ao Vivo.
     *   Substitui useIntlayer por useDictionaryDynamic.
     *
     * Nota: O modo live usa a API de Sincronização ao Vivo para buscar os dicionários. Se a chamada da API
     * falhar, os dicionários são importados dinamicamente.
     * Nota: Apenas dicionários com conteúdo remoto e sinalizadores "live" usam o modo live.
     * Outros usam o modo dinâmico para melhor desempenho.
     */
    importMode: "live",
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
     * Habilita o recarregamento a quente das configurações de localidade quando alterações são detectadas.
     * Por exemplo, quando um dicionário é adicionado ou atualizado, a aplicação atualiza
     * o conteúdo exibido na página.
     *
     * Como o recarregamento a quente requer uma conexão contínua com o servidor, ele está
     * disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controla como os dicionários são importados:
     *
     * - "live": Os dicionários são buscados dinamicamente usando a API de Sincronização ao Vivo.
     *   Substitui useIntlayer por useDictionaryDynamic.
     *
     * Nota: O modo live usa a API de Sincronização ao Vivo para buscar os dicionários. Se a chamada da API
     * falhar, os dicionários são importados dinamicamente.
     * Nota: Apenas dicionários com conteúdo remoto e sinalizadores "live" usam o modo live.
     * Outros usam o modo dinâmico para melhor desempenho.
     */
    importMode: "live",
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
     * Habilita o recarregamento a quente das configurações de localidade quando alterações são detectadas.
     * Por exemplo, quando um dicionário é adicionado ou atualizado, a aplicação atualiza
     * o conteúdo exibido na página.
     *
     * Como o recarregamento a quente requer uma conexão contínua com o servidor, ele está
     * disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    liveSync: true,

    /**
     * A porta do servidor Live Sync.
     *
     * Padrão: 4000
     */
    liveSyncPort: 4000,

    /**
     * A URL do servidor Live Sync.
     *
     * Padrão: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Controla como os dicionários são importados:
     *
     * - "live": Os dicionários são buscados dinamicamente usando a API Live Sync.
     *   Substitui useIntlayer por useDictionaryDynamic.
     *
     * Nota: O modo live usa a API Live Sync para buscar os dicionários. Se a chamada da API
     * falhar, os dicionários são importados dinamicamente.
     * Nota: Apenas dicionários com conteúdo remoto e sinalizadores "live" usam o modo live.
     * Outros usam o modo dinâmico para melhor desempenho.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Inicie o servidor Live Sync para envolver sua aplicação:

Exemplo usando Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Exemplo usando Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

O servidor Live Sync envolve sua aplicação e aplica automaticamente o conteúdo atualizado assim que ele chega.

Para receber notificações de alterações do CMS, o servidor Live Sync mantém uma conexão SSE com o backend. Quando o conteúdo muda no CMS, o backend encaminha a atualização para o servidor Live Sync, que grava os novos dicionários. Sua aplicação refletirá a atualização na próxima navegação ou recarregamento do navegador — sem necessidade de reconstrução.

Fluxograma (CMS/Backend -> Servidor Live Sync -> Servidor de Aplicação -> Frontend):

![Esquema Lógico do Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Como funciona:

![Fluxo Live Sync CMS/Backend/Servidor Live Sync/Servidor de Aplicação/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Fluxo de trabalho de desenvolvimento (local)

- Em desenvolvimento, todos os dicionários remotos são buscados quando a aplicação inicia, para que você possa testar atualizações rapidamente.
- Para testar o Live Sync localmente com Next.js, envolva seu servidor de desenvolvimento:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Para Vite
  },
}
```

Habilite a otimização para que o Intlayer aplique as transformações de importação Live durante o desenvolvimento:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Esta configuração envolve seu servidor de desenvolvimento com o servidor Live Sync, busca dicionários remotos na inicialização e transmite atualizações do CMS via SSE. Atualize a página para ver as mudanças.

Notas e restrições:

- Adicione a origem do live sync à política de segurança do seu site (CSP). Certifique-se de que a URL do live sync esteja permitida em `connect-src` (e `frame-ancestors`, se relevante).
- O Live Sync não funciona com saída estática. Para Next.js, a página deve ser dinâmica para receber atualizações em tempo de execução (por exemplo, use `generateStaticParams`, `generateMetadata`, `getServerSideProps` ou `getStaticProps` adequadamente para evitar restrições de somente estático).
  /// No CMS, cada dicionário possui uma flag `live`. Apenas dicionários com `live=true` são buscados via API de sincronização ao vivo; os demais são importados dinamicamente e permanecem inalterados em tempo de execução.
  /// A flag `live` é avaliada para cada dicionário no momento da compilação. Se o conteúdo remoto não foi marcado como `live=true` durante a compilação, você deve recompilar para habilitar a Sincronização ao Vivo para esse dicionário.
  /// O servidor de sincronização ao vivo deve ter permissão para escrever em `.intlayer`. Em contêineres, assegure o acesso de escrita a `/.intlayer`.
  ///
  /// ## Depuração
  ///
  /// Se você encontrar algum problema com o CMS, verifique o seguinte:
  ///
  /// - A aplicação está em execução.
  ///
  /// - A configuração do [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) está corretamente definida no seu arquivo de configuração do Intlayer.
  /// - Campos obrigatórios:
- A URL da aplicação deve corresponder àquela que você definiu na configuração do editor (`applicationURL`).
- A URL do CMS

- Certifique-se de que a configuração do projeto foi enviada para o Intlayer CMS.

- O editor visual usa um iframe para exibir seu site. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu site permita a URL do CMS como `frame-ancestors` ('https://intlayer.org' por padrão). Verifique o console do editor para qualquer erro.
