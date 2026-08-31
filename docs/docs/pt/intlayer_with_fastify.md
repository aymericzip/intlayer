---
createdAt: 2025-12-30
updatedAt: 2026-08-30
title: "Fastify i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Fastify multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Adicionar comando init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Histórico inicializado"
author: aymericzip
---

# Traduza o seu site backend Fastify usando Intlayer | Internacionalização (i18n)

`fastify-intlayer` é um poderoso plugin de internacionalização (i18n) para aplicações Fastify, projetado para tornar os seus serviços de backend acessíveis globalmente, fornecendo respostas localizadas com base nas preferências do cliente.

> Veja a implementação do pacote no GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Casos de Uso Práticos

- **Exibição de Erros do Backend no Idioma do Usuário**: Quando ocorre um erro, a exibição de mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser mostradas em componentes de front-end, como toasts ou modais.
- **Recuperação de Conteúdo Multilíngue**: Para aplicações que buscam conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.
- **Envio de E-mails Multilíngues**: Sejam e-mails transacionais, campanhas de marketing ou notificações, o envio de e-mails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.
- **Notificações Push Multilíngues**: Para aplicações móveis, o envio de notificações push no idioma preferido do usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.
- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas de sistema ou atualizações de interface de usuário, beneficia-se de estar no idioma do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, a sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor com as necessidades do mercado global, tornando-se um passo fundamental na escala de seus serviços em todo o mundo.

## Primeiros Passos

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar a sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-fastify-template) no GitHub.

### Instalação

Para começar a usar o `fastify-intlayer`, instale o pacote usando o npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Configuração

Configure as definições de internacionalização criando um ficheiro `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare o seu Conteúdo

Crie e gira as suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de conteúdo devuelto en español (México)"
      }
    }
  }
}
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que sejam incluídas no diretório `contentDir` (por padrão, `./src`). E devem corresponder à extensão do ficheiro de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Configuração da Aplicação Fastify

Configure a sua aplicação Fastify para usar o `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Carregar plugin de internacionalização
await fastify.register(intlayer);

// Rotas
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de conteúdo devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Compatibilidade

`fastify-intlayer` é totalmente compatível com:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md) para aplicações React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md) para aplicações Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/index.md) para aplicações Vite

Também funciona perfeitamente com qualquer solução de internacionalização em diversos ambientes, incluindo browsers e solicitações de API. Pode personalizar o middleware para detetar a locale através de headers ou cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Outras opções de configuração
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Por padrão, o `fastify-intlayer` interpretará o header `Accept-Language` para determinar o idioma preferido do cliente.

> Para mais informações sobre configuração e tópicos avançados, visite a nossa [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Configurar TypeScript

O `fastify-intlayer` aproveita as robustas capacidades do TypeScript para melhorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução seja considerada, reduzindo o risco de traduções em falta e melhorando a manutenção.

Certifique-se de que os tipos gerados automaticamente (por padrão em ./types/intlayer.d.ts) estão incluídos no seu ficheiro tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

### Extensão do VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a extensão oficial **Intlayer VS Code Extension**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletion** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Inline previews** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuração de Git

Recomenda-se ignorar os ficheiros gerados pelo Intlayer. Isso permite-lhe evitar enviá-los para o seu repositório Git.

Para isso, pode adicionar as seguintes instruções ao seu ficheiro `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os ficheiros gerados pelo Intlayer
.intlayer
```

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um backend Fastify?">

A opção genérica é o `i18next` com `fastify-i18next` ou um hook escrito manualmente, que carrega catálogos JSON por namespace e armazena o locale na requisição. A alternativa é o `Intlayer` através do `fastify-intlayer`, que registra o plugin automaticamente, resolve o locale por requisição e compartilha o mesmo conteúdo tipado do seu frontend.

A principal razão para internacionalizar o backend é que grande parte do texto lido pelo usuário nunca passa pelo frontend: mensagens de erro da API, e-mails transacionais, notificações push, SMS e geração de PDFs. Todos esses casos exigem o idioma do destinatário, resolvido por requisição em vez de por sessão.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do pacote (bundle) do meu servidor Fastify?">

Muito pouco. Os dicionários são compilados previamente e apenas os locales declarados são incluídos, dispensando o carregamento de catálogos na inicialização e leituras de arquivos em disco no caminho crítico das requisições. Isso é especialmente importante em ambientes serverless e edge, onde o tamanho do bundle influencia diretamente o tempo de inicialização a frio (cold start). Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

</Question>

<Question title="Posso migrar do i18next sem reescrever meus handlers?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface que o `i18next`, porém alimentados pelos dicionários do Intlayer, alterando apenas os imports sem modificar o código dos handlers.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

No lado frontend do mesmo projeto, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) vai além e gera os dicionários em tempo de build a partir de código JSX, TSX, Vue ou Svelte, fazendo com que as duas partes da aplicação compartilhem a mesma camada de conteúdo sem necessidade de manter chaves manualmente.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Como o Intlayer sabe em qual idioma responder?">

Por padrão, o `fastify-intlayer` lê o cabeçalho `Accept-Language` da requisição e seleciona o locale declarado mais próximo, recorrendo ao locale padrão caso não haja correspondência. É possível personalizar essa fonte em `routing.storage`, usando por exemplo um cabeçalho customizado ou um cookie definido pelo frontend, garantindo que a API responda no idioma que o usuário realmente selecionou na interface. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="O locale fica isolado por requisição?">

Sim. O plugin isola o escopo do locale ativo para a requisição corrente, de modo que requisições concorrentes em diferentes línguas nunca compartilhem ou interfiram no locale uma da outra. É isso que torna chamadas a `t()` e `getIntlayer()` seguras para uso em serviços sem precisar passar o argumento de locale manualmente através de cada função.

</Question>

<Question title="Como envio e-mails transacionais no idioma do destinatário?">

Declare o conteúdo do e-mail em um arquivo de conteúdo como qualquer outro texto, e resolva-o com `getIntlayer` informando o locale armazenado no cadastro do destinatário em vez do locale da requisição. Isso é fundamental para filas e jobs em segundo plano, onde o idioma pertence ao registro do usuário e não existe uma requisição HTTP ativa para fornecer o cabeçalho.

</Question>

<Question title="Como internacionalizo mensagens de erro da API?">

Envolva a mensagem com `t()` no ponto em que o erro for construído. O locale ativo da requisição a resolverá automaticamente, fazendo com que o cliente receba uma mensagem pronta para exibição e poupando o frontend de gerenciar um catálogo paralelo de códigos de erro.

</Question>

<Question title="Funciona com o ciclo de vida de plugins e encapsulamento do Fastify?">

Sim. O `fastify-intlayer` é registrado como um plugin padrão do Fastify, seguindo rigorosamente as regras habituais de encapsulamento. Registre-o na raiz da sua aplicação, ou dentro do escopo que dele necessite, antes das rotas que realizam a leitura de conteúdo.

</Question>

<Question title="Como traduzo o conteúdo do backend automaticamente com IA?">

Execute `npx intlayer fill`, que preenche traduções pendentes com o LLM de sua escolha usando seu provedor e chave de API próprios. Adicione `--git-diff` para traduzir apenas o conteúdo alterado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e valores interpolados no servidor?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md) para valores interpolados, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) para corpos de e-mail e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Tenho autocompletar com TypeScript no servidor?">

Sim. O Intlayer gera os tipos dos seus dicionários em `./types/intlayer.d.ts`, transformando chaves inexistentes em erros de compilação em vez de retornar strings vazias em runtime. Execute `npx intlayer test` no CI para falhar a build quando faltar conteúdo em algum locale declarado.

</Question>

<Question title="O frontend e o backend podem compartilhar o mesmo conteúdo?">

Sim, e essa é a configuração típica. O `fastify-intlayer` funciona lado a lado com `react-intlayer`, `next-intlayer` e `vite-intlayer` sobre as mesmas declarações de conteúdo, permitindo que um texto usado tanto em uma resposta de API quanto em uma tela seja declarado uma única vez. Consulte [como funciona o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/how_works_intlayer.md).

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
