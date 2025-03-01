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

### Express 애플리케이션 설정

`express-intlayer`를 사용하도록 Express 애플리케이션을 설정하십시오:

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

// 라우트
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

// 라우트
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

`express-intlayer`는 다음과 완벽히 호환됩니다:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/index.md) React 애플리케이션용
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/index.md) Next.js 애플리케이션용
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/vite-intlayer/index.md) Vite 애플리케이션용

또한 브라우저 및 API 요청을 포함한 다양한 환경에서 모든 국제화 솔루션과 원활하게 작동합니다. 헤더 또는 쿠키를 통해 로케일을 감지하도록 미들웨어를 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 설정 옵션
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
  // ... 기타 설정 옵션
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
  // ... 기타 설정 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

기본적으로 `express-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트의 선호 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

### TypeScript 구성

`express-intlayer`는 TypeScript의 강력한 기능을 활용하여 국제화 프로세스를 향상시킵니다. TypeScript의 정적 타이핑은 모든 번역 키가 포함되도록 보장하여 번역 누락 위험을 줄이고 유지 관리를 개선합니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

자동 생성된 타입(기본적으로 ./types/intlayer.d.ts)을 tsconfig.json 파일에 포함시키십시오.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋하지 않도록 할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
