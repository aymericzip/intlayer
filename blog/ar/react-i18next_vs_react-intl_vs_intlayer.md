# React-Intl VS React-i18next VS Intlayer | React Internationalization (i18n)

فيما يلي مقارنة موجزة بين ثلاثة مكتبات i18n (التدويل) الشهيرة لـ React: **React-Intl**، **React-i18next**، و **Intlayer**. كل مكتبة تقدم ميزات فريدة وتدفقات عمل لدمج الدعم المتعدد اللغات في تطبيق React الخاص بك. بعد قراءة هذا، يجب أن تكون قادرًا على تحديد الحل الذي يلبي احتياجاتك بشكل أفضل.

---

## 1. مقدمة

يمكن تحقيق التدويل (i18n) في تطبيقات React بعدة طرق. المكتبات الثلاث المقدمة هنا لديها فلسفات تصميم مختلفة، ومجموعات ميزات، ودعم من المجتمع:

1. **React-Intl**
2. **React-i18next**
3. **Intlayer**

فيما يلي، ستجد نظرة عامة على كل حل، تليها مقارنة للميزات، المزايا والعيوب، وحالات الاستخدام النموذجية.

---

## 2. React-Intl

### نظرة عامة

[**React-Intl**](https://formatjs.io/docs/react-intl/) هو جزء من مجموعة [FormatJS](https://formatjs.io/). يوفر مجموعة قوية من **واجهات برمجة التطبيقات والمكونات** لمعالجة تنسيق الرسائل، الجمع، تاريخ/وقت، وتنسيق الأرقام. يتم استخدام React-Intl على نطاق واسع في التطبيقات المؤسسية، Mainly because it is part of an ecosystem that standardizes message syntax and formatting.

### الميزات الرئيسية

- **BICU Message Syntax**: يوفر بناء جملة شامل للتداخل الرسائل، الجمع، وأكثر.
- **التنسيق المحلي**: أدوات مدمجة لتنسيق التواريخ، الأوقات، الأرقام، والأوقات النسبية بناءً على اللغة المحلية.
- **المكونات الإعلانية**: يكشف عن `<FormattedMessage>`, `<FormattedNumber>`, `<FormattedDate>`، إلخ، للاستخدام السلس في JSX.
- **إيكوسيستم غني**: يتكامل جيدًا مع أدوات FormatJS (مثل [babel-plugin-react-intl](https://formatjs.io/docs/tooling/babel-plugin/)) لاستخراج الرسائل وإدارتها وتجميعها.

### سير العمل النموذجي

1. **تعريف كُتيبات الرسائل** (عادةً ملفات JSON لكل لغة محلية).
2. **لف التطبيق** بـ `<IntlProvider locale="en" messages={messages}>`.
3. **استخدام** `<FormattedMessage id="myMessage" defaultMessage="Hello world" />` أو استخدام `useIntl()` للوصول إلى سلاسل الترجمة.

### المزايا

- راسخ للغاية ومستخدم في العديد من بيئات الإنتاج.
- تنسيق الرسائل المتقدم، بما في ذلك الجمع، الجنس، المناطق الزمنية، وأكثر.
- دعم أدوات قوي لاستخراج الرسائل وتجميعها.

### العيوب

- يتطلب إلمامًا بـ **ICU message format**، الذي قد يكون مطولاً.
- ليس من السهل التعامل مع الترجمات الديناميكية أو المعقدة التي تتجاوز مجرد النصوص.

---

## 3. React-i18next

### نظرة عامة

[**React-i18next**](https://react.i18next.com/) هو امتداد React لـ [i18next](https://www.i18next.com/)، واحدة من أشهر أطر العمل للـ i18n في JavaScript. يوفر **ميزات شاملة** للترجمات في وقت التشغيل، التحميل الكسول، واكتشاف اللغة، مما يجعله مرنًا للغاية لمجموعة واسعة من حالات الاستخدام.

### الميزات الرئيسية

- **هيكل ترجمة مرن**: غير مرتبط بتنسيق واحد مثل ICU. يمكنك تخزين الترجمات في JSON، واستخدام التداخل، والجمع، إلخ.
- **تبديل لغة ديناميكي**: مكونات الكشف عن اللغة المدمجة والتحديثات في وقت التشغيل.
- **ترجمات متداخلة ومهيكلة**: يمكنك بسهولة تداخل الترجمات ضمن JSON.
- **نظام إضافات شاملة**: للكشف (المتصفح، المسار، المجال الفرعي، إلخ)، وتحميل الموارد، والتخزين المؤقت، وأكثر.

### سير العمل النموذجي

1. **تثبيت `i18next` و `react-i18next`.**
2. **تكوين i18n** لتحميل الترجمات (JSON) وإعداد اكتشاف اللغة أو الاحتياطي.
3. **لف التطبيق** بـ `I18nextProvider`.
4. **استخدم `useTranslation()`** أو مكون `<Trans>` لعرض الترجمات.

### المزايا

- مرونة شديدة ومليئة بالميزات.
- مجتمع نشط للغاية ونظام بيئي كبير من الإضافات.
- سهولة **التحميل الديناميكي** للترجمات (مثلًا، من خادم، حسب الطلب).

### العيوب

- **يمكن أن تكون التكوينات مطولة**، خاصةً إذا كانت لديك احتياجات أكثر تقدمًا.
- إذا كنت تفضل الترجمات المTyped، قد تحتاج إلى إعدادات TypeScript إضافية.

---

## 4. Intlayer

### نظرة عامة

[**Intlayer**](https://github.com/aymericzip/intlayer) هو مكتبة i18n مفتوحة المصدر أحدث تركز على **إعلانات المحتوى على مستوى المكونات**، سلامة النوع، و**التوجيه الديناميكي**. مصممة لتدفقات عمل React الحديثة، تدعم كل من **Create React App** و **Vite**. كما تحتوي على ميزات متقدمة مثل **التوجيه المستند إلى اللغة المحلية** و **أنواع TypeScript التي يتم إنشاؤها تلقائيًا** للترجمات.

### الميزات الرئيسية

- **ملفات المحتوى الإعلانية**: يمكن لكل مكون أو وحدة إعلان ترجمته في ملفات `.content.tsx` أو `.content.json` مخصصة، مما يبقي المحتوى قريبًا من حيث تم استخدامه.
- **التوجيه & برامج الوسيط المدمجة**: وحدات اختيارية للتوجيه المحلي (مثل `/en/about`، `/fr/about`) وبرامج الوسيط على الخادم للكشف عن لغة المستخدم.
- **أنواع TypeScript المولدة تلقائيًا**: تضمن سلامة النوع مع ميزات مثل الإكمال التلقائي وكشف الأخطاء في وقت التجميع.
- **ترجمات ديناميكية وغنية**: يمكن أن تتضمن JSX/TSX في الترجمات لحالات الاستخدام الأكثر تعقيدًا (مثل الروابط، النص الجريء، الأيقونات في الترجمات).

### سير العمل النموذجي

1. **تثبيت `intlayer` و `react-intlayer`.**
2. **إنشاء `intlayer.config.ts`** لتعريف اللغات المتاحة واللغة الافتراضية.
3. **استخدم Intlayer CLI** أو الإضافات لت **ترتيب** إعلانات المحتوى.
4. **لف التطبيق** بـ `<IntlayerProvider>` واسترد المحتوى باستخدام `useIntlayer("keyName")`.

### المزايا

- **مناسب لـ TypeScript** مع إنشاء الأنواع المدمجة وكشف الأخطاء.
- **محتوى غني** ممكن (مثل تمرير عقد React كترجمات).
- **التوجيه المستند إلى اللغة** خارج الصندوق.
- متكامل مع أدوات البناء الشهيرة (CRA، Vite) لتسهيل الإعداد.

### العيوب

- لا يزال **نسبيًا جديدًا** مقارنةً بـ React-Intl أو React-i18next.
- تركيز أكبر على نهج "إعلان محتوى على مستوى المكونات" - قد تكون هذه تغيرًا عن كتالوجات .json التقليدية.
- مجتمع أصغر ونظام بيئي مقارنة بالمكتبات الأكثر رسوخًا.

---

## 5. مقارنة الميزات

| **السمة**                       | **React-Intl**                                                         | **React-i18next**                                                                                  | **Intlayer**                                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **حالة الاستخدام الرئيسية**      | الترجمات المعتمدة على النصوص، تنسيق التاريخ/الرقم، بناء جملة ICU   | i18n كامل المميزات مع تبديل ديناميكي سهل، تداخل، نظام إضافات                                     | ترجمات آمنة من النوع مع التركيز على المحتوى الإعلاني، التوجيه المحلي، والبرامج الوسيطة على الخادم الاختياري             |
| **النهج**                       | استخدم `<IntlProvider>` ومكونات رسالة FormatJS                       | استخدم `I18nextProvider` و `useTranslation()` hook                                                 | استخدم `<IntlayerProvider>` و `useIntlayer()` hook مع إعلانات المحتوى                                                      |
| **تنسيق الترجمة**               | سلاسل بناء جملة تعتمد على ICU (كتالوجات JSON أو JavaScript)          | ملفات موارد JSON (أو محملات مخصصة). تنسيق ICU اختياري عبر مكون i18next                            | إعلانات `.content.[ts/js/tsx]` أو JSON؛ يمكن أن تحتوي على سلاسل أو مكونات React                                           |
| **التوجيه**                     | يتم التعامل معه خارجيًا (لا يوجد توجيه محلي مدمج)                    | يتم التعامل معه خارجيًا مع إضافات i18next (الكشف عن المسار، المجالات الفرعية، إلخ)                    | دعم التوجيه المحلي المدمج (مثل `/en/about`، `/fr/about`)، بالإضافة إلى برامج الوسيط الاختيارية (لـ SSR/Vite)             |
| **دعم TypeScript**              | جيد (أنواع للحزم الرسمية)                                             | جيد ولكن تكوين إضافي للترجمات المعينة إذا كنت ترغب في التحقق الصارم                              | ممتاز (تعريفات نوعية مولدة تلقائيًا لمفاتيح المحتوى والترجمات)                                                             |
| **العدد الجمعي والتنسيق**       | متقدم: تنسيق التاريخ/الوقت/الرقم المدمج، دعم الجمع/الجنس             | الجمع القابل للتكوين. عادةً ما يتم تنسيق التاريخ/الوقت عبر مكتبات خارجية أو مكون i18next           | يمكن الاعتماد على JavaScript Intl القياسي أو دمج المنطق في المحتوى. ليست متخصصة كما هو الحال في FormatJS، ولكنها تتعامل مع الحالات النموذجية. |
| **المجتمع والنظام البيئي**       | كبير، جزء من نظام FormatJS                                          | كبير جدًا، نشط للغاية، الكثير من الإضافات (الكشف، التخزين المؤقت، الأطر)                         | أصغر ولكن ينمو؛ مفتوح المصدر، نهج حديث                                                                                  |
| **منحنى التعلم**               | معتدل (تعلم بناء جملة ICU، تقاليد FormatJS)                         | منخفض إلى معتدل (استخدام مباشر، ولكن التكوين المتقدم قد يصبح مطولًا)                             | معتدل (مفهوم إعلانات المحتوى وخطوات البناء المتخصصة)                                                                        |

---

## 6. متى يجب اختيار كل منها

1. **React-Intl**

   - تحتاج إلى **تنسيق قوي** للتواريخ/الأوقات/الأرقام و**بناء جملة ICU** قوية.
   - تفضل نهجًا أكثر "**استنادًا إلى المعايير**" للترجمات.
   - لا تحتاج إلى توجيه محلي أو مفاتيح ترجمة ذات نوع محدد.

2. **React-i18next**

   - تحتاج إلى حل **مرن، راسخ** مع تحميل **ديناميكي** و**عند الطلب** للترجمة.
   - تريد كشف لغة قائم على الإضافات (مثلًا، من عنوان URL، ملفات تعريف الارتباط، التخزين المحلي) أو تخزين مؤقت متقدم.
   - تحتاج إلى أكبر نظام بيئي، مع العديد من التكاملات الموجودة لأطر العمل المتنوعة (Next.js، React Native، إلخ).

3. **Intlayer**
   - تريد تكامل **TypeScript** قوي مع _أنواع يتم إنشاؤها تلقائيًا_، مما يضمن أنك نادرًا ما تفوت مفتاح ترجمة.
   - تفضل **محتوى إعلاني** قريب من المكون، مع احتمال تضمين عقد React أو منطق متقدم في الترجمات.
   - تتطلب **توجيه محلي مدمج** أو ترغب في دمجه بسهولة في إعداد SSR أو Vite.
   - ترغب في نهج حديث أو تريد ببساطة مكتبة واحدة تغطي كل من **إدارة المحتوى** (i18n) و**التوجيه** بطريقة آمنة من حيث النوع.

---

## 7. خلاصة

كل مكتبة تقدم حلاً قويًا لتدويل تطبيق React:

- **React-Intl** تتفوق في تنسيق الرسائل وهي خيار شائع للحلول المؤسسية التي تركز على بناء جملة ICU الخاصة بالرسائل.
- **React-i18next** يوفر بيئة مرنة للغاية تعتمد على الإضافات لاحتياجات i18n المتقدمة أو الديناميكية.
- **Intlayer** تقدم نهجًا **حديثًا وسريع النوع** يجمع بين إعلانات المحتوى، التوجيه المحلي المتقدم، والتكاملات المستندة إلى الإضافات (CRA، Vite).

اختيارك يعتمد إلى حد كبير على متطلبات المشروع، التجربة المطلوبة للمطور (DX)، ومدى أهمية ترجمات النوع أو التوجيه المتقدم. إذا كنت تقدر التوجيه المحلي المدمج وتكامل TypeScript، فقد تكون **Intlayer** هي الأكثر جاذبية. إذا كنت تريد حلاً مثبتًا وموثوقًا، فإن **React-i18next** هو خيار رائع. للاحتياجات المباشرة المبنية على ICU، فإن **React-Intl** هو خيار موثوق.

---

### قراءة إضافية

- [React-Intl Documentation](https://formatjs.io/docs/react-intl/)
- [React-i18next Documentation](https://react.i18next.com/)
- [Intlayer + CRA Getting Started Guide](/ar/)
- [Intlayer + Vite & React Getting Started Guide](/ar/)

يمكنك الاستفادة من دمج ومطابقة النهج لتناسب متطلباتك - لا يوجد حل "يصلح للجميع"، وكل مكتبة تستمر في التطور لمعالجة حالات الاستخدام الجديدة في نظام React البيئي.