---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - 앱을 번역하기 위한 완벽한 가이드"
description: "더 이상 i18next는 없습니다. 다국어(i18n) Elysia 앱을 빌드하기 위한 2026년 가이드입니다. AI 에이전트로 번역하고 번들 크기, SEO 및 성능을 최적화하세요."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Intlayer를 사용하여 Elysia 백엔드 웹사이트 국제화 (i18n)

`elysia-intlayer`는 Elysia 애플리케이션을 위한 강력한 국제화 (i18n) 플러그인으로, 클라이언트의 선호도에 따라 지역화된 응답을 제공함으로써 백엔드 서비스를 전 세계적으로 접근 가능하게 만들도록 설계되었습니다.

> GitHub에서 패키지 구현 보기: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### 실제 사용 사례

- **사용자의 언어로 백엔드 오류 표시**: 오류가 발생했을 때 메시지를 사용자의 모국어로 표시하면 이해도를 높이고 좌절감을 줄일 수 있습니다. 이는 토스트나 모달과 같은 프론트엔드 컴포넌트에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.
- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 여러 언어로 이 콘텐츠를 제공할 수 있습니다. 이는 제품 설명, 기사 및 기타 콘텐츠를 사용자가 선호하는 언어로 표시해야 하는 전자 상거래 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 필수적입니다.
- **다국어 이메일 전송**: 거래 이메일, 마케팅 캠페인 또는 알림이든 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.
- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자가 선호하는 언어로 푸시 알림을 보내면 상호 작용과 유지율을 향상시킬 수 있습니다. 이러한 개인화된 접근은 알림이 더 관련성 있고 실행 가능하게 느껴지도록 할 수 있습니다.
- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드로부터의 모든 형태의 커뮤니케이션은 사용자의 언어로 이루어지면 명확성을 보장하고 전체 사용자 경험을 향상시킵니다.

백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구에 더 잘 맞춰지므로, 전 세계적으로 서비스를 확장하는 데 있어 핵심 단계입니다.

## 시작하기

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-elysia-template)을 참조하세요.

### 설치

`elysia-intlayer`를 사용하기 시작하려면 npm을 사용하여 패키지를 설치하세요:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`을 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### 설정

프로젝트 루트에 `intlayer.config.ts`를 생성하여 국제화 설정을 구성합니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 콘텐츠 선언하기

번역을 저장하기 위한 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ko: "영어로 반환된 콘텐츠의 예",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ko": "영어로 반환된 콘텐츠의 예",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치하는 한 애플리케이션의 어느 곳에서나 정의할 수 있습니다.

> 더 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### Elysia Application Setup

`elysia-intlayer`를 사용하도록 Elysia 애플리케이션을 설정합니다:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // 국제화 플러그인 로드
  .use(intlayer())
  // Routes
  .get("/t_example", () =>
    t({
      ko: "영어로 반환된 콘텐츠의 예",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

플러그인은 또한 route context에 `intlayer` 객체를 주입합니다. 독립 실행형 헬퍼 대신 명시적 의존성을 원할 때 이를 사용하는 것이 좋습니다:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // 이 요청에 사용된 로케일, `Accept-Language` 협상 또는 스토리지에서 읽음
  locale: intlayer.locale,
  greeting: intlayer.t({
    ko: "안녕하세요",
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Route context는 `locale`, `defaultLocale`, `locale_storage` (클라이언트에서 명시적으로 설정한 로케일), `locale_detected` (헤더에서 협상된 로케일), `t`, `getIntlayer` 및 `getDictionary`를 노출합니다.

### 호환성

`elysia-intlayer`는 다음과 완전히 호환됩니다:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)>) React 애플리케이션용
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)>) Next.js 애플리케이션용
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)>) Vite 애플리케이션용

또한 브라우저 및 API 요청을 포함한 다양한 환경에서 모든 국제화 솔루션과 원활하게 작동합니다. 헤더 또는 쿠키를 통해 로케일을 감지하도록 미들웨어를 커스터마이즈할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

기본적으로 `elysia-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트의 선호 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 정보는 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 방문하세요.

### TypeScript 구성

`elysia-intlayer`는 국제화 프로세스를 강화하기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 고려되도록 보장하여 누락된 번역의 위험을 줄이고 유지보수성을 향상시킵니다.

자동 생성된 타입(기본값: ./types/intlayer.d.ts)이 tsconfig.json 파일에 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### VS Code Extension

Intlayer 개발 경험을 개선하기 위해 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 extension은 다음을 제공합니다:

- **Autocompletion** 번역 키용
- **실시간 오류 감지** 누락된 번역용
- **인라인 미리보기** 번역된 콘텐츠용
- **빠른 작업** 번역을 쉽게 생성하고 업데이트할 수 있음

extension 사용 방법에 대한 자세한 내용은 [Intlayer VS Code Extension 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋하지 않을 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지시사항을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
