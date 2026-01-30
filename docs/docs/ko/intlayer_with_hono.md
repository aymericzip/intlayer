---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Hono 앱 번역 방법 – 2026 가이드
description: Hono 백엔드를 다국어로 만드는 방법을 알아보세요. 문서를 따라 국제화(i18n)하고 번역하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Hono
  - JavaScript
  - 백엔드
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령 추가
  - version: 5.5.10
    date: 2025-06-29
    changes: 히스토리 초기화
---

# Intlayer를 사용하여 Hono 백엔드 웹사이트 번역하기 | 국제화(i18n)

`hono-intlayer`는 Hono 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호도에 따라 현지화된 응답을 제공하여 백엔드 서비스를 전 세계에서 액세스할 수 있도록 설계되었습니다.

### 실제 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때 사용자의 모국어로 메시지를 표시하면 이해도가 높아지고 불만이 줄어듭니다. 이는 토스트나 모달과 같은 프론트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 이 콘텐츠를 여러 언어로 제공할 수 있습니다. 이는 제품 설명, 기사 및 기타 콘텐츠를 사용자가 선호하는 언어로 표시해야 하는 이커머스 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 필수적입니다.

- **다국어 이메일 발송**: 트랜잭션 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우 사용자의 선호 언어로 푸시 알림을 보내면 상호 작용과 유지율을 높일 수 있습니다. 이러한 개인적인 터치는 알림을 더 관련성 있고 실행 가능하게 느끼게 할 수 있습니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 커뮤니케이션 형태는 사용자의 언어로 제공될 때 명확성이 보장되고 전반적인 사용자 경험이 향상되는 이점이 있습니다.

백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구 사항에 더 잘 부합하게 되며, 이는 전 세계적으로 서비스를 확장하는 데 중요한 단계입니다.

## 시작하기

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### 설치

`hono-intlayer` 사용을 시작하려면 npm을 사용하여 패키지를 설치하세요.

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### 설정

프로젝트 루트에 `intlayer.config.ts`를 생성하여 국제화 설정을 구성합니다.

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.KOREAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 콘텐츠 선언

번역을 저장할 콘텐츠 선언을 생성하고 관리합니다.

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ko: "한국어로 반환된 콘텐츠의 예",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./src`)에 포함되어 있는 한 애플리케이션의 어디에서나 정의할 수 있습니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### Hono 애플리케이션 설정

`hono-intlayer`를 사용하도록 Hono 애플리케이션을 설정합니다.

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// 국제화 요청 핸들러 로드
app.use("*", intlayer());

// 라우트
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ko: "한국어로 반환된 콘텐츠의 예",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### 호환성

`hono-intlayer`는 다음과 완전하게 호환됩니다.

- React 애플리케이션을 위한 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)
- Next.js 애플리케이션을 위한 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)
- Vite 애플리케이션을 위한 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)

또한 브라우저 및 API 요청을 포함한 다양한 환경의 모든 국제화 솔루션과 원활하게 작동합니다. 헤더나 쿠키를 통해 로케일을 감지하도록 미들웨어를 사용자 정의할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

기본적으로 `hono-intlayer`는 클라이언트의 선호 언어를 결정하기 위해 `Accept-Language` 헤더를 해석합니다.

> 구성 및 심화 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### TypeScript 구성

`hono-intlayer`는 TypeScript의 강력한 기능을 활용하여 국제화 프로세스를 향상시킵니다. TypeScript의 정적 타이핑은 모든 번역 키가 고려되도록 보장하여 번역 누락 위험을 줄이고 유지 관리성을 향상시킵니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

### VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키려면 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다.

- 번역 키에 대한 **자동 완성**.
- 번역 누락에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이렇게 하면 Git 저장소에 커밋되는 것을 방지할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다.

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
