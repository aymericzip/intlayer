---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "التحقق من القواميس باستخدام المخططات (Zod)"
description: "عرّف مخططات Zod في intlayer.config.ts واربطها بقواميسك للتحقق من كل لغة أثناء البناء وإضافة الأنواع إلى المحتوى في المحرر."
keywords:
  - مخطط
  - Zod
  - التحقق
  - قاموس
  - إعلان المحتوى
  - أمان الأنواع
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "إنشاء التوثيق"
author: aymericzip
---

# التحقق من القواميس باستخدام المخططات

يصف المخطط (schema) البنية المتوقعة لمحتوى القاموس. تعرّفه مرة واحدة في `intlayer.config.ts`، وتمنحه اسمًا، ثم تربط هذا الاسم بأي قاموس عبر الحقل `schema`.

بعد ذلك يقوم Intlayer بما يلي:

- **يتحقق** من القاموس لكل لغة عند بناء القواميس، ويبلغ عن كل خطأ مع اللغة ومسار الحقل.
- **يضيف الأنواع** إلى محتوى القاموس في محررك، بحيث يُكتشف الحقل المفقود أو ذو النوع الخاطئ قبل البناء.

تفيد المخططات عندما يجب أن تشترك عدة قواميس في البنية نفسها (بيانات SEO الوصفية، بطاقات المنتجات، مدخلات شبيهة بالـ CMS)، أو عندما يجب أن يلتزم المحتوى بقيود لا يستطيع TypeScript التعبير عنها، مثل حد أقصى لطول كل ترجمة.

<AccordionGroup>
<Accordion header="بيانات Markdown الوصفية">

تحقّق من حقول frontmatter مثل `title` و`description` و`date` و`tags` قبل عرض Markdown. تُفحَص الحقول المطلوبة وأنواعها المتوقعة أثناء بناء القواميس، وتُبلّغ البيانات الوصفية غير الصحيحة مع اللغة ومسار الحقل.

</Accordion>
<Accordion header="بيانات SEO للصفحة">

تحقّق من البيانات الوصفية المستخدمة لعرض عناوين الصفحات وأوصافها وعناوينها الأساسية وصورها الاجتماعية وتوجيهات الفهرسة. يمكن للمخطط أن يفرض عنوانًا بطول يتراوح بين حرف واحد و60 حرفًا، ويحدد الأوصاف بـ160 حرفًا، ويتأكد من صحة عناوين URL. يُرفض محتوى اللغة غير الصالح قبل أن يتسبب في خطأ عند عرض الصفحة.

</Accordion>
<Accordion header="محتوى منظم مشترك">

أرفق مخططًا واحدًا بالقواميس التي تشترك في بنية محتوى، مثل المنتجات أو عناصر التنقل أو قوالب البريد الإلكتروني. يؤدي غياب حقل أو استخدام قيمة بنوع غير صحيح إلى إبطال القاموس أثناء البناء، ما يساعد على منع وصول محتوى غير متسق إلى التطبيق.

</Accordion>
</AccordionGroup>

<Steps>
<Step number={1} title="عرّف المخططات في الإعدادات">

ثبّت [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

ثم عرّف مخططاتك تحت المفتاح `schemas`. كل مفتاح هو الاسم الذي ستشير إليه من قواميسك.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="اربط مخططًا بقاموس">

اضبط الحقل `schema` في القاموس على أحد الأسماء المعرّفة في الإعدادات.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

يمكن ربط المخطط نفسه بأي عدد تحتاجه من القواميس.

</Step>
<Step number={3} title="شغّل البناء واقرأ التقرير">

يعمل التحقق في كل مرة يبني فيها Intlayer القواميس: باستخدام `npx intlayer build`، أو عبر إضافة الـ bundler في وضعي dev وbuild. إذا خالفت ترجمة ما المخطط، يسجّل Intlayer اللغة ومسار الحقل ورسالة Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

يفشل تشغيل `intlayer build` لمرة واحدة إذا كان المخطط غير معروف أو فشل التحقق. في وضع المراقبة، يستبعد Intlayer القاموس غير الصالح حتى يُصحَّح محتواه.

</Step>
</Steps>

## إضافة الأنواع إلى المحتوى من المخطط

تتحكم المعاملات العامة (generics) لـ `Dictionary` في مدى صرامة فحص TypeScript للقاموس:

| التعريف                                                 | الحقل `schema`                      | الحقل `content`               |
| ------------------------------------------------------- | ----------------------------------- | ----------------------------- |
| `satisfies Dictionary`                                  | يُكمَل تلقائيًا، والاسم غير المعروف خطأ | لا يفحصه TypeScript            |
| `satisfies Dictionary<undefined, "seo-metadata">`       | يجب أن يكون `"seo-metadata"`        | مُنمَّط من المخطط                |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | يجب أن يكون `"seo-metadata"`        | مُنمَّط من المخطط ومن نوعك الخاص |

مع مخطط مُنمَّط، يقبل كل حقل إما قيمة عادية أو عقدة محتوى تُنتج تلك القيمة، لذلك يبقى استخدام `t()` مسموحًا:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> يولّد Intlayer هذه الأنواع من مخططات Zod الخاصة بك في `.intlayer/types` في كل مرة يبني فيها القواميس. تُنمَّط البنية فقط: أما القيود مثل `.min()` و`.max()` و`.regex()` فتُفحص أثناء البناء.

## ما الذي يتم التحقق منه

لكل لغة مدرجة في `internationalization.locales`، يحلّ Intlayer محتوى القاموس لتلك اللغة، ثم يتحقق من النتيجة. لذلك يصف المخطط القيمة النهائية للحقل (`title: string`)، وليس عقدة `t()` التي تحمل الترجمات.

- **الترجمات المفقودة**: مع `strictMode` الافتراضي، تعود الترجمة المفقودة إلى اللغة الافتراضية قبل التحقق. مع `strictMode: "strict"`، تؤدي الترجمة المفقودة إلى فشل الحقل الإلزامي.
- **عقد المحتوى الأخرى**: تُحَل `enu()` و`plural()` و`cond()` و`gender()` و`select()` و`insert()` إلى دوال، وتُحَل `md()` أو `html()` إلى عقد. عرّف هذه الحقول باستخدام `z.any()`، واحتفظ بالقيود على الحقول التي تُحَل إلى قيم عادية.
- **ما لا يتم التحقق منه**: المحتوى الذي توفّره دالة أو Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md))، والقواميس المسحوبة من [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## استخدام مكتبة تحقق أخرى

مدخلات `schemas` ليست مقيدة بـ Zod. يعمل أي كائن يوفّر دالة `safeParse(data)` متوافقة مع Zod، طالما أنها تُرجع `{ success: true }` أو `{ success: false, error: { issues } }`، حيث يحتوي كل issue على مصفوفة `path` و`message`. تُولَّد أنواع المحتوى من مخططات Zod فقط: مع مكتبة أخرى، يكون نوع محتوى القواميس المرتبطة `any`.

## الأسئلة الشائعة

<FAQ>

<Question title="هل يوقف خطأ المخطط عملية البناء؟">

يفشل تشغيل `intlayer build` لمرة واحدة إذا لم يطابق القاموس مخططه. في وضع المراقبة، يسجّل Intlayer الأخطاء ويستبعد القاموس غير الصالح إلى أن تصحّحه وتحفظه.

</Question>
<Question title="هل يمكن لعدة قواميس مشاركة المخطط نفسه؟">

نعم. يُشار إلى المخطط باسمه، لذا يمكن لأي عدد من القواميس الإشارة إليه. هذه هي حالة الاستخدام الرئيسية: فرض بنية واحدة على جميع البيانات الوصفية للصفحات أو مدخلات المنتجات أو قوالب البريد الإلكتروني.

</Question>
<Question title="ماذا يحدث إذا لم يكن اسم المخطط موجودًا؟">

يبلغ TypeScript عن الخطأ بمجرد تعريف مخطط واحد على الأقل، لأن الحقل `schema` لا يقبل إلا الأسماء المعرّفة. في ملفات JSON، يُبلّغ Intlayer عن اسم المخطط غير المعروف أثناء البناء ويرفض القاموس.

</Question>
<Question title="هل يتم التحقق من كل اللغات أم من اللغة الافتراضية فقط؟">

من كل لغة مدرجة في `internationalization.locales`. يذكر التقرير اللغة التي فشلت، لذا يسهل اكتشاف ترجمة طويلة جدًا بالألمانية فقط.

</Question>

</FAQ>

## ذات صلة

- [ملفات إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
