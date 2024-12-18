# Documentation: `getLocalizedUrl` Function in `intlayer`

## الوصف:

دالة `getLocalizedUrl` تقوم بإنشاء عنوان URL محلي من خلال إضافة البادئة المناسبة للدولة المدخلة. تقوم هذه الدالة بالتعامل مع عناوين URL المطلقة والنسبيه، وتضمن تطبيق بادئة الدولة الصحيحة استنادًا إلى الإعدادات.

---

## المعلمات:

- `url: string`

  - **الوصف**: سلسلة عنوان URL الأصلية التي سيتم إضافة بادئة لها.
  - **النوع**: `string`

- `currentLocale: Locales`

  - **الوصف**: الدولة الحالية التي يتم تكييف عنوان URL لها.
  - **النوع**: `Locales`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. بشكل افتراضي، يتم توفير اللغات المهيئة في المشروع.
  - **النوع**: `Locales[]`
  - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `defaultLocale: Locales`

  - **الوصف**: الدولة الافتراضية للتطبيق. بشكل افتراضي، يتم توفير الدولة الافتراضية المهيئة في المشروع.
  - **النوع**: `Locales`
  - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة عنوان URL للدولة الافتراضية. بشكل افتراضي، يتم توفير القيمة المهيئة في المشروع.
  - **النوع**: `boolean`
  - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

### الإرجاع:

- **النوع**: `string`
- **الوصف**: عنوان URL المحلي للدولة المحددة.

---

## مثال على الاستخدام:

### عناوين URL النسبية:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// الخرج: "/fr/about" للغة الفرنسية
// الخرج: "/about" للغة الافتراضية (الإنجليزية)
```

### عناوين URL المطلقة:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // الخرج: "https://example.com/fr/about" للفرنسية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // الخرج: "https://example.com/about" للإنجليزية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  true // بادئة اللغة الافتراضية
); // الخرج: "https://example.com/en/about" للإنجليزية
```

### اللغة غير المدعومة:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH // اللغة الافتراضية
); // الخرج: "/about" (لا توجد بادئة مطبقة للغة غير المدعومة)
```

---

## حالات الحافة:

- **عدم وجود شريحة لغة:**

  - إذا لم يحتوي عنوان URL على أي شريحة لغة، فإن الدالة تقوم بأمان بإضافة البادئة المناسبة.

- **اللغة الافتراضية:**

  - عندما تكون `prefixDefault` تساوي `false`، لا تقوم الدالة بإضافة بادئة عنوان URL للغة الافتراضية.

- **اللغات غير المدعومة:**
  - بالنسبة للغات غير المدرجة في `locales`، لا تقوم الدالة بتطبيق أي بادئة.

---

## الاستخدام في التطبيقات:

في تطبيق متعدد اللغات، فإن تكوين إعدادات التدويل مع `locales` و `defaultLocale` أمر حاسم لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getLocalizedUrl` في إعداد التطبيق:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// إعداد يدعم اللغات واللغة الافتراضية
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

يضمن الإعداد أعلاه أن التطبيق يتعرف على `ENGLISH`، `FRENCH`، و`SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذا الإعداد، يمكن لدالة `getLocalizedUrl` إنشاء عناوين URLs محلية بناءً على تفضيل لغة المستخدم:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // الخرج: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // الخرج: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // الخرج: "/about"
```

من خلال دمج `getLocalizedUrl`، يمكن للمطورين الحفاظ على هياكل عناوين URL متسقة عبر لغات متعددة، مما يعزز من تجربة المستخدم وتحسين محركات البحث.
