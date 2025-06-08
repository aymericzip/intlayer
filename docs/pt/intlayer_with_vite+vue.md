# Começando com a Internacionalização (i18n) com Intlayer, Vite e Vue

> Este pacote está em desenvolvimento. Veja o [problema](https://github.com/aymericzip/intlayer/issues/113) para mais informações. Mostre seu interesse no Intlayer para Vue curtindo o problema.

<!-- Veja [Modelo de Aplicação](https://github.com/aymericzip/intlayer-vue-template) no GitHub. -->

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e Vue

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer vite-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **vue-intlayer**
  O pacote que integra o Intlayer com a aplicação Vue. Ele fornece provedores de contexto e composables para internacionalização no Vue.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

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

> Através deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na Configuração do Vite

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declarar Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      pt: "Edite <code>components/HelloWorld.vue</code> e salve para testar o HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      pt: "Confira ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      pt: ", o starter oficial Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pt: "Saiba mais sobre o suporte IDE para Vue no ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pt: "Guia de Escalabilidade dos Documentos Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pt: "Clique nos logotipos do Vite e Vue para saber mais",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      pt: "Edite <code>components/HelloWorld.vue</code> e salve para testar o HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      pt: "Confira ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      pt: "o starter oficial Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pt: "Saiba mais sobre o suporte IDE para Vue no ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pt: "Guia de Escalabilidade dos Documentos Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pt: "Clique nos logotipos do Vite e Vue para saber mais",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

---

const { t } = require("intlayer");

/\*_ @type {import('intlayer').Dictionary} _/
const appContent = {
key: "helloworld",
content: {
count: t({ pt: "o contador é ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
edit: t({
pt: "Edite <code>components/HelloWorld.vue</code> e salve para testar o HMR",
en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
}),
checkOut: t({ pt: "Confira ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
officialStarter: t({
pt: "o starter oficial Vue + Vite",
en: "the official Vue + Vite starter",
fr: "le starter officiel Vue + Vite",
es: "el starter oficial Vue + Vite",
}),
learnMore: t({
pt: "Saiba mais sobre o suporte IDE para Vue no ",
en: "Learn more about IDE Support for Vue in the ",
fr: "En savoir plus sur le support IDE pour Vue dans le ",
es: "Aprenda más sobre el soporte IDE para Vue en el ",
}),
vueDocs: t({
pt: "Guia de Escalabilidade do Vue Docs",
en: "Vue Docs Scaling up Guide",
fr: "Vue Docs Scaling up Guide",
es: "Vue Docs Scaling up Guide",
}),
readTheDocs: t({
pt: "Clique nos logos do Vite e Vue para saber mais",
en: "Click on the Vite and Vue logos to learn more",
fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
}),
},
};

module.exports = appContent;

````

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "pt": "o contador é ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "pt": "Edite <code>components/HelloWorld.vue</code> e salve para testar o HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
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
        "pt": "Saiba mais sobre o suporte IDE para Vue no ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "pt": "Guia de Escalabilidade do Vue Docs",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "pt": "Clique nos logos do Vite e Vue para saber mais",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
````

> Suas declarações de conteúdo podem ser definidas em qualquer lugar em sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

### Passo 5: Utilize o Intlayer no Seu Código

Para utilizar os recursos de internacionalização do Intlayer em toda a sua aplicação Vue, primeiro você precisa registrar a instância singleton do Intlayer no seu arquivo principal. Este passo é crucial, pois fornece o contexto de internacionalização para todos os componentes da sua aplicação, tornando as traduções acessíveis em qualquer lugar na árvore de componentes.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Injete o provedor no nível superior
installIntlayer(app);

// Monte o aplicativo
app.mount("#app");
```

Acesse seus dicionários de conteúdo em toda a aplicação criando um componente Vue principal e utilizando os composables `useIntlayer`:

```vue fileName="src/HelloWord.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

> Se você quiser usar seu conteúdo em um atributo, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função com `.value`, como:

> ```html
>
> ```

> <img src="./logo.svg" :alt="content.image.value" />

> ```
>
> ```

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo composable `useLocale`. Esta função permite definir o idioma da aplicação e atualizar o conteúdo de acordo.

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

// Obtenha informações de localidade e a função setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Acompanhe a localidade selecionada com um ref
const selectedLocale = ref(locale.value);

// Atualize a localidade quando a seleção mudar
const changeLocale = () => setLocale(selectedLocale.value);

// Mantenha o selectedLocale sincronizado com a localidade global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Em seguida, use este componente no seu App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Crie o arquivo de declaração intlayer relacionado
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

### (Opcional) Passo 7: Adicione Roteamento Localizado à sua Aplicação

Adicionar roteamento localizado em uma aplicação Vue geralmente envolve o uso do Vue Router com prefixos de localidade. Isso cria rotas únicas para cada idioma, o que é útil para SEO e URLs amigáveis para SEO.

Exemplo:

```plaintext
- https://example.com/about

- https://example.com/pt/about
- https://example.com/fr/about
```

Primeiro, instale o Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Em seguida, crie uma configuração de roteador que lide com rotas baseadas em localidade:

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// Obter configuração de internacionalização
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Declarar as rotas com caminhos e metadados específicos de localidade.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// Criar a instância do roteador
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adicionar guarda de navegação para lidar com a localidade
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Reutilizar a localidade definida nos metadados da rota
    client.setLocale(metaLocale);
    next();
  } else {
    // Alternativa: sem localidade nos metadados, possivelmente rota não correspondida
    // Opcional: lidar com 404 ou redirecionar para a localidade padrão
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> O nome é usado para identificar a rota no roteador. Ele deve ser único em todas as rotas para evitar conflitos e garantir navegação e vinculação adequadas.

Em seguida, registre o roteador no seu arquivo main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Adicionar o roteador ao aplicativo
app.use(router);

// Montar o aplicativo
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

Paralelamente, você também pode usar o `intLayerMiddlewarePlugin` para adicionar roteamento no lado do servidor à sua aplicação. Este plugin detectará automaticamente a localidade atual com base na URL e definirá o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada com base nas preferências de idioma do navegador do usuário. Se nenhuma localidade for detectada, ele redirecionará para a localidade padrão.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Passo 8: Alterar a URL quando a localidade mudar

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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Obter Vue Router
const router = useRouter();

// Obter informações de localidade e função setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obter rota atual e criar uma URL localizada
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navegar para a rota localizada sem recarregar a página
    router.push(localizedPath);
  },
});

// Acompanhar a localidade selecionada com um ref
const selectedLocale = ref(locale.value);

// Atualizar a localidade quando a seleção mudar
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Manter o selectedLocale sincronizado com a localidade global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Dica: Para melhor SEO e acessibilidade, use tags como `<a href="/fr/home" hreflang="fr">` para vincular a páginas localizadas, conforme mostrado no Passo 10. Isso permite que os mecanismos de busca descubram e indexem URLs específicas de idioma corretamente. Para preservar o comportamento SPA, você pode evitar a navegação padrão com @click.prevent, alterar a localidade usando useLocale e navegar programaticamente usando o Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Mudar para Inglês"
      target="_self"
      aria-current="page"
      href="/pt/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>Inglês</span></div>
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
        <span dir="ltr" lang="es">Español</span><span>Espanhol</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opcional) Passo 9: Alterar os Atributos de Idioma e Direção do HTML

Quando sua aplicação suporta vários idiomas, é crucial atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder à localidade atual. Fazer isso garante:

- **Acessibilidade**: Leitores de tela e tecnologias assistivas dependem do atributo `lang` correto para pronunciar e interpretar o conteúdo com precisão.
- **Renderização de Texto**: O atributo `dir` (direção) garante que o texto seja renderizado na ordem correta (por exemplo, da esquerda para a direita para inglês, da direita para a esquerda para árabe ou hebraico), o que é essencial para a legibilidade.
- **SEO**: Os mecanismos de busca usam o atributo `lang` para determinar o idioma da sua página, ajudando a fornecer o conteúdo localizado correto nos resultados de busca.

Ao atualizar esses atributos dinamicamente quando a localidade muda, você garante uma experiência consistente e acessível para os usuários em todos os idiomas suportados.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable que atualiza os atributos `lang` e `dir` do elemento HTML <html>
 * com base no idioma atual.
 *
 * @example
 * // No seu App.vue ou em um componente global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Atualiza os atributos HTML sempre que o idioma mudar
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
}
```

Use este composable no seu `App.vue` ou em um componente global:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Aplica os atributos HTML com base no idioma atual
useI18nHTMLAttributes();
</script>

<template>
  <!-- Seu template de app -->
</template>
```

### (Opcional) Passo 10: Criando um Componente de Link Localizado

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente personalizado `Link`. Este componente automaticamente adiciona o prefixo do idioma atual às URLs internas. Por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/fr/about` em vez de `/about`.

Este comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os motores de busca a indexar corretamente as páginas específicas de idioma e fornecem conteúdo no idioma preferido do usuário.
- **Consistência**: Usando um link localizado em toda a aplicação, você garante que a navegação permaneça no idioma atual, evitando mudanças inesperadas de idioma.
- **Manutenção**: Centralizar a lógica de localização em um único componente simplifica a gestão de URLs, tornando seu código mais fácil de manter e expandir à medida que sua aplicação cresce.

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

// Cria a propriedade 'to' localizada para o router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Se 'to' for um objeto, localiza a propriedade path
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
    <!-- Vue router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Outros -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### Configurar TypeScript

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar seu código mais robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclui os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso evita que eles sejam adicionados ao seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão Oficial do Intlayer para VS Code**.

[Instale no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Pré-visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão do Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Vá Além

## Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md).
