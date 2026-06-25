---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "splitKeys 옵션 추가 (next-intl / react-intl 단일 파일 레이아웃을 위한 최상위 네임스페이스 키당 하나의 사전)"
  - version: 7.5.0
    date: 2025-12-13
    changes: "ICU 및 i18next 형식 지원 추가"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Sync JSON 플러그인 초기 문서화"
author: aymericzip
---

# Sync JSON (i18n 브리지) - ICU / i18next 지원이 포함된 Sync JSON

<iframe title="Intlayer와 JSON 번역을 동기화 상태로 유지하는 방법" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

이 패키지는 두 가지 플러그인을 제공합니다:

- `loadJSON`: JSON 파일을 Intlayer 사전으로 로드합니다.
  - 이 플러그인은 소스에서 JSON 파일을 로드하고 Intlayer 사전으로 로드하는 데 사용됩니다. 모든 코드베이스를 스캔하고 특정 JSON 파일을 검색할 수 있습니다.
    이 플러그인은 다음 경우에 사용할 수 있습니다.
    - JSON 파일이 로드될 특정 위치를 강제하는 i18n 라이브러리(예: `next-intl`, `i18next`, `react-intl`, `vue-i18n` 등)를 사용하지만, 코드베이스의 원하는 위치에 콘텐츠 선언을 배치하려는 경우.
    - 원격 소스(예: CMS, API 등)에서 메시지를 가져와 JSON 파일에 저장하려는 경우에도 사용할 수 있습니다.

  > 내부적으로 이 플러그인은 모든 코드베이스를 스캔하고 특정 JSON 파일을 검색하여 Intlayer 사전으로 로드합니다.
  > 이 플러그인은 출력 및 번역을 JSON 파일에 다시 쓰지 않습니다.

- `syncJSON`: JSON 파일을 Intlayer 사전과 동기화합니다.
  - 이 플러그인은 JSON 파일을 Intlayer 사전과 동기화하는 데 사용됩니다. 지정된 위치를 스캔하고 특정 JSON 파일의 패턴과 일치하는 JSON을 로드할 수 있습니다. 이 플러그인은 다른 i18n 라이브러리를 사용하면서 Intlayer의 이점을 얻으려는 경우에 유용합니다.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 현재 JSON 파일을 Intlayer 사전과 동기화 상태로 유지
  plugins: [
    /**
     * src에서 {key}.i18n.json 패턴과 일치하는 모든 JSON 파일을 로드합니다.
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // 이 JSON 파일이 `./locales/en/${key}.json`의 파일보다 우선하도록 보장합니다.
      format: "intlayer", // JSON 콘텐츠의 형식
    }),
    /**
     * 출력 및 번역을 로케일 디렉토리의 JSON 파일로 로드하고 다시 씁니다.
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

플러그인을 `intlayer.config.ts`에 추가하고 기존 JSON 구조를 가리키도록 설정하세요.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 현재 JSON 파일을 Intlayer 사전과 동기화 상태로 유지
  plugins: [
    syncJSON({
      // 로케일별, 네임스페이스별 레이아웃 (예: next-intl, 네임스페이스가 있는 i18next)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

대안: 로케일별 단일 파일 (i18next/react-intl 설정에서 일반적임):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### 작동 방식

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
  splitKeys?: boolean, // 선택 사항, 단일 파일을 최상위 키당 하나의 사전으로 분할 (자동 감지)
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

#### `splitKeys` (boolean)

**최상위 키가 네임스페이스인** 단일 JSON 파일이 전체 파일을 담는 단일 사전 대신 최상위 키당 하나의 사전이 되어야 하는지 여부를 제어합니다.

이는 `next-intl` 및 `react-intl`과 같은 라이브러리의 네임스페이스 모델과 일치합니다. 이 모델에서는 하나의 `messages/{locale}.json` 파일이 최상위 키별로 여러 네임스페이스를 그룹화하며, 각 네임스페이스는 독립적으로 처리됩니다 (예: `useTranslations('Hero')`는 `Hero` 사전을 해결합니다).

- `undefined` (기본값): **자동 감지** — `source` 패턴에 `{key}` 세그먼트가 없는 경우 (하나의 파일이 모든 네임스페이스를 포함) 파일이 분할되고, 그렇지 않은 경우 (키당 하나의 파일) 단일 사전으로 유지됩니다.
- `true`: 항상 각 최상위 키를 자체 사전으로 분할합니다.
- `false`: 분할하지 않습니다; 전체 파일이 단일 사전이 됩니다.

단일 `messages/{locale}.json` 파일이 주어졌을 때:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // 패턴에 `{key}` 세그먼트가 없으므로 암시적으로 활성화됨
}),
```

이는 `Hero`, `Nav`, `About` 세 개의 사전을 생성하므로 `useTranslations('Hero')` (next-intl)가 올바르게 해결됩니다. 다시 쓸 때, 모든 네임스페이스는 동일한 로케일별 파일로 재조립됩니다.

> `source`에 명시적인 `{key}` 세그먼트를 유지하는 경우 (예: `./locales/${locale}/${key}.json`), 각 파일은 이미 하나의 네임스페이스이므로 분할은 기본적으로 비활성화됩니다.

### Multiple JSON sources and priority

여러 `syncJSON` 플러그인을 추가하여 서로 다른 JSON 소스를 동기화할 수 있습니다. 이는 프로젝트에 여러 i18n 라이브러리나 다양한 JSON 구조가 있을 때 유용합니다.

#### Priority system

여러 플러그인이 동일한 사전 키를 대상으로 할 때, `priority` 매개변수가 어떤 플러그인이 우선하는지 결정합니다:

- 높은 우선순위 숫자가 낮은 숫자보다 우선합니다
- `.content` 파일의 기본 우선순위는 `0`입니다.
- 플러그인 콘텐츠 파일의 기본 우선순위는 `-1`입니다.
- 동일한 우선순위를 가진 플러그인은 구성에 나타나는 순서대로 처리됩니다.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Quick start

`intlayer.config.ts`에 플러그인을 추가하여 기존 JSON 파일을 Intlayer 사전으로 가져옵니다. 이 플러그인은 읽기 전용입니다 (디스크에 쓰지 않음):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 소스 트리의 어느 곳에나 있는 JSON 메시지를 가져옵니다.
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // 플러그인 인스턴스당 단일 로케일을 로드합니다 (구성의 defaultLocale로 기본 설정됨).
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

대안: 로케일별 레이아웃, 여전히 읽기 전용 (선택된 로케일만 로드됨):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // 이 패턴에서 Locales.FRENCH에 대한 파일만 로드됩니다.
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- 발견: `source` 빌더에서 glob을 구축하고 일치하는 JSON 파일을 수집합니다.
- 가져오기: 각 JSON 파일을 제공된 `locale`로 Intlayer 사전으로 로드합니다.
- 읽기 전용: 출력 파일을 쓰거나 포맷하지 않습니다. 왕복 동기화가 필요한 경우 `syncJSON`을 사용하세요.
- 자동 채우기 준비: `fill` 패턴을 정의하여 `intlayer content fill`이 누락된 키를 채울 수 있도록 합니다.

### API

```ts
loadJSON({
  // JSON 파일 경로를 빌드합니다. 구조에 로케일 세그먼트가 없는 경우 `locale`은 선택 사항입니다.
  source: ({ key, locale }) => string,

  // 이 플러그인 인스턴스에 의해 로드된 사전에 대한 대상 로케일
  // configuration.internationalization.defaultLocale로 기본 설정됩니다.
  locale?: Locale,

  // 소스를 식별하는 선택적 레이블
  location?: string, // default: "plugin"

  // 다른 소스와의 충돌 해결에 사용되는 우선순위
  priority?: number, // default: 0

  // JSON 콘텐츠에 대한 선택적 포맷터
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // 단일 파일을 최상위 키당 하나의 사전으로 분할 (자동 감지)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON 파일을 로드할 때 사전 콘텐츠에 사용할 포맷터를 지정합니다. 이를 통해 다양한 i18n 라이브러리와 호환되는 다양한 메시지 포맷팅 구문을 사용할 수 있습니다.

- `'intlayer'`: 기본 Intlayer 포맷터 (기본값).
- `'icu'`: ICU 메시지 포맷팅을 사용합니다 (react-intl, vue-i18n과 같은 라이브러리와 호환).
- `'i18next'`: i18next 메시지 포맷팅을 사용합니다 (i18next, next-i18next, Solid-i18next와 호환).

**예시:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // 호환성을 위해 ICU 포맷팅 사용
}),
```

#### `splitKeys` (boolean)

[`syncJSON`](#splitkeys-boolean)과 동일한 동작: 단일 JSON 파일이 최상위 키별로 여러 네임스페이스를 그룹화할 때, 각 최상위 키는 자체 사전이 됩니다.

- `undefined` (기본값): **자동 감지** — `source` 패턴에 `{key}` 세그먼트가 없는 경우 분할되고, 그렇지 않은 경우 단일 사전이 됩니다.
- `true` / `false`: 분할을 강제하거나 비활성화합니다.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys 자동 활성화: `Hero`, `Nav`, `About`, … 각각 사전이 됩니다.
}),
```

### Behavior and conventions

- `source` 마스크에 로케일 플레이스홀더가 포함된 경우, 선택된 `locale`에 대한 파일만 가져옵니다.
- 마스크에 `{key}` 세그먼트가 없는 경우, 파일의 각 최상위 키는 기본적으로 자체 사전이 됩니다 ([`splitKeys`](#splitkeys-boolean) 참조). 대신 전체 파일을 단일 `index` 사전으로 로드하려면 `splitKeys: false`로 설정하세요.
- 키는 `source` 빌더의 `{key}` 플레이스홀더를 대체하여 파일 경로에서 파생됩니다.
- 플러그인은 발견된 파일만 사용하며 누락된 로케일이나 키를 생성하지 않습니다.
- `fill` 경로는 `source`에서 추론되며, 선택 시 CLI를 통해 누락된 값을 업데이트하는 데 사용됩니다.

## Conflict resolution

동일한 번역 키가 여러 JSON 소스에 존재할 때:

1. 가장 높은 우선순위를 가진 플러그인이 최종 값을 결정합니다.
2. 낮은 우선순위 소스는 누락된 키에 대한 대체로 사용됩니다.
3. 이를 통해 점진적으로 새로운 구조로 이전하면서도 레거시 번역을 유지할 수 있습니다.

## CLI

동기화된 JSON 파일은 다른 `.content` 파일로 간주됩니다. 즉, 모든 intlayer 명령어가 동기화된 JSON 파일에 대해 사용 가능합니다. 포함되는 명령어는 다음과 같습니다:

- `intlayer content test` : 누락된 번역이 있는지 테스트합니다.
- `intlayer content list` : 동기화된 JSON 파일 목록을 표시합니다.
- `intlayer content fill` : 누락된 번역을 채웁니다.
- `intlayer content push` : 동기화된 JSON 파일을 푸시합니다.
- `intlayer content pull` : 동기화된 JSON 파일을 풀합니다.

자세한 내용은 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참조하세요.

## Limitations (current)

- 타사 라이브러리를 대상으로 할 때 삽입 또는 복수형/ICU 지원이 없습니다.
- 비-Intlayer 런타임에 대한 시각적 편집기는 아직 제공되지 않습니다.
- JSON 동기화만 지원하며, 비-JSON 카탈로그 형식은 지원되지 않습니다.

## Why this matters

- 검증된 i18n 솔루션을 추천하고 Intlayer를 애드온으로 위치시킬 수 있습니다.
- 튜토리얼에서 Intlayer를 사용하여 JSON을 관리하도록 제안함으로써 SEO/키워드를 활용할 수 있습니다.
- 대상 사용자를 “새 프로젝트”에서 “이미 i18n을 사용하는 모든 팀”으로 확장합니다.
