---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "i18next, next-intl, react-intl, Lingui, vue-i18n 등에서 Intlayer로 마이그레이션"
description: "번역 호출을 다시 작성하지 않고 기존 앱을 Intlayer로 옮기세요. compat adapter는 i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n, ngx-translate의 API를 그대로 유지합니다."
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# 현재 사용 중인 i18n 라이브러리에서 Intlayer로 마이그레이션

대규모 앱의 모든 번역 호출을 다시 작성하는 것은 현실적이지 않은 경우가 많습니다. Intlayer는 **compat adapter**를 제공합니다. 현재 i18n 라이브러리와 **동일한 API**를 노출하면서 메시지는 Intlayer 사전에서 제공하는 package입니다.

## 작동 방식

1. **코드는 그대로 유지합니다.** `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_`, `| translate` 호출은 바꿀 필요가 없습니다.
2. **메시지 파일도 그대로 유지합니다.** [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)(또는 [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md))이 기존 파일을 읽고 번역을 다시 해당 파일에 기록합니다.
3. **번들러 플러그인을 교체합니다.** 각 adapter에는 사전을 빌드하고 원래 라이브러리의 import를 adapter로 리다이렉트하는 플러그인이 포함되어 있습니다. import를 변경할 필요가 없습니다.

타입이 지정된 키, 페이지별 사전 로딩, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 통한 AI 번역, [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용할 수 있습니다. 이후 컴포넌트 단위로 네이티브 `.content.ts` 파일로 옮겨 갈 수 있습니다.

> 이 라이브러리들이 어디서 왔는지 알고 싶다면 [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)를 읽어 보세요.

## 사용 가능한 compat adapter

| 라이브러리                                               | 프레임워크 | Adapter                   | 마이그레이션 가이드                                                                                                                         |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [i18next에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [react-i18next에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [next-i18next에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [next-intl에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [react-intl에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Lingui에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [vue-i18n에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [@nuxtjs/i18n에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [svelte-i18n에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [ngx-translate에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_ngx-translate_to_intlayer.md) |

## 빠른 시작

어떤 라이브러리를 쓰든 첫 단계는 같습니다. `intlayer init`이 현재 i18n 라이브러리를 감지하고 해당 adapter를 설치합니다.

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

그다음 위에서 사용 중인 라이브러리의 마이그레이션 가이드를 따르세요.

## 처음부터 시작하나요?

앱에 아직 i18n 라이브러리가 없다면 adapter는 건너뛰고 네이티브 API로 시작하세요.

- [Next.js와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)
- [Vite, React와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- [Vite, Vue와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md)
- [Vite, Svelte와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md)
- [Angular와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)
