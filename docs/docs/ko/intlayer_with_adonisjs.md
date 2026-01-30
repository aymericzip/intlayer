---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - AdonisJS 앱 번역 방법 – 가이드 2026
description: AdonisJS 백엔드를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 따르십시오.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - AdonisJS
  - JavaScript
  - 백엔드
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: 히스토리 초기화
---

# Intlayer를 사용하여 AdonisJS 백엔드 웹사이트 번역하기 | 국제화 (i18n)

`adonis-intlayer`는 AdonisJS 애플리케이션을 위한 강력한 국제화(i18n) 패키지로, 클라이언트의 선호도에 따라 현지화된 응답을 제공하여 백엔드 서비스를 전 세계에서 액세스할 수 있도록 설계되었습니다.

### 실용적인 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때 사용자의 모국어로 메시지를 표시하면 이해도가 높아지고 불만이 줄어듭니다. 이는 토스트나 모달과 같은 프런트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 이 콘텐츠를 여러 언어로 제공할 수 있습니다. 이는 제품 설명, 기사 및 기타 콘텐츠를 사용자가 선호하는 언어로 표시해야 하는 이커머스 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 필수적입니다.

- **다국어 이메일 발송**: 트랜잭션 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우 사용자가 선호하는 언어로 푸시 알림을 보내면 상호 작용과 유지율을 높일 수 있습니다. 이러한 개인화된 터치는 알림을 더 관련성 있고 실행 가능하게 느끼게 합니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 형태의 커뮤니케이션은 사용자의 언어로 제공될 때 명확성을 보장하고 전반적인 사용자 경험을 향상시키는 이점을 누릴 수 있습니다.

백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구 사항에 더 잘 부합하게 되며, 이는 서비스를 전 세계적으로 확장하는 데 있어 중요한 단계가 됩니다.

## 시작하기

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### 설치

`adonis-intlayer`를 사용하려면 npm을 사용하여 패키지를 설치하십시오.

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다.

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ko: "한국어로 반환된 콘텐츠 예시",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ko: "한국어로 반환된 콘텐츠 예시",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ko: "한국어로 반환된 콘텐츠 예시",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "ko": "한국어로 반환된 콘텐츠 예시",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉터리(기본적으로 `./src` 또는 `./app`)에 포함되고 콘텐츠 선언 파일 확장자(기본적으로 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치하는 한 애플리케이션의 어디에서나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### AdonisJS 애플리케이션 설정

`adonis-intlayer`를 사용하도록 AdonisJS 애플리케이션을 설정합니다.

#### 미들웨어 등록

먼저 애플리케이션에 `intlayer` 미들웨어를 등록해야 합니다.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### 라우트 정의

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    ko: "한국어로 반환된 콘텐츠 예시",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### 함수

`adonis-intlayer`는 애플리케이션에서 국제화를 처리하기 위해 여러 함수를 내보냅니다.

- `t(content, locale?)`: 기본 번역 함수.
- `getIntlayer(key, locale?)`: 딕셔너리에서 키로 콘텐츠를 검색합니다.
- `getDictionary(dictionary, locale?)`: 특정 딕셔너리 개체에서 콘텐츠를 검색합니다.
- `getLocale()`: 요청 컨텍스트에서 현재 로케일을 검색합니다.

#### 컨트롤러에서 사용

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        ko: "컨트롤러에서 보내는 인사",
      })
    );
  }
}
```

### 호환성

`adonis-intlayer`는 다음과 완벽하게 호환됩니다.

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

기본적으로 `adonis-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트가 선호하는 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### TypeScript 구성

`adonis-intlayer`는 TypeScript의 강력한 기능을 활용하여 국제화 프로세스를 향상시킵니다. TypeScript의 정적 타이핑은 모든 번역 키가 고려되도록 하여 번역 누락의 위험을 줄이고 유지 관리성을 향상시킵니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

자동 생성된 유형(기본적으로 ./types/intlayer.d.ts)이 tsconfig.json 파일에 포함되어 있는지 확인하십시오.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 유형 포함
  ],
}
```

### VS Code 확장 프로그램

Intlayer 개발 경험을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다.

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/ko/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋되는 것을 방지할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다.

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
