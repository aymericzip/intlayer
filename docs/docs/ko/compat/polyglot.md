---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Polyglot.js에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Polyglot.js에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Polyglot.js에서 Intlayer로 마이그레이션

Airbnb의 Polyglot.js를 사용 중이라면 compat layer를 사용하여 Intlayer로의 마이그레이션은 매우 간단합니다.

## 해야 할 일

프로젝트에서 initialization 명령을 실행하세요:

```bash
npx intlayer init
```

`intlayer.config.ts`가 생성됩니다. 그런 다음 bundler plugin alias를 사용하여 Polyglot imports를 `@intlayer/polyglot`으로 투명하게 리다이렉트할 수 있습니다.

## 내부적으로 어떻게 작동하는지

Polyglot.js 구문은 일반적으로 `polyglot.t('key', {name})`과 `%{name}` interpolations과 `"singular |||| plural"`로 구분된 `smart_count` plurals에 의존합니다.

내부적으로:

- **Interpolation:** compat layer는 `%{var}` placeholders를 네이티브로 처리합니다.
- **Plurals:** 문자열은 `||||`에서 분할되어 active locale에 따라 native `Intl.PluralRules`에 대해 평가됩니다. 이는 locale당 Polyglot의 자신의 bucket 순서를 mirror합니다.
- **Dictionaries:** `new Polyglot()`에 거대한 JSON 설정을 제공할 필요를 없앱니다. Intlayer는 dictionaries를 동적으로 처리하고 자동으로 prune합니다.
