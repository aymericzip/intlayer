---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite 플러그인 문서 | vite-intlayer
description: 컴파일된 Intlayer 사전 JSON 파일을 압축(Minify)하고, 필요에 따라 콘텐츠 필드 이름을 난독화하여 번들 크기를 줄이는 Vite 플러그인입니다.
keywords:
  - intlayerMinify
  - vite
  - 플러그인
  - 압축
  - 번들 크기
  - 사전
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "문서 초기화"
author: aymericzip
---

# intlayerMinify

`intlayerMinify`는 프로덕션 빌드 중에 컴파일된 사전 JSON 파일을 압축(minify)하는 Vite 플러그인입니다. 불필요한 모든 공백을 제거하고, `intlayerPrune`과 결합하면 번들 크기를 더욱 줄이기 위해 콘텐츠 필드 이름을 짧은 알파벳 별칭(`a`, `b`, `c`, …)으로 선택적으로 변경합니다.

> [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)를 사용하면 이 플러그인은 자동으로 포함되고 구성됩니다. 플러그인 스택을 직접 구성할 때만 수동으로 등록해야 합니다.

## 사용법

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## 활성화 조건

`intlayerMinify`는 다음 세 가지가 모두 참일 때만 활성화됩니다:

1. Vite 명령어가 `build`인 경우 ( `serve` / dev가 아님).
2. `build.optimize`가 `true`이거나 (빌드의 기본값인 `undefined`여서 `true`로 설정된 경우).
3. Intlayer 설정에서 `build.minify`가 `true`인 경우.

에디터는 완전하고 사람이 읽을 수 있는 사전 콘텐츠를 필요로 하므로 `editor.enabled`가 `true`이면 자동으로 **비활성화**됩니다.

## 압축 대상

플러그인은 `intlayer.system`에서 확인된 다음 두 개의 사전 위치를 대상으로 합니다:

- `dictionariesDir` — 정적 모든 언어 사전 (예: `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — 언어별 동적 사전

> 페치 모드 사전(`fetchDictionariesDir`)은 런타임에 원래 필드 이름을 사용하여 원격 API에서 제공되므로 **절대** 압축되지 않습니다. 필드 이름을 바꾸면 서버 응답과 클라이언트 측 속성 액세스 사이에 불일치가 발생할 수 있기 때문입니다.

## 필드 이름 난독화 (속성 압축)

`intlayerPrune`이 코드베이스를 분석하고 `pruneContext.dictionaryKeyToFieldRenameMap`을 채우면, `intlayerMinify`도 콘텐츠 필드 이름을 짧은 별칭으로 바꿉니다. 예를 들어:

```json
// 변경 전
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// 변경 후 (난독화 포함)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

이에 해당하는 소스 파일 속성 액세스는 `intlayerOptimize` 내부의 Babel 과정을 통해 이름이 변경되므로 런타임 동작은 그대로 유지됩니다.

Intlayer 내부 필드(`nodeType`, `translation` 등)는 이름이 바뀌지 않습니다.

## 예외적 사전 (Edge-cases)

`pruneContext.dictionariesWithEdgeCases`에 플래그가 지정된 사전(정리 단계에서 감지된 구조적 기형)은 손상된 데이터가 전달되는 것을 방지하기 위해 완전히 무시되며, 압축되거나 난독화되지 않습니다.

## 한정자 그룹 (컬렉션 / 변형 / 메타 레코드)

`qualifierTypes` 배열을 갖는 사전(컬렉션, 변형 및 메타 레코드)의 경우 플러그인은 `qualifierTypes` 배열과 `meta` 사이드 맵을 그대로 유지합니다. `content` 항목의 필드 이름만 난독화됩니다. 런타임에 선택기 일치에 사용되는 복합 키는 절대 수정되지 않습니다.
