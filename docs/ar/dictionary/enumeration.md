# التعداد / التعدد

## كيف يعمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال دالة `enu`، التي تربط مفاتيح معينة بمحتواها المقابل. يمكن أن تمثل هذه المفاتيح قيمًا عددية، أو نطاقات، أو معرّفات مخصصة. عند استخدامها مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا بناءً على لغة التطبيق والقواعد المحددة.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. إليك مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة سلبية",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة سلبية",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة سلبية",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
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
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة سلبية",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات"
    }
  }
}
```

في هذا المثال، تقوم `enu` بتوصيل شروط مختلفة بمحتوى محدد. عند استخدامها في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المحدد.

## استخدام التعداد مع React Intlayer

لاستخدام التعداد في مكون React، يمكنك استخدام خطاف `useIntlayer` من حزمة `react-intlayer`. إليك مثال على كيفية استخدامه:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* الناتج: لا توجد سيارات */}
      <p>{content.numberOfCar(6)}</p> {/* الناتج: بعض السيارات */}
      <p>{content.numberOfCar(20)}</p> {/* الناتج: بعض السيارات */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* الناتج: لا توجد سيارات */}
      <p>{content.numberOfCar(6)}</p> {/* الناتج: بعض السيارات */}
      <p>{content.numberOfCar(20)}</p> {/* الناتج: بعض السيارات */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* الناتج: لا توجد سيارات */}
      <p>{content.numberOfCar(6)}</p> {/* الناتج: بعض السيارات */}
      <p>{content.numberOfCar(20)}</p> {/* الناتج: بعض السيارات */}
    </div>
  );
};

module.exports = CarComponent;
```

في هذا المثال، يعدل المكون مخرجاته ديناميكيًا بناءً على عدد السيارات. يتم اختيار المحتوى الصحيح تلقائيًا، اعتمادًا على النطاق المحدد.

## ملاحظات هامة

- ترتيب الإعلانات أمر حيوي في تعدادات Intlayer. أول إعلان صالح هو الذي سيتم اختياره.
- إذا كانت هناك شروط متعددة، فتأكد من ترتيبها بشكل صحيح لتجنب سلوك غير متوقع.

## أفضل الممارسات للتعداد

للتأكد من أن تعداداتك تعمل كما هو متوقع، اتبع هذه الممارسات الأفضل:

- **تسمية متسقة**: استخدم معرّفات واضحة ومتسقة لوحدات التعداد لتجنب الارتباك.
- **التوثيق**: قم بتوثيق مفاتيح التعداد والمخرجات المتوقعة لضمان الصيانة المستقبلية.
- **معالجة الأخطاء**: نفذ معالجة الأخطاء لإدارة الحالات التي لا يتم فيها العثور على تعداد صالح.
- **تحسين الأداء**: لتطبيقات كبيرة، قلل عدد امتدادات الملفات التي يتم مراقبتها لتحسين الأداء.

## الموارد الإضافية

للحصول على معلومات أكثر تفصيلًا حول الإعداد والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer في بيئات مختلفة ومع إطارات متعددة.
