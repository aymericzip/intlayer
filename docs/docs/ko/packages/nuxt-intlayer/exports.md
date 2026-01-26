---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer 패키지 문서
description: Nuxt 애플리케이션에 Intlayer를 통합하기 위한 모듈을 제공합니다.
keywords:
  - nuxt-intlayer
  - nuxt
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기(exports)에 대한 문서 통합
---

# nuxt-intlayer 패키지

`nuxt-intlayer` 패키지는 Intlayer를 Nuxt 프로젝트에 통합하기 위한 Nuxt 모듈을 제공합니다.

## 설치

```bash
npm install nuxt-intlayer
```

## 내보내기

### 모듈

`nuxt-intlayer` 패키지는 Intlayer를 Nuxt 프로젝트에 통합하기 위한 Nuxt 모듈을 제공합니다.

가져오기:

```tsx
import "nuxt-intlayer";
```

또는 `nuxt.config.ts`에 추가:

```ts
ts;
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| 내보내기  | 타입         | 설명                                                 |
| --------- | ------------ | ---------------------------------------------------- |
| `default` | `NuxtModule` | 기본 내보내기는 Intlayer를 구성하는 Nuxt 모듈입니다. |
