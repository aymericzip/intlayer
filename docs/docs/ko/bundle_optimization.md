---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n 번들 크기 및 성능 최적화
description: 국제화(i18n) 콘텐츠를 최적화하여 애플리케이션 번들 크기를 줄이세요. Intlayer를 통해 사전(dictionary)의 트리 쉐이킹(tree shaking)과 지연 로딩(lazy loading)을 활용하는 방법을 알아봅니다.
keywords:
  - 번들 최적화
  - 콘텐츠 자동화
  - 동적 콘텐츠
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Babel/Webpack용 `intlayerPurgeBabelPlugin` 및 `intlayerMinifyBabelPlugin` 추가, 플러그인 파이프라인 명확화"
  - version: 8.7.0
    date: 2026-04-08
    changes: "빌드 구성에 `minify` 및 `purge` 옵션 추가"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# i18n 번들 크기 및 성능 최적화

JSON 파일에 의존하는 전통적인 i18n 솔루션에서 가장 일반적인 문제 중 하나는 콘텐츠 크기를 관리하는 것입니다. 개발자가 콘텐츠를 네임스페이스로 수동으로 분리하지 않으면 사용자는 단일 페이지를 보기 위해 모든 페이지와 잠재적으로 모든 언어에 대한 번역을 다운로드해야 하는 경우가 많습니다.

예를 들어 10개 언어로 번역된 10개의 페이지가 있는 애플리케이션의 경우, 사용자가 **단 하나**(현재 언어로 된 현재 페이지)만 필요함에도 불구하고 100페이지 분량의 콘텐츠를 다운로드하게 될 수 있습니다. 이는 대역폭 낭비와 로드 시간 증가를 초래합니다.

**Intlayer는 빌드 시간 최적화를 통해 이 문제를 해결합니다.** 코드를 분석하여 구성 요소(component)당 실제로 사용되는 사전이 무엇인지 감지하고, 필요한 콘텐츠만 번들에 다시 삽입합니다.

## 목차

<TOC />

## 번들 분석하기

번들을 분석하는 것은 "무거운" JSON 파일과 코드 분할(code-splitting) 기회를 파악하는 첫 번째 단계입니다. 이러한 도구는 애플리케이션의 컴파일된 코드의 시각적 트리맵을 생성하여 어떤 라이브러리가 가장 많은 공간을 차지하고 있는지 정확히 확인할 수 있게 해줍니다.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite는 내부적으로 Rollup을 사용합니다. `rollup-plugin-visualizer` 플러그인은 그래프 내 모든 모듈의 크기를 보여주는 대화형 HTML 파일을 생성합니다.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 브라우저에서 리포트를 자동으로 엽니다
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

App Router와 Turbopack을 사용하는 프로젝트의 경우, Next.js는 추가 의존성 없이 사용할 수 있는 내장 실험용 분석기를 제공합니다.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Next.js에서 기본 Webpack 번들러를 사용하는 경우 공식 번들 분석기를 사용하십시오. 빌드 중에 환경 변수를 설정하여 트리거할 수 있습니다.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Next.js 설정
});
```

**사용 방법:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 표준 Webpack

Create React App (ejected), Angular, 또는 맞춤형 Webpack 설정의 경우 업계 표준인 `webpack-bundle-analyzer`를 사용합니다.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## 작동 방식

Intlayer는 **컴포넌트별 접근 방식(per-component approach)**을 사용합니다. 전역 JSON 파일과 달리 콘텐츠는 컴포넌트 내부나 컴포넌트 옆에 정의됩니다. 빌드 과정에서 Intlayer는 다음과 같은 작업을 수행합니다:

1. **분석**: 코드를 분석하여 `useIntlayer` 호출을 찾습니다.
2. **구축**: 해당하는 사전 콘텐츠를 구축합니다.
3. **대체**: 설정에 따라 최적화된 코드로 `useIntlayer` 호출을 대체합니다.

이를 통해 다음과 같은 효과를 보장합니다:

- 컴포넌트가 가져오기(import) 되지 않은 경우, 해당 콘텐츠는 번들에 포함되지 않습니다 (Dead Code Elimination).
- 컴포넌트가 지연 로드(lazy load) 되는 경우, 해당 콘텐츠도 지연 로드됩니다.

## 플러그인 레퍼런스

Intlayer의 빌드 최적화는 각각 단일 책임을 갖는 여러 개별 플러그인으로 나뉘어 있습니다. 각 플러그인이 어떤 역할을 하는지 이해하면 설정 시의 혼란을 방지할 수 있습니다.

### Babel 플러그인 (`@intlayer/babel`)

이들은 Webpack 기반 설정(Babel을 사용하는 Next.js, CRA, 커스텀 Webpack 등)의 `babel.config.js`에서 직접 사용됩니다.

| 플러그인                      | 기능                                                                                                               |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | `.content.ts` 파일을 스캔하여 컴파일된 사전을 `.intlayer/`에 작성합니다.                                           |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')`를 `useDictionary(hash)`로 재작성하고 일치하는 사전의 `import`를 주입합니다.                   |
| `intlayerPurgeBabelPlugin`    | 모든 소스 파일을 스캔하여 컴파일된 `.intlayer/**/*.json` 사전 파일에서 **사용되지 않는 콘텐츠 필드**를 제거합니다. |
| `intlayerMinifyBabelPlugin`   | JSON 파일과 소스 코드 모두에서 **콘텐츠 필드 키를 짧은 알파벳 별칭**(`title` → `a`)으로 **이름을 변경**합니다.     |

> **플러그인 순서가 중요합니다.** `babel.config.js`에서 purge 및 minify 플러그인은 optimize 플러그인 **앞에** 나타나야 합니다. optimize 패스는 `useIntlayer('key')`를 불투명한 `useDictionary(hash)` 호출로 대체하여 purge 및 minify 패스가 어떤 필드가 사용되는지 식별하는 데 필요한 사전 키 정보를 지웁니다.

각 Babel 플러그인에는 구성을 로드할 때 한 번 `intlayer.config.ts`를 읽고 미리 해석된 값을 반환하는 옵션 헬퍼(options helper)가 있습니다:

| 옵션 헬퍼                    | 사용하는 플러그인             |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite 플러그인 (`vite-intlayer`)

Vite 사용자는 **이를 직접 구성하지 않습니다**. `vite.config.ts`에서 `withIntlayer()`를 호출하면 자동으로 설정됩니다. `intlayer.config.ts`의 `build.purge` 및 `build.minify` 플래그는 추가 플러그인 등록 없이 해당하는 동작을 토글합니다.

| 내부 Vite 플러그인 | 해당하는 동작                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------- |
| Usage analyzer     | `intlayerPurgeBabelPlugin`의 분석 패스와 동일                                            |
| Dictionary prune   | `intlayerPurgeBabelPlugin`의 JSON 작성 패스와 동일                                       |
| Dictionary minify  | `intlayerMinifyBabelPlugin`의 JSON 작성 패스와 동일                                      |
| Babel transform    | `intlayerMinifyBabelPlugin`의 소스 코드 이름 변경 + `intlayerOptimizeBabelPlugin`과 동일 |

## 플랫폼별 설정

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js는 빌드 시 SWC를 사용하므로 optimize(가져오기 재작성) 패스를 위해 `@intlayer/swc` 플러그인이 필요합니다.

> Next.js에서 SWC 플러그인이 아직 실험 단계이므로 이 플러그인은 기본적으로 설치되지 않습니다. 향후 변경될 수 있습니다.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

설치되면 Intlayer가 플러그인을 자동으로 감지하여 사용합니다.

**purge 및 minify** 패스(필드 제거 및 필드 이름 변경)의 경우 `@intlayer/babel`을 함께 설치하고 Babel 플러그인을 추가합니다. Next.js는 변환을 위해 SWC를 사용하지만 플러그인 구성을 위해 `babel.config.js`를 계속 평가하므로 Babel 플러그인은 SWC 이전의 사전 패스(pre-pass)로 실행됩니다.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: .intlayer/**/*.json에서 사용되지 않는 콘텐츠 필드 제거
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: JSON + 소스 코드에서 콘텐츠 필드 키의 이름 변경
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // 주의: @intlayer/swc가 useIntlayer → useDictionary 재작성을 처리하므로
    // intlayerOptimizeBabelPlugin은 여기서 필요하지 않습니다.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite는 `vite-intlayer`의 종속성으로 포함된 `@intlayer/babel` 플러그인을 사용합니다. 가져오기 재작성, purge 및 minify를 포함한 전체 최적화 파이프라인은 기본적으로 활성화되어 있으며 추가 플러그인 등록이 필요하지 않습니다.

`intlayer.config.ts`에서 해당하는 플래그를 설정하여 purge와 minify를 활성화합니다:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 번들된 JSON에서 사용되지 않는 콘텐츠 필드 제거
    minify: true, // 콘텐츠 필드 키를 짧은 별칭으로 이름 변경
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (및 Babel이 포함된 Next.js)

`@intlayer/babel` 설치:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

네 가지 플러그인을 `babel.config.js`에 올바른 순서로 모두 추가합니다:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: .content.ts 파일 컴파일 → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: .intlayer/**/*.json에서 사용되지 않는 필드 제거
    //    (intlayer.config.ts의 build.purge 플래그를 읽습니다)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: JSON + 소스 코드의 필드 키 이름 변경
    //    (intlayer.config.ts의 build.minify 플래그를 읽습니다)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: useIntlayer('key') → useDictionary(hash) 재작성
    //    사전 키를 지우기 때문에 마지막에 위치해야 합니다.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## 설정

`intlayer.config.ts`의 `build` 속성을 통해 Intlayer가 번들을 최적화하는 방법을 제어할 수 있습니다.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // 빌드 시 useIntlayer() 호출을 직접적인 사전(dictionary) 가져오기(import)로 대체합니다.
    // undefined = 자동 (프로덕션에서 활성화), true = 항상, false = 비활성화.
    optimize: undefined,

    // 컴파일된 사전에서 콘텐츠 필드 키의 이름을 짧은 알파벳 별칭으로
    // 바꿉니다(예: title → a). JSON 크기를 줄입니다; optimize가 필요합니다.
    minify: true,

    // 소스 코드에서 접근되지 않는 콘텐츠 필드를 제거합니다.
    // optimize가 필요합니다.
    purge: true,
  },
};

export default config;
```

> 대부분의 경우 `optimize`는 기본값(`undefined`)을 유지하는 것이 좋습니다.

> 모든 옵션에 대해서는 설정 레퍼런스를 참조하세요: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

### 빌드 옵션

| 속성           | 타입                   | 기본값      | 설명                                                                                                                                                                          |
| :------------- | :--------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | 가져오기(import) 재작성 패스를 활성화합니다. `undefined` = 프로덕션 빌드에서만 활성화됩니다. `false`는 purge 및 minify도 비활성화합니다.                                      |
| **`minify`**   | `boolean`              | `false`     | 컴파일된 JSON 파일에서 콘텐츠 필드 키의 이름을 짧은 알파벳 별칭으로 바꿉니다. 소스 코드에서 일치하는 속성 접근도 재작성합니다. `optimize`가 `false`이면 아무 효과가 없습니다. |
| **`purge`**    | `boolean`              | `false`     | 컴파일된 JSON 파일에서 소스 코드를 통해 정적으로 접근되지 않는 콘텐츠 필드를 제거합니다. `optimize`가 `false`이면 아무 효과가 없습니다.                                       |

### 최소화 (필드 키 이름 변경)

`build.minify`는 JavaScript 번들을 최소화**하지 않습니다**. (이 작업은 번들러가 수행합니다.) 대신 사용자 정의 콘텐츠 필드 키를 짧은 알파벳 별칭으로 대체하여 컴파일된 사전 JSON 파일을 축소합니다:

```
// 최소화 이전
{ "title": "안녕", "subtitle": "세계" }

// 최소화 이후
{ "a": "안녕", "b": "세계" }
```

소스 코드의 모든 속성 접근에도 동일한 이름 변경이 적용되므로, 컴파일된 출력에서는 `content.title`이 `content.a`가 됩니다. 런타임 동작은 동일합니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> `optimize`가 `false`이거나 `editor.enabled`가 `true`일 때(비주얼 에디터에서는 편집을 위해 원본 필드 이름이 필요함) 최소화는 건너뜁니다.

> `importMode: 'fetch'`를 통해 로드된 사전에서도 최소화는 건너뜁니다. JSON이 원본 필드 이름을 사용하여 원격 API에서 제공되기 때문입니다(클라이언트 측 키의 이름을 변경하면 서버/클라이언트 규약이 깨짐).

### 파지 (사용하지 않는 필드 제거)

`build.purge`는 소스 코드에서 실제로 접근하는 콘텐츠 필드를 분석하고 다른 모든 필드를 컴파일된 JSON 파일에서 제거합니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**예시:** 5개의 필드가 있지만 2개만 사용되는 사전:

```
// 파지 이전
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// 파지 이후 (소스에서 title + subtitle만 접근됨)
{ "title": "…", "subtitle": "…" }
```

> `optimize`가 `false`이거나 `editor.enabled`가 `true`일 때 파지(purge)는 건너뜁니다.

> 소스 파일을 구문 분석할 수 없거나 `useIntlayer`의 결과가 변수에 할당되고 정적 분석기가 추적할 수 없는 방식으로 전달될 때(예: 객체에 스프레드, 구조 분해 없이 prop으로 전달) 파지도 보수적으로 건너뜁니다. 이런 경우에는 전체 사전이 유지됩니다.

### 가져오기 모드 (Import Mode)

여러 페이지와 로케일을 포함하는 대규모 애플리케이션의 경우 JSON이 번들 크기의 상당 부분을 차지할 수 있습니다. Intlayer에서는 `importMode` 옵션을 사용하여 사전 로드 방식을 제어할 수 있습니다.

### 전역 정의

가져오기 모드는 `intlayer.config.ts` 파일에서 전역으로 정의할 수 있습니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // 기본값은 'static'
  },
};

export default config;
```

### 사전별 정의

각각의 `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` 파일에서 개별 사전의 가져오기 모드를 재정의(override)할 수 있습니다.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // 기본 가져오기 모드를 재정의
  content: {
    // ...
  },
};

export default appContent;
```

| 속성             | 타입                               | 기본값     | 설명                                                                                                                    |
| :--------------- | :--------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **사용되지 않음(Deprecated)**: 대신 `dictionary.importMode`를 사용하세요. 사전을 로드하는 방법을 결정합니다(아래 참조). |

`importMode` 설정은 사전의 콘텐츠가 컴포넌트에 주입되는 방식을 결정합니다. `intlayer.config.ts`의 `dictionary` 객체에서 전역으로 정의하거나, 사전의 `.content.ts` 파일에서 개별적으로 재정의할 수 있습니다.

### 1. Static 모드 (`default`)

Static(정적) 모드에서 Intlayer는 `useIntlayer`를 `useDictionary`로 대체하고 사전을 JavaScript 번들에 직접 주입합니다.

- **장점:** 즉각적인 렌더링(동기식), 하이드레이션(hydration) 중에 추가 네트워크 요청 없음.
- **단점:** 해당 컴포넌트에서 사용할 수 있는 **모든** 언어의 번역이 번들에 포함됨.
- **적합한 사례:** 단일 페이지 애플리케이션(SPA).

**변환된 코드 예시:**

```tsx
// 작성한 코드
const content = useIntlayer("my-key");

// 변환 후 최적화된 코드 예시 (Static)
// (설명을 위한 예시이며 최적화를 위해 실제 코드는 다를 수 있습니다)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      ko: "나의 제목",
    },
  },
});
```

### 2. Dynamic 모드

Dynamic(동적) 모드에서 Intlayer는 `useIntlayer`를 `useDictionaryAsync`로 대체합니다. 현재 로케일의 JSON만 특별히 지연 로드하기 위해 `import()`(Suspense와 유사한 메커니즘)를 사용합니다.

- **장점:** **로케일 수준의 트리 쉐이킹.** 영어 버전을 보는 사용자는 영어 사전**만** 다운로드합니다. 한국어 사전은 로드되지 않습니다.
- **단점:** 하이드레이션 중에 컴포넌트별로 네트워크 요청(에셋 가져오기)을 트리거합니다.
- **적합한 사례:** 번들 크기가 중요한 대용량 텍스트 블록, 기사, 또는 여러 언어를 지원하는 애플리케이션.

**변환된 코드 예시:**

```tsx
// 작성한 코드
const content = useIntlayer("my-key");

// 변환 후 최적화된 코드 예시 (Dynamic)
// (설명을 위한 예시이며 최적화를 위해 실제 코드는 다를 수 있습니다)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  ko: () =>
    import(".intlayer/dynamic_dictionary/my-key/ko.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'`을 사용할 때 단일 페이지에서 `useIntlayer`를 사용하는 컴포넌트가 100개인 경우, 브라우저는 100번의 개별 가져오기(fetch)를 시도합니다. 이러한 요청의 "폭포수(waterfall)" 현상을 피하려면 콘텐츠를 아톰(atom) 컴포넌트별로 나누는 대신, 더 적은 수의 `.content` 파일(예: 페이지 섹션당 하나의 사전)로 그룹화하세요. 동일한 키를 사용하는 여러 개의 `.content` 파일을 사용할 수도 있습니다. Intlayer는 이들을 단일 사전으로 병합합니다.

### 3. Fetch 모드

Dynamic 모드와 유사하게 작동하지만 먼저 Intlayer Live Sync API에서 사전을 가져오려고 시도합니다. API 호출이 실패하거나 콘텐츠가 실시간 업데이트용으로 표시되지 않은 경우 동적(dynamic) 가져오기로 폴백(fallback)합니다.

**변환된 코드 예시:**

```tsx
// 작성한 코드
const content = useIntlayer("my-key");

// 최적화된 코드 예시 (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  ko: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/ko").then((res) =>
      res.json()
    ),
});
```

> 자세한 내용은 CMS 설명서를 참조하세요: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

> fetch 모드에서는 JSON이 원본 필드 이름을 사용하여 원격 API에서 제공되므로 purge(파지) 및 minify(최소화)가 적용되지 않습니다.

## 요약: Static vs Dynamic

| 특징                 | Static 모드                         | Dynamic 모드                         |
| :------------------- | :---------------------------------- | :----------------------------------- |
| **JS 번들 크기**     | 큼 (해당 컴포넌트의 모든 언어 포함) | 최소 크기 (코드만 포함, 콘텐츠 없음) |
| **초기 로드**        | 즉각적 (콘텐츠가 번들에 포함됨)     | 약간의 지연 (JSON을 가져옴)          |
| **네트워크 요청**    | 추가 요청 0번                       | 사전 키당 1번의 요청                 |
| **트리 쉐이킹**      | 컴포넌트 수준                       | 컴포넌트 수준 + 로케일 수준          |
| **적합한 사용 사례** | UI 컴포넌트, 소규모 앱              | 텍스트가 많은 페이지, 다국어 지원 앱 |
