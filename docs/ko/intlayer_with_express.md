# 시작하기 - Intlayer 및 Express와 함께 국제화(i18n)

`express-intlayer`는 Express 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호에 따라 로컬화된 응답을 제공하여 백엔드 서비스를 전 세계적으로 접근 가능하게 설계되었습니다.

## 왜 백엔드를 국제화해야 할까요?

백엔드를 국제화하는 것은 글로벌 청중에게 효과적으로 서비스를 제공하는 데 필수적입니다. 이를 통해 애플리케이션은 각 사용자의 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이 기능은 사용자 경험을 향상시키고 다양한 언어적 배경을 가진 사람들에게 더 접근 가능하고 관련성 있는 애플리케이션으로 만들어, 애플리케이션의 도달 범위를 넓힙니다.

### 실용적인 활용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때, 사용자의 모국어로 메시지를 표시함으로써 이해를 개선하고 불만을 줄입니다. 이는 토스트나 모달과 같은 프론트엔드 컴포넌트에서 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 가져오기**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션은, 국제화를 통해 여러 언어로 이 콘텐츠를 제공할 수 있습니다. 이는 제품 설명, 기사 및 사용자가 선호하는 언어로 다른 콘텐츠를 표시해야 하는 전자 상거래 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 매우 중요합니다.

- **다국어 이메일 보내기**: 거래 이메일, 마케팅 캠페인 또는 알림 등에서, 수신자의 언어로 이메일을 보내는 것은 참여도와 효과를 크게 증가시킬 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자가 선호하는 언어로 푸시 알림을 보내면 상호작용과 유지율을 향상시킬 수 있습니다. 이러한 개인적인 터치는 알림을 더 관련성 있고 실행 가능하게 느껴지도록 만들 수 있습니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 알림 또는 사용자 인터페이스 업데이트와 같은 백엔드에서의 모든 형태의 커뮤니케이션은 사용자의 언어로 진행됨으로써 명확성을 보장하고 전체 사용자 경험을 향상시킵니다.

백엔드를 국제화함으로써, 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장 요구에 더 잘 부합하게 되어, 전 세계적으로 서비스를 확장하는 데 있어 중요한 단계가 됩니다.

## 시작하기

### 설치

`express-intlayer`를 사용하기 위해, npm을 사용하여 패키지를 설치합니다:

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

프로젝트 루트에 `intlayer.config.ts`를 생성하여 국제화 설정을 구성합니다:

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

### Express 애플리케이션 설정

Express 애플리케이션을 `express-intlayer`를 사용하도록 설정합니다:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
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

// 국제화 요청 핸들러 로드
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

// 국제화 요청 핸들러 로드
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

`express-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션을 위한 `react-intlayer`
- Next.js 애플리케이션을 위한 `next-intlayer`

브라우저 및 API 요청을 포함한 다양한 환경에서 어떤 국제화 솔루션과도 원활하게 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지할 수 있습니다:

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

기본적으로 `express-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트의 선호 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 정보는 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 방문하십시오.

## TypeScript에 의해 구동되는

`express-intlayer`는 국제화 프로세스를 개선하기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 누락되지 않도록 보장하여, 누락된 번역의 위험을 줄이고 유지보수성을 향상시킵니다.

> 생성된 타입(기본적으로 ./types/intlayer.d.ts)은 tsconfig.json 파일에 포함되어야 합니다.
