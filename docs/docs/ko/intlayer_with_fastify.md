---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026년에 Fastify 앱을 번역하는 방법
description: Fastify 백엔드를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Fastify
  - JavaScript
  - 백엔드
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "init 명령어 추가"
  - version: 7.6.0
    date: 2025-12-31
    changes: "히스토리 초기화"
---

# Intlayer를 사용하여 Fastify 백엔드 웹사이트 번역하기 | 국제화 (i18n)

`fastify-intlayer`는 Fastify 애플리케이션을 위한 강력한 국제화(i18n) 플러그인으로, 클라이언트의 기본 설정에 따라 현지화된 응답을 제공하여 백엔드 서비스를 전 세계에서 액세스할 수 있도록 설계되었습니다.

> GitHub에서 패키지 구현 확인하기: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### 실제 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때 사용자의 모국어로 메시지를 표시하면 이해도가 높아지고 불만이 줄어듭니다. 이는 토스트(toast)나 모달(modal)과 같은 프론트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.
- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 여러 언어로 해당 콘텐츠를 제공할 수 있습니다. 이는 사용자가 선호하는 언어로 제품 설명, 기사 및 기타 콘텐츠를 표시해야 하는 전자상거래 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 필수적입니다.
- **다국어 이메일 전송**: 트랜잭션 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.
- **다국어 푸시 알림**: 모바일 애플리케이션의 경우 사용자가 선호하는 언어로 푸시 알림을 보내면 상호 작용과 유지율을 높일 수 있습니다. 이러한 개인화된 터치는 알림을 더 관련성 있고 실행 가능하게 느끼게 할 수 있습니다.
- **기타 통신**: SMS 메시지, 시스템 알림 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 통신 형태는 사용자의 언어로 제공됨으로써 명확성을 보장하고 전반적인 사용자 경험을 개선할 수 있습니다.

백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구에 더 잘 부응하게 되어 서비스를 전 세계로 확장하는 데 중요한 단계가 됩니다.

## 시작하기

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-fastify-template)을 확인하세요.

### 설치

`fastify-intlayer` 사용을 시작하려면 npm을 사용하여 패키지를 설치하세요.

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
bun x intlayer init

```

### 설정

프로젝트 루트에 `intlayer.config.ts`를 생성하여 국제화 설정을 구성하세요.

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

### 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요.

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉터리(기본값 `./src`)에 포함되어 있는 한 애플리케이션의 어느 곳에서나 정의할 수 있습니다. 또한 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### Fastify 애플리케이션 설정

`fastify-intlayer`를 사용하도록 Fastify 애플리케이션을 설정하세요.

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 국제화 플러그인 로드
await fastify.register(intlayer);

// 라우트
fastify.get("/t_example", async (_req, reply) => {
  return t({
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

### 호환성

`fastify-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션을 위한 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)
- Next.js 애플리케이션을 위한 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)
- Vite 애플리케이션을 위한 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)

또한 브라우저 및 API 요청을 포함한 다양한 환경의 모든 국제화 솔루션과 원활하게 작동합니다. 헤더나 쿠키를 통해 로케일을 감지하도록 미들웨어를 사용자 정의할 수 있습니다:

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

기본적으로 `fastify-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트가 선호하는 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 방문하세요.

### TypeScript 구성

`fastify-intlayer`는 국제화 프로세스를 향상시키기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 고려되도록 보장하여 번역 누락의 위험을 줄이고 유지 관리성을 향상시킵니다.

자동 생성된 유형(기본값 `./types/intlayer.d.ts`)이 `tsconfig.json` 파일에 포함되어 있는지 확인하세요.

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

Intlayer 개발 환경을 개선하려면 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 번역 누락에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리 보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용에 대한 자세한 내용은 [Intlayer VS Code Extension 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋하는 것을 방지할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer

```
