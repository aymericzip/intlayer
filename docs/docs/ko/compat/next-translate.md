---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Next Translate에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Next.js 애플리케이션을 next-translate에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Next Translate에서 Intlayer로 마이그레이션

`next-translate`에서 Intlayer로의 마이그레이션은 기존 구문과 tags를 유지하는 거의 drop-in 대체입니다.

## 해야 할 일

프로젝트에서 Intlayer를 초기화하세요:

```bash
npx intlayer init
```

CLI는 설정을 scaffold합니다. 그런 다음 Intlayer plugin을 `next.config.ts`에 적용할 수 있으며, 이는 `next-translate/useTranslation`을 `@intlayer/next-translate`로 매핑하는 build-time subpath aliases를 주입합니다.

## 내부적으로 어떻게 작동하는지

`next-translate`는 `useTranslation('ns')`, `t('ns:key.path')`, `<Trans>` 컴포넌트 같은 hooks를 제공합니다.

내부적으로:

- **Interpolation & Plurals:** `react-i18next` adapter 동작에 매우 유사합니다. 동적으로 처리되는 것은 `{{var}}` placeholders와 `key_0`, `key_one`, `key_other` 같은 suffixes로부터 매핑된 pluralization입니다.
- **`<Trans>` component:** HTML 같은 tag parsing과 array 기반 `components` prop과 함께 직접 지원됩니다.
- **Namespaces:** Subpath aliasing은 수동 수정 없이 `useTranslation` 참조가 올바른 내부 dictionary namespaces를 참조하도록 보장합니다.
