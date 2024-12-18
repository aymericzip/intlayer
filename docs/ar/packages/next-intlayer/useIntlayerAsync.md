# Next.js Integration: `useIntlayerAsync` Hook Documentation

يعمل Hook `useIntlayerAsync` على توسيع وظائف `useIntlayer` من خلال إرجاع القواميس المسبقة العرض ليس فقط، ولكن أيضًا جلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## نظرة عامة

- **تحميل القاموس بطريقة غير متزامنة:**  
  على جانب العميل، يقوم `useIntlayerAsync` أولاً بإرجاع قاموس اللغة المسبق (تمامًا مثل `useIntlayer`) ثم يقوم بجلب ودمج أي قواميس بعيدة جديدة متاحة بشكل غير متزامن.
- **إدارة حالة التقدم:**  
  يوفر الـ Hook أيضًا حالة `isLoading`، والتي تشير إلى متى يتم جلب قاموس بعيد. وهذا يسمح للمطورين بعرض مؤشرات التحميل أو حالات الهيكل العظمي لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

تقدم Intlayer نظام إدارة محتوى بدون رأس (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. من خلال استخدام لوحة التحكم البديهية في Intlayer، يمكن لفريقك تعديل النصوص المحلية والصور والموارد الأخرى دون تعديل الكود مباشرة. هذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن أنه يمكن إجراء التحديثات بسرعة وسهولة.

لبدء استخدام Intlayer، ستحتاج أولاً إلى التسجيل والحصول على رمز وصول على [https://intlayer.org/dashboard](https://intlayer.org/dashboard). بمجرد حصولك على بيانات الاعتماد الخاصة بك، أضفها إلى ملف التكوين الخاص بك كما هو موضح أدناه:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

بعد تكوين بيانات الاعتماد الخاصة بك، يمكنك دفع قاموس لغة جديد إلى Intlayer عن طريق تشغيل:

```bash
npm intlayer push -d my-first-dictionary-key
```

هذا الأمر يرفع قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة لجلب غير متزامن وتحرير من خلال منصة Intlayer.

## استيراد `useIntlayerAsync` في Next.js

نظرًا لأن `useIntlayerAsync` مخصص للمكونات **على جانب العميل**، ستقوم باستيراده من نفس نقطة دخول العميل مثل `useIntlayer`:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

تأكد من أن الملف المستورد موضح بعبارة `"use client"` في الأعلى، إذا كنت تستخدم موجه تطبيق Next.js مع فصائل الخادم والعميل مفصولة.

## المعلمات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. يجب تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الـ Hook اللغة من سياق العميل.

3. **`isRenderEditor`** (اختياري، افتراضيًا `true`):  
   **النوع**: `boolean`  
   يحدد ما إذا كان يجب أن يكون المحتوى جاهزًا للعرض مع تراكب محرر Intlayer. إذا تم تعيينه على `false`، ستستبعد بيانات القاموس التي تم إرجاعها ميزات خاصة بالمحرر.

## قيمة الإرجاع

يُرجع الـ Hook كائن قاموس يحتوي على محتوى محلي مقترن بـ `key` و `locale`. كما يتضمن قيمة منطقية `isLoading` تشير إلى ما إذا كان يتم حاليًا جلب قاموس بعيد.

## مثال على الاستخدام في Next.js

### مثال على مكون جانب العميل

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**النقاط الرئيسية:**

- عند العرض الأولي، يأتي `title` و `description` من قاموس اللغة المسبق.
- بينما تكون `isLoading` `true`، يتم إجراء طلب بعيد في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث المحتوى، وتعود `isLoading` إلى `false`.

## التعامل مع محلية الخصائص

كما هو الحال مع `useIntlayer`، يمكنك استرداد قيم الخصائص المحلية لقيم مختلفة من خصائص HTML (مثل `alt`، `title`، `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات إعلان المحتوى

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك من أجل الأمان من النوع ولتجنب الأخطاء في وقت التشغيل. تتيح لك هذه الملفات التحقق من صحة TypeScript، مما يضمن أنك دائما تشير إلى المفاتيح والأماكن الموجودة.

إرشادات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## مزيد من المعلومات

- **محرر Visual Intlayer:**  
  دمج مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من الواجهة. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**باختصار**، يعد `useIntlayerAsync` إطارًا قويًا مصممًا لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال دمج القواميس المسبقة مع تحديثات القاموس غير المتزامنة. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المستندة إلى TypeScript، يمكنك دمج المحتوى الديناميكي والمحلي في تطبيقات Next.js الخاصة بك.
