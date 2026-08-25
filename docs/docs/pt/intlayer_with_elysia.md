---
createdAt: 2026-08-23
updatedAt: 2026-08-24
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

> Veja a implementação do pacote no GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

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
