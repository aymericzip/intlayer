---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer 패키지 문서
description: Intlayer용 Astro 통합으로 로케일 기반 라우팅 및 사전 관리를 설정합니다.
keywords:
  - astro-intlayer
  - astro
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기에 대한 문서 통합
---

# astro-intlayer 패키지

`astro-intlayer` 패키지는 Intlayer를 Astro 애플리케이션에 통합하기 위한 필수 도구를 제공합니다. 로케일 기반 라우팅 및 사전 관리(딕셔너리 관리를) 구성합니다.

## 설치

```bash
npm install astro-intlayer
```

## 내보내기

### 통합

The `astro-intlayer` 패키지는 프로젝트에서 Intlayer를 설정하기 위한 Astro 통합을 제공합니다.

Import:

```tsx
import "astro-intlayer";
```

or adding to `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| 함수       | 설명                                               |
| ---------- | -------------------------------------------------- |
| `intlayer` | 프로젝트에서 Intlayer를 설정하는 Astro 통합입니다. |
