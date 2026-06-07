---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Nuxt 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
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
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.3.11
    date: 2025-12-07
    changes: "LocaleSwitcher, SEO, 메타데이터 업데이트"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 기록"
---

# Intlayer를 사용하여 Nuxt 및 Vue 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

`@nuxtjs/i18n` 또는 `i18next`와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 Nuxt 적용 범위">

Intlayer는 **다국어 라우팅**, **로케일 감지를 위한 미들웨어**, **사이트맵** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Nuxt와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent)와 같은 도구 모음도 함께 제공됩니다. 기술](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="오토메이션">

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>
</AccordionGroup>

---

## Nuxt 애플리케이션에서 Intlayer 설정 단계별 가이드

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="Intlayer를 사용하여 Nuxt 및 Vue 앱을 번역하는 방법? Intlayer 알아보기" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션 국제화하기"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="데모 - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-nuxt-4-template)을 확인하세요.

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

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

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **vue-intlayer**
  Intlayer를 Vue 애플리케이션과 통합하는 패키지입니다. Vue 컴포넌트를 위한 컴포저블을 제공합니다.

- **nuxt-intlayer**
  Nuxt 애플리케이션과 Intlayer를 통합하는 Nuxt 모듈입니다. 자동 설정, 로케일 감지를 위한 미들웨어, 쿠키 관리 및 URL 리디렉션을 제공합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
};

export default config;
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

> `nuxt-intlayer` 모듈은 Intlayer와 Nuxt의 통합을 자동으로 처리합니다. 콘텐츠 선언 빌드를 설정하고, 개발 모드에서 파일을 모니터링하며, 로케일 감지를 위한 미들웨어를 제공하고, 지역화된 라우팅을 관리합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

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

> 콘텐츠 선언은 애플리케이션 내 어디서든 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./src`)에 포함되어야 합니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [content 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 5단계: 코드에서 Intlayer 사용하기

`useIntlayer` 컴포저블을 사용하여 Nuxt 애플리케이션 전반에서 콘텐츠 사전을 접근할 수 있습니다:

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
  `<myContent />` 또는 `<Component :is="myContent" />` 구문을 사용하여 콘텐츠를 Intlayer Node로 렌더링합니다. 이는 [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 및 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)와 원활하게 통합됩니다.

- **문자열 기반 구문**:  
  `{{ myContent }}`를 사용하여 Visual Editor 지원 없이 콘텐츠를 일반 텍스트로 렌더링합니다.

- **원시 HTML 구문**:  
  `<div v-html="myContent" />`를 사용하여 Visual Editor 지원 없이 콘텐츠를 원시 HTML로 렌더링합니다.

- **구조 분해 구문**:  
  `useIntlayer` 컴포저블은 콘텐츠가 포함된 Proxy를 반환합니다. 이 Proxy는 반응성을 유지하면서 콘텐츠에 접근하기 위해 구조 분해할 수 있습니다.
  - `const content = useIntlayer("myContent");`를 사용하고 `{{ content.myContent }}` / `<content.myContent />`를 사용하세요.
  - 또는 `const { myContent } = useIntlayer("myContent");`를 사용하고 `{{ myContent}}` / `<myContent/>`를 사용하여 콘텐츠를 구조 분해 할당하세요.

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 컴포저블에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 그에 따라 콘텐츠를 업데이트할 수 있게 해줍니다.

`NuxtLink`를 사용하여 언어를 전환하는 컴포넌트를 만드세요. **로케일 전환에 버튼 대신 링크를 사용하는 것은 SEO 및 페이지 검색 가능성 측면에서 모범 사례입니다.** 이는 검색 엔진이 모든 현지화된 페이지 버전을 크롤링하고 인덱싱할 수 있게 해주기 때문입니다.

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt가 useRoute를 자동으로 임포트합니다
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

> `NuxtLink`를 적절한 `href` 속성(`getLocalizedUrl`을 통해)과 함께 사용하면 검색 엔진이 페이지의 모든 언어 버전을 발견할 수 있습니다. 이는 검색 엔진 크롤러가 따라가지 못할 수 있는 JavaScript 전용 로케일 전환보다 바람직합니다.

그런 다음, `app.vue`를 설정하여 레이아웃을 사용합니다:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (선택 사항) 6b단계: 내비게이션이 포함된 레이아웃 생성

Nuxt 레이아웃을 사용하면 페이지에 공통 구조를 정의할 수 있습니다. 로케일 스위처와 내비게이션을 포함하는 기본 레이아웃을 생성하세요:

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

    <Links href="/">홈</Links>
    <Links href="/about">소개</Links>
  </div>
</template>
```

`Links` 컴포넌트(아래에 표시됨)는 내부 내비게이션 링크가 자동으로 현지화되도록 보장합니다.

### (선택 사항) 7단계: 애플리케이션에 현지화된 라우팅 추가하기

Nuxt는 `nuxt-intlayer` 모듈을 사용할 때 현지화된 라우팅을 자동으로 처리합니다. 이는 페이지 디렉토리 구조를 기반으로 각 언어별 경로를 자동으로 생성합니다.

예시:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

로컬라이즈된 페이지를 만들려면 `pages/` 디렉토리에 Vue 파일을 생성하면 됩니다. 다음은 두 가지 예제 페이지입니다:

**홈 페이지 (`pages/index.vue`):**

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

**소개 페이지 (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // 원시 문자열 접근을 위해 .raw 사용
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // 원시 문자열 접근을 위해 .raw 사용
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> 참고: `useHead`는 Nuxt에서 자동으로 import됩니다. 필요에 따라 `.value`(반응형) 또는 `.raw`(원시 문자열)를 사용하여 콘텐츠 값을 접근할 수 있습니다.

`nuxt-intlayer` 모듈은 자동으로 다음을 수행합니다:

- 사용자의 선호 로케일 감지
- URL을 통한 로케일 전환 처리
- 적절한 `<html lang="">` 속성 설정
- 로케일 쿠키 관리
- 사용자를 적절한 로컬라이즈된 URL로 리디렉션

### (선택 사항) 8단계: 로컬라이즈된 링크 컴포넌트 생성

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Links` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 붙여주며, 이는 **SEO 및 페이지 발견 가능성**에 필수적입니다.

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

// 최종 경로 계산
const finalPath = computed(() => {
  // 1. 링크가 외부 링크인지 확인
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. 외부 링크라면 그대로 반환 (NuxtLink가 <a> 태그 생성을 처리함)
  if (isExternal) return props.href;

  // 3. 내부 링크인 경우 URL을 현지화합니다.
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

그런 다음 애플리케이션 전체에서 이 컴포넌트를 사용하세요:

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

    <Links href="/">홈</Links>
    <Links href="/about">소개</Links>
  </div>
</template>
```

> `NuxtLink`를 지역화된 경로와 함께 사용하면 다음을 보장할 수 있습니다:
>
> - 검색 엔진이 모든 언어 버전의 페이지를 크롤링하고 인덱싱할 수 있습니다.
> - 사용자가 지역화된 URL을 직접 공유할 수 있습니다.
> - 브라우저 히스토리가 로케일 접두사가 붙은 URL에서 올바르게 작동합니다.

### (선택 사항) 9단계: 메타데이터 및 SEO 처리

Nuxt는 `useHead` 컴포저블(자동 임포트)을 통해 뛰어난 SEO 기능을 제공합니다. Intlayer를 사용하여 `.raw` 또는 `.value` 접근자를 통해 원시 문자열 값을 얻어 지역화된 메타데이터를 처리할 수 있습니다:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead는 Nuxt에서 자동 임포트됩니다.
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // 원시 문자열 접근을 위해 .raw 사용
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // 원시 문자열 접근을 위해 .raw 사용
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> 또는 `import { getIntlayer } from "intlayer"` 함수를 사용하여 Vue 반응성 없이 콘텐츠를 가져올 수 있습니다.

> **콘텐츠 값 접근 방법:**
>
> - 원시 문자열 값을 얻으려면 `.raw` 사용 (비반응성)
> - 반응성 값을 얻으려면 `.value` 사용
> - Visual Editor 지원을 위해 `<content.key />` 컴포넌트 문법 사용

해당 콘텐츠 선언을 생성하세요:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      ko: "우리 회사와 우리의 사명에 대해 자세히 알아보세요",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      ko: "회사 소개",
      en: "About Us",
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
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión",
        "ko": "우리 회사와 우리의 사명에 대해 자세히 알아보세요"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "ko": "회사 소개"
      }
    }
  }
}
```

### Git 설정

Intlayer가 생성하는 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해 `.gitignore` 파일에 다음 내용을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성** 기능.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면, [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.
