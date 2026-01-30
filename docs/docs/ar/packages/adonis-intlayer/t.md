---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: توثيق دالة t | adonis-intlayer
description: تعرف على كيفية استخدام دالة t لحزمة adonis-intlayer
keywords:
  - t
  - ترجمة
  - Intlayer
  - تدويل
  - توثيق
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: التوثيق الأولي
---

# توثيق: دالة `t` في `adonis-intlayer`

تعد دالة `t` في حزمة `adonis-intlayer` الأداة الأساسية لتوفير استجابات مترجمة في تطبيق AdonisJS الخاص بك. فهي تبسط عملية التدويل (i18n) من خلال اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تُستخدم دالة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. وهي تحدد تلقائيًا اللغة المناسبة للإرجاع بناءً على إعدادات طلب العميل، مثل عنوان `Accept-Language`. إذا كانت اللغة المفضلة غير متوفرة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في التكوين الخاص بك.

---

## الميزات الرئيسية

- **التوطين الديناميكي**: تختار تلقائيًا الترجمة الأكثر ملاءمة للعميل.
- **الرجوع إلى اللغة الافتراضية**: تعود إلى اللغة الافتراضية إذا لم تكن اللغة المفضلة للعميل متوفرة، مما يضمن استمرارية تجربة المستخدم.
- **السياق غير المتزامن**: تعمل بسلاسة ضمن دورة حياة طلب AdonisJS باستخدام Async Local Storage.
- **دعم TypeScript**: تفرض سلامة النوع لترجماتك.

---

## توقيع الدالة

```typescript
t(translations: Record<string, any>): any;
```

### المعلمات

- `translations`: كائن تكون مفاتيحه هي رموز اللغة (مثلاً `en` ، `fr` ، `es`) والقيم هي المحتوى المترجم المقابل.

### المرتجعات

- المحتوى الذي يمثل اللغة المفضلة للعميل.

---

## تحميل الوسيط (Middleware)

لضمان عمل دالة `t` بشكل صحيح، **يجب** عليك تسجيل وسيط `intlayer` في تطبيق AdonisJS الخاص بك.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## أمثلة الاستخدام

### مثال أساسي

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### الاستخدام في المتحكمات (Controllers)

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## مواضيع متقدمة

### آلية الرجوع (Fallback Mechanism)

إذا كانت اللغة المفضلة غير متوفرة، فستعود دالة `t` إلى اللغة الافتراضية المحددة في `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### تكامل TypeScript

دالة `t` آمنة من حيث النوع عند استخدامها مع قواميس محددة. لمزيد من التفاصيل، راجع [توثيق TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
