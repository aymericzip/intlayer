---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Nest backend 앱 번역하는 방법 – i18n 가이드 2026
description: NestJS 백엔드를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - NestJS
  - 자바스크립트
  - 백엔드
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령어 추가
  - version: 5.8.0
    date: 2025-09-09
    changes: 초기 문서
---

# Intlayer로 Nest backend 번역하기 | 국제화(i18n)

`express-intlayer`는 Express 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호도에 따라 현지화된 응답을 제공하여 백엔드 서비스를 전 세계적으로 접근 가능하게 만듭니다. NestJS는 Express 위에 구축되었기 때문에, `express-intlayer`를 NestJS 애플리케이션에 원활하게 통합하여 다국어 콘텐츠를 효과적으로 처리할 수 있습니다.

## 백엔드를 국제화해야 하는 이유

백엔드를 국제화하는 것은 전 세계 사용자를 효과적으로 서비스하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어 배경을 가진 사람들에게 더 접근 가능하고 관련성 높은 애플리케이션으로 만들어 애플리케이션의 범위를 넓힙니다.

### 실용적인 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생할 때, 사용자의 모국어로 메시지를 표시하면 이해도를 높이고 불만을 줄일 수 있습니다. 이는 특히 토스트나 모달과 같은 프론트엔드 컴포넌트에 동적으로 표시되는 오류 메시지에 유용합니다.

- **다국어 콘텐츠 조회**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 여러 언어로 콘텐츠를 제공할 수 있습니다. 이는 전자상거래 사이트나 콘텐츠 관리 시스템과 같이 사용자 선호 언어로 제품 설명, 기사 및 기타 콘텐츠를 표시해야 하는 플랫폼에 매우 중요합니다.

- **다국어 이메일 전송**: 거래 이메일, 마케팅 캠페인 또는 알림 등 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션에서는 사용자가 선호하는 언어로 푸시 알림을 보내면 상호작용과 유지율을 향상시킬 수 있습니다. 이러한 개인화된 접근은 알림을 더 관련성 있고 실행 가능하게 만듭니다.

- **기타 커뮤니케이션**: 백엔드에서 보내는 모든 형태의 커뮤니케이션(예: SMS 메시지, 시스템 경고, 사용자 인터페이스 업데이트)은 사용자의 언어로 제공되어 명확성을 보장하고 전반적인 사용자 경험을 향상시킵니다.

백엔드를 국제화함으로써, 귀하의 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장의 요구에 더 잘 부합하게 되어, 전 세계적으로 서비스를 확장하는 데 중요한 단계가 됩니다.

## 시작하기

### 새로운 NestJS 프로젝트 생성

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### 설치

`express-intlayer`를 사용하기 시작하려면, npm을 사용하여 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer express-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer express-intlayer
bunx intlayer init
```

### tsconfig.json 구성

TypeScript와 함께 Intlayer를 사용하려면 `tsconfig.json`이 ES 모듈을 지원하도록 설정되어 있는지 확인하세요. `module`과 `moduleResolution` 옵션을 `nodenext`로 설정하면 됩니다.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... 기타 옵션
  },
}
```

### 설정

프로젝트 루트에 `intlayer.config.ts` 파일을 생성하여 국제화 설정을 구성하세요:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](/doc/concept/content)를 참조하세요.

### Express 미들웨어 설정

`express-intlayer` 미들웨어를 NestJS 애플리케이션에 통합하여 국제화를 처리하세요:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // 모든 경로에 적용
  }
}
```

### 서비스 또는 컨트롤러에서 번역 사용하기

이제 `getIntlayer` 함수를 사용하여 서비스나 컨트롤러에서 번역에 접근할 수 있습니다:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // "app" 네임스페이스에서 번역된 인사말을 반환합니다.
  }
}
```

### 호환성

`express-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션용 [`react-intlayer`](/doc/packages/react-intlayer)
- Next.js 애플리케이션용 [`next-intlayer`](/doc/packages/next-intlayer)
- Vite 애플리케이션용 [`vite-intlayer`](/doc/packages/vite-intlayer)

또한 브라우저와 API 요청을 포함한 다양한 환경에서 모든 국제화 솔루션과 원활하게 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지할 수 있습니다:

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

기본적으로 `express-intlayer`는 `Accept-Language` 헤더를 해석하여 클라이언트가 선호하는 언어를 결정합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](/doc/concept/configuration)를 참조하세요.

### TypeScript 구성

`express-intlayer`는 국제화 프로세스를 향상시키기 위해 TypeScript의 강력한 기능을 활용합니다. TypeScript의 정적 타이핑은 모든 번역 키가 포함되도록 보장하여 누락된 번역의 위험을 줄이고 유지보수성을 향상시킵니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

자동 생성된 타입들(기본적으로 ./types/intlayer.d.ts 위치)이 tsconfig.json 파일에 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  include: [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### VS Code 확장

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 권장됩니다. 이렇게 하면 Git 저장소에 해당 파일을 커밋하는 것을 방지할 수 있습니다.

이를 위해, 다음 지침을 `.gitignore` 파일에 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```
