---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "next-intl에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Next.js 애플리케이션을 next-intl에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# next-intl에서 Intlayer로 마이그레이션

완전하고 상세한 단계별 튜토리얼을 보려면 전체 [next-intl 마이그레이션 가이드](../migration_from_next-intl_to_intlayer.md)를 참조하세요.

`next-intl`에서 Intlayer로 마이그레이션하면 애플리케이션의 라우팅과 구문을 완전히 유지할 수 있습니다.

## 해야 할 일

리포지토리에서 다음 명령을 실행하세요:

```bash
npx intlayer init
```

이렇게 하면 `intlayer.config.ts`가 생성됩니다. `next.config.ts`에서 plugin wrapper를 사용하여 `next-intl` aliases를 `@intlayer/next-intl`로 완벽하게 주입합니다.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 내부적으로 어떻게 작동하는지

bundler wrapper는 번역을 교체하지만 **`next-intl/navigation` 기능은 그대로 유지합니다** (예: `Link`, `redirect`, `usePathname`).

내부적으로:

- **ICU runtime:** Plurals (`=0`, `one`, `other`), select/selectordinal, `#` arguments, formatted args (`{ts, date, long}`)는 공유 `resolveMessage(..., 'icu')` resolver를 사용하여 올바르게 실행됩니다.
- **`useTranslations()` & `getTranslations()`:** bare scope 호출은 첫 번째 key segment를 올바른 dictionary identifier로 추출합니다. Nested namespaces는 dictionary paths와 prefixes로 우아하게 분할됩니다.
- **Rich formatting:** `t.rich()`와 `t.markup()` 모두 완전히 네이티브로 구현되어 HTML 같은 노드를 렌더링된 React chunks로 변환합니다.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange`, 설정의 named formats는 core native `Intl` formatters로 연결됩니다.
