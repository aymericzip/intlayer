---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Nuxt i18n - Guia completo para traduzir Nuxt
description: A melhor solução para tamanho de bundle, SEO, desempenho & manutenibilidade. Torne seu Nuxt and Vue site multilíngue em 2026, tradução LLM, Agent Skills & MCP.
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

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, e **[habilidades do agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>
<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>
<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>
<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

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
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bun x intlayer init
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

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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

</Steps>

### (Opcional) Passo 6b: Criar um Layout com Navegação

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
