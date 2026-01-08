---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Sync JSON 플러그인
description: Intlayer 사전을 서드파티 i18n JSON 파일(i18next, next-intl, react-intl, vue-i18n 등)과 동기화합니다. 기존 i18n을 유지하면서 Intlayer를 사용하여 메시지를 관리, 번역 및 테스트할 수 있습니다.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - 번역
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: ICU 및 i18next 형식 지원 추가
  - version: 6.1.6
    date: 2025-10-05
    changes: Sync JSON 플러그인 초기 문서화
---

# Sync JSON (i18n 브리지) - ICU / i18next 지원이 포함된 Sync JSON

<iframe title="Intlayer와 JSON 번역을 동기화 상태로 유지하는 방법" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

기존 i18n 스택에 Intlayer를 애드온으로 사용하세요. 이 플러그인은 JSON 메시지를 Intlayer 사전과 동기화하여 다음을 할 수 있습니다:

- i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n 등을 계속 사용할 수 있습니다.
- 앱을 리팩토링하지 않고도 Intlayer(CLI, CI, 공급자, CMS)를 사용하여 메시지를 관리하고 번역할 수 있습니다.
- 각 생태계를 대상으로 하는 튜토리얼과 SEO 콘텐츠를 배포하면서 Intlayer를 JSON 관리 계층으로 제안할 수 있습니다.

참고 및 현재 범위:

- CMS로의 외부화는 번역과 일반 텍스트에 대해 작동합니다.
- 삽입, 복수형/ICU, 또는 다른 라이브러리의 고급 런타임 기능은 아직 지원하지 않습니다.
- 서드파티 i18n 출력에 대한 시각적 편집기는 아직 지원하지 않습니다.

### 이 플러그인을 사용해야 할 때

- 이미 i18n 라이브러리를 사용하고 JSON 파일에 메시지를 저장하고 있습니다.
- 렌더링 런타임을 변경하지 않고 AI 지원 채우기, CI에서 테스트, 콘텐츠 운영을 원합니다.

## 설치

```bash
pnpm add -D @intlayer/sync-json-plugin
# 또는
npm i -D @intlayer/sync-json-plugin
```

## 빠른 시작

플러그인을 `intlayer.config.ts`에 추가하고 기존 JSON 구조를 가리키도록 설정하세요.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 현재 JSON 파일을 Intlayer 사전과 동기화 상태로 유지
  plugins: [
    syncJSON({
      // 로케일별, 네임스페이스별 레이아웃 (예: next-intl, 네임스페이스가 있는 i18next)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

대안: 로케일별 단일 파일 (i18next/react-intl 설정에서 일반적임):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### 작동 방식

- 읽기: 플러그인은 `source` 빌더에서 JSON 파일을 찾아 Intlayer 사전으로 로드합니다.
- 쓰기: 빌드 및 채우기 후, 로컬라이즈된 JSON을 동일한 경로에 다시 씁니다 (포맷 문제를 방지하기 위해 마지막에 개행 포함).
- 자동 채우기: 플러그인은 각 사전에 대해 `autoFill` 경로를 선언합니다. 기본적으로 `intlayer fill` 명령을 실행하면 JSON 파일에서 누락된 번역만 업데이트됩니다.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // 필수
  location?: string, // 선택적 레이블, 기본값: "plugin"
  priority?: number, // 충돌 해결을 위한 선택적 우선순위, 기본값: 0
  format?: 'intlayer' | 'icu' | 'i18next', // 선택적 포맷터, Intlayer 런타임 호환성에 사용
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON 파일을 동기화할 때 사전 콘텐츠에 사용할 포맷터를 지정합니다. 이를 통해 Intlayer 런타임과 호환되는 다양한 메시지 포맷팅 구문을 사용할 수 있습니다.

- `undefined`: 포맷터가 사용되지 않으며, JSON 콘텐츠가 그대로 사용됩니다.
- `'intlayer'`: 기본 Intlayer 포맷터 (기본값).
- `'icu'`: ICU 메시지 포맷팅을 사용합니다 (react-intl, vue-i18n과 같은 라이브러리와 호환).
- `'i18next'`: i18next 메시지 포맷팅을 사용합니다 (i18next, next-i18next, Solid-i18next와 호환).

> 포맷터를 사용하면 JSON 콘텐츠가 입력과 출력에서 변환된다는 점에 유의하세요. ICU 복수형과 같은 복잡한 JSON 규칙의 경우, 파싱이 입력과 출력 간의 1대1 매핑을 보장하지 못할 수 있습니다.
> Intlayer 런타임을 사용하지 않는 경우, 포맷터를 설정하지 않는 것이 더 나을 수 있습니다.

**예시:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // 호환성을 위해 i18next 포맷팅 사용
}),
```

## 여러 JSON 소스 및 우선순위

여러 `syncJSON` 플러그인을 추가하여 서로 다른 JSON 소스를 동기화할 수 있습니다. 이는 프로젝트에 여러 i18n 라이브러리나 다양한 JSON 구조가 있을 때 유용합니다.

### 우선순위 시스템

여러 플러그인이 동일한 사전 키를 대상으로 할 때, `priority` 매개변수가 어떤 플러그인이 우선하는지 결정합니다:

- 높은 우선순위 숫자가 낮은 숫자보다 우선합니다
- `.content` 파일의 기본 우선순위는 `0`입니다.
- 플러그인 콘텐츠 파일의 기본 우선순위는 `-1`입니다.
- 동일한 우선순위를 가진 플러그인은 구성에 나타나는 순서대로 처리됩니다.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 주요 JSON 소스 (가장 높은 우선순위)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // 대체 JSON 소스 (낮은 우선순위)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // 레거시 JSON 소스 (가장 낮은 우선순위)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### 충돌 해결

동일한 번역 키가 여러 JSON 소스에 존재할 때:

1. 가장 높은 우선순위를 가진 플러그인이 최종 값을 결정합니다.
2. 낮은 우선순위 소스는 누락된 키에 대한 대체로 사용됩니다.
3. 이를 통해 점진적으로 새로운 구조로 이전하면서도 레거시 번역을 유지할 수 있습니다.

## 통합

아래는 일반적인 매핑 예시입니다. 런타임은 변경하지 말고 플러그인만 추가하세요.

### i18next

일반적인 파일 구조: `./public/locales/{locale}/{namespace}.json` 또는 `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

로케일별 JSON 메시지(보통 `./messages/{locale}.json`) 또는 네임스페이스별.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

참고: `docs/ko/intlayer_with_next-intl.md`.

### react-intl

로케일별 단일 JSON이 일반적입니다:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

로케일별 단일 파일 또는 네임스페이스별 파일 중 하나를 사용합니다:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

동기화된 JSON 파일은 다른 `.content` 파일로 간주됩니다. 즉, 모든 intlayer 명령어가 동기화된 JSON 파일에 대해 사용 가능합니다. 포함되는 명령어는 다음과 같습니다:

- `intlayer content test` : 누락된 번역이 있는지 테스트합니다.
- `intlayer content list` : 동기화된 JSON 파일 목록을 표시합니다.
- `intlayer content fill` : 누락된 번역을 채웁니다.
- `intlayer content push` : 동기화된 JSON 파일을 푸시합니다.
- `intlayer content pull` : 동기화된 JSON 파일을 풀합니다.

자세한 내용은 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.

## 제한 사항 (현재)

- 타사 라이브러리를 대상으로 할 때 삽입 또는 복수형/ICU 지원이 없습니다.
- 비-Intlayer 런타임에 대한 시각적 편집기는 아직 제공되지 않습니다.
- JSON 동기화만 지원하며, 비-JSON 카탈로그 형식은 지원되지 않습니다.

## 이 점이 중요한 이유

- 검증된 i18n 솔루션을 추천하고 Intlayer를 애드온으로 위치시킬 수 있습니다.
- 튜토리얼에서 Intlayer를 사용하여 JSON을 관리하도록 제안함으로써 SEO/키워드를 활용할 수 있습니다.
- 대상 사용자를 “새 프로젝트”에서 “이미 i18n을 사용하는 모든 팀”으로 확장합니다.
