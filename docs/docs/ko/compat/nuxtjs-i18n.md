---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NuxtJS I18n에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Nuxt.js 애플리케이션을 @nuxtjs/i18n에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NuxtJS I18n에서 Intlayer로 마이그레이션

Nuxt 애플리케이션을 `@nuxtjs/i18n`에서 Intlayer로 마이그레이션하는 것은 Nuxt adapter module을 사용하여 매끄러운 프로세스입니다.

## 해야 할 일

프로젝트를 초기화하려면 다음을 실행하세요:

```bash
npx intlayer init
```

이렇게 하면 `intlayer.config.ts`가 설정됩니다. 그런 다음 `nuxt.config.ts` modules 배열에 Intlayer Nuxt module (예: `@intlayer/nuxt-i18n`)을 추가하세요. 이것은 애플리케이션에 compat 설정을 자동으로 적용합니다.

## 내부적으로 어떻게 작동하는지

`@nuxtjs/i18n`은 `vue-i18n`을 래핑하면서 Nuxt 특화 routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`)를 제공합니다.

내부적으로:

- **Translations:** 모든 문자열 translation 작업에 대해 네이티브로 `@intlayer/vue-i18n` compat layer를 사용합니다 (완벽하게 `vue-i18n` formats, pipe plurals, reactivity를 지원합니다).
- **Routing:** Intlayer의 localized URL helpers를 사용하여 routing composables를 mirror합니다.
- **Configuration:** `intlayer.config.ts`에서 `availableLocales`과 기본 설정을 직접 읽어 Nuxt pages를 자동으로 조정합니다.
