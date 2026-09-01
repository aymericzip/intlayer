---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Vanilla JS multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Início do histórico"
author: aymericzip
---

# Traduza o seu site Vanilla JS usando Intlayer | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `i18next` ou `i18n.js`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura completa Vanilla JS">

O Intlayer é otimizado para funcionar perfeitamente com Vanilla JavaScript, oferecendo **gerenciamento de conteúdo independente de estrutura**, **suporte a TypeScript** e todos os recursos necessários para dimensionar a internacionalização (i18n).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia Passo a Passo para Configurar o Intlayer numa Aplicação Vanilla JS

<Steps>

<Step number={1} title="Instalar Dependências">

Instale os pacotes necessários utilizando o npm:

```bash packageManager="npm"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
npx intlayer init --no-gitignore

# Construir os dicionários
npx intlayer build
```

```bash packageManager="pnpm"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
pnpm intlayer init --no-gitignore

# Construir os dicionários
pnpm intlayer build
```

```bash packageManager="yarn"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o ficheiro de configuração intlayer, TypeScript se configurado, variáveis de ambiente
yarn intlayer init --no-gitignore

# Construir os dicionários
yarn intlayer build
```

```bash packageManager="bun"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
bun x intlayer init --no-gitignore

# Construir os dicionários
bun x intlayer build
```

- **intlayer**
  O pacote principal que fornece ferramentas de internacionalização para gestão de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **vanilla-intlayer**
  O pacote que integra o Intlayer com aplicações puras JavaScript / TypeScript. Fornece um singleton pub/sub (`IntlayerClient`) e auxiliares baseados em callbacks (`useIntlayer`, `useLocale`, etc.) para que qualquer parte da sua aplicação possa reagir a mudanças de idioma sem depender de uma framework de UI.

> A exportação de empacotamento (bundling) do CLI `intlayer standalone` produz uma build otimizada através do tree-shaking de pacotes não utilizados, idiomas e lógica não essencial (como redirecionamentos ou prefixos) específica para a sua configuração.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um ficheiro de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Através deste ficheiro de configuração, pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer na consola e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Importar o bundle no seu HTML">

Depois de gerar o bundle `intlayer.js`, pode importá-lo no seu ficheiro HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />

    <!-- Importar o bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Importar o seu script principal -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

O bundle expõe o `Intlayer` e o `VanillaIntlayer` como objetos globais no `window`.

</Step>

<Step number={4} title="Bootstrapper do Intlayer no seu ponto de entrada">

No seu `src/main.js`, chame `installIntlayer()` **antes** de qualquer conteúdo ser renderizado, para que o singleton global de idioma esteja pronto.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Deve ser chamado antes de renderizar qualquer conteúdo i18n.
installIntlayer();
```

Se também pretender utilizar o renderizador de markdown, chame `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Declarar o Seu Conteúdo">

Crie e gira as suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic no logotipo do Vite para saber mais",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic no logotipo do Vite para obter mais informações"
      }
    }
  }
}
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar na sua aplicação desde que estejam incluídas no diretório `contentDir` (por defeito, `./src`). E correspondam à extensão do ficheiro de declaração de conteúdo (por defeito, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizar o Intlayer no seu JavaScript">

O objeto `window.VanillaIntlayer` fornece auxiliares de API: `useIntlayer(key, locale?)` devolve o conteúdo traduzido para uma determinada chave.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Obter o conteúdo inicial para o idioma atual.
// Encadeie .onChange() para ser notificado sempre que o idioma mudar.
const content = useIntlayer("app").onChange((newContent) => {
  // Re-renderizar ou atualizar apenas os nós DOM afetados
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Renderização inicial
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Aceda aos valores finais como strings envolvendo-os em `String()`, que chama o método `toString()` do nó e devolve o texto traduzido.
>
> Quando precisar do valor para um atributo HTML nativo (ex: `alt`, `aria-label`), utilize `.value` diretamente:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo, utilize a função `setLocale` exposta pelo `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Idioma");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Manter o dropdown sincronizado quando o idioma mudar de outro local
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Alternar os atributos HTML de Idioma e Direção" isOptional={true}>

Atualize os atributos `lang` e `dir` da tag `<html>` para corresponderem ao idioma atual para acessibilidade e SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Carregamento lento de dicionários por idioma" isOptional={true}>

Se pretender carregar dicionários de forma lenta por idioma, pode utilizar `useDictionaryDynamic`. Isto é útil se não quiser incluir todas as traduções no ficheiro inicial `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Nota: o `useDictionaryDynamic` requer que os dicionários estejam disponíveis como ficheiros ESM separados. Esta abordagem é tipicamente utilizada se tiver um servidor web a servir os dicionários.

</Step>

</Steps>

### Configurar TypeScript

Certifique-se de que a sua configuração TypeScript inclui os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Extensão VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Preenchimento automático** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Pré-visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como utilizar a extensão, consulte a [documentação da extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Mais Longe

Para ir mais longe, pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo utilizando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Posso usar o Intlayer sem um empacotador (bundler) ou framework?">

Sim. É exatamente o que este guia cobre. Você importa o bundle `vanilla-intlayer` diretamente no seu HTML conforme demonstrado no passo 3, inicializa-o no seu ponto de entrada e lê o conteúdo com `useIntlayer`. Não é necessário Vite, webpack ou qualquer pipeline de compilação obrigatório.

</Question>

<Question title="Quanto a i18n adiciona ao peso da minha página?">

Muito menos do que um catálogo de mensagens em runtime, pois a página nunca baixa um idioma que não renderiza. O conteúdo é resolvido a partir de dicionários pré-compilados, e o carregamento tardio (lazy loading) por locale mantém os outros idiomas fora do payload inicial até que o visitante alterne a língua. Comparado às opções usuais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md), [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do i18next sem reescrever meus scripts?">

Em grande parte, sim. Siga o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) para transferir o conteúdo. Você também pode migrar gradualmente: o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus catálogos JSON existentes como fonte de verdade e gera dicionários Intlayer a partir deles, mantendo ambas as camadas sincronizadas enquanto você migra scripts um a um.

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

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um site em JavaScript puro?">

- **Um objeto de dicionário manual**, geralmente um arquivo JSON por idioma carregado via `fetch`: sem dependências, porém sem verificação de tipos, sem suporte a regras de plurais e sem alertas para traduções faltantes.
- **`i18next`** via CDN: maduro e agnóstico de framework, com ecossistema de plugins, mas adiciona sobrecarga de runtime e seu próprio carregamento de catálogos.
- **`Intlayer`**: conteúdo declarado com regras de plural e gênero, detecção de locale, suporte para RTL e carregamento dinâmico por idioma, além de uma CLI para preencher traduções com IA e um editor visual para colaboradores não técnicos.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Question>

<Question title="Como leio uma tradução e a insiro no DOM?">

Chame `useIntlayer` passando a chave do seu dicionário e insira o valor diretamente no nó do DOM correspondente, como mostrado no passo 6. Como não há um framework com re-renderização automática, você atualiza os elementos quando o idioma for alterado, conforme detalhado no passo 7.

</Question>

<Question title="Como o idioma do visitante é detectado?">

A partir das fontes configuradas em `routing.storage`, normalmente um cookie em primeiro lugar, seguido pelo cabeçalho `Accept-Language`, caindo no seu idioma padrão como fallback. O idioma escolhido manualmente pelo visitante é persistido para futuras visitas. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como dou suporte a idiomas da direita para a esquerda (RTL), como Árabe ou Hebraico?">

O passo 8 cobre isso. A função `getHTMLTextDir` retorna `ltr`, `rtl` ou `auto` para um locale, permitindo definir os atributos `lang` e `dir` no elemento `html` a partir do idioma ativo e deixando que as propriedades lógicas do CSS cuidem do layout.

</Question>

<Question title="Os visitantes baixam todos os idiomas?">

Não, se você não quiser. O passo 9 explica como habilitar carregamento dinâmico (lazy loading) dos dicionários por locale, fazendo com que a página carregue apenas o idioma inicial e busque outro sob demanda apenas quando o usuário alternar de idioma. Consulte [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).

</Question>

<Question title="Como traduzo o app automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções pendentes com o LLM de sua escolha, usando seu provedor e chave de API próprios, e a opção `--git-diff` limita o processo ao conteúdo modificado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
