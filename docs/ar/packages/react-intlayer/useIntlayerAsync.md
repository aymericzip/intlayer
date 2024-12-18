# دمج React: وثائق Hook `useIntlayerAsync`

يعمل Hook `useIntlayerAsync` على توسيع وظائف `useIntlayer` من خلال عدم العودة فقط لقواميس تم تقديمها مسبقًا، ولكن أيضًا من خلال جلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأول.

## نظرة عامة

- **تحميل القاموس غير المتزامن:**  
  عند التركيب الأول، يعيد `useIntlayerAsync` أولًا أي قاموس محلي تم جلبه مسبقًا أو متجمع بشكل ثابت (تمامًا مثلما يفعل `useIntlayer`) ثم يجلب بشكل غير متزامن ويجمع أي قواميس بعيدة جديدة متاحة.
- **إدارة حالة التقدم:**  
  يوفر هذا الـ Hook أيضًا حالة `isLoading`، تشير إلى متى يتم جلب قاموس بعيد. هذا يسمح للمطورين بعرض مؤشرات تحميل أو حالات هيكل عظمية لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

يوفر Intlayer نظام إدارة محتوى (CSM) بدون رأس يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. من خلال استخدام لوحة معلومات Intlayer البديهية، يمكن لفريقك تحرير النصوص المحلية والصور والموارد الأخرى دون تعديل الشيفرة مباشرة. هذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن أنه يمكن إجراء التحديثات بسرعة وسهولة.

لبدء استخدام Intlayer:

1. **تسجيل والحصول على رمز دخول** على [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **إضافة بيانات الاعتماد إلى ملف التكوين الخاص بك:**  
   في مشروع React الخاص بك، قم بتكوين عميل Intlayer باستخدام بيانات الاعتماد الخاصة بك:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **دفع قاموس محلي جديد إلى Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة لعمليات الجلب والتعديل غير المتزامنة من خلال منصة Intlayer.

## استيراد `useIntlayerAsync` في React

في مكونات React الخاصة بك، استورد `useIntlayerAsync`:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## المعلمات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. يجب أن يكون هذا المفتاح محددًا في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   المنطقة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الـ Hook المنطقة من السياق الحالي لـ Intlayer.

3. **`isRenderEditor`** (اختياري، الافتراضي `true`):  
   **النوع**: `boolean`  
   يحدد ما إذا كان يجب إعداد المحتوى للعرض مع طبقة التحرير من Intlayer. إذا تم تعيينه على `false`، ستستبعد بيانات القاموس المستردة الميزات الخاصة بالتحرير.

## قيمة الإرجاع

يُرجع الـ Hook كائن قاموس يحتوي على محتوى محلي مفاتيحه هي `key` و `locale`. كما يتضمن قيمة Boolean `isLoading` تشير إلى ما إذا كان يتم جلب قاموس بعيد حاليًا.

## مثال على الاستخدام في مكون React

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("يتم تحميل المحتوى...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جار التحميل…</h1>
          <p>يرجى الانتظار أثناء تحديث المحتوى.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**النقاط الرئيسية:**

- عند العرض الأول، تأتي `title` و `description` من قاموس محلي تم جلبه مسبقًا أو متجمع بشكل ثابت.
- بينما تكون `isLoading` `true`، يقوم طلب في الخلفية بجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث محتوى، وتعود `isLoading` إلى `false`.

## التعامل مع تعريب الخصائص

يمكنك أيضًا استرداد قيم الخصائص المحلية لمختلف خصائص HTML (مثل `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات إعلان المحتوى

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك من أجل أمان النوع ولمنع الأخطاء في وقت التشغيل. تمكن هذه الملفات التحقق من TypeScript، مما يضمن لك دائمًا الرجوع إلى مفاتيح ومناطق موجودة.

التعليمات لإعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## مزيد من المعلومات

- **محرر Intlayer المرئي:**  
  قم بالتكامل مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**باختصار**، يعد `useIntlayerAsync` Hook قويًا مصممًا لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال دمج القواميس المسبقة العرض أو المسبقة الجلب مع التحديثات غير المتزامنة للقاموس. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المعتمدة على TypeScript، يمكنك دمج محتوى ديناميكي محلي بسلاسة في تطبيقات React الخاصة بك.
