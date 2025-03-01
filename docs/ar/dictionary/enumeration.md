# التعداد / الجمع

## كيف يعمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال وظيفة `enu`، التي تربط المفاتيح المحددة بمحتواها المقابل. يمكن أن تمثل هذه المفاتيح قيمًا رقمية، أو نطاقات، أو معرفات مخصصة. عند استخدامها مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا بناءً على لغة التطبيق والقواعد المحددة.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. إليك مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة افتراضية", // اختياري
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
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة افتراضية", // اختياري
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
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة افتراضية", // اختياري
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
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
        "fallback": "قيمة افتراضية" // اختياري
      }
    }
  }
}
```

في هذا المثال، تقوم `enu` بربط الشروط المختلفة بمحتوى محدد. عند استخدامها في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المعطى.

> ترتيب التصريحات مهم في تعدادات Intlayer. أول تصريح صالح هو الذي سيتم اختياره. إذا كانت هناك شروط متعددة تنطبق، تأكد من ترتيبها بشكل صحيح لتجنب سلوك غير متوقع.

> إذا لم يتم تحديد قيمة افتراضية، فستعيد الوظيفة `undefined` إذا لم تتطابق أي مفاتيح.

## استخدام التعداد مع React Intlayer

لاستخدام التعداد في مكون React، يمكنك الاستفادة من الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف باسترجاع المحتوى الصحيح بناءً على المعرف المحدد. إليك مثال على كيفية استخدامه:

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
          numberOfCar(0.01) // الناتج: قيمة افتراضية
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
          numberOfCar(0.01) // الناتج: قيمة افتراضية
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
          numberOfCar(0.01) // الناتج: قيمة افتراضية
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

في هذا المثال، يقوم المكون بضبط مخرجاته ديناميكيًا بناءً على عدد السيارات. يتم اختيار المحتوى الصحيح تلقائيًا، اعتمادًا على النطاق المحدد.

## موارد إضافية

لمزيد من المعلومات التفصيلية حول الإعداد والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد مزيدًا من الأفكار حول الإعداد والاستخدام لـ Intlayer في بيئات مختلفة ومع أطر عمل متنوعة.
