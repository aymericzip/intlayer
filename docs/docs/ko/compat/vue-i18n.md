---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Vue I18n에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Vue 애플리케이션을 vue-i18n에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Vue I18n에서 Intlayer로 마이그레이션

Vue 애플리케이션이 현재 `vue-i18n`을 사용하고 있다면 컴포넌트나 translation hooks를 다시 작성하지 않고 Intlayer로 마이그레이션할 수 있습니다. Intlayer는 내부적으로 Intlayer의 강력한 기능을 활용하면서 `vue-i18n`의 API를 완벽하게 반영하는 compat adapter를 제공합니다.

## 해야 할 일

시작하려면 프로젝트에서 initialization 명령을 실행하세요:

```bash
npx intlayer init
```

Initialization 중에 Intlayer는 설정 파일 (`intlayer.config.ts`)을 설정하고 마이그레이션을 위해 프로젝트를 준비합니다. `vue-i18n` imports를 자동으로 alias하기 위해 Vite 설정에 Intlayer plugin을 추가하기만 하면 됩니다.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## 내부적으로 어떻게 작동하는지

`vueI18nVitePlugin`은 bundler에 module alias를 주입합니다. 코드베이스의 `vue-i18n` import는 투명하게 `@intlayer/vue-i18n`으로 리다이렉트됩니다.

**내부적으로 adapter는 복잡한 `vue-i18n` 구문을 네이티브로 처리합니다:**

- **Interpolation & Plurals:** `{name}`과 list `{0}` interpolations을 resolve합니다. Pipe plurals (`"car | cars"`)은 위치 의미론에 따라 Intlayer enumeration/plural nodes로 변환됩니다.
- **Formats:** `d()`와 `n()` 같은 함수는 내부적으로 `Intl`을 래핑하여 options에 정의된 `datetimeFormats`와 `numberFormats`를 지원합니다.
- **Global & Local State:** `global.locale`은 Intlayer client에서 지원되는 `WritableComputedRef`로 매핑되므로 reactivity는 정확히 예상대로 작동합니다 (예: `locale.value = 'fr'`).
- **Directives:** `v-t` directive는 등록되고 정상적으로 작동합니다.

애플리케이션은 이전과 정확히 동일하게 계속 렌더링되지만 콘텐츠는 Intlayer dictionaries로 제공되어 type safety, 더 나은 bundle optimization, seamless CMS integration을 제공합니다.
