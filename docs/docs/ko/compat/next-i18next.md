---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "next-i18next에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Next.js 애플리케이션을 next-i18next에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
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

# next-i18next에서 Intlayer로 마이그레이션

Intlayer는 모든 Next.js Pages Router 및 App Router 구현을 투명하게 처리합니다. adapter를 사용하면 코드를 전혀 다시 작성하지 않고 `next-i18next` 구현을 마이그레이션할 수 있습니다.

## 해야 할 일

시작하려면 다음을 실행하세요:

```bash
npx intlayer init
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
