# express-intlayer: JavaScript 패키지로 Express.js 애플리케이션을 국제화(i18n)하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js, Express.js와 같은 프레임워크와 호환됩니다.

**`express-intlayer` 패키지**는 Express.js 애플리케이션을 국제화할 수 있도록 합니다. 사용자의 선호 언어를 감지하는 미들웨어를 제공하며, 사용자에게 적절한 사전을 반환합니다.

## 왜 백엔드를 국제화해야 하나요?

백엔드를 국제화하는 것은 글로벌 청중에게 효과적으로 서비스를 제공하는 데 필수적입니다. 이는 애플리케이션이 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있게 합니다. 이러한 기능은 사용자 경험을 향상시키고 다양한 언어 배경을 가진 사람들에게 더욱 접근 가능하고 관련성 있는 애플리케이션으로 넓혀줍니다.

### 실용적인 사용 사례

- **사용자 언어로 백엔드 오류 표시하기**: 오류가 발생할 경우, 사용자의 모국어로 메시지를 표시하면 이해도를 높이고 불만을 줄일 수 있습니다. 이는 토스트나 모달과 같은 프론트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 검색하기**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화는 여러 언어로 이 콘텐츠를 제공할 수 있도록 보장합니다. 이는 제품 설명, 기사 및 기타 콘텐츠를 사용자 선호 언어로 표시해야 하는 전자 상거래 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 필수적입니다.

- **다국어 이메일 전송하기**: 트랜잭션 이메일, 마케팅 캠페인 또는 알림 등에서 수신자의 언어로 이메일을 전송하면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자의 선호 언어로 푸시 알림을 전송하면 상호 작용과 유지율을 향상시킬 수 있습니다. 이런 개인화된 접근은 알림을 보다 관련성 있고 실행 가능하다고 느끼게 합니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드의 어떠한 형태의 커뮤니케이션도 사용자의 언어로 제공될 경우 명확성과 전반적인 사용자 경험을 향상시킬 수 있습니다.

백엔드를 국제화함으로써, 귀하의 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구에 더 잘 부합하며, 이는 전 세계적으로 서비스를 확장하는 데 중요한 단계가 됩니다.

## Intlayer를 통합해야 하는 이유는 무엇인가요?

- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 합니다.

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

Intlayer는 프로젝트를 설정하기 위한 구성 파일을 제공합니다. 이 파일을 프로젝트 루트에 두세요.

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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## 사용 예

`express-intlayer`를 사용하도록 Express 애플리케이션을 설정하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 국제화 요청 처리기 로드
app.use(intlayer());

// 경로
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// 국제화 요청 처리기 로드
app.use(intlayer());

// 경로
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 국제화 요청 처리기 로드
app.use(intlayer());

// 경로
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 호환성

`express-intlayer`는 다음과 완벽 호환됩니다:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/index.md) for React 애플리케이션
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/index.md) for Next.js 애플리케이션
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/vite-intlayer/index.md) for Vite 애플리케이션

또한 브라우저 및 API 요청 등 다양한 환경에서 모든 국제화 솔루션과 원활하게 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지할 수 있습니다:

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

기본적으로 `express-intlayer`는 클라이언트의 선호 언어를 결정하기 위해 `Accept-Language` 헤더를 해석합니다.

## `express-intlayer` 패키지가 제공하는 함수

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/express-intlayer/t.md)
