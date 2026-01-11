---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – 오탐지된 `node:fs` 거부 오류
description: Intlayer + React-Router + Vite 환경에서 vite-env-only가 `node:fs` import를 거부한다고 보고하는 이유와 해결 방법.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# Intlayer에서 vite-env-only가 `node:fs`를 거부함

이전 React-Router v7 권장사항에서 언급된 것처럼 **vite-env-only** 플러그인을 사용하고 있고 다음과 같은 메시지가 표시된다면:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…실제 클라이언트 번들에 **`node:fs`가 없음에도**, 이는 **오탐지(false positive)** 입니다.

## 원인

`vite-env-only`는 Babel 기반 검사를 **Vite 그래프 해석 초기에** 실행하며, _다음보다 먼저_:

- aliasing (Intlayer의 browser vs node 매핑을 포함),
- dead-code 제거,
- SSR vs 클라이언트 해석,
- React-Router와 같은 가상 모듈.

Intlayer 패키지는 Node와 브라우저 양쪽에서 동작할 수 있는 코드를 포함합니다. 어떤 _중간_ 단계에서, `node:fs`와 같은 Node 내장 모듈이 **Vite가 클라이언트 빌드에서 제거하기 전에** 그래프에 나타날 수 있습니다. `vite-env-only`는 이를 감지하고 즉시 오류를 발생시키며, 최종 번들에는 실제로 포함되어 있지 않습니다.

## React-Router와 서버 모듈

React-Router 문서의 **server module conventions**
(https://reactrouter.com/api/framework-conventions/server-modules), 팀은 클라이언트 번들로 서버 전용 import가 유출되는 것을 방지하기 위해 **명시적으로 `vite-env-only` 사용을 권장합니다**.

하지만 이러한 규칙들은 서버 전용 코드를 제거하기 위해 Vite의 aliasing, conditional exports, 그리고 tree-shaking에 의존합니다. aliasing과 conditional exports는 이미 적용되더라도, 해당 단계에서는 `@intlayer/core` 같은 패키지에 Node 기반 유틸리티가 여전히 존재할 수 있습니다(클라이언트에서 실제로는 가져오지 않더라도). 아직 tree-shaking이 실행되지 않았기 때문에 이러한 함수들은 여전히 Babel에 의해 파싱되고, `vite-env-only`가 그들의 `node:` import를 감지하여 오탐을 발생시킵니다 — 최종 클라이언트 번들에서는 올바르게 제거되었음에도 불구하고.

## 수정 / 우회 방법

### 권장: `vite-env-only` 제거

플러그인을 단순히 제거하세요. 대부분의 경우 필요하지 않습니다 — Vite는 자체 모듈 해석으로 클라이언트와 서버 임포트를 이미 처리합니다.

이렇게 하면 Intlayer를 변경하지 않고도 잘못된 `node:fs` 차단이 해결됩니다.

### 대신 최종 빌드를 검증하세요

클라이언트에 Node 내장 모듈이 포함되지 않았는지 여전히 확인하려면, **빌드 후**에 검사하세요. 예:

```bash
pnpm build
grep -R "node:" dist/
```

결과가 없으면 클라이언트 번들은 깨끗합니다.

## 요약

- `vite-env-only`는 너무 일찍 검사하기 때문에 `node:fs`에서 에러를 발생시킬 수 있습니다.
- Vite + Intlayer + React-Router의 서버 모듈 규약은 일반적으로 서버 전용 참조를 올바르게 제거합니다.
- 플러그인을 제거하거나 *최종 출력*을 검증하는 것이 일반적으로 최선의 해결책입니다.
