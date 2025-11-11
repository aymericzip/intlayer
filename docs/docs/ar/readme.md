<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="شعار Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> إنتلاير: مجموعة أدوات مفتوحة المصدر ومرنة للترجمة الدولية مع ترجمة مدعومة بالذكاء الاصطناعي ونظام إدارة محتوى.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">الوثائق</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">نظام إدارة المحتوى</a> •
  <a href="https://discord.gg/7uxamYVeCk">ديسكورد</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="إصدار npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="نجوم GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="التحميلات الشهرية" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="الرخصة"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="آخر تحديث"/>
  </a>
</p>

![شاهد الفيديو](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/ابدأ-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## ما هو Intlayer؟

معظم مكتبات التدويل (i18n) إما معقدة جدًا، أو جامدة جدًا، أو غير مصممة للأُطُر الحديثة.

Intlayer هو **حل تدويل حديث** لتطبيقات الويب والهاتف المحمول.  
إنه مستقل عن الأُطُر، **مدعوم بالذكاء الاصطناعي**، ويشمل **نظام إدارة محتوى ومحرر بصري مجاني**.

مع **ملفات محتوى لكل لغة/منطقة**، و**إكمال تلقائي لـ TypeScript**، و**قواميس قابلة للتقليل (tree-shakable)**، و**تكامل CI/CD**، يجعل Intlayer التدويل **أسرع وأنظف وأكثر ذكاءً**.

## الفوائد الرئيسية لـ Intlayer:

| الميزة                                                                                                                                           | الوصف                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="ميزة" width="700">                          | **دعم عبر الأُطُر المتعددة**<br><br>يتوافق Intlayer مع جميع الأُطُر والمكتبات الرئيسية، بما في ذلك Next.js وReact وVite وVue.js وNuxt وPreact وExpress والمزيد.                                                                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="ميزة" width="700">       | **إدارة المحتوى مدعومة بجافا سكريبت**<br><br>استفد من مرونة جافا سكريبت لتعريف وإدارة محتواك بكفاءة. <br><br> - [إعلان المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="ميزة" width="700"> | **ملف إعلان المحتوى لكل لغة**<br><br>سرّع عملية تطويرك من خلال إعلان محتواك مرة واحدة، قبل التوليد التلقائي.<br><br> - [ملف إعلان المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="ميزة" width="700">                      | **بيئة آمنة من حيث النوع**<br><br>استفد من TypeScript لضمان أن تعريفات المحتوى والكود الخاص بك خالية من الأخطاء، مع الاستفادة أيضًا من الإكمال التلقائي في بيئة التطوير المتكاملة (IDE).<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="ميزة" width="700">                         | **إعداد مبسط**<br><br>ابدأ بسرعة مع أقل قدر من التكوين. قم بضبط الإعدادات الخاصة بالتدويل، التوجيه، الذكاء الاصطناعي، البناء، وإدارة المحتوى بسهولة.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="ميزة" width="700">                   | **استرجاع المحتوى المبسط**<br><br>لا حاجة لاستدعاء دالة `t` لكل جزء من المحتوى. استرجع كل محتواك مباشرة باستخدام هوك واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="ميزة" width="700">                    | **تنفيذ متسق لمكونات الخادم**<br><br>مناسب تمامًا لمكونات الخادم في Next.js، استخدم نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                        | **قاعدة شفرة منظمة**<br><br>حافظ على تنظيم قاعدة الشفرة الخاصة بك بشكل أفضل: مكون واحد = قاموس واحد في نفس المجلد. الترجمات قريبة من مكوناتها الخاصة، مما يعزز سهولة الصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="ميزة" width="700">                         | **توجيه محسّن**<br><br>دعم كامل لتوجيه التطبيقات، يتكيف بسلاسة مع هياكل التطبيقات المعقدة، لـ Next.js و React و Vite و Vue.js، وغيرها.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                         | **دعم ماركداون**<br><br>استيراد وتفسير ملفات اللغة وملفات ماركداون عن بُعد للمحتوى متعدد اللغات مثل سياسات الخصوصية، الوثائق، وغيرها. تفسير وجعل بيانات التعريف الخاصة بماركداون متاحة في كودك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                    | **محرر مرئي مجاني ونظام إدارة محتوى**<br><br>يتوفر محرر مرئي مجاني ونظام إدارة محتوى لكتاب المحتوى، مما يلغي الحاجة إلى منصة تعريب. حافظ على تزامن محتواك باستخدام Git، أو قم بإخراجه كليًا أو جزئيًا باستخدام نظام إدارة المحتوى.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [نظام إدارة محتوى Intlayer](https://intlayer.org/doc/concept/cms)                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                           | **محتوى قابل للتقليل حسب الاستخدام**<br><br>محتوى قابل للتقليل حسب الاستخدام، مما يقلل من حجم الحزمة النهائية. يقوم بتحميل المحتوى لكل مكون، مستبعدًا أي محتوى غير مستخدم من الحزمة الخاصة بك. يدعم التحميل الكسول لتحسين كفاءة تحميل التطبيق. <br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="ميزة" width="700">                    | **التصيير الثابت**<br><br>لا يعيق التصيير الثابت. <br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                   | **الترجمة المدعومة بالذكاء الاصطناعي**<br><br>حوّل موقعك الإلكتروني إلى 231 لغة بنقرة واحدة فقط باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer باستخدام مزود الذكاء الاصطناعي / مفتاح API الخاص بك. <br><br> - [التكامل مع CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [واجهة سطر الأوامر Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [الملء التلقائي](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                              | **تكامل خادم MCP**<br><br>يوفر خادم MCP (بروتوكول سياق النموذج) لأتمتة بيئة التطوير المتكاملة (IDE)، مما يتيح إدارة المحتوى بسلاسة وسير عمل التدويل (i18n) مباشرة داخل بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="الميزة" width="700">                  | **امتداد VSCode**<br><br>يوفر Intlayer امتدادًا لـ VSCode لمساعدتك في إدارة المحتوى والترجمات الخاصة بك، بناء قواميسك، ترجمة المحتوى الخاص بك، والمزيد. <br><br> - [امتداد VSCode](https://intlayer.org/doc/ar/vs-code-extension)                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                 | **التشغيل البيني**<br><br>يسمح بالتشغيل البيني مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                             |

---

## 📦 التثبيت

ابدأ رحلتك مع Intlayer اليوم واختبر نهجًا أكثر سلاسة وقوة في التدويل.

<a href="https://intlayer.org/doc/ar/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ بداية سريعة (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> احصل على الدليل الكامل → </a>

## 🎥 درس مباشر على يوتيوب

[![كيفية تعريب تطبيقك باستخدام Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## جدول المحتويات

استكشف وثائقنا الشاملة للبدء مع Intlayer وتعلم كيفية دمجه في مشاريعك.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 ابدأ الآن</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">لماذا Intlayer؟</a></li>
  <li><a href="https://intlayer.org/doc">مقدمة</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ المفهوم</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">كيف يعمل Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">الإعدادات</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">مزود الذكاء الاصطناعي</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">واجهة سطر الأوامر Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">محرر Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">نظام إدارة المحتوى Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">القاموس</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">ملف إعلان المحتوى لكل لغة</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">الترجمة</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">التعداد</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">الشرط</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">التداخل</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">ماركداون</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">جلب الدوال</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">الإدراج</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">الملف</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 البيئة</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">إنتلاير مع Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (موجه التطبيق)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js موجه الصفحات</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">بدء Tanstack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">أنجولار</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">إكسبريس</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">نيست جي إس</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 مدونة</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/what_is_internationalization.md">ما هو التدويل (i18n)</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">التدويل وتحسين محركات البحث (SEO)</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">إنتلاير و i18next مع Next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">إنتلاير و react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">إنتلاير و next-intl</a></li>
</ul>
</details>

## 🌐 ملف README بلغات أخرى

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 المجتمع

تم بناء Intlayer مع المجتمع ومن أجله، ونحن نحب أن نسمع آرائكم!

- هل لديك اقتراح؟ [افتح تذكرة مشكلة](https://github.com/aymericzip/intlayer/issues)
- هل وجدت خطأ أو تحسين؟ [قدّم طلب سحب](https://github.com/aymericzip/intlayer/pulls)
- هل تحتاج إلى مساعدة أو ترغب في التواصل؟ [انضم إلى ديسكورد الخاص بنا](https://discord.gg/7uxamYVeCk)

يمكنك أيضًا متابعتنا على:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="ديسكورد Intlayer" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="لينكدإن Intlayer" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="فيسبوك Intlayer" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="إنستغرام Intlayer" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="إكس Intlayer" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="يوتيوب Intlayer" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="تيك توك Intlayer" height="30"/></a>
      <br>
    </p>
</div>

### المساهمة

لمزيد من الإرشادات التفصيلية حول المساهمة في هذا المشروع، يرجى الرجوع إلى ملف [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). يحتوي الملف على معلومات أساسية حول عملية التطوير لدينا، وقواعد كتابة رسائل الالتزام، وإجراءات الإصدار. مساهماتكم ذات قيمة بالنسبة لنا، ونحن نقدر جهودكم في تحسين هذا المشروع!

### شكراً على الدعم

إذا أعجبك Intlayer، امنحنا ⭐ على GitHub. هذا يساعد الآخرين على اكتشاف المشروع!

[![مخطط تاريخ النجوم](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
