# وثائق إنتلاير

مرحبًا بك في الوثائق الرسمية لـ **إنتلاير**! هنا، ستجد كل ما تحتاجه لدمج، إعداد، وإتقان إنتلاير لتلبية جميع احتياجاتك للتدويل (i18n)—سواء كنت تعمل مع **Next.js**، **React**، **Vite**، **Express**، أو بيئة JavaScript أخرى.

يوفر إنتلاير نهجًا مرنًا وحديثًا لترجمة تطبيقك. ستوجهك وثائقنا من التثبيت والإعداد إلى الميزات المتقدمة مثل **الترجمة المدعومة بالذكاء الاصطناعي**، **تعريفات TypeScript**، ودعم **مكونات الخادم**—مما يمكنك من خلق تجربة متعددة اللغات سلسة.

---

## البدء

- **[مقدمة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/introduction.md)**  
  احصل على نظرة عامة حول كيفية عمل إنتلاير، ميزاته الأساسية، ولماذا يُعتبر تغييرًا لقواعد اللعبة في مجال العولمة.

- **[كيف يعمل إنتلاير](https://github.com/aymericzip/intlayer/blob/main/docs/ar/how_works_intlayer.md)**  
  استمتع بتفاصيل التصميم المعماري وتعرف على كيفية تعامل إنتلاير مع كل شيء من إعلان المحتوى إلى تسليم الترجمة.

- **[الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)**  
  قم بتخصيص إنتلاير لتلبية احتياجات مشروعك. استكشف خيارات البرمجيات الوسيطة، هياكل المجلدات، والإعدادات المتقدمة.

- **[واجهة الأوامر لإنتلاير](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)**  
  قم بإدارة المحتوى والترجمات باستخدام أدوات سطر الأوامر الخاصة بنا. اكتشف كيفية دفع وسحب المحتوى، وأتمتة الترجمات، والمزيد.

- **[محرر إنتلاير](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md)**  
  بسّط التعاون مع غير المطورين وزوّد ترجماتك بالذكاء الاصطناعي—مباشرة في نظام إدارة المحتوى المجاني وسهل الاستخدام لدينا.

---

## المفاهيم الأساسية

### إعلان المحتوى

نظّم محتواك متعدد اللغات قريبًا من كودك للحفاظ على كل شيء متسقًا وقابلًا للصيانة.

- **[ابدأ](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)**  
  تعرف على أساسيات إعلان المحتوى في إنتلاير.

- **[الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/translation.md)**  
  افهم كيفية إنشاء الترجمات، تخزينها، واستخدامها في تطبيقك.

- **[التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/enumeration.md)**  
  إدارة مجموعات البيانات المتكررة أو الثابتة بسهولة عبر لغات متعددة.

- **[استرجاع الدوال](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/function_fetching.md)**  
  انظر كيفية استرجاع المحتوى ديناميكيًا مع منطق مخصص ليتناسب مع سير عمل مشروعك.

---

## البيئات والتكاملات

لقد تم بناء إنتلاير مع مراعاة المرونة، مما يوفر تكاملاً سلسًا عبر الأطر الشائعة وأدوات البناء:

- **[إنتلاير مع Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)**
- **[إنتلاير مع Next.js 14 (موجه التطبيق)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md)**
- **[إنتلاير مع موجه صفحة Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md)**
- **[إنتلاير مع React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)**
- **[إنتلاير مع Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)**
- **[إنتلاير مع Express](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_express.md)**

تشمل كل دليل تكامل أفضل الممارسات لاستخدام ميزات إنتلاير—مثل **التصيير على جانب الخادم**، **التوجيه الديناميكي**، أو **التصيير على جانب العميل**—حتى تتمكن من الحفاظ على تطبيق سريع وصديق لمحركات البحث وعالي القابلية للتوسع.

---

## الحزم

يقدم التصميم المعياري لإنتلاير حزمًا مخصصة لبيئات واحتياجات محددة:

### `intlayer`

وظائف مساعدة أساسية لتكوين وإدارة إعداد i18n الخاص بك.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

استفد من إنتلاير داخل تطبيقات **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/express-intlayer/t.md)**  
  مساعد ترجمة بسيط وسهل لطرق خادمك وعرضك.

### `react-intlayer`

عزز تطبيقات **React** الخاصة بك باستخدام هوكات قوية:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

قم بالتكامل السلس مع **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md)**

---

## موارد إضافية

- **[مدونة: إنتلاير و i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_i18next.md)**  
  تعرف على كيفية تكامل إنتلاير ومقارنته بمكتبة **i18next** الشهيرة.

- **[درس مباشر على يوتيوب](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  شاهد عرضًا شاملًا وتعلم كيفية دمج إنتلاير في الوقت الفعلي.

---

## المساهمة والتعليقات

نحن نقدر قوة المصدر المفتوح والتطوير المدفوع من المجتمع. إذا كنت ترغب في اقتراح تحسينات، أو إضافة دليل جديد، أو تصحيح أي مشاكل في وثائقنا، فلا تتردد في تقديم طلب سحب أو فتح مشكلة على **مستودع GitHub** الخاص بنا.

**هل أنت مستعد لترجمة تطبيقك بشكل أسرع وأكثر كفاءة؟** ابدأ في استخدام إنتلاير اليوم من خلال وثائقنا. اختبر نهجًا قويًا وسلسًا للتدويل يحافظ على تنظيم المحتوى الخاص بك وزيادة إنتاجية فريقك.

ترجمة سعيدة!  
— فريق إنتلاير
