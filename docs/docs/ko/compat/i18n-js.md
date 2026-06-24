---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18n-js에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 애플리케이션을 i18n-js에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18n-js에서 Intlayer로 마이그레이션

`i18n-js` 라이브러리에서 Intlayer로 전환하는 것은 큰 translations 설정을 Intlayer의 구조화된 파일 resolution 시스템으로 offload하도록 설계된 고도로 최적화된 마이그레이션입니다.

## 해야 할 일

리포지토리에서 다음 설정 명령을 실행하세요:

```bash
npx intlayer init
```

`intlayer.config.ts`가 준비되면 bundler 설정에 Intlayer alias를 추가하여 `i18n-js`의 모든 imports가 compat package `@intlayer/i18n-js`를 대상으로 하도록 할 수 있습니다.

## 내부적으로 어떻게 작동하는지

`i18n-js`는 `i18n.t('scope.key', {name})`과 같은 표현식을 통해 namespaces에 접근하며, locale fallbacks와 특정 plural mappings과 함께 합니다.

내부적으로:

- **Interpolation:** compat adapter는 `%{name}` mappings을 targeted runtime dictionary value로 쉽게 파싱합니다.
- **Pluralization:** `one/other` subkeys를 교체하고 Intlayer의 강력한 underlying plural mechanisms (`Intl.PluralRules`)에 대해 매핑하여 수동 mappings을 추상화합니다.
- **Locales:** bootstrap 시점에 monolithic language payloads를 로드하는 대신 dictionaries는 native Intlayer 설정을 통해 현재 context 설정에 따라 최적으로 제공됩니다.
