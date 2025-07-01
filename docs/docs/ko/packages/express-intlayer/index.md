---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 패키지 문서 | express-intlayer
description: express-intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - express-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: Express.js 애플리케이션을 국제화(i18n)하기 위한 JavaScript 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js, Express.js와 같은 프레임워크와 호환됩니다.

**`express-intlayer` 패키지**는 Express.js 애플리케이션을 국제화할 수 있게 해줍니다. 사용자의 선호 로케일을 감지하는 미들웨어를 제공하며, 사용자에게 적합한 사전을 반환합니다.

## 백엔드를 국제화해야 하는 이유

백엔드를 국제화하는 것은 전 세계 사용자를 효과적으로 서비스하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어 배경을 가진 사람들에게 더 접근 가능하고 관련성 높은 애플리케이션으로 만들어 범위를 넓힙니다.

### 실제 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때, 사용자의 모국어로 메시지를 표시하면 이해도를 높이고 불만을 줄일 수 있습니다. 이는 특히 토스트나 모달과 같은 프론트엔드 컴포넌트에서 동적으로 표시되는 오류 메시지에 유용합니다.

- **다국어 콘텐츠 가져오기**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 여러 언어로 콘텐츠를 제공할 수 있습니다. 이는 전자상거래 사이트나 콘텐츠 관리 시스템과 같이 사용자 선호 언어로 제품 설명, 기사 및 기타 콘텐츠를 표시해야 하는 플랫폼에 매우 중요합니다.

- **다국어 이메일 전송**: 거래 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 전송하면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션에서 사용자가 선호하는 언어로 푸시 알림을 보내면 상호작용과 유지율을 향상시킬 수 있습니다. 이러한 개인화된 접근은 알림을 더 관련성 있고 실행 가능하게 만듭니다.

- **기타 커뮤니케이션**: 백엔드에서 보내는 모든 형태의 커뮤니케이션(예: SMS 메시지, 시스템 경고, 사용자 인터페이스 업데이트)은 사용자의 언어로 제공되어 명확성을 보장하고 전반적인 사용자 경험을 향상시킵니다.

백엔드를 국제화함으로써, 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구에 더 잘 부합하게 되어, 전 세계적으로 서비스를 확장하는 데 중요한 단계가 됩니다.

## 왜 Intlayer를 통합해야 하나요?

- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Intlayer 구성하기

Intlayer는 프로젝트 설정을 위한 구성 파일을 제공합니다. 이 파일을 프로젝트 루트에 배치하세요.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// 국제화 설정 객체
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 지원하는 로케일 목록
    defaultLocale: Locales.ENGLISH, // 기본 로케일 설정
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 사용 가능한 모든 매개변수 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## 사용 예시

`express-intlayer`를 사용하도록 Express 애플리케이션을 설정하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "프랑스어로 반환된 콘텐츠 예시",
      "es-ES": "스페인어(스페인)로 반환된 콘텐츠 예시",
      "es-MX": "스페인어(멕시코)로 반환된 콘텐츠 예시",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 대기 중`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "프랑스어로 반환된 콘텐츠 예시",
      "es-MX": "스페인어(멕시코)로 반환된 콘텐츠 예시",
      "es-ES": "스페인어(스페인)로 반환된 콘텐츠 예시",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 대기 중`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 라우트
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "프랑스어로 반환된 콘텐츠 예시",
      "es-MX": "스페인어(멕시코)로 반환된 콘텐츠 예시",
      "es-ES": "스페인어(스페인)로 반환된 콘텐츠 예시",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 대기 중`));
```

### 호환성

`express-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션용 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)
- Next.js 애플리케이션용 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)
- Vite 애플리케이션용 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)

또한 브라우저와 API 요청을 포함한 다양한 환경에서 모든 국제화 솔루션과 원활하게 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header", // 헤더 이름
    cookieName: "my-locale-cookie", // 쿠키 이름
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
    headerName: "my-locale-header", // 헤더 이름
    cookieName: "my-locale-cookie", // 쿠키 이름
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

기본적으로, `express-intlayer`는 클라이언트의 선호 언어를 결정하기 위해 `Accept-Language` 헤더를 해석합니다.

## `express-intlayer` 패키지가 제공하는 함수

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/express-intlayer/t.md)

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
