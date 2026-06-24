---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Svelte I18n에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Svelte 애플리케이션을 svelte-i18n에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Svelte I18n에서 Intlayer로 마이그레이션

compat adapter를 사용하여 Svelte 애플리케이션을 `svelte-i18n`에서 Intlayer로 이동하는 것은 매우 간단합니다.

## 해야 할 일

프로젝트에서 initialization 명령을 실행하세요:

```bash
npx intlayer init
```

이렇게 하면 `intlayer.config.ts`가 생성됩니다. SvelteKit / Vite plugins을 Intlayer의 alias plugin으로 래핑하여 `svelte-i18n`을 `@intlayer/svelte-i18n`으로 매끄럽게 매핑하는지 확인하세요.

## 내부적으로 어떻게 작동하는지

Svelte-i18n은 heavily used stores (`$_`, `$t`, `$format`, 등)와 ICU MessageFormat에 의존합니다.

내부적으로:

- **Stores:** Intlayer는 `svelte-i18n` stores를 proxy합니다. `$_`는 현재 locale을 반환하는 Intlayer resolver의 derived store가 됩니다.
- **Keys:** flat keys (예: `$_('home.title')`)는 첫 번째 path segment가 Intlayer dictionary를 나타내도록 평가됩니다.
- **ICU Syntax:** shared ICU resolver (`intl-messageformat` equivalent parsing)에 의해 완벽하게 처리됩니다.
- **Formatters:** `$date`, `$time`, `$number` 호출은 Intlayer의 native core formatters로 안전하게 리다이렉트됩니다.
- **Babel/SWC Analysis:** Intlayer analyzer는 compilation 전에 `.svelte` 소스 파일 내부의 Svelte store callers (`$_`)를 읽어 관련 dictionary chunks를 자동으로 빌드합니다.
