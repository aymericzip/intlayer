---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel 패키지 문서"
description: 빌드 중에 콘텐츠 추출, 가져오기 최적화, 사용되지 않는 필드 정리, 필드 이름 난독화를 처리하기 위한 Intlayer용 Babel 플러그인입니다.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - 국제화
  - i18n
  - 컴파일러
  - 최적화
  - 정리
  - 축소
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "모든 내보내기 문서 통합"
author: aymericzip
---

# @intlayer/babel 패키지

`@intlayer/babel` 패키지는 Intlayer를 위한 전문적인 Babel 플러그인 모음을 제공합니다. 이 플러그인들은 콘텐츠 선언 추출, `useIntlayer` / `getIntlayer` 호출을 최적화된 사전 가져오기로 재작성, 사용되지 않는 필드 정리, 필드 이름 압축 등 전체 빌드 주기를 다룹니다.

## 설치

```bash
npm install @intlayer/babel
```

## 내보내기

가져오기:

```ts
import { ... } from "@intlayer/babel";
```

---

### 플러그인

| 함수 / 클래스                  | 설명                                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | 소스 파일에서 번역 가능한 콘텐츠를 추출하고 `useIntlayer` / `getIntlayer` 훅을 자동으로 주입하는 Babel 플러그인입니다. Next.js 및 Babel 기반 빌드 도구와 함께 사용하도록 설계되었습니다. |
| `intlayerOptimizeBabelPlugin`  | `useIntlayer` 및 `getIntlayer` 호출을 변환하고 가져오기를 최적화된 JSON 사전 가져오기(정적, 동적 또는 fetch를 통한 가져오기)로 재작성하는 Babel 플러그인입니다.                          |
| `intlayerPurgeBabelPlugin`     | 소스 파일을 분석하고 컴파일된 사전 JSON 파일을 재작성하여 사용되지 않는 필드를 제거(`build.purge`)하거나 짧은 알파벳 별칭으로 이름을 변경(`build.minify`)하는 Babel 플러그인입니다.      |
| `intlayerMinifyBabelPlugin`    | 축소(minify) 단계에서 할당된 짧은 필드 별칭(예: `content.title` ← `content.a`)을 사용하도록 소스 파일을 재작성하는 Babel 플러그인입니다. `intlayerPurgeBabelPlugin`에 의존합니다.        |
| `makeFieldRenameBabelPlugin`   | `PruneContext`에 채워진 `dictionaryKeyToFieldRenameMap`에 따라 소스 파일의 사전 콘텐츠 필드 액세스 이름을 바꾸는 Babel 플러그인을 생성하는 팩토리 함수입니다.                            |
| `makeUsageAnalyzerBabelPlugin` | 소스 코드에서 `useIntlayer` / `getIntlayer`의 사용을 분석하고 공유 `PruneContext`에 필드 사용 데이터를 집계하는 Babel 플러그인을 생성하는 팩토리 함수입니다.                             |
| `getSharedPruneContext`        | 지정된 기본 디렉토리에 대한 공유 `PruneContext` 객체를 반환하거나 아직 초기화되지 않은 경우 `null`을 반환하는 도우미 함수입니다.                                                         |

---

### 플러그인 설정 유틸리티

| 함수                       | 설명                                                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Intlayer 설정을 로드하고 `intlayerExtractBabelPlugin`과 함께 사용할 수 있는 `ExtractPluginOptions`를 반환합니다.                    |
| `getOptimizePluginOptions` | Intlayer 설정 및 컴파일된 사전을 로드하고 `intlayerOptimizeBabelPlugin`과 함께 사용할 수 있는 `OptimizePluginOptions`를 반환합니다. |
| `getPurgePluginOptions`    | Intlayer 설정을 로드하고 `intlayerPurgeBabelPlugin`과 함께 사용할 수 있는 `PurgePluginOptions`를 반환합니다.                        |
| `getMinifyPluginOptions`   | Intlayer 설정을 로드하고 `intlayerMinifyBabelPlugin`과 함께 사용할 수 있는 `MinifyPluginOptions`를 반환합니다.                      |

---

### 타입

| 타입                    | 설명                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `CompilerMode`          | 컴파일러 모드: `'dev'` HMR 지원 개발을 위한 모드 또는 `'build'` 프로덕션 빌드를 위한 모드.     |
| `ExtractPluginOptions`  | `intlayerExtractBabelPlugin`의 옵션: 파일 목록, 설정, `onExtract` 콜백 등.                     |
| `ExtractResult`         | 추출 결과: 사전 키, 파일 경로, 콘텐츠 및 로케ール.                                             |
| `OptimizePluginOptions` | `intlayerOptimizeBabelPlugin`의 옵션: 사전 경로, 가져오기 모드, 사전별 모드 맵 등.             |
| `PurgePluginOptions`    | `intlayerPurgeBabelPlugin`의 옵션: 기본 디렉토리, 제거/축소/최적화 플래그, 컴포넌트 파일 목록. |
| `MinifyPluginOptions`   | `intlayerMinifyBabelPlugin`의 옵션: 기본 디렉토리, 축소/최적화/editorEnabled 플래그.           |
| `PruneContext`          | 분석 및 정리 플러그인 간에 공유되는 상태: 필드 사용 맵, 이름 바꾸기 맵 등.                     |
| `DictionaryFieldUsage`  | 단일 사전에 대한 필드 사용 결과: 정적 분석이 결정적이지 않은 경우 `Set<string>` 또는 `'all'`.  |
| `NestedRenameEntry`     | 이름 바꾸기 트리의 노드: `shortName` 및 자식 맵.                                               |
| `NestedRenameMap`       | 이름 바꾸기 트리의 단일 수준: `Map<string, NestedRenameEntry>`.                                |
| `CompatCallerConfig`    | 호환성 어댑터(compat-adapter) 패키지용 호환 사용 분석기 설정 (호출자 이름 및 처리 옵션).       |
| `ScriptBlock`           | SFC 파일(Vue 또는 Svelte)에서 추출된 스크립트 블록: 콘텐츠, 시작 오프셋 및 끝 오프셋.          |

---

### 유틸리티 함수

| 함수                              | 설명                                                                                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | 정수(0부터 시작)를 짧은 알파벳 식별자로 변환합니다: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'` 등.                                        |
| `buildNestedRenameMapFromContent` | Intlayer 노드 구조(translation, enumeration 등)를 존중하여 컴파일된 사전의 콘텐츠 값으로부터 `NestedRenameMap`을 재귀적으로 빌드합니다. |
| `createPruneContext`              | 기본값으로 초기화된 빈 새 `PruneContext` 객체를 생성합니다.                                                                             |
| `extractScriptBlocks`             | Babel 분석을 위해 SFC 파일(Vue / Svelte)에서 `<script>` 블록을 추출합니다.                                                              |
| `BABEL_PARSER_OPTIONS`            | 지원되는 프레임워크(React/Vue/Svelte/Angular/...)를 다루는 Babel 파서 옵션을 나타내는 상수.                                             |
| `INTLAYER_CALLER_NAMES`           | 원래 Intlayer 호출자 이름의 상수 목록: `['useIntlayer', 'getIntlayer']`.                                                                |

---

## 사용 예시

```js
// babel.config.js
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
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **참고:** `intlayerPurgeBabelPlugin`은 `intlayerMinifyBabelPlugin`이 전자에 의해 빌드된 이름 바꾸기 맵을 읽기 때문에 반드시 `intlayerMinifyBabelPlugin` **전에** 선언되어야 합니다. 또한 `useIntlayer` 호출이 재작성되기 전에 사전 키를 볼 수 있도록 두 플러그인 모두 앞에 `intlayerOptimizeBabelPlugin`이 와야 합니다.
