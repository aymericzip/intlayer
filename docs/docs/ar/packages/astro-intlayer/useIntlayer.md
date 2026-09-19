---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق خطاف useIntlayer | astro-intlayer
description: تعرّف على كيفية استخدام خطاف useIntlayer في مكونات Astro وسكربتات العميل للوصول إلى المحتوى المترجم.
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي"
author: aymericzip
---

# توثيق خطاف useIntlayer

يتيح لك خطاف `useIntlayer` استرداد محتوى القاموس المترجم بواسطة المفتاح في تطبيقات Astro.

يمكن استدعاؤه في سياقين مختلفين باستخدام نفس مسار الاستيراد:

1. **الخادم / Frontmatter**: داخل ملفات `.astro`، يحلل المحتوى تلقائيًا باستخدام لغة الطلب المخزنة في `Astro.locals.intlayer`.
2. **المتصفح / وسم `<script>` للعميل**: داخل سكربتات العميل أو مكونات أطر عمل واجهة المستخدم، يحل إلى تطبيق متجر جانب العميل (`vanilla-intlayer`).

## الاستخدام

### في Frontmatter الخاص بمكون Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### في كتل `<script>` للعميل

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## المعاملات

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: المفتاح الفريد للقاموس (كما هو محدد في ملفات تعريف `.content.ts`).
2. **`localeOrSelector`** (اختياري): لغة محددة أو كائن محدد (`{ item }`، `{ variant }`، مع `locale` اختياريًا). عند تمريره، فإنه يتجاوز اللغة المكتشفة من سياق الطلب أو متجر العميل.

## الوصف

يقوم الخطاف بالمهام التالية:

1. **تحديد اللغة**:
   - على الخادم، يقرأ اللغة النشطة من `Astro.locals.intlayer` عبر نطاق `AsyncLocalStorage` الذي تم إنشاؤه بواسطة `astro-intlayer/middleware`.
   - في المتصفح، يقرأ اللغة النشطة من تخزين/متجر العميل.
2. **استرداد القاموس**: يدرج محتوى القاموس المطابق للمفتاح المحدد.
3. **معالجة الترجمة**: يحلل الترجمات (`t()`) والتعدادات والشروط وmarkdown إلى محتوى جاهز للعرض.

## المستندات ذات الصلة

- [تكامل `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/intlayer.md)
- [خطاف `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useDictionary.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useLocale.md)
