---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Como traduzir seu Vite and Vue – guia i18n 2025
description: Descubra como tornar seu site Vite e Vue multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Traduza seu Vite and Vue com Intlayer | Internacionalização (i18n)

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-vite-vue-template) no GitHub.

## O que é Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando o autocompletar e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e Vue

<Tab defaultTab="video">
  <TabItem label="Vídeo" value="video">
  
<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-vue-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-vite-vue-template) no GitHub.

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **vue-intlayer**
  O pacote que integra o Intlayer com a aplicação Vue. Ele fornece provedores de contexto e composables para internacionalização em Vue.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), assim como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Configuração para internacionalização
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuração para internacionalização
const config = {
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

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Sua Configuração do Vite

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> e salve para testar HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Confira ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", o starter oficial Vue + Vite",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Saiba mais sobre o Suporte IDE para Vue em ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Guia de Escalonamento da Documentação Vue",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      pt: "Clique nos logos do Vite e Vue para saber mais",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es ", pt: "a contagem é " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      pt: "Edite <code>components/HelloWorld.vue</code> e salve para testar HMR",
    }),
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe ", pt: "Confira " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
      pt: "o starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
      pt: "Saiba mais sobre o Suporte IDE para Vue em ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
      pt: "Guia de Escalonamento da Documentação Vue",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      pt: "Clique nos logotipos do Vite e Vue para saber mais",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es ", pt: "a contagem é " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      pt: "Edite <code>components/HelloWorld.vue</code> e salve para testar HMR",
    }),
    checkOut: t({ pt: "Confira ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      pt: "o starter oficial Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pt: "Saiba mais sobre o Suporte IDE para Vue em ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pt: "Guia de Escalonamento da Documentação Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pt: "Clique nos logos do Vite e Vue para saber mais",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
/      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    pt: "Clique nos logotipos do Vite e Vue para saber mais",
  }),
},
};

module.exports = appContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "pt": "a contagem é "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "pt": "Edite <code>components/HelloWorld.vue</code> e salve para testar HMR"
      }
    },
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "pt": "Confira ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "pt": "o starter oficial Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "pt": "Saiba mais sobre o Suporte IDE para Vue em ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide",
        "pt": "Guia de Escalonamento da Documentação do Vue"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "pt": "Clique nos logotipos do Vite e Vue para saber mais"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

### Passo 5: Utilize o Intlayer no Seu Código

Para utilizar os recursos de internacionalização do Intlayer em toda a sua aplicação Vue, você primeiro precisa registrar a instância singleton do Intlayer no seu arquivo principal. Esta etapa é crucial, pois fornece o contexto de internacionalização para todos os componentes da sua aplicação, tornando as traduções acessíveis em qualquer lugar da sua árvore de componentes.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Injeta o provedor no nível superior
installIntlayer(app);

// Monta a aplicação
app.mount("#app");
```

Acesse seus dicionários de conteúdo em toda a sua aplicação criando um componente Vue principal e utilizando os composables `useIntlayer`:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Acessando Conteúdo no Intlayer

O Intlayer oferece diferentes APIs para acessar seu conteúdo:

- **Sintaxe baseada em componentes** (recomendada):
  Use a sintaxe `<myContent />` ou `<Component :is="myContent" />` para renderizar o conteúdo como um Nó do Intlayer. Isso integra-se perfeitamente com o [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) e o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

- **Sintaxe baseada em string**:
  Use `{{ myContent }}` para renderizar o conteúdo como texto simples, sem suporte ao Editor Visual.

- **Sintaxe HTML bruta**:
  Use `<div v-html="myContent" />` para renderizar o conteúdo como HTML bruto, sem suporte ao Editor Visual.

- **Sintaxe de desestruturação**:
  O composable `useIntlayer` retorna um Proxy com o conteúdo. Esse proxy pode ser desestruturado para acessar o conteúdo mantendo a reatividade.
  - Use `const content = useIntlayer("myContent");` e `{{ content.myContent }}` / `<content.myContent />`.
  - Ou use `const { myContent } = useIntlayer("myContent");` e `{{ myContent }}` / `<myContent/>` para desestruturar o conteúdo.

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo composable `useLocale`. Essa função permite definir o locale da aplicação e atualizar o conteúdo de acordo.

Crie um componente para alternar entre idiomas:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Obter informações de localidade e função setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Rastrear a localidade selecionada com um ref
const selectedLocale = ref(locale.value);

// Atualizar a localidade quando a seleção mudar
const changeLocale = () => setLocale(selectedLocale.value);

// Manter selectedLocale sincronizado com o locale global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Então, use este componente no seu App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Criar arquivo de declaração intlayer relacionado
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

### (Opcional) Passo 7: Adicione roteamento localizado à sua aplicação

Adicionar roteamento localizado em uma aplicação Vue normalmente envolve o uso do Vue Router com prefixos de localidade. Isso cria rotas únicas para cada idioma, o que é útil para SEO e URLs amigáveis para SEO.

Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Primeiro, instale o Vue Router:

```bash packageManager="npm"
npm install vue-router
```

```bash packageManager="pnpm"
pnpm add vue-router
```

```bash packageManager="yarn"
yarn add vue-router
```

Então, crie uma configuração de roteador que lide com o roteamento baseado em localidade:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * Declarar as rotas com caminhos e metadados específicos para cada localidade.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// Criar a instância do roteador
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adicionar guarda de navegação para tratamento de localidade
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Reutilizar a localidade definida no meta da rota
  client.setLocale(metaLocale);
  next();
});
```

> O nome é usado para identificar a rota no roteador. Deve ser único entre todas as rotas para evitar conflitos e garantir a navegação e o link corretos.

Em seguida, registre o roteador no seu arquivo main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Adicione o roteador ao app
app.use(router);

// Monte o app
app.mount("#app");
```

Em seguida, atualize seu arquivo `App.vue` para renderizar o componente RouterView. Este componente exibirá o componente correspondente à rota atual.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Paralelamente, você também pode usar o `intlayerProxy` para adicionar roteamento no lado do servidor à sua aplicação. Este plugin detectará automaticamente o idioma atual com base na URL e definirá o cookie de idioma apropriado. Se nenhum idioma for especificado, o plugin determinará o idioma mais adequado com base nas preferências de idioma do navegador do usuário. Se nenhum idioma for detectado, ele redirecionará para o idioma padrão.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

### (Opcional) Passo 8: Alterar a URL quando o idioma mudar

Para atualizar automaticamente a URL quando o usuário mudar o idioma, você pode modificar o componente `LocaleSwitcher` para usar o Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
// Importa ref e watch do Vue
import { ref, watch } from "vue";
// Importa useRouter do Vue Router
import { useRouter } from "vue-router";
// Importa Locales, getLocaleName e getLocalizedUrl do intlayer
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
// Importa useLocale do vue-intlayer
import { useLocale } from "vue-intlayer";

// Obtém o Vue Router
const router = useRouter();

// Obtém informações de locale e a função setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obtém a rota atual e cria uma URL localizada
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navega para a rota localizada sem recarregar a página
    router.push(localizedPath);
  },
});

// Acompanha o locale selecionado com um ref
const selectedLocale = ref(locale.value);

// Atualize o locale quando a seleção mudar
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Mantenha o selectedLocale sincronizado com o locale global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Dica: Para melhor SEO e acessibilidade, use tags como `<a href="/fr/home" hreflang="fr">` para vincular às páginas localizadas, como mostrado no Passo 10. Isso permite que os motores de busca descubram e indexem corretamente URLs específicas de idioma. Para preservar o comportamento SPA, você pode impedir a navegação padrão com @click.prevent, alterar o locale usando useLocale e navegar programaticamente usando o Vue Router.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Mudar para Inglês"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Inglês</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Mudar para Espanhol"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Espanhol</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opcional) Passo 9: Alterar os atributos de idioma e direção do HTML

Quando sua aplicação suporta múltiplos idiomas, é crucial atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder ao locale atual. Fazer isso garante:

- **Acessibilidade**: Leitores de tela e tecnologias assistivas dependem do atributo `lang` correto para pronunciar e interpretar o conteúdo com precisão.
- **Renderização de Texto**: O atributo `dir` (direção) garante que o texto seja exibido na ordem correta (por exemplo, da esquerda para a direita para inglês, da direita para a esquerda para árabe ou hebraico), o que é essencial para a legibilidade.
- **SEO**: Motores de busca usam o atributo `lang` para determinar o idioma da sua página, ajudando a exibir o conteúdo localizado correto nos resultados de pesquisa.

Ao atualizar esses atributos dinamicamente quando o locale muda, você garante uma experiência consistente e acessível para usuários em todos os idiomas suportados.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable que atualiza os atributos `lang` e `dir` do elemento HTML <html>
 * com base na localidade atual.
 *
 * @example
 * // No seu App.vue ou em um componente global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Atualiza os atributos HTML sempre que a localidade mudar
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Atualiza o atributo de idioma
      document.documentElement.lang = newLocale;

      // Define a direção do texto (ltr para a maioria dos idiomas, rtl para árabe, hebraico, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Use este composable no seu `App.vue` ou em um componente global:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Aplicar os atributos HTML com base na localidade atual
useI18nHTMLAttributes();
</script>

<template>
  <!-- Template da sua aplicação -->
</template>
```

### (Opcional) Passo 10: Criando um Componente de Link Localizado

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente personalizado `Link`. Este componente adiciona automaticamente o prefixo do idioma atual às URLs internas. Por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/fr/about` em vez de `/about`.

Esse comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os motores de busca a indexar corretamente páginas específicas por idioma e fornecem aos usuários conteúdo no idioma de sua preferência.
- **Consistência**: Ao usar um link localizado em toda a sua aplicação, você garante que a navegação permaneça dentro do idioma atual, evitando mudanças inesperadas de idioma.
- **Manutenção**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento das URLs, tornando sua base de código mais fácil de manter e expandir conforme sua aplicação cresce.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Verifica se o link é externo
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Cria um href localizado para links internos
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Para uso com Vue Router, crie uma versão específica para o roteador:

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Cria a propriedade 'to' localizada para router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Se 'to' for um objeto, localize a propriedade path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Use esses componentes na sua aplicação:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Raiz</RouterLink>
    <RouterLink to="/home">Início</RouterLink>
    <!-- Outros -->
    <Link href="/">Raiz</Link>
    <Link href="/home">Início</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Opcional) Passo 11: Renderizar Markdown

Intlayer suporta a renderização de conteúdo Markdown diretamente na sua aplicação Vue. Por padrão, o Markdown é tratado como texto simples. Para converter Markdown em HTML enriquecido, você pode integrar o [markdown-it](https://github.com/markdown-it/markdown-it), um parser de Markdown.

Isto é particularmente útil quando suas traduções incluem conteúdo formatado como listas, links ou ênfases.

Por padrão, o Intlayer renderiza markdown como string. Mas o Intlayer também fornece uma forma de renderizar markdown em HTML usando a função `installIntlayerMarkdown`.

> Para ver como declarar conteúdo markdown usando o pacote `intlayer`, consulte a [documentação de markdown](https://github.com/aymericzip/intlayer/tree/main/docs/pt/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // permitir tags HTML
  linkify: true, // auto-linkar URLs
  typographer: true, // ativar aspas inteligentes, travessões, etc.
});

// Diga ao Intlayer para usar md.render() sempre que precisar transformar markdown em HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Uma vez registrado, você pode usar a sintaxe baseada em componentes para exibir o conteúdo Markdown diretamente:

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
```

### Configurar TypeScript

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite comitá-los no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---
