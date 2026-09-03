---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Nuxt i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Nuxt multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Atualização do LocaleSwitcher, SEO, metadados"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu site Nuxt e Vue usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `@nuxtjs/i18n` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura completa do Nuxt">

O Intlayer é otimizado para funcionar perfeitamente com Nuxt, oferecendo **roteamento multilíngue**, **middleware para detecção de localidade**, **sitemap** e todos os recursos necessários para dimensionar a internacionalização (i18n).

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

## Guia passo a passo para configurar o Intlayer em uma aplicação Nuxt

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="Como traduzir sua aplicação Nuxt e Vue usando Intlayer? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Template da Aplicação](https://github.com/aymericzip/intlayer-nuxt-4-template) no GitHub.

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
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **vue-intlayer**
  O pacote que integra o Intlayer com a aplicação Vue. Ele fornece os composables para os componentes Vue.

- **nuxt-intlayer**
  O módulo Nuxt que integra o Intlayer com aplicações Nuxt. Ele fornece configuração automática, middleware para detecção de locale, gerenciamento de cookies e redirecionamento de URL.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

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

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento via middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integre o Intlayer na sua Configuração Nuxt">

Adicione o módulo intlayer à sua configuração Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Sua configuração Nuxt existente
  modules: ["nuxt-intlayer"],
});
```

> O módulo `nuxt-intlayer` gerencia automaticamente a integração do Intlayer com o Nuxt. Ele configura a construção da declaração de conteúdo, monitora os arquivos no modo de desenvolvimento, fornece middleware para detecção de locale e gerencia o roteamento por localeizado.

</Step>

<Step number={4} title="Declare Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={5} title="Utilize o Intlayer no Seu Código">

Acesse seus dicionários de conteúdo em toda a sua aplicação Nuxt usando o composable `useIntlayer`:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Acessando Conteúdo no Intlayer

O Intlayer oferece diferentes APIs para acessar seu conteúdo:

- **Sintaxe baseada em componentes** (recomendada):
  Use a sintaxe `<myContent />`, ou `<Component :is="myContent" />` para renderizar o conteúdo como um Nó Intlayer. Isso integra-se perfeitamente com o [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) e o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

- **Sintaxe baseada em string**:
  Use `{{ myContent }}` para renderizar o conteúdo como texto simples, sem suporte ao Editor Visual.

- **Sintaxe HTML bruto**:
  Use `<div v-html="myContent" />` para renderizar o conteúdo como HTML bruto, sem suporte ao Editor Visual.

- **Sintaxe de desestruturação**:
  O composable `useIntlayer` retorna um Proxy com o conteúdo. Esse proxy pode ser desestruturado para acessar o conteúdo mantendo a reatividade.
  - Use `const content = useIntlayer("myContent");` e `{{ content.myContent }}` / `<content.myContent />`.
  - Ou use `const { myContent } = useIntlayer("myContent");` e `{{ myContent}}` / `<myContent/>` para desestruturar o conteúdo.

</Step>

<Step number={6} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo composable `useLocale`. Essa função permite definir o locale da aplicação e atualizar o conteúdo de acordo.

Crie um componente para alternar entre idiomas usando `NuxtLink`. **Usar links em vez de botões para a troca de locale é uma boa prática para SEO e descoberta da página**, pois permite que os motores de busca rastreiem e indexem todas as versões localizadas das suas páginas:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt importa automaticamente useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> Usar `NuxtLink` com atributos `href` apropriados (via `getLocalizedUrl`) garante que os motores de busca possam descobrir todas as variantes de idioma das suas páginas. Isso é preferível à troca de idioma apenas via JavaScript, que os rastreadores de motores de busca podem não seguir.

Em seguida, configure seu `app.vue` para usar layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Adicionar Roteamento Localizado à sua aplicação" isOptional={true}>

O Nuxt gerencia automaticamente o roteamento por localeizado ao usar o módulo `nuxt-intlayer`. Isso cria rotas para cada idioma automaticamente com base na estrutura do diretório das suas páginas.

Exemplo:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Para criar páginas localizadas, basta criar seus arquivos Vue no diretório `pages/`. Aqui estão dois exemplos de páginas:

**Página inicial (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Página Sobre (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Use .raw para acesso a string primitiva
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Use .raw para acesso a string primitiva
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Nota: `useHead` é importado automaticamente no Nuxt. Você pode acessar os valores do conteúdo usando `.value` (reativo) ou `.raw` (string primitiva), dependendo das suas necessidades.

O módulo `nuxt-intlayer` irá automaticamente:

- Detectar o idioma preferido do usuário
- Gerenciar a troca de idioma via URL
- Definir o atributo `<html lang="">` apropriado
- Gerenciar cookies de idioma
- Redirecionar os usuários para a URL localizada apropriada

</Step>

<Step number={8} title="Criando um Componente de Link Localizado" isOptional={true}>

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente personalizado `Links`. Este componente adiciona automaticamente o prefixo do idioma atual às URLs internas, o que é essencial para **SEO e descoberta das páginas**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Calcula o caminho final
const finalPath = computed(() => {
  // 1. Verifica se o link é externo
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Se for externo, retorna como está (NuxtLink cuida da geração da tag <a>)
  if (isExternal) return props.href;

  // 3. Se for interno, localize a URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Então use este componente em toda a sua aplicação:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Início</Links>
    <Links href="/about">Sobre</Links>
  </div>
</template>
```

> Ao usar `NuxtLink` com caminhos localizados, você garante que:
>
> - Os motores de busca possam rastrear e indexar todas as versões linguísticas das suas páginas
> - Os usuários possam compartilhar URLs localizadas diretamente
> - O histórico do navegador funcione corretamente com URLs prefixadas pelo locale

</Step>

<Step number={9} title="Gerenciar Metadados e SEO" isOptional={true}>

O Nuxt oferece excelentes capacidades de SEO através do composable `useHead` (auto-importado). Você pode usar o Intlayer para gerenciar metadados localizados utilizando o acessador `.raw` ou `.value` para obter o valor primitivo da string:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead é auto-importado no Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Use .raw para acesso ao valor primitivo da string
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Use .raw para acessar a string primitiva
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternativamente, você pode usar a função `import { getIntlayer } from "intlayer"` para obter o conteúdo sem reatividade do Vue.

> **Acessando valores do conteúdo:**
>
> - Use `.raw` para obter o valor primitivo da string (não reativo)
> - Use `.value` para obter o valor reativo
> - Use a sintaxe de componente `<content.key />` para suporte ao Visual Editor

Crie a declaração de conteúdo correspondente:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Sobre Nós - Minha Empresa",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Saiba mais sobre nossa empresa e nossa missão",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Sobre Nós",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "Sobre Nós - Minha Empresa",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Saiba mais sobre nossa empresa e nossa missão",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Sobre Nós",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Criar um Layout com Navegação" isOptional={true}>

Os layouts do Nuxt permitem definir uma estrutura comum para suas páginas. Crie um layout padrão que inclua o seletor de idioma e a navegação:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Início</Links>
    <Links href="/about">Sobre</Links>
  </div>
</template>
```

O componente `Links` (mostrado abaixo) garante que os links de navegação interna sejam automaticamente localizados.

</Step>

</Steps>

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite comitá-los no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a extensão oficial **Intlayer VS Code Extension**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Ir Além

Para ir mais longe, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo Nuxt?">

Duas opções realistas:

- **`@nuxtjs/i18n`**: o módulo estabelecido, construído sobre o `vue-i18n`, com arquivos de idioma carregados por página e uma superfície de configuração extensa. O `vue-i18n` não possui isolamento nativo de mensagens por namespace, de modo que cada página acaba empacotando mensagens de outras páginas e esse bundle cresce conforme mais páginas são criadas.
- **`Intlayer`**: a solução mais avançada. O conteúdo é declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado em tempo de build, totalmente tipado, com roteamento ciente de locales, tradução por IA, editor visual e CMS.

A grande diferença é onde o conteúdo reside. O `@nuxtjs/i18n` centraliza tudo em arquivos `locales/*.json`, enquanto o Intlayer posiciona os dicionários junto com os componentes que os renderizam, enviando apenas as entradas que a página realmente usa e permitindo mover ou deletar pastas de funcionalidades de forma atômica. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app Nuxt?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor (SSR) resolve suas mensagens diretamente no servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza. Assim, chaves e idiomas não utilizados são descartados, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às soluções tradicionais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md).

</Question>

<Question title="Posso migrar do @nuxtjs/i18n ou vue-i18n sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente através do [guia de migração do @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_nuxtjs_i18n_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface que o `vue-i18n`, porém alimentados pelos dicionários do Intlayer, alterando apenas os imports sem tocar no código dos componentes.

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

<Question title="O Intlayer funciona com renderização no servidor (SSR) do Nuxt e geração estática?">

Sim. O conteúdo é resolvido durante o SSR e no `nuxt generate`, fazendo com que as páginas pré-renderizadas contenham o markup traduzido em vez de buscar um catálogo no cliente. O módulo `nuxt-intlayer` conecta o provider e a detecção de locale de forma automática.

</Question>

<Question title="Preciso colocar o locale na URL?">

Não. A configuração `routing.mode` aceita `"prefix-no-default"` (o padrão, `/about` e `/pt/about`), `"prefix-all"`, `"no-prefix"` e `"search-params"`, enquanto `routing.domains` mapeia cada idioma para seu domínio dedicado. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como gerencio metadados de SEO e tags hreflang no Nuxt?">

O passo 9 deste guia aborda isso. Os metadados localizados do `useHead` vêm dos seus dicionários, e a função `getMultilingualUrls` monta as alternativas `hreflang` para cada locale declarado, incluindo `x-default`, alimentando também o sitemap multilíngue.

</Question>

<Question title="Como construo um seletor de idiomas que preserva a página atual?">

Utilize `useLocale` para consultar o locale ativo e os disponíveis, e o componente de link localizado do passo 8 para garantir que a navegação continue no idioma correto. A função `getLocalizedUrl` reescreve a rota atual para o locale desejado, permitindo que a troca de idioma mantenha o usuário exatamente na mesma página.

</Question>

<Question title="Como traduzo um aplicativo Nuxt automaticamente com IA?">

Execute `npx intlayer fill`. As traduções faltantes são preenchidas com o LLM de sua preferência, usando sua própria chave de API e provedor, e `--git-diff` restringe a execução ao conteúdo alterado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text em templates Vue?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
