---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: موجه اللغة
description: اكتشف كيف يعمل موجه اللغة. شاهد الخطوات التي يستخدمها موجه اللغة في تطبيقك. تعرف على ما تفعله الحزم المختلفة.
keywords:
  - موجه اللغة
  - البدء
  - Intlayer
  - التطبيق
  - الحزم
slugs:
  - doc
  - locale-mapper
---

# موجه اللغة

موجه اللغة هو أداة قوية تساعدك على العمل مع بيانات التدويل في تطبيق Intlayer الخاص بك. يوفر ثلاث وظائف رئيسية لتحويل وتنظيم البيانات الخاصة بكل لغة: `localeMap`، و `localeFlatMap`، و `localeRecord`.

## كيف يعمل موجه اللغة

يعمل موجه اللغة على كائن `LocaleData` يحتوي على جميع المعلومات اللازمة حول اللغة:

```typescript
type LocaleData = {
  locale: LocalesValues; // رمز اللغة الحالي (مثل 'en'، 'fr')
  defaultLocale: LocalesValues; // رمز اللغة الافتراضية
  isDefault: boolean; // هل هذه هي اللغة الافتراضية
  locales: LocalesValues[]; // مصفوفة بجميع اللغات المتاحة
  urlPrefix: string; // بادئة URL لهذه اللغة (مثل '/fr' أو '')
};
```

تقوم دوال الموجه بإنشاء هذه البيانات تلقائيًا لكل لغة في تكوينك، مع مراعاة:

- قائمة اللغات التي قمت بتكوينها
- إعداد اللغة الافتراضية
- ما إذا كان يجب إضافة بادئة اللغة الافتراضية في عناوين URL

## الوظائف الأساسية

### `localeMap`

تحول كل لغة إلى كائن واحد باستخدام دالة موجهة.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**مثال: إنشاء كائنات المسارات**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// النتيجة:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

مشابه لـ `localeMap`، ولكن دالة التحويل تُرجع مصفوفة من الكائنات التي يتم تسويتها إلى مصفوفة واحدة.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**مثال: إنشاء مسارات متعددة لكل لغة**

```typescript
import { localeFlatMap } from "@intlayer/core";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// النتيجة:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

ينشئ كائن سجل حيث تكون كل لغة مفتاحًا يشير إلى قيمة تم تحويلها بواسطة دالة الماب.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**مثال: تحميل ملفات الترجمة**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// النتيجة:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## إعداد ماب اللغة

يستخدم ماب اللغة تلقائيًا تكوين Intlayer الخاص بك، ولكن يمكنك تجاوز الإعدادات الافتراضية بتمرير معلمات:

### استخدام التكوين الافتراضي

```typescript
import { localeMap } from "@intlayer/core";

// يستخدم التكوين من intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### تجاوز التكوين

```typescript
import { localeMap } from "@intlayer/core";

// تجاوز اللغات واللغة الافتراضية
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // اللغات المخصصة
  "en", // اللغة الافتراضية المخصصة
  true // إضافة بادئة اللغة الافتراضية في عناوين URL
);
```

## أمثلة على الاستخدام المتقدم

### إنشاء قوائم التنقل

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### توليد بيانات خريطة الموقع

```typescript
import { localeFlatMap } from "@intlayer/core";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "شهريًا",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### تحميل الترجمة الديناميكي

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale)
      ? "من اليمين إلى اليسار"
      : "من اليسار إلى اليمين",
  },
}));
```

## تكامل التهيئة

يتكامل موجه اللغات بسلاسة مع تهيئة Intlayer الخاصة بك:

- **اللغات**: يستخدم تلقائيًا `configuration.internationalization.locales`
- **اللغة الافتراضية**: يستخدم `configuration.internationalization.defaultLocale`
- **بادئة عنوان URL**: يحترم `configuration.middleware.prefixDefault`

هذا يضمن الاتساق عبر تطبيقك ويقلل من تكرار التهيئة.

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات               |
| ------- | ---------- | ----------------------- |
| 5.7.2   | 2025-07-27 | إضافة توثيق موجه اللغات |
