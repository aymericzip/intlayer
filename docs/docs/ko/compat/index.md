---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Intlayer Compat Adapters"
description: "compat adapter를 사용하여 기존 i18n 솔루션을 Intlayer로 마이그레이션하세요."
keywords:
  - compat
  - 마이그레이션
  - 국제화
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer Compat Adapters

대규모 애플리케이션을 새로운 국제화 라이브러리로 마이그레이션하는 것은 어려울 수 있습니다. 이 전환을 쉽게 하기 위해 Intlayer는 에코시스템에서 가장 인기 있는 i18n 라이브러리를 위한 **compat adapter**를 제공합니다.

이 adapter package들은 기존 i18n 라이브러리와 **동일한 공개 API**를 노출하지만, 런타임에 모든 번역 작업을 Intlayer에 위임합니다.

## 작동 방식

compat adapter를 사용할 때, 애플리케이션의 import를 다시 작성하거나 번역 hook 및 component 사용 방법을 변경할 필요가 없습니다. 대신 Intlayer의 bundler plugin이 기존 import를 자동으로 Intlayer compat package로 별칭 지정합니다.

예를 들어, 개발자가 `import { useTranslation } from 'react-i18next'`를 `import { useTranslation } from '@intlayer/react-i18next'`로 대체하면(bundler plugin을 통해 자동으로 수행됨), 앱은 Intlayer 사전에서 제공되는 번역과 함께 계속 작동합니다. 키도 Intlayer 사전에 대해 타입이 지정됩니다!

## 사용 가능한 Compat Adapters

아래에서 기존 라이브러리를 선택하여 원활하게 마이그레이션하는 방법을 확인하세요:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
