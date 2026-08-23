---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite 플러그인 문서 | vite-intlayer
description: vite-intlayer 패키지에서 intlayerPrune 플러그인을 사용하는 방법을 확인하세요
keywords:
  - intlayerPrune
  - vite
  - 플러그인
  - 트리 쉐이킹
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "문서 초기화"
author: aymericzip
---

# intlayerPrune Vite 플러그인 문서

`intlayerPrune` Vite 플러그인은 애플리케이션 번들에서 사용되지 않는 사전(dictionary)을 트리 쉐이킹하고 제거(prune)하는 데 사용됩니다. 이를 통해 필요한 다국어 콘텐츠만 포함되어 최종 번들 크기를 줄일 수 있습니다.

## 사용법

### `intlayer()`의 일부로 (권장)

Intlayer config를 통해 pruning을 활성화하면 main plugin이 모든 것을 처리합니다:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // prune과 minify를 모두 활성화합니다
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

플러그인 스택을 수동으로 구성하는 경우, `intlayerPrune`과 `intlayerMinify`는 한 번 생성하고 둘 다에 전달해야 하는 `PruneContext` 객체를 공유합니다:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // 선택사항, 동일한 context에서 읽음
  ],
});
```

## 어떻게 작동하는가

### 1. Usage analysis (buildStart)

`buildStart` 중에 `intlayerOptimize` 플러그인(`intlayer()`의 일부)은 `build.filesList`에 나열된 모든 component 소스 파일을 스캔합니다. 각 `useIntlayer('key')` 또는 `getIntlayer('key')` 호출에 대해, 정확히 어떤 필드가 액세스되는지 기록합니다. 예를 들어:

```ts
const { title, description } = useIntlayer("myDict");
// records: myDict → { title, description }
```

이는 모든 `transform` 호출이 실행되기 전에 `pruneContext.fieldUsageMap`을 구성합니다.

### 2. JSON pruning (transform, enforce: 'pre')

Vite가 컴파일된 dictionary JSON 파일을 처리할 때, `intlayerPrune`은 Vite의 built-in JSON → ESM 변환 전에 이를 가로챕니다. `pruneContext`에서 field-usage map을 읽고 기록된 usage set에 없는 모든 content field를 제거합니다.

두 가지 content shape이 지원됩니다:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields는 `translation` 내에서 per-locale별로 pruned됩니다.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields는 top level에서 pruned됩니다.

### 3. Edge cases

사전의 콘텐츠 구조를 인식할 수 없는 경우(예: 비정상적인 중첩된 형태), 이는 `pruneContext.dictionariesWithEdgeCases`에 추가되고 **변경되지 않은 상태로 유지**됩니다. 경고가 기록됩니다. `intlayerMinify`도 이러한 사전을 건너뜁니다.

### 4. Field-rename map

pruning이 성공하면, `intlayerPrune`은 `pruneContext.dictionaryKeyToFieldRenameMap`도 작성합니다. 이는 원본 필드 이름을 짧은 별칭으로 매핑합니다. `intlayerMinify`는 이 맵을 읽어 출력 JSON의 필드 이름을 변경하고, `intlayerOptimize`의 Babel rename pass는 소스 파일의 property 접근을 그에 따라 업데이트합니다.

## 활성화 조건

`intlayerPrune`은 다음의 모든 조건이 참일 때**만** 활성화됩니다:

1. Vite 명령이 `build`입니다.
2. `build.optimize`가 `true`입니다 (또는 `undefined`인 경우, 빌드에 대해 기본값이 `true`입니다).
3. Intlayer 구성에서 `build.purge`가 `true`입니다.

`editor.enabled`가 `true`일 때도 활성 상태를 유지합니다. 비주얼 에디터는 병합되지 않은 사전에 대해 `dictionaryKey`와 `keyPath`를 통해 모든 편집을 해석하며, 이 플러그인은 해당 사전을 전혀 건드리지 않습니다. 정리된 필드는 어떤 컴포넌트도 읽지 않는 필드이므로, 렌더링되지도 페이지에서 선택되지도 않습니다.
