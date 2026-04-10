---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18n 번들 크기 최적화 및 성능
description: 국제화(i18n) 콘텐츠를 최적화하여 애플리케이션 번들 크기를 줄이세요. Intlayer를 통해 사전의 트리 쉐이킹(tree shaking) 및 지연 로딩(lazy loading)을 활용하는 방법을 알아보세요.
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "빌드 구성에 `minify` 및 `purge` 옵션 추가"
---

# i18n 번들 크기 최적화 및 성능

JSON 파일에 의존하는 기존 i18n 솔루션에서 가장 흔한 과제 중 하나는 콘텐츠 크기를 관리하는 것입니다. 개발자가 수동으로 콘텐츠를 네임스페이스로 분리하지 않으면, 사용자는 단 한 페이지를 보기 위해 모든 페이지와 모든 언어의 번역을 다운로드해야 할 수도 있습니다.

예를 들어, 10개 언어로 번역된 10페이지 분량의 애플리케이션의 경우, 사용자는 **한 페이지**(현재 언어의 현재 페이지)만 필요함에도 불구하고 100페이지 분량의 콘텐츠를 다운로드하게 될 수 있습니다. 이는 대역폭 낭비와 로딩 시간 저하로 이어집니다.

**Intlayer는 빌드 시 최적화를 통해 이 문제를 해결합니다.** 코드를 분석하여 컴포넌트별로 실제로 사용되는 사전을 감지하고 필요한 콘텐츠만 번들에 재주입합니다.

## 목차

<TOC />

## 번들 스캔

번들을 분석하는 것은 "무거운" JSON 파일과 코드 분할 기회를 식별하는 첫 번째 단계입니다. 이러한 도구는 애플리케이션의 컴파일된 코드에 대한 시각적 트리맵(treemap)을 생성하여 어떤 라이브러리가 가장 많은 공간을 차지하고 있는지 정확히 확인할 수 있게 해줍니다.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite는 내부적으로 Rollup을 사용합니다. `rollup-plugin-visualizer` 플러그인은 그래프의 모든 모듈 크기를 보여주는 대화형 HTML 파일을 생성합니다.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 브라우저에서 보고서를 자동으로 엽니다
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

App Router 및 Turbopack을 사용하는 프로젝트의 경우, Next.js는 추가 의존성이 필요 없는 내장 실험적 분석기를 제공합니다.

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

Next.js에서 기본 Webpack 번들러를 사용하는 경우 공식 번들 분석기를 사용하세요. 빌드 중에 환경 변수를 설정하여 트리거합니다.

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
  // Next.js 구성
});
```

**사용법:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 표준 Webpack

Create React App (ejected), Angular 또는 사용자 정의 Webpack 구성의 경우 업계 표준인 `webpack-bundle-analyzer`를 사용하세요.

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

```typescript fileName="webpack.config.ts
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

Intlayer는 **컴포넌트별 접근 방식**을 사용합니다. 전역 JSON 파일과 달리 콘텐츠는 컴포넌트 근처 또는 내부에 정의됩니다. 빌드 프로세스 동안 Intlayer는 다음을 수행합니다.

1.  코드를 **분석**하여 `useIntlayer` 호출을 찾습니다.
2.  해당 사전 콘텐츠를 **빌드**합니다.
3.  구성에 따라 `useIntlayer` 호출을 최적화된 코드로 **교체**합니다.

이를 통해 다음이 보장됩니다.

- 컴포넌트가 임포트되지 않으면 해당 콘텐츠는 번들에 포함되지 않습니다(데드 코드 제거).
- 컴포넌트가 지연 로딩(lazy loading)되면 해당 콘텐츠도 지연 로딩됩니다.

## 플랫폼별 설정

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js는 빌드에 SWC를 사용하므로 변환을 처리하기 위해 `@intlayer/swc` 플러그인이 필요합니다.

> 이 플러그인은 Next.js에서 SWC 플러그인이 아직 실험 단계이기 때문에 기본적으로 설치되지 않습니다. 나중에 변경될 수 있습니다.

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

설치되면 Intlayer가 자동으로 플러그인을 감지하여 사용합니다.

 </Tab>
 <Tab value="vite">

### Vite

Vite는 `vite-intlayer`의 의존성으로 포함된 `@intlayer/babel` 플러그인을 사용합니다. 최적화는 기본적으로 활성화되어 있습니다. 추가로 할 일은 없습니다.

 </Tab>
 <Tab value="webpack">

### Webpack

Webpack에서 Intlayer를 사용한 번들 최적화를 활성화하려면 적절한 Babel (`@intlayer/babel`) 또는 SWC (`@intlayer/swc`) 플러그인을 설치하고 구성해야 합니다.

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

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## 구성

`intlayer.config.ts`의 `build` 속성을 통해 Intlayer가 번들을 최적화하는 방법을 제어할 수 있습니다.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * 번들 크기를 줄이기 위해 사전을 압축(minify)합니다.
     */
     minify: true;

    /**
     * 사전에서 사용되지 않는 키를 제거(purge)합니다.
     */
     purge: true;

    /**
     * 빌드 시 TypeScript 유형을 확인해야 하는지 여부
     */
    checkTypes: false;
  },
};

export default config;
```

> 대부분의 경우 `optimize` 옵션을 기본값으로 유지하는 것이 좋습니다.

> 자세한 내용은 구성 문서를 참조하세요: [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

### 빌드 옵션

`build` 구성 개체에서 다음 옵션을 사용할 수 있습니다.

| 속성           | 유형      | 기본값      | 설명                                                                                                                                                                                                  |
| :------------- | :-------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | 빌드 최적화 활성화 여부를 제어합니다. `true`인 경우 Intlayer는 사전 호출을 최적화된 주입으로 교체합니다. `false`인 경우 최적화가 비활성화됩니다. 프로덕션 환경에서는 `true`로 설정하는 것이 좋습니다. |
| **`minify`**   | `boolean` | `false`     | 번들 크기를 줄이기 위해 사전을 압축할지 여부입니다.                                                                                                                                                   |
| **`purge`**    | `boolean` | `false`     | 사전에서 사용되지 않는 키를 제거할지 여부입니다.                                                                                                                                                      |

### 축소(Minification)

사전을 축소하면 불필요한 공백, 주석이 제거되고 JSON 콘텐츠의 크기가 줄어듭니다. 이는 대규모 사전에 특히 유용합니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> 참고: `optimize`가 비활성화되어 있거나 비주얼 에디터(Visual Editor)가 활성화된 경우(에디터가 편집을 위해 전체 콘텐츠를 필요로 하므로) 축소는 무시됩니다.

### 퍼징(Purging, 제거)

퍼징을 사용하면 코드에서 실제로 사용되는 키만 최종 사전 번들에 포함됩니다. 모든 부분에서 사용되지 않는 키가 많은 대규모 사전이 있는 경우 번들 크기를 크게 줄일 수 있습니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> 참고: `optimize`가 비활성화된 경우 퍼징은 무시됩니다.

### 임포트 모드(Import Mode)

여러 페이지와 로케일을 포함하는 대규모 애플리케이션의 경우 JSON 파일이 번들 크기의 상당 부분을 차지할 수 있습니다. Intlayer를 사용하면 사전이 로드되는 방식을 제어할 수 있습니다.

임포트 모드는 `intlayer.config.ts` 파일의 전역 기본값으로 정의할 수 있습니다.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

또한 `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` 파일의 각 사전에 대해서도 정의할 수 있습니다.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // 기본 임포트 모드 재정의
  content: {
    // ...
  },
};

export default appContent;
```

| 속성             | 유형                               | 기본값     | 설명                                                                                                             |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **사용 중단 예정**: 대신 `dictionary.importMode`를 사용하세요. 사전 로드 방식을 결정합니다(아래 세부 정보 참조). |

`importMode` 설정은 사전 콘텐츠가 컴포넌트에 주입되는 방식을 규정합니다.
`intlayer.config.ts` 파일의 `dictionary` 개체 아래에서 전역적으로 정의하거나, 특정 사전의 `.content.ts` 파일에서 재정의할 수 있습니다.

### 1. 정적 모드 (`default`)

정적 모드에서 Intlayer는 `useIntlayer`를 `useDictionary`로 교체하고 사전을 JavaScript 번들에 직접 주입합니다.

- **장점:** 즉시 렌더링(동기식), 하이드레이션 중 추가 네트워크 요청 없음.
- **단점:** 번들에 해당 특정 컴포넌트에서 사용 가능한 **모든** 언어의 번역이 포함됩니다.
- **최적의 사례:** 싱글 페이지 애플리케이션(SPA).

**변환된 코드 예시:**

```tsx
// 원래 코드
const content = useIntlayer("my-key");

// 최적화된 코드 (정적)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. 동적 모드

동적 모드에서 Intlayer는 `useIntlayer`를 `useDictionaryAsync`로 교체합니다. 이는 `import()`(Suspense와 유사한 메커니즘)를 사용하여 현재 로케일에 특정한 JSON을 지연 로드합니다.

- **장점:** **로케일 수준의 트리 쉐이킹.** 영어 버전을 보는 사용자는 영어 사전만 다운로드합니다. 프랑스어 사전은 로드되지 않습니다.
- **단점:** 하이드레이션 중 컴포넌트당 네트워크 요청(에셋 페치)을 트리거합니다.
- **최적의 사례:** 번들 크기가 중요한 텍스트가 많은 페이지, 많은 언어를 지원하는 애플리케이션.

**변환된 코드 예시:**

```tsx
// 원래 코드
const content = useIntlayer("my-key");

// 최적화된 코드 (동적)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'`을 사용할 때 단일 페이지에서 `useIntlayer`를 사용하는 컴포넌트가 100개인 경우 브라우저는 100개의 개별 페치를 시도합니다. 이러한 "폭포수(waterfall)" 요청을 피하려면 콘텐츠를 원자(atom) 컴포넌트별로 하나씩 만들기보다 더 적은 수의 `.content` 파일(예: 페이지 섹션당 하나의 사전)로 그룹화하세요.

### 3. 페치 모드(Fetch Mode)

동적 모드와 유사하게 작동하지만 먼저 Intlayer Live Sync API에서 사전을 가져오려고 시도합니다. API 호출이 실패하거나 콘텐츠가 라이브 업데이트로 표시되지 않은 경우 동적 임포트로 대체됩니다.

> 자세한 내용은 CMS 문서를 참조하세요: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

> 페치 모드에서는 제거(purge) 및 축소(minification)를 사용할 수 없습니다.

## 요약: 정적 vs 동적

| 특징                  | 정적 모드                         | 동적 모드                           |
| :-------------------- | :-------------------------------- | :---------------------------------- |
| **JS 번들 크기**      | 더 큼 (컴포넌트의 모든 언어 포함) | 가장 작음 (코드만 있고 콘텐츠 없음) |
| **초기 로드**         | 즉시 (번들 내에 콘텐츠 있음)      | 약간의 지연 (JSON 페치)             |
| **네트워크 요청**     | 0개 추가 요청                     | 사전당 1개 요청                     |
| **트리 쉐이킹**       | 컴포넌트 수준                     | 컴포넌트 수준 + 로케일 수준         |
| **최적의 유스케이스** | UI 컴포넌트, 소규모 앱            | 텍스트가 많은 페이지, 다국어 지원   |
