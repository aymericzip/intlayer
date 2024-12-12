# وثائق Intlayer

مرحبًا بكم في وثائق Intlayer. يوفر هذا الدليل نظرة عامة على Intlayer وميزاته الرئيسية وكيفية استخدام هذه الوثائق بشكل فعال لتعزيز تجربتك في التطوير.

## مقدمة

### ما هو Intlayer؟

**Intlayer** هي مكتبة دولية مصممة خصيصًا لمطوري JavaScript. تسمح بالإعلان عن المحتوى الخاص بك في كل مكان في الكود الخاص بك. تقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة للتكامل بسهولة في كودك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

تقدم Intlayer أيضًا محررًا بصريًا اختياريًا يسمح لك بتحرير وإدارة المحتوى الخاص بك بسهولة. يعد هذا المحرر مفيدًا بشكل خاص للمطورين الذين يفضلون واجهة بصرية لإدارة المحتوى، أو للفرق التي تولد المحتوى دون الحاجة للقلق بشأن الكود.

## مثال على الاستخدام

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### الميزات الرئيسية

تقدم Intlayer مجموعة متنوعة من الميزات المصممة لتلبية احتياجات تطوير الويب الحديث. فيما يلي الميزات الرئيسية، مع روابط للوثائق التفصيلية لكل منها:

- **دعم التدويل**: عزز مدى تطبيقك العالمي مع دعم مدمج للتدويل.
- **محرر بصري**: تحسين سير عمل تطويرك مع ملحقات المحرر المصممة لـ Intlayer. تحقق من [دليل المحرر البصري](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).
- **مرونة التكوين**: تخصيص إعدادك مع خيارات التكوين الكثيرة الموضحة في [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
- **أدوات CLI المتقدمة**: إدارة مشاريعك بكفاءة باستخدام واجهة سطر الأوامر الخاصة بـ Intlayer. استكشف الإمكانيات في [وثائق أدوات CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).
- **التوافق مع i18n**: تعمل Intlayer بسلاسة مع مكتبات التدويل الأخرى. تحقق من [دليل i18n](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_i18next.md) لمزيد من المعلومات.

### الأنظمة الأساسية المدعومة

تم تصميم Intlayer للعمل بسلاسة مع تطبيقات Next.js وReact. كما تدعم Vite وCreate React App.

- **تكامل Next.js**: استخدم قوة Next.js ضمن Intlayer للتقديم من جانب الخادم وتوليد المواقع الثابتة. تفاصيل متاحة في [دليل تكامل Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).
- **تكامل Vite وReact**: استغل Vite ضمن Intlayer للتقديم من جانب الخادم وتوليد المواقع الثابتة. تفاصيل متاحة في [دليل تكامل Vite وReact](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).
- **تكامل Create React App**: استخدم قوة Create React App ضمن Intlayer للتقديم من جانب الخادم وتوليد المواقع الثابتة. تفاصيل متاحة في [دليل تكامل Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### كيفية استخدام هذه الوثائق

للحصول على أقصى استفادة من هذه الوثائق:

1. **التنقل إلى الأقسام ذات الصلة**: استخدم الروابط المقدمة أعلاه للانتقال مباشرة إلى الأقسام التي تعالج احتياجاتك.
2. **أمثلة تفاعلية**: حيثما أمكن، استخدم الأمثلة التفاعلية لرؤية كيفية عمل الميزات في الوقت الحقيقي.
3. **الملاحظات والمساهمات**: ملاحظاتك مهمة. إذا كان لديك اقتراحات أو تصحيحات، يرجى النظر في المساهمة في الوثائق.
