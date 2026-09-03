---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) NestJS 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 5.8.0
    date: 2025-09-09
    changes: "초기 문서"
---

# Intlayer로 Nest backend 번역하기 | 국제화(i18n)

`express-intlayer`는 Express 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호도에 따라 현지화된 응답을 제공하여 백엔드 서비스를 전 세계적으로 접근 가능하게 만듭니다. NestJS는 Express 위에 구축되었기 때문에, `express-intlayer`를 NestJS 애플리케이션에 원활하게 통합하여 다국어 콘텐츠를 효과적으로 처리할 수 있습니다.

tical Use Cases

- **사용자의 언어로 백엔드 오류 표시**: 오류가 발생하면 사용자의 모국어로 메시지를 표시하면 이해도가 높아지고 좌절감이 줄어듭니다. 이는 toasts 또는 modals과 같은 front-end 컴포넌트에 표시될 수 있는 동적 오류 메시지에 특히 유용합니다.

- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화를 통해 여러 언어로 콘텐츠를 제공할 수 있습니다. 이는 사용자가 선호하는 언어로 제품 설명, 기사 및 기타 콘텐츠를 표시해야 하는 e-commerce 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에서 매우 중요합니다.

- **다국어 이메일 전송**: 거래 이메일, 마케팅 캠페인 또는 알림이든 관계없이 수신자의 언어로 이메일을 전송하면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자가 선호하는 언어로 푸시 알림을 전송하면 상호작용과 사용자 유지율을 높일 수 있습니다. 이러한 개인화된 접근 방식은 알림을 더욱 관련성 있고 실행 가능하게 만들 수 있습니다.

- **기타 통신**: SMS 메시지, 시스템 알림 또는 사용자 인터페이스 업데이트와 같은 백엔드의 모든 형태의 통신은 사용자의 언어로 제공될 때 이점이 있으며, 명확성을 보장하고 전반적인 사용자 경험을 향상시킵니다.

백엔드를 국제화함으로써, 당신의 애플리케이션은 문화적 차이를 존중할 뿐만 아니라 글로벌 시장 요구에 더 잘 부합하게 되어, 전 세계적으로 서비스를 확장하는 핵심 단계가 됩니다.

## 시작하기

### 새로운 NestJS 프로젝트 생성

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### 설치

`express-intlayer`를 사용하기 시작하려면, npm을 사용하여 패키지를 설치하세요:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## 자주 묻는 질문

<FAQ>

<Question title="NestJS 백엔드를 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

NestJS에는 요청 범위(request-scoped) 서비스와 함께 JSON 또는 YAML 카탈로그를 지원하는 일반적인 선택지인 `nestjs-i18n`이 있습니다. 대안은 `express-intlayer`를 통한 `Intlayer`로, 프론트엔드와 동일하게 선언된 콘텐츠를 공유하고 사전에 대해 타입 안전성을 제공하며 AI 번역과 CMS를 포함합니다.

백엔드를 국제화해야 하는 이유는 사용자가 읽는 텍스트의 상당 부분이 프론트엔드를 거치지 않기 때문입니다: API 오류 메시지, 트랜잭션 이메일, 푸시 알림, SMS 및 PDF 내보내기 등이 여기에 해당합니다. 이러한 텍스트는 세션이 아닌 요청별로 수신자의 언어가 확인되어야 합니다.

[왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.

</Question>

<Question title="i18n이 NestJS 서버 번들 크기에 얼마나 영향을 미치나요?">

매우 적습니다. 사전은 사전에 컴파일되며 선언한 로케일만 포함되므로 부팅 시 카탈로그 로딩이나 요청 경로에서의 파일 읽기가 발생하지 않습니다. 이는 번들 크기가 콜드 스타트 시간을 좌우하는 서버리스 및 엣지 배포 환경에서 특히 중요합니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참조하세요.

</Question>

<Question title="핸들러를 다시 작성하지 않고 i18next에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 따라 점진적으로 이전할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다: [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `i18next`와 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 핸들러 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 소스 파일을 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

동일한 프로젝트의 프론트엔드 측에서는 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)가 빌드 타임에 JSX, TSX, Vue 또는 Svelte 소스에서 사전을 생성하므로 앱의 두 영역이 수동 키 관리 없이 단일 콘텐츠 레이어를 공유할 수 있습니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="Intlayer는 응답할 언어를 어떻게 파악하나요?">

기본적으로 `express-intlayer`는 들어오는 요청의 `Accept-Language` 헤더를 읽고 선언된 가장 가까운 로케일을 선택하며, 기본 로케일로 폴백합니다. `routing.storage`를 통해 소스를 사용자 지정 헤더나 프론트엔드가 설정한 쿠키 등으로 변경할 수 있으므로 브라우저 광고 언어가 아닌 사용자가 실제로 선택한 언어로 API가 응답하도록 만들 수 있습니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="로케일은 요청별로 격리되나요?">

네. 미들웨어는 활성 로케일의 범위를 요청으로 한정하므로 서로 다른 언어로 실행 중인 두 개의 동시 요청이 상대방의 로케일을 읽지 않습니다. 덕분에 모든 함수에 로케일 인수를 전달하지 않고도 서비스 내에서 `t()` 및 `getIntlayer()`를 안전하게 호출할 수 있습니다.

</Question>

<Question title="수신자의 언어로 트랜잭션 이메일을 보내려면 어떻게 하나요?">

다른 콘텐츠와 마찬가지로 콘텐츠 파일에 이메일 내용을 선언한 다음 요청 로케일 대신 수신자의 저장된 로케일로 `getIntlayer`를 호출하여 확인합니다. 이는 언어가 사용자 레코드에 속해 있고 헤더를 읽을 수 있는 인바운드 요청이 없는 백그라운드 작업 및 큐에서 특히 유용합니다.

</Question>

<Question title="API 오류 메시지를 어떻게 지역화하나요?">

오류가 생성되는 지점에서 메시지를 `t()`로 래핑하세요. 활성 요청 로케일이 이를 확인하므로 클라이언트는 직접 표시할 수 있는 메시지를 수신하게 되며 프론트엔드에서 오류 코드 카탈로그를 별도로 유지할 필요가 없습니다.

</Question>

<Question title="NestJS 서비스나 컨트롤러에 번역을 주입할 수 있나요?">

네. 위 예제처럼 서비스나 컨트롤러 내부에서 `getIntlayer("app")`을 호출하면 됩니다. 활성 로케일은 미들웨어가 설정한 요청 컨텍스트에서 가져오므로 기능별로 모듈을 등록하거나 토큰을 주입할 필요가 없습니다.

</Question>

<Question title="AI를 사용하여 백엔드 콘텐츠를 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하면 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워줍니다. 브랜치에서 변경된 콘텐츠만 번역하려면 `--git-diff`를 추가하세요. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 서버에서 복수형, 성별 및 보간된 값을 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, 보간 값을 위한 [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 이메일 본문을 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), 그리고 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="서버에서 TypeScript 자동 완성이 지원되나요?">

네. Intlayer는 사전의 타입을 `./types/intlayer.d.ts`에 생성하므로 존재하지 않는 키는 런타임 빈 문자열이 아니라 컴파일 오류가 됩니다. CI에서 `npx intlayer test`를 실행하면 선언된 로케일에 콘텐츠가 누락된 경우 빌드가 실패합니다.

</Question>

<Question title="프론트엔드와 백엔드가 동일한 콘텐츠를 공유할 수 있나요?">

네, 실제로 권장되는 설정입니다. `express-intlayer`는 동일한 선언 콘텐츠에 대해 `react-intlayer`, `next-intlayer`, `vite-intlayer`와 함께 작동하므로 API 응답과 웹 페이지 모두에서 사용되는 레이블을 한 번만 선언하면 됩니다. [Intlayer 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/how_works_intlayer.md)을 참조하세요.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
