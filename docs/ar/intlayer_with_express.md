# البدء في تقديم الدعم متعدد اللغات (i18n) مع Intlayer و Express

`express-intlayer` هو وسيلة قوية لتقديم الدعم متعدد اللغات (i18n) لتطبيقات Express، مصممة لجعل خدماتك الخلفية متاحة عالميًا من خلال تقديم استجابات محلية مبنية على تفضيلات العميل.

## لماذا يجب تقديم الدعم متعدد اللغات للخلفية؟

يعد تقديم الدعم متعدد اللغات في الخلفية أمرًا أساسيًا لخدمة جمهور عالمي بشكل فعال. إنه يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر قابلية للوصول وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات الاستخدام العملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عندما يحدث خطأ، فإن عرض الرسائل باللغة الأم للمستخدم يحسن من الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التنبيهات أو النوافذ المنبثقة.

- **استرجاع المحتوى متعدد اللغات**: لتطبيقات سحب المحتوى من قاعدة بيانات، يضمن تقديم الدعم متعدد اللغات أنه يمكنك تقديم هذا المحتوى بعدة لغات. يعد هذا أمرًا بالغ الأهمية للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات وغير ذلك من المحتوى باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني تجارية، حملات تسويقية، أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من المشاركة والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة للتطبيقات المحمولة، فإن إرسال إشعارات دفع بلغة المفضل للمستخدم يمكن أن يعزز من التفاعل والاحتفاظ. يمكن أن تجعل هذه اللمسة الشخصية الإشعارات تبدو أكثر صلة وقابلة للتنفيذ.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، تنبيهات النظام، أو تحديثات واجهة المستخدم، تستفيد من كونها بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم العامة.

من خلال تقديم الدعم متعدد اللغات في الخلفية، يحترم تطبيقك الاختلافات الثقافية ولكنه أيضًا يتماشى بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية في توسيع خدماتك عالميًا.

## البدء

### التثبيت

للبدء في استخدام `express-intlayer`، قم بتثبيت الحزمة باستخدام npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### الإعداد

قم بتكوين إعدادات الدعم متعدد اللغات عن طريق إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### إعداد تطبيق Express

قم بإعداد تطبيق Express الخاص بك لاستخدام `express-intlayer`:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// تحميل معالج الطلبات الدولية
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المرتجع باللغة الإنجليزية",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "مثال على محتوى الخطأ المرتجع باللغة الإنجليزية",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => {
  console.info(`الاستماع على المنفذ 3000`);
});
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- `react-intlayer` لتطبيقات React
- `next-intlayer` لتطبيقات Next.js

كما أنه يعمل بسلاسة مع أي حل دعم متعدد اللغات عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو الكوكيز:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // خيارات التكوين الأخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

بشكل افتراضي، سيفسر `express-intlayer` رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، تفضل بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/concept/configuration).

## مدعوم من TypeScript

يستفيد `express-intlayer` من الإمكانيات القوية ل TypeScript لتعزيز عملية الدعم متعدد اللغات. يضمن التحديد الثابت لـ TypeScript أن يتم حساب كل مفتاح ترجمة، مما يقلل من خطر فقدان الترجمات ويحسن من قابلية الصيانة.

> تأكد من تضمين الأنواع الناتجة (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.
