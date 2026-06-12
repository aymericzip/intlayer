---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO 플러그인
description: Intlayer 딕셔너리를 Gettext PO 파일과 동기화합니다. Intlayer를 사용하여 메시지를 관리, 번역 및 테스트하면서 기존 i18n을 유지하세요.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - 번역
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Sync PO 플러그인 초기 문서"
author: aymericzip
---

# Sync PO (i18n 브릿지) - ICU / i18next 지원 Sync PO

기존 i18n 스택의 애드온으로 Intlayer를 사용하세요. 이 플러그인은 Gettext PO 메시지를 Intlayer 딕셔너리와 동기화 상태로 유지하여 다음을 수행할 수 있도록 합니다.

- 기존의 PO 기반 번역 워크플로우를 유지합니다.
- 앱을 리팩토링하지 않고도 Intlayer(CLI, CI, 제공자, CMS)를 사용하여 메시지를 관리하고 번역합니다.
- Intlayer를 PO 관리 레이어로 제안하면서 각 에코시스템을 타겟팅하는 튜토리얼과 SEO 콘텐츠를 배포합니다.

참고 및 현재 범위:

- CMS로의 외부화는 번역 및 일반 텍스트에서 작동합니다.
- PO 항목 자체 내의 삽입, 복수형/ICU 또는 다른 라이브러리의 고급 런타임 기능은 아직 지원되지 않습니다.
- 타사 i18n 출력에 대해서는 비주얼 에디터가 아직 지원되지 않습니다.

### 이 플러그인을 사용하는 경우

- 이미 번역에 Gettext PO 파일을 사용하고 있는 경우.
- 렌더링 런타임을 변경하지 않고 AI 기반 채우기, CI에서의 테스트 및 콘텐츠 운영을 원하는 경우.

## 설치

```bash
pnpm add -D @intlayer/sync-po-plugin
# 또는
npm i -D @intlayer/sync-po-plugin
```

## 플러그인

이 패키지는 두 가지 플러그인을 제공합니다.

- `loadPO`: PO 파일을 Intlayer 딕셔너리로 로드합니다.
  - 이 플러그인은 소스에서 PO 파일을 로드하여 Intlayer 딕셔너리에 불러오는 데 사용됩니다. 전체 코드베이스를 스캔하여 특정 PO 파일을 검색할 수 있습니다.
    이 플러그인은 다음과 같은 경우에 사용할 수 있습니다.
    - i18n 라이브러리가 PO 파일을 로드하기 위해 특정 위치를 강제하지만, 콘텐츠 선언을 코드베이스의 원하는 위치에 두고 싶은 경우.
    - 원격 소스(예: CMS, API 등)에서 메시지를 가져와 PO 파일에 저장하고 싶은 경우.

  > 내부적으로 이 플러그인은 전체 코드베이스를 스캔하여 특정 PO 파일을 찾아 Intlayer 딕셔너리로 로드합니다.
  > 이 플러그인은 출력 및 번역을 PO 파일에 다시 쓰지 않는다는 점에 유의하세요.

- `syncPO`: PO 파일을 Intlayer 딕셔너리와 동기화합니다.
  - 이 플러그인은 PO 파일을 Intlayer 딕셔너리와 동기화하는 데 사용됩니다. 지정된 위치를 스캔하고 특정 PO 파일 패턴과 일치하는 PO를 로드할 수 있습니다. 이 플러그인은 다른 i18n 라이브러리를 사용하면서 Intlayer의 이점을 누리고 싶을 때 유용합니다.

## 두 플러그인 모두 사용하기

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 현재 PO 파일을 Intlayer 딕셔너리와 동기화 상태로 유지
  plugins: [
    /**
     * src 내에서 {key}.i18n.po 패턴과 일치하는 모든 PO 파일을 로드합니다.
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // 이 PO 파일이 `./locales/en/${key}.po`에 있는 파일보다 우선권을 갖도록 보장합니다.
    }),
    /**
     * 로드하고 출력 및 번역을 locales 디렉토리의 PO 파일에 다시 씁니다.
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` 플러그인

### 빠른 시작

`intlayer.config.ts`에 플러그인을 추가하고 기존 PO 구조를 가리키도록 설정하세요.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 현재 PO 파일을 Intlayer 딕셔너리와 동기화 상태로 유지
  plugins: [
    syncPO({
      // 로케일별, 네임스페이스별 레이아웃
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

대안: 로케일당 하나의 파일:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### 작동 원리

- 읽기: 플러그인은 `source` 빌더에서 PO 파일을 검색하고 이를 Intlayer 딕셔너리로 로드합니다.
- 쓰기: 빌드 및 채우기 후에 로컬라이즈된 PO를 동일한 경로에 다시 씁니다(적절한 Gettext 헤더 포함).
- 자동 채우기: 플러그인은 각 딕셔너리에 대해 `autoFill` 경로를 선언합니다. `intlayer fill`을 실행하면 기본적으로 PO 파일의 누락된 번역만 업데이트됩니다.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // 필수
  location?: string, // 선택적 레이블, 기본값: "sync-po::path/to/source"
  priority?: number, // 충돌 해결을 위한 선택적 우선순위, 기본값: 0
});
```

### 여러 PO 소스 및 우선순위

서로 다른 PO 소스를 동기화하기 위해 여러 개의 `syncPO` 플러그인을 추가할 수 있습니다. 이는 프로젝트에 여러 번역 소스가 있거나 서로 다른 PO 구조가 있는 경우에 유용합니다.

#### 우선순위 시스템

여러 플러그인이 동일한 딕셔너리 키를 타겟팅할 때 `priority` 매개변수가 우선순위를 결정합니다.

- 높은 우선순위 숫자가 낮은 숫자보다 우선합니다.
- `.content` 파일의 기본 우선순위는 `0`입니다.
- 플러그인의 기본 우선순위는 `0`입니다.
- 우선순위가 같은 플러그인은 설정에 나타나는 순서대로 처리됩니다.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 주요 PO 소스 (최고 우선순위)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // 폴백 PO 소스 (낮은 우선순위)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // 레거시 PO 소스 (최저 우선순위)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO 플러그인

### 빠른 시작

기존 PO 파일을 Intlayer 딕셔너리로 수집하려면 `intlayer.config.ts`에 플러그인을 추가하세요. 이 플러그인은 읽기 전용입니다(디스크에 쓰지 않음).

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 소스 트리의 어느 위치에나 있는 PO 메시지 수집
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // 플러그인 인스턴스당 단일 로케일 로드(기본값은 설정의 defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

대안: 로케일별 레이아웃, 여전히 읽기 전용(선택한 로케일만 로드됨):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // 이 패턴에서 Locales.FRENCH에 대한 파일만 수집됩니다.
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### 작동 원리

- 검색: `source` 빌더에서 glob을 작성하고 일치하는 PO 파일을 수집합니다.
- 수집: 제공된 `locale`을 사용하여 각 PO 파일을 Intlayer 딕셔너리로 로드합니다.
- 읽기 전용: 출력 파일을 쓰거나 포맷하지 않습니다. 라운드 트립 동기화가 필요한 경우 `syncPO`를 사용하세요.
- 자동 채우기 준비: `intlayer content fill`이 누락된 키를 채울 수 있도록 `fill` 경로를 정의합니다.

### API

```ts
loadPO({
  // PO에 대한 경로를 작성합니다. 구조에 로케일 세그먼트가 없는 경우 `locale`은 선택 사항입니다.
  source: ({ key, locale }) => string,

  // 이 플러그인 인스턴스에 의해 로드되는 딕셔너리의 대상 로케일
  // 기본값은 configuration.internationalization.defaultLocale입니다.
  locale?: Locale,

  // 소스를 식별하기 위한 선택적 레이블
  location?: string, // 기본값: "plugin"

  // 다른 소스와의 충돌 해결에 사용되는 우선순위
  priority?: number, // 기본값: 0
});
```

### 동작 및 관례

- `source` 마스크에 로케일 자리 표시자가 포함된 경우 선택한 `locale`에 대한 파일만 수집됩니다.
- 마스크에 `{key}` 세그먼트가 없는 경우 딕셔너리 키는 "index"가 됩니다.
- 키는 `source` 빌더의 `{key}` 자리 표시자를 대체하여 파일 경로에서 파생됩니다.
- 플러그인은 검색된 파일만 사용하며 누락된 로케일이나 키를 위조하지 않습니다.
- `fill` 경로는 `source`에서 유추되며, 옵트인할 때 CLI를 통해 누락된 값을 업데이트하는 데 사용됩니다.

## 충돌 해결

동일한 번역 키가 여러 PO 소스에 존재하는 경우:

1. 우선순위가 가장 높은 플러그인이 최종 값을 결정합니다.
2. 낮은 우선순위 소스는 누락된 키에 대한 폴백으로 사용됩니다.
3. 이를 통해 새로운 구조로 점진적으로 마이그레이션하면서 레거시 번역을 유지할 수 있습니다.

## CLI

동기화된 PO 파일은 다른 `.content` 파일과 동일하게 간주됩니다. 즉, 동기화된 PO 파일에 대해 모든 intlayer 명령을 사용할 수 있습니다. 다음을 포함합니다.

- `intlayer content test`: 누락된 번역이 있는지 테스트합니다.
- `intlayer content list`: 동기화된 PO 파일을 나열합니다.
- `intlayer content fill`: 누락된 번역을 채웁니다.
- `intlayer content push`: 동기화된 PO 파일을 푸시합니다.
- `intlayer content pull`: 동기화된 PO 파일을 풀합니다.

자세한 내용은 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)를 참조하세요.

## 제한 사항 (현재)

- 타사 라이브러리를 타겟팅할 때 삽입 또는 복수형/ICU 지원이 없습니다.
- Intlayer 이외의 런타임에 대해서는 비주얼 에디터가 아직 제공되지 않습니다.
- PO 동기화 전용이며, PO 이외의 카탈로그 형식은 지원되지 않습니다.

## 이것이 중요한 이유

- 기존의 i18n 솔루션을 권장하고 Intlayer를 애드온으로 포지셔닝할 수 있습니다.
- PO 관리를 위해 Intlayer 사용을 제안하는 튜토리얼을 통해 그들의 SEO/키워드를 활용합니다.
- 타겟 고객을 "새 프로젝트"에서 "이미 i18n을 사용 중인 모든 팀"으로 확장합니다.
