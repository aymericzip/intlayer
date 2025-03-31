# Intlayer وثائق

مرحبًا بكم في الوثائق الرسمية لـ **Intlayer**! هنا، ستجد كل ما تحتاجه لتكامل، تكوين، وإتقان Intlayer لتلبية جميع احتياجاتك في التدويل (i18n)، سواء كنت تعمل مع **Next.js**، **React**، **Vite**، **Express**، أو بيئة JavaScript أخرى.

يقدم Intlayer نهجًا مرنًا وحديثًا لترجمة تطبيقك. ستوجهك وثائقنا من التثبيت والإعداد إلى الميزات المتقدمة مثل **الترجمة المدعومة بالذكاء الاصطناعي**، تعريفات **TypeScript**، ودعم **مكونات الخادم**, مما يمكنك من إنشاء تجربة متعددة اللغات بسلاسة.

---

## البدء

- **[المقدمة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/introduction.md)**  
  احصل على نظرة عامة حول كيفية عمل Intlayer، ميزاته الأساسية، ولماذا يُعتبر تغييرًا جذريًا في مجال i18n.

- **[كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/how_works_intlayer.md)**  
  تعمق في التصميم المعماري وتعرف على كيفية تعامل Intlayer مع كل شيء بدءًا من إعلان المحتوى إلى تسليم الترجمة.

- **[التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)**  
  قم بتخصيص Intlayer لتلبية احتياجات مشروعك. استكشف خيارات الوسيط، هياكل الدليل، والإعدادات المتقدمة.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)**  
  إدارة المحتوى والترجمات باستخدام أداة سطر الأوامر الخاصة بنا. اكتشف كيفية دفع وسحب المحتوى، أتمتة الترجمات، والمزيد.

- **[محرر Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md)**  
  تبسيط التعاون مع غير المطورين وتعزيز ترجماتك باستخدام الذكاء الاصطناعي, مباشرة في نظام إدارة المحتوى المجاني والبديهي الخاص بنا.

---

## المفاهيم الأساسية

### القاموس

نظم المحتوى متعدد اللغات بالقرب من الكود الخاص بك للحفاظ على كل شيء متسقًا وسهل الصيانة.

- **[ابدأ](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)**  
  تعلم أساسيات إعلان المحتوى في Intlayer.

- **[الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/translation.md)**  
  فهم كيفية إنشاء الترجمات وتخزينها واستخدامها في تطبيقك.

- **[التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/enumeration.md)**  
  إدارة مجموعات البيانات المتكررة أو الثابتة بسهولة عبر لغات مختلفة.

- **[جلب الوظائف](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/function_fetching.md)**  
  تعرف على كيفية جلب المحتوى ديناميكيًا باستخدام منطق مخصص ليتناسب مع سير عمل مشروعك.

---

## البيئات والتكاملات

تم تصميم Intlayer مع مراعاة المرونة، مما يوفر تكاملًا سلسًا عبر الأطر وأدوات البناء الشهيرة:

- **[Intlayer مع Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)**
- **[Intlayer مع Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md)**
- **[Intlayer مع Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md)**
- **[Intlayer مع React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)**
- **[Intlayer مع Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)**
- **[Intlayer مع Express](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_express.md)**

تتضمن كل دليل تكامل أفضل الممارسات لاستخدام ميزات Intlayer, مثل **التصيير من جانب الخادم**، **التوجيه الديناميكي**، أو **التصيير من جانب العميل**, حتى تتمكن من الحفاظ على تطبيق سريع، صديق لمحركات البحث، وقابل للتوسع بشكل كبير.

---

## الحزم

يقدم التصميم المعياري لـ Intlayer حزمًا مخصصة لبيئات واحتياجات محددة:

### `intlayer`

وظائف الأداة الأساسية لتكوين وإدارة إعداد i18n الخاص بك.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

استخدم Intlayer داخل تطبيقات **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/express-intlayer/t.md)**  
  مساعد ترجمة بسيط ومباشر لمسارات الخادم والعروض.

### `react-intlayer`

عزز تطبيقات **React** الخاصة بك باستخدام الخطافات القوية:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

تكامل سلس مع **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md)**

---

## موارد إضافية

- **[مدونة: Intlayer و i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_i18next.md)**  
  تعرف على كيفية تكامل Intlayer ومقارنته مع مكتبة **i18next** الشهيرة.

- **[درس مباشر على YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  شاهد عرضًا توضيحيًا شاملًا وتعلم كيفية دمج Intlayer في الوقت الفعلي.

---

## المساهمة والتغذية الراجعة

نحن نقدر قوة المصادر المفتوحة والتطوير القائم على المجتمع. إذا كنت ترغب في اقتراح تحسينات، إضافة دليل جديد، أو تصحيح أي مشكلات في وثائقنا، فلا تتردد في تقديم طلب سحب أو فتح مشكلة على [مستودع GitHub الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs).

**هل أنت مستعد لترجمة تطبيقك بشكل أسرع وأكثر كفاءة؟** ابدأ في استخدام Intlayer اليوم من خلال الاطلاع على وثائقنا. استمتع بنهج قوي ومنظم للتدويل يحافظ على محتواك منظمًا وفريقك أكثر إنتاجية.

ترجمة سعيدة!  
, فريق Intlayer
