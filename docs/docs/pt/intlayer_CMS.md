---
createdAt: 2025-08-23
updatedAt: 2026-06-30
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
  - version: 9.0.0
    date: 2026-06-30
    changes: "Adicionada seção de Auto-hospedagem: bootstrap Docker Compose, inventário de serviços, configuração SDK, recursos opcionais e notas de atualização"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Adiciona documentação sobre live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Substitui o campo `hotReload` por `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Documentação do Sistema de Gestão de Conteúdo (CMS) Intlayer

<iframe title="Editor Visual + CMS para sua Aplicação Web: Intlayer Explicado" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

O Intlayer CMS é uma aplicação que permite externalizar o conteúdo de um projeto Intlayer.

Para isso, o Intlayer introduz o conceito de 'dicionários distantes'.

![Interface do Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Índice

<TOC/>

---

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

Execute o seguinte comando para fazer login no Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Isso abrirá seu navegador padrão para concluir o processo de autenticação e receber as credenciais necessárias (Client ID e Client Secret) para usar os serviços do Intlayer.

No seu arquivo de configuração do Intlayer, você pode personalizar as configurações do CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Se não tiver um client ID e client secret, pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Usando o CMS

### Enviar a sua configuração

Para configurar o Intlayer CMS, pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Se usar variáveis de ambiente no seu ficheiro de configuração `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Este comando envia a sua configuração para o Intlayer CMS.

### Enviar um dicionário

Para transformar os seus dicionários de localidade num dicionário remoto, pode usar os comandos do [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pt/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Se usar variáveis de ambiente no seu ficheiro de configuração `intlayer.config.ts`, pode especificar o ambiente desejado usando o argumento `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando envia os seus dicionários de conteúdo iniciais, tornando-os disponíveis para obtenção e edição assíncronas através da plataforma Intlayer.

### Editar o dicionário

Depois, poderá ver e gerir o seu dicionário no [Intlayer CMS](https://app.intlayer.org/content).

## Sincronização ao vivo

A Sincronização ao Vivo permite que a sua aplicação reflita as alterações de conteúdo do CMS em tempo de execução. Não é necessário reconstruir ou reimplantar. Quando ativada, as atualizações são transmitidas para um servidor de Sincronização ao Vivo que atualiza os dicionários que a sua aplicação lê.

> A Sincronização ao Vivo requer uma conexão contínua com o servidor e está disponível no plano enterprise.

Ative a Sincronização ao Vivo atualizando a sua configuração Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

Inicie o servidor Live Sync para envolver sua aplicação:

Exemplo usando Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

O servidor Live Sync envolve sua aplicação e aplica automaticamente o conteúdo atualizado assim que ele chega.

Para receber notificações de alterações do CMS, o servidor Live Sync mantém uma conexão SSE com o backend. Quando o conteúdo muda no CMS, o backend encaminha a atualização para o servidor Live Sync, que grava os novos dicionários. Sua aplicação refletirá a atualização na próxima navegação ou recarregamento do navegador, sem necessidade de reconstrução.

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
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Para Vite
  },
}
```

Habilite a otimização para que o Intlayer aplique as transformações de importação Live durante o desenvolvimento:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
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

- O editor visual usa um iframe para exibir seu site. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu site permita a URL do CMS como `frame-ancestors` ('https://app.intlayer.org' por padrão). Verifique o console do editor para qualquer erro.

## Auto-hospedagem

O Intlayer pode ser executado inteiramente na sua própria infraestrutura — sem necessidade de conta no Intlayer Cloud. Um único comando inicializa toda a pilha (dashboard, API, banco de dados, armazenamento de objetos e e-mail) usando Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Isso baixa um `docker-compose.yml` e um `.env`, gera automaticamente os secrets necessários (`BETTER_AUTH_SECRET`, credenciais do MinIO) e inicia todos os contêineres com `docker compose up -d`. Executar o mesmo comando novamente em uma instalação existente realiza uma atualização gradual sem perda de dados.

### Serviços iniciados

| Serviço             | Porta(s)                              | Finalidade                                         |
| ------------------- | ------------------------------------- | -------------------------------------------------- |
| **app** (dashboard) | `3000`                                | Interface CMS TanStack Start                       |
| **backend** (API)   | `3100`                                | API REST Fastify                                   |
| **MongoDB 7**       | interno                               | Banco de dados principal (replica set de nó único) |
| **Redis 7**         | interno                               | Filas de tarefas e cache                           |
| **MinIO**           | `9000` (S3), `9001` (console)         | Armazenamento de objetos compatível com S3         |
| **Mailpit**         | `1025` (SMTP), `8025` (interface web) | Sumidouro local de e-mail transacional             |

O Chromium (para geração de capturas de tela com Puppeteer) está incluído na imagem do backend — nenhum contêiner adicional é necessário.

### Conectando seu projeto a uma instância auto-hospedada

Aponte sua configuração do Intlayer para seu próprio backend e dashboard em vez de `intlayer.org`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL do dashboard CMS auto-hospedado.
     * Padrão: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // ex. http://localhost:3000

    /**
     * URL da API backend auto-hospedada.
     * Padrão: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // ex. http://localhost:3100
  },
};

export default config;
```

Defina as variáveis de ambiente correspondentes no seu projeto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crie credenciais de acesso no seu dashboard auto-hospedado em `http://localhost:3000/projects`.

### SDK `@intlayer/api`: apontando para um backend auto-hospedado

Ao usar o SDK de forma programática, passe `backendURL` explicitamente para `createIntlayerCMS`:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

### Recursos opcionais

Estes recursos requerem contas externas e funcionam corretamente quando suas chaves estão ausentes do `.env` auto-hospedado:

| Recurso                                | Variável(is) de ambiente                        |
| -------------------------------------- | ----------------------------------------------- |
| Tradução / auditoria com IA            | `OPENAI_API_KEY`                                |
| Faturamento                            | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth do GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth do Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth do GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| E-mail transacional via Resend         | `RESEND_API_KEY` (padrão: Mailpit SMTP)         |

### Persistência de dados e atualizações

Três volumes do Docker contêm todo o estado persistente: `mongo-data`, `redis-data` e `minio-data`. Eles sobrevivem a reinicializações e atualizações de contêineres. Executar o instalador novamente baixa as imagens mais recentes e realiza um `docker compose up -d` gradual.

Portas expostas no host:

| Porta  | Serviço                                                               |
| ------ | --------------------------------------------------------------------- |
| `3000` | Dashboard                                                             |
| `3100` | API Backend                                                           |
| `8025` | Interface web de e-mail Mailpit                                       |
| `9000` | API S3 do MinIO (necessária para carregamento de assets no navegador) |
| `9001` | Console do MinIO                                                      |

Para uma referência completa de todas as variáveis de ambiente disponíveis e opções avançadas (proxy reverso, domínios personalizados, backup/restauração), consulte o [Guia de Auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

---

## Depuração

Se encontrar problemas com o CMS, verifique o seguinte:

- A aplicação está em execução.

- A configuração [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) está corretamente definida no seu arquivo de configuração do Intlayer.
  - Campos obrigatórios:
    - O URL da aplicação deve corresponder ao que você definiu na configuração do editor (`applicationURL`).
    - O URL do CMS

- Certifique-se de que a configuração do projeto foi enviada para o Intlayer CMS.

- O editor visual usa um iframe para exibir seu website. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu website permite o URL do CMS como `frame-ancestors` ('https://app.intlayer.org' por padrão). Verifique o console do editor para qualquer erro.
