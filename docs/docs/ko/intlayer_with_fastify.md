---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify 백엔드를 번역하는 방법 – i18n 가이드 2026
description: Fastify 백엔드를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역 절차를 따르세요.
keywords:
  - 국제화 (i18n)
  - 문서
  - Intlayer
  - Fastify
  - JavaScript
  - 백엔드
slugs:
  - doc
  - environment
  - fastify
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: init 명령 추가
  - version: 7.6.0
    date: 2025-12-31
    changes: 초기 히스토리
---

# Intlayer로 Fastify 백엔드 웹사이트 번역하기 | 국제화(i18n)

`fastify-intlayer`은 Fastify 애플리케이션을 위한 강력한 국제화(i18n) 플러그인으로, 클라이언트의 선호에 따라 로컬라이즈된 응답을 제공하여 백엔드 서비스를 전 세계적으로 접근 가능하게 만듭니다.

### 실용적인 사용 사례

- **사용자 언어로 백엔드 오류 표시하기**: 오류가 발생했을 때 사용자 모국어로 메시지를 표시하면 이해를 돕고 좌절감을 줄여줍니다. 이는 토스트나 모달 같은 프론트엔드 컴포넌트에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.
- **다국어 콘텐츠 제공**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화는 이러한 콘텐츠를 여러 언어로 제공할 수 있도록 보장합니다. 이는 e-commerce 사이트나 콘텐츠 관리 시스템(CMS)처럼 제품 설명, 기사 및 기타 콘텐츠를 사용자가 선호하는 언어로 표시해야 하는 플랫폼에 매우 중요합니다.
- **다국어 이메일 발송**: 거래 관련 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 발송하면 참여도와 효과를 크게 높일 수 있습니다.
- **다국어 푸시 알림**: 모바일 애플리케이션의 경우 사용자가 선호하는 언어로 푸시 알림을 보내면 상호작용과 유지율을 높일 수 있습니다. 이러한 개인화된 접근은 알림이 더 관련성 있고 실행 가능하게 느껴지도록 합니다.
- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 형태의 커뮤니케이션은 사용자의 언어로 제공될 때 명확성을 보장하고 전체적인 사용자 경험을 향상시킵니다.

백엔드를 국제화하면 애플리케이션이 문화적 차이를 존중할 뿐만 아니라 글로벌 시장 요구에 더 잘 부합하게 되어 서비스를 전 세계로 확장하는 데 중요한 단계가 됩니다.

## 시작하기

### 설치

`fastify-intlayer`를 사용하기 시작하려면 npm을 사용해 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init
```

### 설정

프로젝트 루트에 `intlayer.config.ts` 파일을 생성하여 국제화 설정을 구성합니다:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### 콘텐츠 선언

번역을 저장하기 위한 콘텐츠 선언을 생성하고 관리하세요:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ko: "영어로 반환된 콘텐츠 예시",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ko: "영어로 반환된 콘텐츠 예시",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** 인덱스 콘텐츠의 타입을 지정합니다. @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ko: "영어로 반환된 콘텐츠 예시",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ko": "영어로 반환된 콘텐츠 예시",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 콘텐츠 선언(content declarations)은 애플리케이션 내 어디에든 정의할 수 있으며, 단 `contentDir` 디렉터리(기본값 `./src`)에 포함되어 있어야 합니다. 또한 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### Fastify 애플리케이션 설정

fastify-intlayer를 사용하도록 Fastify 애플리케이션을 설정하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

javascript fileName="src/index.mjs" codeFormat="esm"
// 국제화 플러그인 로드
await fastify.register(intlayer);

// 라우트
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ko: "영어로 반환된 콘텐츠의 예시",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// 서버 시작
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 국제화 플러그인 로드
await fastify.register(intlayer);

// 라우트
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ko: "영어로 반환된 콘텐츠 예시",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// 서버 시작
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await를 위한 서버 시작 래퍼
const start = async () => {
  try {
    // 국제화 플러그인 로드
    await fastify.register(intlayer);

    // 라우트
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        ko: "반환된 콘텐츠 예시 (한국어)",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### 호환성

`fastify-intlayer`은 다음과 완전히 호환됩니다:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)>) React 애플리케이션용
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)>) Next.js 애플리케이션용

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)>) React 애플리케이션용
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)>) Next.js 애플리케이션용
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)>) for Vite 애플리케이션용

또한 브라우저와 API 요청을 포함한 다양한 환경에서 어떤 국제화 솔루션과도 원활하게 작동합니다. 미들웨어를 통해 헤더나 쿠키로 로케일을 감지하도록 커스터마이즈할 수 있습니다:

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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

기본적으로 `fastify-intlayer`는 클라이언트의 선호 언어를 결정하기 위해 `Accept-Language` 헤더를 해석합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### TypeScript 구성

`fastify-intlayer`는 국제화 프로세스를 향상시키기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 타입으로 관리되도록 보장하여 누락된 번역의 위험을 줄이고 유지보수성을 향상시킵니다.

자동 생성된 타입(기본 경로: ./types/intlayer.d.ts)이 tsconfig.json 파일에 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### VS Code 확장

Intlayer 개발 경험을 향상시키려면 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- **번역 키에 대한 자동 완성**
- **누락된 번역에 대한 실시간 오류 감지**
- **번역된 콘텐츠의 인라인 미리보기**
- **번역을 손쉽게 생성하고 업데이트할 수 있는 빠른 작업(Quick actions)**

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code Extension 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 설정

Intlayer에서 생성된 파일은 무시(ignored)하는 것을 권장합니다. 이렇게 하면 해당 파일들이 Git 리포지토리에 커밋되는 것을 방지할 수 있습니다.

이를 위해 다음 지침을 `.gitignore` 파일에 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
