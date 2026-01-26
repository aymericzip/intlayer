---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "توثيق حزمة next-intlayer"
description: "تكامل مخصص لـ Next.js مع Intlayer، يوفر middleware ومزودات لـ App Router و Page Router."
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "توثيق موحد لجميع exports"
---

# حزمة next-intlayer

توفر حزمة `next-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Next.js. تدعم الحزمة كلًا من App Router و Page Router، بما في ذلك middleware للتوجيه بناءً على اللغة.

## التثبيت

```bash
npm install next-intlayer
```

## التصديرات

### الوسيط (Middleware)

| الدالة               | الوصف                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware لـ Next.js لمعالجة التوجيه القائم على اللغة وإعادة التوجيه. |

### المزودون

| المكون                   | الوصف                                                  |
| ------------------------ | ------------------------------------------------------ |
| `IntlayerClientProvider` | مزود للمكونات على جانب العميل في Next.js.              |
| `IntlayerServerProvider` | مزود للمكونات على جانب الخادم في Next.js (App Router). |

### Hooks (جانب العميل)

يعيد تصدير معظم الـ hooks من `react-intlayer`.

| Hook            | الوصف                                              |
| --------------- | -------------------------------------------------- |
| `useIntlayer`   | يختار قاموسًا واحدًا بواسطة مفتاحه ويُرجع المحتوى. |
| `useDictionary` | يختار قاموسًا واحدًا بواسطة مفتاحه ويُرجع المحتوى. |
| `useLocale`     | يعيد الـ locale الحالي ودالة لتعيينه.              |
| `useI18n`       | يعيد قيم سياق Intlayer الحالية.                    |

### الدوال (جهة الخادم)

| الدالة                 | الوصف                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| `t`                    | نسخة الخادم من دالة الترجمة لـ Next.js App Router.                      |
| `generateStaticParams` | يولّد معلمات ثابتة (static parameters) للمسارات الديناميكية في Next.js. |

### الأنواع

| النوع                | الوصف                                              |
| -------------------- | -------------------------------------------------- |
| `NextPageIntlayer`   | نوع لصفحات Next.js التي تدعم Intlayer.             |
| `NextLayoutIntlayer` | نوع لتخطيطات (layouts) Next.js التي تدعم Intlayer. |
