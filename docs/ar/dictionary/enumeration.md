# التعداد / الجمع

## كيفية عمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال وظيفة `enu`، التي تقوم بإقران المفاتيح المحددة بمحتواها المقابل. هذه المفاتيح يمكن أن تمثل قيمًا رقمية، أو مدى، أو معرفات مخصصة. عند الاستخدام مع React Intlayer أو Next Intlayer، يتم تحديد المحتوى المناسب تلقائيًا بناءً على إعدادات اللغة والقواعد المعرّفة للتطبيق.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. هذا مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة الاستبدال", // اختياري
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
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة الاستبدال", // اختياري
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
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة الاستبدال", // اختياري
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
        "<-1": "أقل من سيارة واحدة بالسالب",
        "-1": "سيارة بالسالب",
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
        "fallback": "قيمة الاستبدال" // اختياري
      }
    }
  }
}
```

في هذا المثال، تقوم `enu` بإقران الشروط المختلفة بمحتواها الخاص. عند الاستخدام في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المقدم.

> ترتيب التعريف مهم في تعداد Intlayer. الشرط الأول الصالح هو الذي سيتم اختياره. إذا كانت عدة شروط تنطبق، تأكد من ترتيبها بشكل صحيح لتجنب السلوك غير المتوقع.

> إذا لم يتم تعريف بدل استبدالي، فإن الدالة ستعيد `undefined` إذا لم تتطابق أي مفاتيح.

## استخدام التعداد مع React Intlayer

لاستخدام التعداد في مكون React، يمكنك الاستفادة من وظيفة `useIntlayer` المأخوذة من مكتبة `react-intlayer`. هذه الدالة تسترجع المحتوى الصحيح بناءً على المعرف المحدد. إليك مثال على كيفية استخدامها:

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
          numberOfCar(0.01) // الناتج: قيمة الاستبدال
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
          numberOfCar(0.01) // الناتج: قيمة الاستبدال
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
          numberOfCar(0.01) // الناتج: قيمة الاستبدال
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

في هذا المثال، يقوم المكون بتعديل خروجه ديناميكيًا بناءً على عدد السيارات. يتم اختيار المحتوى الصحيح تلقائيًا، بناءً على النطاق المحدد.

## موارد إضافية

لمزيد من المعلومات التفصيلية حول الإعداد والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية عن الإعداد والاستخدام لـ Intlayer في بيئات مختلفة ومع إطار عمل مختلف.
