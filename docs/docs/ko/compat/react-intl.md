---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "React Intl에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 React 애플리케이션을 react-intl에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# React Intl에서 Intlayer로 마이그레이션

React 애플리케이션이 `react-intl` (FormatJS)를 사용하는 경우 Intlayer로의 전환은 매우 쉽습니다. 우리의 compat layer는 ICU MessageFormat과 기존의 모든 `Formatted*` 컴포넌트를 완벽하게 처리합니다.

## 해야 할 일

프로젝트에서 initialization 명령을 실행하여 시작하세요:

```bash
npx intlayer init
```

그런 다음 설정에서 Intlayer Vite 또는 Next.js plugin을 설정하세요. 이 plugin은 `react-intl` imports를 `@intlayer/react-intl`로 리다이렉트할 수 있도록 빌드 타임 aliases를 주입합니다.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## 내부적으로 어떻게 작동하는지

bundler plugin은 `react-intl`을 `@intlayer/react-intl`로 alias합니다. 큰 JSON 파일을 수동으로 파싱하고 앱을 `IntlProvider`로 감싸는 대신 Intlayer plugin은 빌드 타임에 keys를 정적으로 추출하고 런타임에 Intlayer dictionaries를 사용합니다.

내부적으로:

- **ICU MessageFormat:** Intlayer는 ICU pluralization, selection, date/number formatting, rich text tags를 네이티브로 완벽하게 지원하는 `resolveMessage(..., 'icu')` resolver를 사용합니다.
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })`와 `<FormattedMessage id="a.b">`는 Intlayer compiler plugins (`@intlayer/babel` / `@intlayer/swc`)로 식별되어 flat dotted keys를 변환하므로 첫 번째 segment가 올바른 Intlayer dictionary key로 resolve됩니다.
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>` 등은 `Intl`을 사용하는 native `core/formatters`로 연결됩니다.
