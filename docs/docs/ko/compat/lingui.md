---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Lingui에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 애플리케이션을 Lingui에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Lingui에서 Intlayer로 마이그레이션

프로젝트가 현재 Lingui의 macro 기반 컴파일에 의존하고 있다면 Intlayer로 전환하면 강력한 macro workflows를 유지하면서 네이티브로 Intlayer의 JSON compilation strategy를 지원할 수 있습니다.

## 해야 할 일

프로젝트에서 Intlayer를 초기화하여 시작하세요:

```bash
npx intlayer init
```

`intlayer.config.ts`가 생성됩니다. build step에서 `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin`을 유지하여 Intlayer compiler _이전에_ 실행되도록 하세요. 그런 다음 bundler plugin alias를 사용하여 `@lingui/core`과 `@lingui/react`을 `@intlayer/lingui`로 라우팅하세요.

## 내부적으로 어떻게 작동하는지

Lingui는 macros (`` t`Hello ${name}` ``과 `<Trans>` 같은)를 사용하며, 이는 `i18n._(id, values)` 같은 runtime 호출로 컴파일됩니다.

내부적으로:

- **Macros:** 이전과 정확히 동일하게 컴파일되어 소스 구문에 중단이 없음을 보장합니다.
- **Runtime translation:** aliased `i18n._()`은 Intlayer dictionaries를 사용합니다. 명시적으로 이름이 지정된 IDs와 hashed IDs 모두 Intlayer의 `.po` sync plugins을 사용하여 완전히 매핑되며 keys를 안전하게 aggregate하고 prune합니다.
- **ICU capabilities:** pluralization, selection, ICU variants에 대한 지원은 Intlayer의 unified ICU parser 덕분에 강력하게 유지되어 동일한 렌더링 출력을 보장합니다.
