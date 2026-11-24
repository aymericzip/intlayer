---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "الترحيل إلى Intlayer من i18next وnext-intl وreact-intl وLingui وvue-i18n وغيرها"
description: "انقل تطبيقًا قائمًا إلى Intlayer دون إعادة كتابة استدعاءات الترجمة. تحافظ compat adapters على واجهة API الخاصة بـ i18next وreact-i18next وnext-intl وreact-intl وLingui وvue-i18n وsvelte-i18n وngx-translate."
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

# الترحيل إلى Intlayer من مكتبة i18n الحالية

نادرًا ما تكون إعادة كتابة كل استدعاء ترجمة في تطبيق كبير خيارًا ممكنًا. يوفر Intlayer **compat adapters**: حزم (packages) تعرض **نفس واجهة API** الخاصة بمكتبة i18n الحالية، لكنها تقدم الرسائل من قواميس Intlayer.

## كيف يعمل

1. **احتفظ بشيفرتك.** تبقى استدعاءات `useTranslation` و`useTranslations` و`useIntl` و`useLingui` و`$_` و`| translate` كما هي.
2. **احتفظ بملفات الرسائل.** يقرأ [إضافة sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) (أو [إضافة sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md)) ملفاتك الحالية ويكتب الترجمات فيها.
3. **استبدل إضافة الـ bundler.** يأتي كل adapter مع إضافة تبني قواميسك وتعيد توجيه imports المكتبة الأصلية إلى الـ adapter. لا حاجة لتغيير أي import.

تحصل على مفاتيح مُنمَّطة، وتحميل القواميس لكل صفحة، وترجمة بالذكاء الاصطناعي عبر [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)، و[المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md). بعد ذلك يمكنك الانتقال إلى ملفات `.content.ts` الأصلية، مكوّنًا تلو الآخر.

> لفهم أصل هذه المكتبات، اقرأ [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md).

## compat adapters المتاحة

| المكتبة                                                  | الإطار      | Adapter                   | دليل الترحيل                                                                                                                          |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [الترحيل من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [الترحيل من react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [الترحيل من next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [الترحيل من next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [الترحيل من react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [الترحيل من Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [الترحيل من vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [الترحيل من @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [الترحيل من svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [الترحيل من ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_ngx-translate_to_intlayer.md) |

## البدء السريع

أيًا كانت مكتبتك، الخطوة الأولى واحدة. يكتشف `intlayer init` مكتبة i18n الحالية ويثبّت الـ adapter المناسب:

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

ثم اتبع دليل الترحيل الخاص بمكتبتك أعلاه.

## تبدأ من الصفر؟

إذا لم يكن لتطبيقك مكتبة i18n بعد، فتجاوز الـ adapters وابدأ بالواجهة الأصلية:

- [Intlayer مع Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)
- [Intlayer مع Vite وReact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)
- [Intlayer مع Vite وVue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+vue.md)
- [Intlayer مع Vite وSvelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+svelte.md)
- [Intlayer مع Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md)
