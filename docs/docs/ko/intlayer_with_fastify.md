---
createdAt: 2025-12-30
updatedAt: 2026-08-30
title: "Fastify i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Fastify 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.6.0
    date: 2025-12-31
    changes: "init 명령어 추가"
  - version: 7.6.0
    date: 2025-12-31
    changes: "히스토리 초기화"
author: aymericzip
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
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-fastify-template)을 확인하세요.

### 설치

`fastify-intlayer` 사용을 시작하려면 npm을 사용하여 패키지를 설치하세요.

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
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

> 콘텐츠 선언은 `contentDir` 디렉터리(기본값 `./src`)에 포함되어 있는 한 애플리케이션의 어느 곳에서나 정의할 수 있습니다. 또한 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## 자주 묻는 질문

<FAQ>

<Question title="Fastify 백엔드를 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

일반적인 옵션은 `fastify-i18next` 또는 직접 작성한 훅과 함께 `i18next`를 사용하는 것으로, 네임스페이스별로 JSON 카탈로그를 로드하고 요청에 로케일을 저장합니다. 대안은 `fastify-intlayer`를 통한 `Intlayer`로, 플러그인을 자동으로 등록하고 요청별로 로케일을 확인하며 프론트엔드와 동일한 타입 정의 콘텐츠를 공유합니다.

백엔드를 국제화해야 하는 이유는 사용자가 읽는 텍스트의 상당 부분이 프론트엔드를 거치지 않기 때문입니다: API 오류 메시지, 트랜잭션 이메일, 푸시 알림, SMS 및 PDF 내보내기 등이 여기에 해당합니다. 이러한 텍스트는 세션이 아닌 요청별로 수신자의 언어가 확인되어야 합니다.

[왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.

</Question>

<Question title="i18n이 Fastify 서버 번들 크기에 얼마나 영향을 미치나요?">

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

기본적으로 `fastify-intlayer`는 들어오는 요청의 `Accept-Language` 헤더를 읽고 선언된 가장 가까운 로케일을 선택하며, 기본 로케일로 폴백합니다. `routing.storage`를 통해 소스를 사용자 지정 헤더나 프론트엔드가 설정한 쿠키 등으로 변경할 수 있으므로 브라우저 광고 언어가 아닌 사용자가 실제로 선택한 언어로 API가 응답하도록 만들 수 있습니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="로케일은 요청별로 격리되나요?">

네. 플러그인은 활성 로케일의 범위를 요청으로 한정하므로 서로 다른 언어로 실행 중인 두 개의 동시 요청이 상대방의 로케일을 읽지 않습니다. 덕분에 모든 함수에 로케일 인수를 전달하지 않고도 서비스 내에서 `t()` 및 `getIntlayer()`를 안전하게 호출할 수 있습니다.

</Question>

<Question title="수신자의 언어로 트랜잭션 이메일을 보내려면 어떻게 하나요?">

다른 콘텐츠와 마찬가지로 콘텐츠 파일에 이메일 내용을 선언한 다음 요청 로케일 대신 수신자의 저장된 로케일로 `getIntlayer`를 호출하여 확인합니다. 이는 언어가 사용자 레코드에 속해 있고 헤더를 읽을 수 있는 인바운드 요청이 없는 백그라운드 작업 및 큐에서 특히 유용합니다.

</Question>

<Question title="API 오류 메시지를 어떻게 지역화하나요?">

오류가 생성되는 지점에서 메시지를 `t()`로 래핑하세요. 활성 요청 로케일이 이를 확인하므로 클라이언트는 직접 표시할 수 있는 메시지를 수신하게 되며 프론트엔드에서 오류 코드 카탈로그를 별도로 유지할 필요가 없습니다.

</Question>

<Question title="Fastify 플러그인 라이프사이클 및 캡슐화와 호환되나요?">

네. `fastify-intlayer`는 표준 Fastify 플러그인으로 등록되므로 일반적인 캡슐화 규칙을 따릅니다. 루트에 등록하거나 필요한 범위 내에서 콘텐츠를 읽는 라우트보다 먼저 등록하세요.

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

네, 실제로 권장되는 설정입니다. `fastify-intlayer`는 동일한 선언 콘텐츠에 대해 `react-intlayer`, `next-intlayer`, `vite-intlayer`와 함께 작동하므로 API 응답과 웹 페이지 모두에서 사용되는 레이블을 한 번만 선언하면 됩니다. [Intlayer 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/how_works_intlayer.md)을 참조하세요.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
