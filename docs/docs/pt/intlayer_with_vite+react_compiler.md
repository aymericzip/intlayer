---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Vite + React i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Vite + React multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - React
  - Compilador
  - IA
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Lançamento inicial"
author: aymericzip
---

# Como tornar multilíngue (i18n) uma aplicação Vite e React existente depois de pronta (guia i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Vite e React? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-vite-react-template) no GitHub.

## Índice

<TOC/>

## Por que é difícil internacionalizar uma aplicação existente?

Se você já tentou adicionar vários idiomas a um app que foi construído para apenas um, você conhece a dor. Não é apenas "difícil", é tedioso. Você tem que vasculhar cada arquivo, caçar cada string de texto e movê-las para arquivos de dicionário separados.

Depois vem a parte arriscada: substituir todo esse texto por hooks de código sem quebrar o layout ou a lógica. É o tipo di trabalho que interrompe o desenvolvimento de novas funcionalidades por semanas e parece uma refatoração interminável.

## O que é o Compilador Intlayer?

O **Compilador Intlayer** foi criado para pular esse trabalho braçal manual. Em vez de você extrair strings manualmente, o compilador faz isso por você. Ele escaneia seu código, encontra o texto e usa IA para gerar os dicionários nos bastidores.
Depois, ele modifica seu código durante o build para injetar os hooks de i18n necessários. Basicamente, você continua escrevendo seu app como se fosse de um único idioma, e o compilador cuida da transformação multilíngue automaticamente.

> Doc Compilador: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)

### Limitações

Como o compilador realiza análise e transformação de código (inserindo hooks e gerando dicionários) em **tempo de compilação**, ele pode **reduzir a velocidade do processo di build** da sua aplicação.

Para mitigar esse impacto durante o desenvolvimento, você pode configurar o compilador para rodar no modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) ou desativá-lo quando não for necessário.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e React

<Steps>

<Step number={1} title="Instalar Dependências">

Instale os pacotes necessários usando npm:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URL.

</Step>

<Step number={2} title="Configurar Seu Projeto">

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Indica se o compilador deve ser habilitado.
     */
    enabled: true,

    /**
     * Diretório de saída para os dicionários optimizados.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Inserir apenas o conteúdo no arquivo gerado, sem chave.
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar o app e depois removido.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Este é um app de mapas", // Nota: você pode personalizar esta descrição do app
  },
};

export default config;
```

> **Nota**: Certifique-se de ter sua `OPEN_AI_API_KEY` definida em suas variáveis de ambiente.

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na sua Configuração do Vite">

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

> O plugin Vite `intlayerCompiler()` é usado para extrair conteúdo do componente e escrever os arquivos `.content`.

> Desde Intlayer v9, o compilador está incluído diretamente no plugin `intlayer()` e é ativado automaticamente quando `compiler.enabled` é definido com um caminho `compiler.output`. Registrar `intlayerCompiler()` separadamente, como mostrado abaixo, agora é opcional — ele se deduplica se também for adicionado. Veja as [notas de lançamento v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

</Step>

<Step number={4} title="Compilar seu código">

Basta escrever seus componentes com strings hardcoded no seu idioma padrão. O compilador cuida do resto.

Exemplo de como sua página pode ficar:

<Tabs>
 <Tab value="Código">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Logo Vite" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="Logo React" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          a contagem é {count}
        </button>
        <p>
          Edite <code>src/App.tsx</code> e salve para testar HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clique nos logos do Vite e React para saber mais
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Saída">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      pt: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "a contagem é",
        editMessage: "Editar",
        hmrMessage: "e salve para testar HMR",
        readTheDocs: "Clique nos logos do Vite e React para saber mais",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** é usado para fornecer o idioma aos componentes aninhados.

</Step>

<Step number={6} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite que você defina o idioma da aplicação e atualize o conteúdo adequadamente.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Alterar idioma para Inglês
    </button>
  );
};
```

> Para aprender mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Preencher traduções ausentes" isOptional={true}>

Intlayer fornece uma ferramenta CLI para ajudá-lo a preencher as traduções ausentes. Você pode usar o comando `intlayer` para testar e preencher as traduções ausentes do seu código.

```bash packageManager="npm"
npx intlayer test         # Testa se há traduções ausentes
```

```bash packageManager="yarn"
yarn intlayer test         # Testa se há traduções ausentes
```

```bash packageManager="pnpm"
pnpm intlayer test         # Testa se há traduções ausentes
```

```bash packageManager="bun"
bun x intlayer test         # Testa se há traduções ausentes
```

```bash packageManager="npm"
npx intlayer fill         # Preencher traduções ausentes
```

```bash packageManager="yarn"
yarn intlayer fill         # Preencher traduções ausentes
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Preencher traduções ausentes
```

```bash packageManager="bun"
bun x intlayer fill         # Preencher traduções ausentes
```

> Para mais detalhes, consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/ci.md)

</Step>

</Steps>

### (Opcional) Sitemap e robots.txt (geração no build)

A Intlayer expõe utilitários - `generateSitemap` e `getMultilingualUrls` - para formatar um `sitemap.xml` multilíngue e um `robots.txt` prontos para crawlers e os gravar automaticamente em `public/`. Normalmente corre um pequeno script Node **antes** do Vite (por exemplo hooks npm `predev` / `prebuild`) para que os ficheiros existam no build ou no servidor de desenvolvimento.

#### Sitemap

O gerador de sitemaps da Intlayer respeita as suas línguas e inclui os metadados habituais.

> O sitemap suporta o espaço de nomes `xhtml:link` (hreflang). Em vez de listar apenas URLs soltas, a Intlayer liga de forma bidireccional todas as versões localizadas de cada página (por exemplo `/about`, `/fr/about` ou `/about?lang=fr` consoante o modo de rotas).

#### Robots.txt

Use `getMultilingualUrls` para que as regras `Disallow` cubram todas as variantes localizadas de caminhos sensíveis.

#### 1. Criar `generate-seo.mjs` na raiz do projeto

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

O pacote `intlayer` tem de estar instalado. Defina `SITE_URL` no ambiente em produção (por exemplo na CI).

> Prefira `generate-seo.mjs` para ESM no Node. Se usar `generate-seo.js`, garanta `"type": "module"` no `package.json` ou execute o Node com ESM.

#### 2. Executar o script antes do Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Ajuste os comandos se usar pnpm ou yarn. Também pode invocar o script a partir da CI ou de outro passo do pipeline.

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite commitá-los no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão Oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Pré-visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão do Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Indo Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo Vite e React?">

- **`react-i18next` / `i18next`**: namespaces JSON carregados em tempo de execução, com chaves escritas manualmente em cada local de chamada.
- **`react-intl`** e **`Lingui`**: mensagens ICU com uma etapa de extração que você mesmo executa.
- **`Intlayer`**: conteúdo compilado diretamente dos seus componentes em tempo de build, totalmente tipado, com tradução por IA, editor visual e CMS.

Este guia utiliza a configuração com compilador, onde você continua escrevendo strings normais nos seus componentes e os dicionários são gerados para você. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app Vite?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas do dicionário usadas pelo componente, descartando chaves e idiomas não utilizados, enquanto os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas tradicionais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do react-i18next ou react-intl sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou pode manter sua API atual inteiramente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma API que `react-i18next`, `react-intl` e `i18next`, mas servidos por dicionários Intlayer, de modo que apenas as importações mudam e o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não, e é exatamente isso que este guia configura. Você escreve seus componentes com strings normais no seu locale padrão, e o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) analisa o código-fonte a cada build, extrai os textos de interface e gera os dicionários, dispensando qualquer criação ou manutenção manual de chaves.

Dois limites são importantes considerar: o compilador opera por análise estática, de modo que strings criadas apenas em tempo de execução (como códigos de erro de API ou campos dinâmicos de CMS) ficam fora de alcance e precisam de um dicionário declarado da maneira tradicional. Além disso, ele precisa distinguir texto visível de lógicas de aplicação como `className="active"` ou status codes, exigindo algumas anotações em bases de código extensas.

Se preferir manter o controle manual passo a passo, o comando `npx intlayer extract` realiza a mesma extração uma única vez nos arquivos escolhidos, criando um arquivo `.content` ao lado de cada componente para sua revisão. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Devo usar o compilador ou declarar meu conteúdo manualmente?">

Use o compilador quando quiser adicionar i18n a uma base de código existente com o menor retrabalho: seus componentes permanecem exatamente como estão e os dicionários são criados automaticamente. Declare o conteúdo manualmente, como demonstrado no [guia padrão de Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md), quando desejar controle explícito sobre chaves, estrutura e reutilização entre componentes. Ambos os métodos podem coexistir: conteúdo compilado e conteúdo declarado convivem na mesma camada de dicionários.

</Question>

<Question title="O que acontece com strings que o compilador não consegue identificar?">

Elas permanecem sem tradução, pois o compilador opera exclusivamente por análise estática. Qualquer conteúdo montado em tempo de execução, como mensagens de erro de API, campos dinâmicos de CMS ou strings geradas por concatenação, precisa ser declarado da forma habitual em um arquivo de conteúdo. Execute `npx intlayer test` para identificar o que está ausente.

</Question>

<Question title="Como o compilador decide o que é texto visível para o usuário?">

Por meio de heurísticas aplicadas sobre o seu JSX, motivo pelo qual pode haver falsos positivos ou omissões: um valor de `className` ou código de status pode parecer texto comum, e padrões incomuns de marcação podem ser ignorados. Em bases de código maiores, você corrige esses casos pontuais com anotações. Se preferir não depender dessas heurísticas, o comando `npx intlayer extract` realiza a mesma extração uma única vez e gera um diff para revisão. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

</Question>

<Question title="Como preencho as traduções ausentes?">

O passo 7 explica esse processo. O comando `npx intlayer fill` envia o conteúdo extraído para o LLM de sua escolha, utilizando seu próprio provedor e chave de API, e a opção `--git-diff` limita a execução ao que foi alterado na branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="Como altero o idioma em tempo de execução?">

O passo 6 demonstra isso. O hook `useLocale` expõe o locale ativo, os locales declarados e uma função de alteração que persiste a escolha do usuário, fazendo com que os componentes que consomem conteúdo compilado se renderizem novamente no novo idioma sem necessidade de recarregar a página.

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente na aplicação em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para atualizações sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
