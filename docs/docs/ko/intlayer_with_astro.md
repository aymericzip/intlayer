---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Astro 앱 번역하는 방법 – i18n 가이드 2025
description: Intlayer를 사용하여 Vite 및 React 애플리케이션에 국제화(i18n)를 추가하는 방법을 배우세요. 이 가이드를 따라 앱을 다국어로 만드세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - i18n
  - 자바스크립트
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
---

# Intlayer로 Astro 번역하기 | 국제화(i18n)

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-astro-template)을 참조하세요.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.

---

## Astro에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**  
  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 제공하는 국제화 도구의 핵심 패키지입니다.

- **astro-intlayer**  
  Astro와 Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Astro 통합 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만듭니다:

```typescript fileName="intlayer.config.ts"
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

### 3단계: Astro 구성에 Intlayer 통합하기

intlayer 플러그인을 구성에 추가하세요.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` Astro 통합 플러그인은 Intlayer를 Astro와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링하는 역할을 합니다. 또한 Astro 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위해 별칭(alias)을 제공합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값은 `./src`)에 포함되기만 하면 됩니다. 그리고 콘텐츠 선언 파일 확장자(기본값은 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

### 5단계: Astro에서 콘텐츠 사용하기

`intlayer`에서 내보내는 핵심 헬퍼를 사용하여 `.astro` 파일에서 사전을 직접 사용할 수 있습니다.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### 6단계: 지역화된 라우팅

지역화된 페이지를 제공하기 위해 동적 라우트 세그먼트를 생성합니다. 예를 들어 `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro 통합은 개발 중에 지역 인식 라우팅과 환경 정의를 돕는 Vite 미들웨어를 추가합니다. 여전히 자신의 로직이나 `intlayer`의 `getLocalizedUrl`과 같은 유틸리티 함수를 사용하여 로케일 간 링크를 연결할 수 있습니다.

### 7단계: 선호하는 프레임워크 계속 사용하기

좋아하는 프레임워크를 계속 사용하여 애플리케이션을 구축하세요.

- Intlayer + React: [React와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- Intlayer + Vue: [Vue와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Svelte와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Solid와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Preact와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+preact.md)

### TypeScript 구성

Intlayer는 TypeScript의 이점을 활용하고 코드베이스를 더 강력하게 만들기 위해 모듈 확장을 사용합니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer가 생성한 파일은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해, `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 이력

| 버전  | 날짜       | 변경 사항                         |
| ----- | ---------- | --------------------------------- |
| 6.2.0 | 2025-10-03 | Astro 통합, 구성, 사용법 리프레시 |
