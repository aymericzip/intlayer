---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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
    date: 2026-07-08
    changes: "Seção «Sincronização ao vivo» movida para sua própria página (live-sync.md), mantendo aqui uma breve introdução com link"
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

Para o guia de configuração completo (ativação, início do servidor Live Sync, fluxo de trabalho de desenvolvimento local e restrições), consulte a [documentação do Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/live-sync.md).

### Instalação

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Como funciona: autenticador + endpoints

O SDK é dividido em **duas importações separadas** propositalmente, para manter seu bundle pequeno:

1. `createIntlayerCMS` — cria um **autenticador** leve. Ele apenas contém as credenciais e o token de acesso gerenciado; não sabe nada sobre nenhum domínio específico.
2. `dictionaryEndpoint`, `projectEndpoint`, … — **vinculadores de endpoint** por domínio, cada um importado de seu próprio subcaminho (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Você passa o autenticador para o endpoint que precisa.

Como cada endpoint é importado separadamente, seu bundle inclui apenas os domínios que você realmente usa — importar `dictionaryEndpoint` nunca puxa o cliente de projeto, IA ou qualquer outro domínio.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// A configuração é opcional: quando omitida, as credenciais são lidas de
// `@intlayer/config/built`, que resolve as variáveis de ambiente
// INTLAYER_CLIENT_ID e INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> As credenciais do CMS (`clientId` / `clientSecret`) concedem **acesso de escrita** ao seu conteúdo. Sempre crie o autenticador apenas no **lado do servidor** (server actions, route handlers, scripts, CI). Nunca importe para código do lado do cliente ou exponha suas credenciais ao navegador.

Se preferir não depender da configuração em tempo de build, passe as credenciais explicitamente:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Opcional, para backends auto-hospedados:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Obtenha suas credenciais criando uma nova chave de acesso no [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

### Conectando seu projeto a uma instância auto-hospedada

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

### SDK `@intlayer/api`: apontando para um backend auto-hospedado

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

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Criar um novo dicionário
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert um lote de dicionários (criar ou atualizar em uma única chamada)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Atualizar um dicionário existente
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

| Recurso                                | Variável(is) de ambiente                        |
| -------------------------------------- | ----------------------------------------------- |
| Tradução / auditoria com IA            | `OPENAI_API_KEY`                                |
| Faturamento                            | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth do GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth do Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth do GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| E-mail transacional via Resend         | `RESEND_API_KEY` (padrão: Mailpit SMTP)         |

### Persistência de dados e atualizações

Portas expostas no host:

| Porta  | Serviço                                                               |
| ------ | --------------------------------------------------------------------- |
| `3000` | Dashboard                                                             |
| `3100` | API Backend                                                           |
| `8025` | Interface web de e-mail Mailpit                                       |
| `9000` | API S3 do MinIO (necessária para carregamento de assets no navegador) |
| `9001` | Console do MinIO                                                      |

## Live Sync

O Live Sync permite que seu aplicativo reflita as alterações de conteúdo do CMS em tempo de execução — sem necessidade de reconstrução ou reimplantação. Quando habilitado, as atualizações são transmitidas para um servidor Live Sync que atualiza os dicionários que seu aplicativo lê.

Para o guia de configuração completo (configuração, iniciando o servidor Live Sync, fluxo de trabalho de desenvolvimento local e restrições), consulte a [documentação do Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/live-sync.md).

## Auto-hospedagem

O Intlayer pode ser executado inteiramente em sua própria infraestrutura. Um comando único inicializa a pilha completa (dashboard, API, banco de dados, armazenamento de objetos e email) com Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Para o guia de configuração completo, referência de variáveis de ambiente, instruções de atualização e procedimentos de backup/restauração, consulte o [Guia de Auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

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

## Perguntas Frequentes

<FAQ>

<Question title="Qual é a diferença entre o Intlayer CMS e o editor visual?">

O [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) edita dicionários locais e grava as modificações de volta na sua base de código, exigindo que a aplicação seja recompilada e passe pelo fluxo normal de revisão e deploy. O CMS gerencia dicionários remotos: as alterações não tocam o código-fonte e o site em produção as incorpora sem necessidade de nova implantação. Frequentemente as equipes usam ambos: o editor visual para conteúdos pertencentes aos desenvolvedores e o CMS para textos que o time de marketing altera com frequência semanal.

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor resolve seu conteúdo no próprio servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza, descartando chaves e idiomas não utilizados. Os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do i18next, next-intl ou react-i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) ou o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface de `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, porém alimentados pelos dicionários do Intlayer, permitindo que apenas os imports mudem enquanto o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build em código JSX, TSX, Vue e Svelte, gerando os dicionários a cada alteração para que não haja necessidade de manter chaves manualmente. Como opera por análise estática, strings criadas exclusivamente em tempo de execução ficam fora de alcance, necessitando de algumas anotações para diferenciar texto do usuário de lógica interna da aplicação.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Qual conteúdo deve ser movido para o CMS?">

Conteúdos que mudam com frequência e não dependem do ciclo de lançamento do código: textos de landing pages, termos de preços, avisos promocionais, tudo o que o time de marketing gerencia. Textos estruturais da interface, como rótulos de botões e mensagens de validação de formulários, funcionam melhor como dicionários locais mantidos no repositório junto aos componentes que os utilizam.

</Question>

<Question title="O que acontece se o CMS estiver inacessível?">

A aplicação recorre automaticamente à declaração local do dicionário compilada no build. Assim, uma falha de conexão ou indisponibilidade temporária degrada graciosamente para o conteúdo embutido na aplicação em vez de renderizar uma página em branco. Por essa razão, manter uma declaração local de fallback para todo dicionário remoto é uma excelente prática.

</Question>

<Question title="Posso auto-hospedar o CMS?">

Sim. O CMS pode rodar integralmente na sua própria infraestrutura com Docker Compose, sendo a solução ideal quando os dados não podem sair da sua rede corporativa. Consulte o [guia de auto-hospedagem do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

<Question title="Editores de conteúdo precisam de um desenvolvedor para publicar alterações?">

Não. Essa é a principal vantagem dos dicionários remotos: um editor altera o texto no painel do CMS e o site reflete a mudança, com o [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md) aplicando a atualização em tempo de execução sem esperar por uma nova compilação.

</Question>

<Question title="Posso automatizar o CMS via scripts em vez de usar a interface web?">

Sim. O SDK `@intlayer/api` expõe os mesmos endpoints que a interface web utiliza, permitindo listar projetos, inspecionar dicionários e enviar atualizações através de scripts ou esteiras de CI/CD.

</Question>

<Question title="O CMS oferece suporte a testes A/B em traduções?">

Sim. Dicionários remotos suportam [variantes de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md), e o módulo de [analytics](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/analytics.md) reporta métricas de exposição de cada variante, permitindo testar empiricamente qual redação converte melhor.

</Question>

<Question title="O CMS é gratuito?">

A biblioteca Intlayer, a CLI, o compilador e o editor visual são gratuitos e de código aberto sob a licença Apache 2.0. O CMS em nuvem hospedado é um serviço pago opcional que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md) sem custo de licença.

</Question>

</FAQ>
