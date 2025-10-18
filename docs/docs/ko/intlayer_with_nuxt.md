---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Nuxt and Vue 앱 번역하는 방법 – i18n 가이드 2025
description: Nuxt 및 Vue 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Nuxt
  - Vue
  - 자바스크립트
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# Intlayer로 Nuxt and Vue 번역하기 | 국제화(i18n)

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-nuxt-template)을 참조하세요.

## Intlayer란 무엇인가요?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.

---

## Nuxt 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

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

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **vue-intlayer**
  Intlayer를 Vue 애플리케이션과 통합하는 패키지로, Vue 컴포넌트용 컴포저블을 제공합니다.

- **nuxt-intlayer**
  Nuxt 애플리케이션과 Intlayer를 통합하는 Nuxt 모듈입니다. 자동 설정, 로케일 감지를 위한 미들웨어, 쿠키 관리 및 URL 리디렉션을 제공합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만듭니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."], // 기본적으로 Intlayer는 `./src` 디렉토리의 콘텐츠 선언 파일을 감시합니다
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
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
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
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Nuxt 구성에 Intlayer 통합하기

Nuxt 구성에 intlayer 모듈을 추가하세요:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 기존 Nuxt 구성
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` 모듈은 Intlayer와 Nuxt의 통합을 자동으로 처리합니다. 이 모듈은 콘텐츠 선언 빌드를 설정하고, 개발 모드에서 파일을 모니터링하며, 로케일 감지를 위한 미들웨어를 제공하고, 지역화된 라우팅을 관리합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장할 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ko: "확인하세요 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ko: "Nuxt Intlayer 문서",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ko: "Nuxt에 대해 자세히 알아보기 ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ko: "Nuxt 문서",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ko: "더 알아보려면 Nuxt 로고를 클릭하세요",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
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
      ko: "확인하기 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ko: "Nuxt Intlayer 문서",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ko: "Nuxt에 대해 자세히 알아보기 ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ko: "Nuxt 문서",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ko: "Nuxt 로고를 클릭하여 자세히 알아보기",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

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
      ko: "확인하세요 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ko: "Nuxt Intlayer 문서",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Nuxt Intlayer 문서",
    }),
    learnMore: t({
      en: "Nuxt에 대해 더 알아보기 ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt 문서",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "더 알아보려면 Nuxt 로고를 클릭하세요",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
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
        "ko": "HMR 테스트를 위해 <code>components/HelloWorld.vue</code>를 수정하고 저장하세요",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ko": "다음 내용을 확인하세요 ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "ko": "Nuxt Intlayer 문서"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ko": "Nuxt에 대해 더 알아보기 "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "Nuxt 문서"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "더 알아보려면 Nuxt 로고를 클릭하세요"
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> 귀하의 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./src`)에 포함되어 있어야 합니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

### 5단계: 코드에서 Intlayer 사용하기

`useIntlayer` 컴포저블을 사용하여 Nuxt 애플리케이션 전반에서 콘텐츠 사전을 액세스하세요:

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

#### Intlayer에서 콘텐츠 접근하기

Intlayer는 콘텐츠에 접근할 수 있는 다양한 API를 제공합니다:

- **컴포넌트 기반 문법** (권장):
  `<myContent />` 또는 `<Component :is="myContent" />` 문법을 사용하여 콘텐츠를 Intlayer 노드로 렌더링합니다. 이는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 및 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)와 원활하게 통합됩니다.

- **문자열 기반 문법**:
  `{{ myContent }}`를 사용하여 비주얼 에디터 지원 없이 콘텐츠를 일반 텍스트로 렌더링합니다.

- **원시 HTML 문법**:
  `<div v-html="myContent" />`를 사용하여 비주얼 에디터 지원 없이 콘텐츠를 원시 HTML로 렌더링합니다.

- **구조 분해 문법**:
  `useIntlayer` 컴포저블은 콘텐츠가 포함된 Proxy를 반환합니다. 이 Proxy는 반응성을 유지하면서 콘텐츠에 접근하기 위해 구조 분해 할당할 수 있습니다.
- `const content = useIntlayer("myContent");`를 사용하고 `{{ content.myContent }}` / `<content.myContent />`를 사용하세요.
- 또는 `const { myContent } = useIntlayer("myContent");`를 사용하고 `{{ myContent }}` / `<myContent/>`를 사용하여 콘텐츠를 구조 분해 할당할 수 있습니다.

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 컴포저블에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 그에 맞게 업데이트할 수 있게 해줍니다.

언어를 전환하는 컴포넌트를 만드세요:

```vue fileName="components/LocaleSwitcher.vue"
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

// 로케일 정보와 setLocale 함수 가져오기
const { locale, availableLocales, setLocale } = useLocale();

// 선택된 로케일을 ref로 추적
const selectedLocale = ref(locale.value);

// 선택이 변경될 때 로케일 업데이트
const changeLocale = () => setLocale(selectedLocale.value);

// 전역 로케일과 selectedLocale 동기화 유지
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

그런 다음, 이 컴포넌트를 페이지나 레이아웃에서 사용하세요:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // 관련 intlayer 선언 파일 생성
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### (선택 사항) 7단계: 애플리케이션에 지역화된 라우팅 추가하기

Nuxt는 `nuxt-intlayer` 모듈을 사용할 때 자동으로 지역화된 라우팅을 처리합니다. 이는 페이지 디렉토리 구조를 기반으로 각 언어에 대한 경로를 자동으로 생성합니다.

예시:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

지역화된 페이지를 만들려면 단순히 `pages/` 디렉토리에 Vue 파일을 생성하면 됩니다:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

`nuxt-intlayer` 모듈은 자동으로 다음을 수행합니다:

- 사용자의 선호 로케일을 감지합니다.
- URL을 통한 로케일 전환을 처리합니다.
- 적절한 `<html lang="">` 속성을 설정합니다.
- 로케일 쿠키를 관리합니다.
- 사용자를 적절한 로컬라이즈된 URL로 리디렉션합니다.

### (선택 사항) 8단계: 로컬라이즈된 링크 컴포넌트 생성

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `LocalizedLink` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 붙입니다.

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// 링크가 외부 링크인지 확인
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// 내부 링크에 대해 지역화된 href 생성
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

그런 다음 애플리케이션 전반에서 이 컴포넌트를 사용하세요:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>
    <LocalizedLink to="/contact">
      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (선택 사항) 9단계: 메타데이터 및 SEO 처리

Nuxt는 뛰어난 SEO 기능을 제공합니다. Intlayer를 사용하여 지역화된 메타데이터를 처리할 수 있습니다:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

해당하는 콘텐츠 선언을 생성하세요:

```ts fileName="pages/about-meta.content.ts"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      ko: "회사 소개 - 나의 회사",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      ko: "우리 회사와 우리의 사명에 대해 자세히 알아보세요",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      ko: "회사 소개 - 나의 회사",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      ko: "우리 회사와 우리의 사명에 대해 더 알아보세요",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "zh": "关于我们 - 我的公司",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "ko": "회사 소개 - 우리 회사"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### TypeScript 구성

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성한 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장 기능

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 기능**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**
- **실시간 오류 감지**로 누락된 번역을 확인할 수 있습니다.
- **인라인 미리보기**로 번역된 내용을 바로 확인할 수 있습니다.
- **빠른 작업**으로 번역을 쉽게 생성하고 업데이트할 수 있습니다.

확장 기능 사용에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---
