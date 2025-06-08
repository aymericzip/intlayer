# Intlayer와 Vite 및 Vue를 사용한 국제화(i18n) 시작하기

> 이 패키지는 개발 중입니다. 자세한 내용은 [이슈](https://github.com/aymericzip/intlayer/issues/113)를 참조하세요. Vue용 Intlayer에 관심이 있다면 이슈에 좋아요를 눌러주세요.

<!-- GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vue-template)을 참조하세요. -->

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**합니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 지역화**합니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.

---

## Vite 및 Vue 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

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

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **vue-intlayer**
  Intlayer를 Vue 애플리케이션과 통합하는 패키지입니다. Vue 국제화를 위한 컨텍스트 제공자와 컴포저블을 제공합니다.

- **vite-intlayer**
  [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
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
      // 다른 로케일 추가
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
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

구성에 Intlayer 플러그인을 추가합니다.

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

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 별칭을 제공합니다.

### 4단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ko: "<code>components/HelloWorld.vue</code>를 편집하고 저장하여 HMR을 테스트하세요",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ko: "확인 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ko: ", 공식 Vue + Vite 스타터",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ko: "Vue에 대한 IDE 지원에 대해 자세히 알아보세요 ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ko: "Vue 문서 확장 가이드",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ko: "Vite와 Vue 로고를 클릭하여 자세히 알아보세요",
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
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ko: "<code>components/HelloWorld.vue</code>를 편집하고 저장하여 HMR을 테스트하세요",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ko: "확인 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ko: "공식 Vue + Vite 스타터",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ko: "Vue에 대한 IDE 지원에 대해 자세히 알아보세요 ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ko: "Vue 문서 확장 가이드",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ko: "Vite와 Vue 로고를 클릭하여 자세히 알아보세요",
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
count: t({ ko: "카운트는 ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
edit: t({
ko: "<code>components/HelloWorld.vue</code>를 편집하고 저장하여 HMR을 테스트하세요",
en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
}),
checkOut: t({ ko: "확인하세요 ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
officialStarter: t({
ko: "공식 Vue + Vite 스타터",
en: "the official Vue + Vite starter",
fr: "le starter officiel Vue + Vite",
es: "el starter oficial Vue + Vite",
}),
learnMore: t({
ko: "Vue에 대한 IDE 지원에 대해 자세히 알아보세요 ",
en: "Learn more about IDE Support for Vue in the ",
fr: "En savoir plus sur le support IDE pour Vue dans le ",
es: "Aprenda más sobre el soporte IDE para Vue en el ",
}),
vueDocs: t({
ko: "Vue 문서 확장 가이드",
en: "Vue Docs Scaling up Guide",
fr: "Vue Docs Scaling up Guide",
es: "Vue Docs Scaling up Guide",
}),
readTheDocs: t({
ko: "Vite와 Vue 로고를 클릭하여 자세히 알아보세요",
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
        "ko": "카운트는 ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ko": "<code>components/HelloWorld.vue</code>를 편집하고 저장하여 HMR을 테스트하세요",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ko": "확인하세요 ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ko": "공식 Vue + Vite 스타터",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ko": "Vue에 대한 IDE 지원에 대해 자세히 알아보세요 ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "Vue 문서 확장 가이드",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "Vite와 Vue 로고를 클릭하여 자세히 알아보세요",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
````

> 콘텐츠 선언은 애플리케이션의 `contentDir` 디렉토리(기본값: `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치하는 한 어디에나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.

### 5단계: 코드에서 Intlayer 활용하기

Vue 애플리케이션 전반에서 Intlayer의 국제화 기능을 활용하려면 먼저 메인 파일에서 Intlayer 싱글톤 인스턴스를 등록해야 합니다. 이 단계는 애플리케이션의 모든 구성 요소에서 번역에 접근할 수 있도록 국제화 컨텍스트를 제공합니다.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 최상위 수준에서 제공자 주입
installIntlayer(app);

// 앱 마운트
app.mount("#app");
```

애플리케이션 전반에서 콘텐츠 사전을 사용하려면 메인 Vue 구성 요소를 생성하고 `useIntlayer` 컴포저블을 사용하세요:

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

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등 속성에서 사용하려면 `.value`를 사용하여 함수 값을 호출해야 합니다:

> ```html
>
> ```

> <img src="./logo.svg" :alt="content.image.value" />

> ```
>
> ```

### (선택 사항) 6단계: 콘텐츠 언어 변경하기

콘텐츠 언어를 변경하려면 `useLocale` 컴포저블에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트합니다.

언어를 전환하는 구성 요소를 생성하세요:

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

// 로케일 정보 및 setLocale 함수 가져오기
const { locale, availableLocales, setLocale } = useLocale();

// 선택된 로케일을 ref로 추적
const selectedLocale = ref(locale.value);

// 선택이 변경될 때 로케일 업데이트
const changeLocale = () => setLocale(selectedLocale.value);

// 글로벌 로케일과 선택된 로케일 동기화 유지
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

그런 다음, 이 구성 요소를 App.vue에서 사용하세요:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // 관련 intlayer 선언 파일 생성
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

### (선택 사항) 7단계: 애플리케이션에 로컬화된 라우팅 추가하기

Vue 애플리케이션에서 로컬화된 라우팅을 추가하려면 일반적으로 Vue Router를 사용하여 로케일 접두사를 추가합니다. 이는 각 언어에 대해 고유한 라우트를 생성하며, SEO와 SEO 친화적인 URL에 유용합니다.

예시:

```plaintext
- https://example.com/about

- https://example.com/ko/about
- https://example.com/fr/about
```

먼저 Vue Router를 설치합니다:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

그런 다음, 로케일 기반 라우팅을 처리하는 라우터 구성을 생성합니다:

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

// 국제화 구성을 가져옵니다
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * 로케일별 경로와 메타데이터를 가진 라우트를 선언합니다.
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

// 라우터 인스턴스를 생성합니다
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 로케일 처리를 위한 네비게이션 가드를 추가합니다
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // 라우트 메타에 정의된 로케일을 재사용합니다
    client.setLocale(metaLocale);
    next();
  } else {
    // 대체: 메타에 로케일이 없거나, 매칭되지 않은 라우트일 가능성
    // 선택 사항: 404 처리 또는 기본 로케일로 리디렉션
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> 이름은 라우터에서 라우트를 식별하는 데 사용됩니다. 충돌을 방지하고 올바른 네비게이션 및 링크를 보장하기 위해 모든 라우트에서 고유해야 합니다.

그런 다음, `main.js` 파일에 라우터를 등록합니다:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// 앱에 라우터를 추가합니다
app.use(router);

// 앱을 마운트합니다
app.mount("#app");
```

그런 다음, `App.vue` 파일을 업데이트하여 `RouterView` 컴포넌트를 렌더링합니다. 이 컴포넌트는 현재 라우트에 맞는 컴포넌트를 표시합니다.

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

동시에, `intLayerMiddlewarePlugin`을 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

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

### (선택 사항) Step 8: 로케일 변경 시 URL 변경

사용자가 언어를 변경할 때 URL을 자동으로 업데이트하려면, `LocaleSwitcher` 컴포넌트를 수정하여 Vue Router를 사용하십시오:

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

// Vue Router 가져오기
const router = useRouter();

// 로케일 정보와 setLocale 함수 가져오기
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // 현재 라우트를 가져와 로케일화된 URL 생성
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // 페이지를 다시 로드하지 않고 로케일화된 라우트로 이동
    router.push(localizedPath);
  },
});

// 선택된 로케일을 ref로 추적
const selectedLocale = ref(locale.value);

// 선택이 변경될 때 로케일 업데이트
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// 글로벌 로케일과 selectedLocale을 동기화
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

팁: 더 나은 SEO와 접근성을 위해 `<a href="/fr/home" hreflang="fr">`와 같은 태그를 사용하여 로케일화된 페이지로 링크하십시오. 이는 검색 엔진이 언어별 URL을 올바르게 발견하고 색인화할 수 있도록 합니다. SPA 동작을 유지하려면 `@click.prevent`로 기본 네비게이션을 방지하고, `useLocale`을 사용하여 로케일을 변경하며, Vue Router를 사용하여 프로그래밍 방식으로 네비게이션하십시오.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/ko/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>English</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (선택 사항) Step 9: HTML 언어 및 방향 속성 변경

애플리케이션이 여러 언어를 지원할 경우, 현재 로케일에 맞게 `<html>` 태그의 `lang` 및 `dir` 속성을 업데이트하는 것이 중요합니다. 이를 통해 다음을 보장할 수 있습니다:

- **접근성**: 화면 읽기 장치와 보조 기술은 올바른 `lang` 속성을 기반으로 콘텐츠를 정확히 발음하고 해석합니다.
- **텍스트 렌더링**: `dir`(방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장합니다(예: 영어는 왼쪽에서 오른쪽, 아랍어나 히브리어는 오른쪽에서 왼쪽).
- **SEO**: 검색 엔진은 `lang` 속성을 사용하여 페이지의 언어를 결정하고, 검색 결과에서 적절한 로케일화된 콘텐츠를 제공합니다.

로케일 변경 시 이러한 속성을 동적으로 업데이트하면, 모든 지원 언어에서 사용자에게 일관되고 접근 가능한 경험을 제공합니다.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트하는 컴포저블.
 *
 * @example
 * // App.vue 또는 글로벌 컴포넌트에서
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // 로케일이 변경될 때마다 HTML 속성을 업데이트
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // 언어 속성 업데이트
      document.documentElement.lang = newLocale;

      // 텍스트 방향 설정 (대부분의 언어는 ltr, 아랍어, 히브리어 등은 rtl)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

`App.vue` 또는 글로벌 컴포넌트에서 이 컴포저블을 사용하세요:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// 현재 로케일에 따라 HTML 속성 적용
useI18nHTMLAttributes();
</script>

<template>
  <!-- 앱 템플릿 -->
</template>
```

### (선택 사항) 단계 10: 로컬라이즈된 링크 컴포넌트 생성

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하기 위해, 커스텀 `Link` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 추가합니다. 예를 들어, 프랑스어 사용자가 "About" 페이지 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고, 사용자가 선호하는 언어로 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에서 로컬라이즈된 링크를 사용하면 내비게이션이 현재 로케일 내에서 유지되며, 예상치 못한 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하고, 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지하고 확장할 수 있습니다.

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

// 링크가 외부 링크인지 확인
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// 내부 링크에 대해 로컬라이즈된 href 생성
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue Router와 함께 사용하려면, 라우터 전용 버전을 생성하세요:

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

// router-link를 위한 로컬라이즈된 to 속성 생성
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // 'to'가 객체인 경우, path 속성을 로컬라이즈
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

애플리케이션에서 이 컴포넌트를 사용하세요:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- 기타 -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### TypeScript 구성

Intlayer는 TypeScript의 모듈 확장을 사용하여 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함시키세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 해당 파일을 Git 저장소에 커밋하지 않도록 할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가하세요:

```plaintext
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 개선하려면 공식 **Intlayer VS Code 확장 프로그램**을 설치하세요.

[VS Code 마켓플레이스에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- **번역 키 자동 완성**.
- **실시간 오류 감지** (누락된 번역에 대해).
- **번역된 콘텐츠의 인라인 미리보기**.
- **빠른 작업**으로 번역을 쉽게 생성하고 업데이트.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

## 더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.
