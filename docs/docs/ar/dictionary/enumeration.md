---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/ar/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: التعداد
description: اكتشف كيفية إعلان واستخدام التعدادات في موقعك متعدد اللغات. اتبع الخطوات في هذا التوثيق عبر الإنترنت لإعداد مشروعك في دقائق قليلة.
keywords:
  - التعداد
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
---

# التعداد / الجمع

## كيف يعمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال دالة `enu`، التي تربط مفاتيح محددة بالمحتوى المقابل لها. يمكن أن تمثل هذه المفاتيح قيمًا رقمية، أو نطاقات، أو معرفات مخصصة. عند استخدامها مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا بناءً على لغة التطبيق والقواعد المعرفة.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. فيما يلي مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة بديلة", // اختياري
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة بديلة", // اختياري
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة بديلة", // اختياري
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
        "fallback": "قيمة بديلة" // اختياري
      }
    }
  }
}
```

في هذا المثال، تقوم الدالة `enu` بربط شروط مختلفة بمحتوى محدد. عند استخدامها في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المعطى.

> ترتيب التصريحات مهم في تعداد Intlayer. أول تصريح صالح هو الذي سيتم اختياره. إذا كانت هناك شروط متعددة تنطبق، تأكد من ترتيبها بشكل صحيح لتجنب سلوك غير متوقع.

> إذا لم يتم إعلان قيمة بديلة (fallback)، ستُعيد الدالة `undefined` إذا لم تتطابق أي من المفاتيح.

## استخدام التعداد مع React Intlayer

لاستخدام التعداد في مكون React، يمكنك الاستفادة من الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف باسترجاع المحتوى الصحيح بناءً على المعرف المحدد. إليك مثالًا على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // الناتج: لا توجد سيارات
        }
      </p>
      <p>
        {
          numberOfCar(6) // الناتج: بعض السيارات
        }
      </p>
      <p>
        {
          numberOfCar(20) // الناتج: العديد من السيارات
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // الناتج: قيمة بديلة
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // الناتج: لا توجد سيارات
        }
      </p>
      <p>
        {
          numberOfCar(6) // الناتج: بعض السيارات
        }
      </p>
      <p>
        {
          numberOfCar(20) // الناتج: العديد من السيارات
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // الناتج: قيمة بديلة
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // الناتج: لا توجد سيارات
        }
      </p>
      <p>
        {
          numberOfCar(6) // الناتج: بعض السيارات
        }
      </p>
      <p>
        {
          numberOfCar(20) // الناتج: العديد من السيارات
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // الناتج: قيمة بديلة
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

في هذا المثال، يقوم المكون بضبط مخرجاته ديناميكيًا بناءً على عدد السيارات. يتم اختيار المحتوى الصحيح تلقائيًا، اعتمادًا على النطاق المحدد.

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أُطُر عمل متنوعة.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
