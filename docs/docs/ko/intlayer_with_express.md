---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Express 백엔드를 번역하십시오 (i18n)
description: vite 백엔드를 다국어로 만드는 방법을 알아보세요. 국제화(i18n)하고 번역하려면 문서를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Express
  - JavaScript
  - 백엔드
---

# Intlayer 및 Express로 국제화(i18n) 시작하기

`express-intlayer`는 Express 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호도에 따라 로컬화된 응답을 제공하여 백엔드 서비스를 전 세계적으로 접근 가능하게 만듭니다.

## 왜 백엔드를 국제화해야 할까요?

백엔드를 국제화하는 것은 글로벌 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 애플리케이션을 다양한 언어적 배경을 가진 사람들에게 더 접근 가능하고 관련성 있게 만들어 애플리케이션의 도달 범위를 넓힙니다.

### 실질적인 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때, 사용자의 모국어로 메시지를 표시하면 이해도를 높이고 좌절감을 줄일 수 있습니다. 이는 토스트나 모달과 같은 프론트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화는 이 콘텐츠를 여러 언어로 제공할 수 있도록 보장합니다. 이는 전자 상거래 사이트나 콘텐츠 관리 시스템과 같이 제품 설명, 기사 및 기타 콘텐츠를 사용자가 선호하는 언어로 표시해야 하는 플랫폼에 필수적입니다.
- **다국어 이메일 전송**: 거래 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자가 선호하는 언어로 푸시 알림을 보내면 상호작용과 유지율을 높일 수 있습니다. 이러한 개인화된 접근은 알림을 더 관련성 있고 실행 가능하게 만듭니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 알림 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 형태의 커뮤니케이션은 사용자의 언어로 제공될 때 명확성을 보장하고 전반적인 사용자 경험을 향상시킵니다.
  백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장 요구에 더 잘 부합하게 되어 서비스를 전 세계적으로 확장하는 데 중요한 단계가 됩니다.

## 시작하기

### 설치

`express-intlayer`를 사용하려면 npm을 사용하여 패키지를 설치하십시오:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### 설정

프로젝트 루트에 `intlayer.config.ts`를 생성하여 국제화 설정을 구성하십시오:

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

### 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

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
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

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

> 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값은 `./src`)에 포함되어야 합니다. 그리고 콘텐츠 선언 파일 확장자(기본값은 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

### Express 애플리케이션 설정

`express-intlayer`를 사용하도록 Express 애플리케이션을 설정하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      ko: "영어로 반환된 콘텐츠 예시",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 서버 시작
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      ko: "영어로 반환된 콘텐츠 예시",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 대기 중`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 대기 중`));
```

### 호환성

`express-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션용 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)
- Next.js 애플리케이션용 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)
- Vite 애플리케이션용 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)
  다양한 환경(브라우저 및 API 요청 포함)에서 모든 국제화 솔루션과 원활하게 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지할 수 있습니다:

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

기본적으로 `express-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트가 선호하는 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### TypeScript 구성

`express-intlayer`는 국제화 과정을 향상시키기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 포함되도록 보장하여 누락된 번역의 위험을 줄이고 유지보수성을 향상시킵니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

자동 생성된 타입들(기본적으로 ./types/intlayer.d.ts 위치)을 tsconfig.json 파일에 포함했는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### VS Code 확장 기능

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 기능**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 기능 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer가 생성한 파일은 무시하는 것이 권장됩니다. 이렇게 하면 Git 저장소에 해당 파일을 커밋하는 것을 방지할 수 있습니다.

### VS 코드 확장

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS 코드 확장**을 설치할 수 있습니다.

[VS 코드 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 내용의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 사용 방법에 대한 자세한 내용은 [Intlayer VS 코드 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 설정

Intlayer가 생성하는 파일을 무시하는 것이 권장됩니다. 이렇게 하면 Git 저장소에 해당 파일을 커밋하지 않을 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화
