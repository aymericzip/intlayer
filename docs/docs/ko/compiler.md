---
createdAt: 2025-09-09
updatedAt: 2026-02-25
title: Intlayer 컴파일러 | i18n을 위한 자동화된 콘텐츠 추출
description: Intlayer 컴파일러로 국제화 프로세스를 자동화하세요. Vite, Next.js 등에서 더 빠르고 효율적인 i18n을 위해 컴포넌트에서 직접 콘텐츠를 추출합니다.
keywords:
  - Intlayer
  - 컴파일러
  - 국제화
  - i18n
  - 자동화
  - 추출
  - 속도
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: 컴파일러 옵션 업데이트
  - version: 7.3.1
    date: 2025-11-27
    changes: 컴파일러 출시
---

# Intlayer 컴파일러 | i18n을 위한 자동화된 콘텐츠 추출

## Intlayer 컴파일러란?

**Intlayer 컴파일러**는 애플리케이션의 국제화(i18n) 프로세스를 자동화하도록 설계된 강력한 도구입니다. 소스 코드(JSX, TSX, Vue, Svelte)에서 콘텐츠 선언을 스캔하고 추출하여 필요한 사전(dictionary) 파일을 자동으로 생성합니다. 이를 통해 콘텐츠를 컴포넌트와 함께 위치시킬 수 있으며, Intlayer가 사전의 관리 및 동기화를 처리합니다.

## Intlayer 컴파일러를 사용하는 이유

- **자동화**: 콘텐츠를 사전에 수동으로 복사하여 붙여넣는 작업을 제거합니다.
- **속도**: 빌드 프로세스가 빠르게 유지되도록 최적화된 콘텐츠 추출을 제공합니다.
- **개발자 경험**: 콘텐츠 선언을 사용되는 위치에 그대로 유지하여 유지보수성을 향상시킵니다.
- **실시간 업데이트**: 개발 중 즉각적인 피드백을 위한 Hot Module Replacement(HMR)를 지원합니다.

더 깊은 비교를 원한다면 [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md) 블로그 게시물을 참조하세요.

## Intlayer 컴파일러를 사용하지 않는 이유

컴파일러는 훌륭한 "바로 작동" 경험을 제공하지만, 인지해야 할 몇 가지 트레이드오프도 도입합니다:

- **휴리스틱 모호성**: 컴파일러는 사용자 지향 콘텐츠와 애플리케이션 로직(예: `className="active"`, 상태 코드, 제품 ID)을 추측해야 합니다. 복잡한 코드베이스에서는 이것이 오탐지 또는 누락된 문자열로 이어질 수 있으며, 수동 주석 및 예외 처리가 필요합니다.
- **정적 추출만**: 컴파일러 기반 추출은 정적 분석에 의존합니다. 런타임에만 존재하는 문자열(API 오류 코드, CMS 필드 등)은 컴파일러만으로는 발견하거나 번역할 수 없으므로 여전히 보완적인 런타임 i18n 전략이 필요합니다.

더 깊은 아키텍처 비교를 위해서는 블로그 게시물 [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)을 참조하세요.

대안으로, 콘텐츠에 대한 완전한 제어를 유지하면서 i18n 프로세스를 자동화하기 위해 Intlayer는 자동 추출 명령 `intlayer extract`([CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md) 참조) 또는 Intlayer VS Code 확장의 `Intlayer: extract content to Dictionary` 명령([VS Code 확장 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md) 참조)도 제공합니다.

## 사용법

<Tabs>
 <Tab value='vite'>

### Vite

Vite 기반 애플리케이션(React, Vue, Svelte 등)의 경우, 컴파일러를 사용하는 가장 쉬운 방법은 `vite-intlayer` 플러그인을 사용하는 것입니다.

#### 설치

```bash
npm install vite-intlayer
```

#### 구성

`vite.config.ts` 파일을 업데이트하여 `intlayerCompiler` 플러그인을 포함하세요:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인 추가
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### 프레임워크 지원

Vite 플러그인은 다양한 파일 유형을 자동으로 감지하고 처리합니다:

- **React / JSX / TSX**: 기본적으로 처리됩니다.
- **Vue**: `@intlayer/vue-compiler`가 필요합니다.
- **Svelte**: `@intlayer/svelte-compiler`가 필요합니다.

사용하는 프레임워크에 맞는 컴파일러 패키지를 반드시 설치하세요:

```bash
# Vue용
npm install @intlayer/vue-compiler

# Svelte용
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Next.js 또는 Babel을 사용하는 다른 Webpack 기반 애플리케이션의 경우, `@intlayer/babel` 플러그인을 사용하여 컴파일러를 구성할 수 있습니다.

#### 설치

```bash
npm install @intlayer/babel
```

#### 구성

`babel.config.js`(또는 `babel.config.json`) 파일을 업데이트하여 추출 플러그인을 포함하세요. Intlayer 구성을 자동으로 로드하는 헬퍼 함수 `getExtractPluginOptions`를 제공합니다.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

이 구성은 컴포넌트 내에 선언된 콘텐츠가 자동으로 추출되어 빌드 과정 중에 사전 생성에 사용되도록 보장합니다.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### 사용자 정의 구성

컴파일러 동작을 사용자 정의하려면 프로젝트 루트에 있는 `intlayer.config.ts` 파일을 업데이트할 수 있습니다.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * 컴파일러를 활성화할지 여부를 나타냅니다.
     * 개발 중에 컴파일러를 건너뛰고 시작 시간을 단축하려면 'build-only'로 설정하세요.
     */
    enabled: true,

    /**
     * 최적화할 코드를 순회하는 패턴.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * 최적화에서 제외할 패턴.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * 최적화된 사전의 출력 디렉토리.
     */
    outputDir: "i18n",

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "", // 기본 접두사 제거

    /**
     * 컴포넌트가 변환된 후 저장되어야 하는지 여부를 나타냅니다.
     * 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 나중에 제거할 수 있습니다.
     */
    saveComponents: false,
  },
};

export default config;
```

### 누락된 번역 채우기

Intlayer는 누락된 번역을 채우는 데 도움이 되는 CLI 도구를 제공합니다. `intlayer` 명령을 사용하여 코드에서 누락된 번역을 테스트하고 채울 수 있습니다.

```bash
npx intlayer test         # 누락된 번역이 있는지 테스트
```

```bash
npx intlayer fill         # 누락된 번역 채우기
```

> 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/ci.md)를 참조하세요.
