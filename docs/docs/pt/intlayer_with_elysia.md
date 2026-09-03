---
createdAt: 2026-08-23
updatedAt: 2026-08-30
title: "Elysia i18n - Guia completo para traduzir sua aplicação"
description: "Sem mais i18next. O guia 2026 para construir uma aplicação Elysia multilíngue (i18n). Traduzir com agentes de IA e otimizar tamanho do bundle, SEO e performance."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Alinha o guia com o template Elysia (tipagem do contexto, setup do Bun, scripts)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Traduza seu site backend Elysia usando Intlayer | Internacionalização (i18n)

`elysia-intlayer` é um poderoso plugin de internacionalização (i18n) para aplicações Elysia, projetado para tornar seus serviços de backend globalmente acessíveis, fornecendo respostas localizadas com base nas preferências do cliente.

> Veja [a implementação do pacote no GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

### Casos de Uso Práticos

- **Exibir Erros do Backend no Idioma do Usuário**: Quando um erro ocorre, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes front-end como toasts ou modals.
- **Recuperar Conteúdo Multilíngue**: Para aplicações que obtêm conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em múltiplos idiomas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.
- **Enviar Emails Multilíngues**: Seja em emails transacionais, campanhas de marketing ou notificações, enviar emails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.
- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push no idioma preferido do usuário pode melhorar a interação e retenção. Esse toque pessoal pode tornar as notificações mais relevantes e acionáveis.
- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar no idioma do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita diferenças culturais, mas também se alinha melhor com as necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços mundialmente.

## Começar

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Veja [Modelo de Aplicação](https://github.com/aymericzip/intlayer-elysia-template) no GitHub.

### Instalação

Para começar a usar `elysia-intlayer`, instale o pacote usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> O Elysia tem como alvo o runtime **Bun**. O `elysia-intlayer` se apoia em `AsyncLocalStorage` (em vez da biblioteca `cls-hooked` usada pelos plugins Intlayer baseados em Node) justamente porque o Bun não implementa `async_hooks.createHook`.

### Configuração

Configure as definições de internacionalização criando um arquivo `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Locale padrão usada como fallback caso a locale solicitada não seja encontrada.
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare Your Content

Create and manage your content declarations to store translations:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pt: "Exemplo de conteúdo retornado em português",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
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
        "pt": "Exemplo de conteúdo retornado em português",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Exemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as soon as they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Configuração da Aplicação Elysia

Configure sua aplicação Elysia para usar `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Carregue o plugin de internacionalização
  .use(intlayer())
  // Rotas
  .get("/", ({ intlayer }) => ({
    // Locale usado para esta solicitação, negociado `Accept-Language` ou lido do armazenamento
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      pt: "Olá",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> O plugin registra seu contexto por meio de um `derive` **global**, que o Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. Em tempo de execução o valor está sempre presente para as rotas registradas após `.use(intlayer())`, portanto use a non-null assertion (`intlayer!.locale`) — ou optional chaining — para satisfazer o TypeScript no modo `strict`.

O contexto da rota expõe:

| Propriedade       | Descrição                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `locale`          | O locale a usar nesta request, com `locale_storage` a ter precedência sobre `locale_detected`. |
| `locale_storage`  | O locale explicitamente pedido pelo cliente através de um cookie ou de um header.              |
| `locale_detected` | O locale negociado a partir dos headers da request.                                            |
| `defaultLocale`   | O locale configurado como fallback no `intlayer.config.ts`.                                    |
| `t`               | Uma função de tradução.                                                                        |
| `getIntlayer`     | Uma função para obter dicionários pela sua chave.                                              |
| `getDictionary`   | Uma função para processar objetos de dicionário.                                               |

Os mesmos helpers também são exportados de forma standalone. Eles resolvem a requisição atual através de `AsyncLocalStorage`, então você pode chamá-los sem desestruturar o contexto:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      pt: "Exemplo de conteúdo retornado em português",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> O contexto da request é libertado assim que a resposta é mapeada, para que os helpers autónomos nunca sejam resolvidos contra uma request já terminada. Quando chamados fora de uma request tratada pelo plugin, recorrem ao locale por omissão configurado.

### Executar sua aplicação

Adicione os scripts do Intlayer ao seu `package.json`. O `intlayer build` compila suas declarações de conteúdo no diretório `.intlayer` e gera os tipos TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Em seguida, inicie o servidor:

```bash
bun run dev
```

Teste a negociação de locale com `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> O `intlayer build` não é estritamente necessário antes de `bun run src/index.ts`: o plugin também prepara os dicionários quando a aplicação Elysia inicia. Executá-lo antecipadamente mantém os tipos gerados sincronizados para o seu editor e evita o custo do build na primeira requisição.

### Compatibilidade

`elysia-intlayer` é totalmente compatível com:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md) para aplicações React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md) para aplicações Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/index.md) para aplicações Vite

Também funciona perfeitamente com qualquer solução de internacionalização em vários ambientes, incluindo navegadores e requisições de API.

Por padrão, o plugin resolve a locale nesta ordem:

1. O cookie `INTLAYER_LOCALE`.
2. O header `x-intlayer-locale`.
3. A negociação do header `Accept-Language`.

Você pode personalizar o cookie e o header usados para a detecção da locale:

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

> Para mais informações sobre configuração e tópicos avançados, visite nossa [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Configurar TypeScript

`elysia-intlayer` aproveita as robustas capacidades do TypeScript para melhorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução seja contabilizada, reduzindo o risco de traduções ausentes e melhorando a manutenibilidade.

Certifique-se de que os tipos gerados automaticamente (por padrão em ./types/intlayer.d.ts) sejam incluídos no seu arquivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações TypeScript existentes
  "include": [
    // ... Suas configurações TypeScript existentes
    ".intlayer/**/*.ts", // Inclua os tipos gerados automaticamente
  ],
}
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com Intlayer, você pode instalar a **Extensão Oficial Intlayer VS Code**.

[Instalar do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite fazer commit deles em seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um backend Elysia?">

O Elysia não possui uma camada de i18n nativa própria; portanto, as opções são uma biblioteca genérica como `i18next` integrada manualmente em um hook, ou o `Intlayer` através do `elysia-intlayer`, que registra o plugin para você, resolve o locale por requisição e compartilha o mesmo conteúdo tipado do seu frontend.

A principal razão para internacionalizar o backend é que grande parte do texto lido pelo usuário nunca passa pelo frontend: mensagens de erro da API, e-mails transacionais, notificações push, SMS e geração de PDFs. Todos esses casos exigem o idioma do destinatário, resolvido por requisição em vez de por sessão.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do pacote (bundle) do meu servidor Elysia?">

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

Por padrão, o `elysia-intlayer` lê o cabeçalho `Accept-Language` da requisição e seleciona o locale declarado mais próximo, recorrendo ao locale padrão caso não haja correspondência. É possível personalizar essa fonte em `routing.storage`, usando por exemplo um cabeçalho customizado ou um cookie definido pelo frontend, garantindo que a API responda no idioma que o usuário realmente selecionou na interface. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="O locale fica isolado por requisição?">

Sim. O plugin isola o escopo do locale ativo para a requisição corrente, de modo que requisições concorrentes em idiomas diferentes nunca interfiram entre si. É isso que torna chamadas a `t()` e `getIntlayer()` seguras para uso em serviços sem precisar passar o argumento de locale manualmente através de cada função.

</Question>

<Question title="Como envio e-mails transacionais no idioma do destinatário?">

Declare o conteúdo do e-mail em um arquivo de conteúdo como qualquer outro texto, e resolva-o com `getIntlayer` informando o locale armazenado no cadastro do destinatário em vez do locale da requisição. Isso é fundamental para filas e jobs em segundo plano, onde o idioma pertence ao registro do usuário e não existe uma requisição HTTP ativa para fornecer o cabeçalho.

</Question>

<Question title="Como internacionalizo mensagens de erro da API?">

Envolva a mensagem com `t()` no ponto em que o erro for construído. O locale ativo da requisição a resolverá automaticamente, fazendo com que o cliente receba uma mensagem pronta para exibição e poupando o frontend de gerenciar um catálogo paralelo de códigos de erro.

</Question>

<Question title="Funciona no Bun e em runtimes edge?">

O Elysia tem como alvo principal o Bun, e o Intlayer resolve o conteúdo a partir de dicionários compilados em tempo de build em vez de ler arquivos de catálogo em disco durante a execução (o que costuma gerar problemas em runtimes edge). Mantenha `dictionary.importMode` no padrão `"static"` para que o conteúdo seja embutido diretamente no servidor.

</Question>

<Question title="O plugin preserva a inferência de tipos ponta a ponta (end-to-end) do Elysia?">

Sim. O plugin é registrado com `.use()` como qualquer outro plugin do Elysia, garantindo a continuidade da cadeia de tipos, enquanto as chaves do seu dicionário são tipadas separadamente a partir do arquivo gerado `types/intlayer.d.ts`.

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

Sim, e essa é a configuração típica. O `elysia-intlayer` funciona lado a lado com `react-intlayer`, `next-intlayer` e `vite-intlayer` sobre as mesmas declarações de conteúdo, permitindo que um texto usado tanto em uma resposta de API quanto em uma tela seja declarado uma única vez. Consulte [como funciona o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/how_works_intlayer.md).

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
