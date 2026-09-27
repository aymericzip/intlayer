---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: next-i18next 호환 어댑터"
description: "next-i18next 코드를 그대로 두고 Intlayer로 제공하세요. @intlayer/next-i18next를 설치하고 import에 별칭을 지정한 뒤, 어댑터가 내부적으로 무엇을 바꾸는지 확인하세요."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-i18next: next-i18next 호환 어댑터

완전하고 상세한 단계별 튜토리얼을 보려면 전체 [next-i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-i18next_to_intlayer.md)를 참고하세요.

Intlayer는 모든 Next.js Pages Router 및 App Router 구현을 투명하게 처리합니다. adapter를 사용하면 코드를 전혀 다시 작성하지 않고 `next-i18next` 구현을 마이그레이션할 수 있습니다.

## 해야 할 일

시작하려면 다음을 실행하세요:

```bash
npx intlayer init --interactive
```

필요한 Intlayer 설정 파일을 만듭니다. 백그라운드에서 Intlayer로 변경하려면 `next.config.ts`를 업데이트하세요:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 내부적으로 어떻게 작동하는지

`createNextI18nPlugin`은 Next.js의 네이티브 동작과 core `next-intlayer` plugin을 구성하여 `next-i18next`, `react-i18next`, `i18next`에 대한 모든 필요한 Webpack/Turbopack aliases를 주입합니다.

내부적으로:

- **`serverSideTranslations` & `appWithTranslation`:** 이제 Intlayer의 내부 loaders를 위한 wrapper 함수로 작동하여 대규모 정적 JSON injection을 우회합니다.
- **Client hooks:** 즉시 `@intlayer/react-i18next`로 위임하여 모든 formatting, plurals, nested namespace 기능을 유지합니다.

> 이러한 라이브러리가 어디에서 왔는지 이해하려면 JavaScript i18n의 역사를 읽어보세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
