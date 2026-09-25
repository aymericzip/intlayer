<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.webp" width="60%" alt="Логотип Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong>i18n для кожного компонента</strong>
</h1>
<h2 align="center">
  <strong>Переклад на основі AI. Візуальний редактор. Багатомовна CMS.</strong>
</h2>

<br />

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md" rel="">Docs</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md" rel="">Next.js</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md" rel="">React + Vite</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="Версія npm" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Зірки GitHub" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Щомісячні завантаження" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Ліцензія"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="останній коміт"/>
  </a>
</p>

![Перегляньте відео](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/Почати-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Що таке Intlayer?

Більшість бібліотек для i18n занадто складні, занадто жорсткі або не створені для сучасних фреймворків.

Intlayer, це **сучасне рішення для i18n** для веб- та мобільних застосунків.  
Воно незалежне від фреймворку, **AI-powered**, і включає безкоштовний **CMS та візуальний редактор**.

Завдяки **файлам контенту для кожної локалі**, **автодоповненню TypeScript**, **tree-shakable словникам** та **інтеграції CI/CD**, Intlayer робить інтернаціоналізацію **швидшою, чистішою та розумнішою**.

## Ключові переваги Intlayer:

| Особливість                                                                                                                                       | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.webp?raw=true" alt="Підтримка" width="700">                     | **Підтримка кількох фреймворків**<br><br>Intlayer сумісний з усіма основними фреймворками та бібліотеками, включно з Next.js, React, Vite, Vue.js, Nuxt, Preact, Express та іншими.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="JavaScript" width="700">  | **Керування контентом за допомогою JavaScript**<br><br>Використовуйте гнучкість JavaScript, щоб ефективно визначати та керувати своїм контентом. <br><br> - [Оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Файли" width="700"> | **Файл декларації контенту для кожної локалі**<br><br>Прискорте розробку, задекларувавши ваш контент лише один раз перед автоматичною генерацією.<br><br> - [Файл декларації контенту для кожної локалі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true" alt="Compiler" width="700">                        | **Компілятор**<br><br>Компілятор Intlayer автоматично витягує вміст із компонентів і генерує файли словників.<br><br> - [Компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="TypeScript" width="700">                 | **Типобезпечне середовище**<br><br>Використовуйте TypeScript, щоб гарантувати, що ваші визначення контенту та код позбавлені помилок, а також отримувати автозаповнення в IDE.<br><br> - [Налаштування TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md#configure-typescript)                                                                                                                                                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Конфігурація" width="700">                  | **Спрощене налаштування**<br><br>Швидко запустіть проект з мінімальною конфігурацією. Легко налаштовуйте параметри інтернаціоналізації, маршрутизації, AI, збірки та обробки контенту. <br><br> - [Дізнайтеся про інтеграцію Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Отримання контенту" width="700">      | **Спрощене отримання контенту**<br><br>Не потрібно викликати вашу функцію `t` для кожного фрагмента контенту. Отримуйте весь контент безпосередньо за допомогою одного hook.<br><br> - [Інтеграція з React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Серверні компоненти" width="700">      | **Послідовна реалізація серверних компонентів**<br><br>Ідеально підходить для серверних компонентів Next.js: використовуйте одну й ту саму реалізацію як для клієнтських, так і для серверних компонентів, немає потреби передавати вашу функцію `t` через кожний серверний компонент. <br><br> - [Серверні компоненти](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md#step-7-utilize-content-in-your-code)                                                                                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Організація" width="700">                     | **Організована codebase**<br><br>Тримайте свій codebase більш організованим: 1 компонент = 1 словник у тій самій папці. Переклади поруч із відповідними компонентами підвищують підтримуваність і зрозумілість. <br><br> - [Як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md)                                                                                                                                                                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Маршрутизація" width="700">                 | **Покращена маршрутизація**<br><br>Повна підтримка маршрутизації застосунків, що безшовно адаптується до складних структур додатків для Next.js, React, Vite, Vue.js тощо.<br><br> - [Дізнатися про інтеграцію з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Markdown" width="700">                         | **Підтримка Markdown**<br><br>Імпортуйте та інтерпретуйте локалізовані файли і віддалений Markdown для багатомовного контенту, такого як політики конфіденційності, документація тощо. Інтерпретуйте та робіть метадані Markdown доступними у вашому коді.<br><br> - [Файли контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file.md)                                                                                                                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.webp?raw=true" alt="Візуальний редактор" width="700">        | **Безкоштовний візуальний редактор та CMS**<br><br>Для авторів контенту доступні безкоштовний візуальний редактор та CMS, що усуває потребу в окремій платформі локалізації. Підтримуйте синхронізацію контенту за допомогою Git або зовнішньо розміщуйте його повністю чи частково через CMS.<br><br> - [Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) <br> - [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.webp?raw=true" alt="Bundle" width="700">                            | **Tree-shakable контент**<br><br>Tree-shakable контент, що зменшує розмір фінального бандла. Завантажує контент на рівні компонента, виключаючи будь-який невикористаний контент із вашого бандла. Підтримує lazy loading для підвищення ефективності завантаження застосунку. <br><br> - [Оптимізація збірки додатка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md#app-build-optimization)                                                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.webp?raw=true" alt="Static Rendering" width="700">        | **Статичний рендеринг**<br><br>Не блокує статичний рендеринг. <br><br> - [Інтеграція з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="AI" width="700">                         | **Переклад на основі AI**<br><br>Перетворіть свій вебсайт на 231 мову всього за один клік, використовуючи розширені AI-інструменти перекладу Intlayer з вашим власним постачальником AI / ключем API. <br><br> - [Інтеграція CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md) <br> - [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) <br> - [Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md)                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="MCP" width="700">                                   | **Інтеграція сервера MCP**<br><br>Надає сервер MCP (Model Context Protocol) для автоматизації IDE, що дозволяє безперешкодне керування контентом та i18n-робочі процеси безпосередньо у вашому середовищі розробки. <br><br> - [Сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.webp?raw=true" alt="Extension" width="700">               | **Розширення для VSCode**<br><br>Intlayer надає розширення для VSCode, яке допомагає керувати вашим контентом та перекладами, створювати словники, перекладати ваш контент та інше. <br><br> - [Розширення для VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Interoperability" width="700">         | **Сумісність**<br><br>Забезпечує сумісність з react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer і react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_react-intl.md) <br> - [Intlayer і next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_next-intl.md) <br> - [Intlayer і next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_next-i18next.md) <br> - [Intlayer і vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_vue-i18n.md) <br> - [Адаптери сумісності Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/benchmark.png?raw=true" alt="Benchmark" width="700">                       | **Продуктивність та бенчмарк**<br><br>Використовує вдосконалене розділення коду (tree-shaking) та динамічне завантаження для підвищення продуктивності та збереження максимальної легкості рішення. <br><br> - [Продуктивність та бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md)                                                                                                                                                                                                                                                                                                                                                                                                              |

## 📦 Встановлення

Почніть свою подорож з Intlayer сьогодні та відчуйте більш плавний і потужний підхід до інтернаціоналізації.

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/Почати-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer
```

⚡ Швидкий старт (Next.js)

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

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md"> Отримайте повне керівництво → </a>

## 🎥 Відеоурок на YouTube

[![Як інтернаціоналізувати ваш застосунок за допомогою Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/Почати-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Зміст

Ознайомтеся з повною документацією, щоб почати працювати з Intlayer та дізнатися, як інтегрувати його у ваші проєкти.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Початок роботи</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md" rel=''>Чому Intlayer?</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/introduction.md" rel=''>Вступ</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Концепція</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md" rel=''>Як працює Intlayer</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md" rel=''>Конфігурація</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md" rel=''>Intlayer CLI</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md" rel=''>Компілятор</a></li>

  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md" rel=''>Intlayer Editor</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md" rel=''>Intlayer CMS</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md" rel=''>Словник</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md" rel=''>Файл декларації контенту для кожної локалі</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md" rel=''>Переклад</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md" rel=''>Перелічення</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/condition.md" rel=''>Умова</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/nesting.md" rel=''>Вкладення</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md" rel=''>Markdown</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md" rel=''>Отримання через функцію</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md" rel=''>Вставка</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file.md" rel=''>Файл</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Середовище</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md" rel=''>Intlayer з Next.js 16</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md" rel=''>Next.js 15</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_14.md" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md" rel=''>Next.js Page Router</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md" rel=''>Next.js за допомогою компілятора</a></li>
    </ul>
  </li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md" rel=''>React CRA</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md" rel=''>Vite + React</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md" rel=''>Vite + React за допомогою компілятора</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_router_v7.md" rel=''>React-router-v7</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_remix_3.md" rel=''>Remix 3</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack+solid.md" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro.md" rel=''>Astro</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_react.md" rel=''>React</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_vue.md" rel=''>Vue</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_svelte.md" rel=''>Svelte</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_solid.md" rel=''>Solid</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_lit.md" rel=''>Lit</a></li>
    </ul>
  </li>

  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_native+expo.md" rel=''>React Native</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md" rel=''>Vite + Svelte</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_svelte_kit.md" rel=''>SvelteKit</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+preact.md" rel=''>Vite + Preact</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md" rel=''>Vite + Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+solid.md" rel=''>Vite + Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_solid_start.md" rel=''>Solid Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md" rel=''>Angular</a></li>  <li>
     <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_express.md" rel=''>Backend</a>
     <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_express.md" rel=''>Express</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nestjs.md" rel=''>NestJS</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_fastify.md" rel=''>Fastify</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_adonisjs.md" rel=''>AdonisJS</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_hono.md" rel=''>Hono</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_elysia.md" rel=''>Elysia</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📊 Бенчмарк</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md" rel=''>Next.js</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md" rel=''>TanStack Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md" rel=''>Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md" rel=''>Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md" rel=''>Svelte</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Блог</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/what_is_internationalization.md" rel=''>Що таке i18n ?</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md" rel=''>i18n та SEO</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_next-i18next.md" rel=''>Intlayer та i18next</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_react-i18next.md" rel=''>Intlayer та react-intl</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_next-intl.md" rel=''>Intlayer і next-intl</a></li>
</ul>
</details>

## Багатомовна система управління контентом

Більше, ніж просто бібліотека i18n, Intlayer - це повноцінна **багатомовна система управління контентом**. Полнофункціональна CMS доступна безкоштовно за адресою [app.intlayer.org](https://app.intlayer.org/?utm_source=chatgpt.com).

Intlayer об'єднує **розробників**, **копірайтерів** та **агентів ШІ** в єдиний робочий процес для легкого створення та підтримки багатомовних сайтів. Intlayer замінює наступний стек в одному рішенні:

- i18n рішення (наприклад, `i18next`, `next-intl`, `vue-i18n`)
- TMS (системи управління переводами) (наприклад, Crowdin, Phrase, Lokalise)
- Headless CMS (наприклад, Contentful, Strapi, Sanity)

![CMS Preview](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.webp?raw=true)

## 🌐 Readme іншими мовами

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 Спільнота

Intlayer створено спільнотою і для спільноти, нам дуже важлива ваша думка!

- Маєте пропозицію? [Відкрийте issue](https://github.com/aymericzip/intlayer/issues)
- Знайшли помилку або маєте пропозицію щодо покращення? [Надішліть PR](https://github.com/aymericzip/intlayer/pulls)
- Потрібна допомога або хочете зв'язатися? [Приєднатися до нашого Discord](https://discord.gg/7uxamYVeCk)

Ви також можете стежити за нами на:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer у Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer на LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer в Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer у X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer на YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer у TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Внесок

Для детальніших інструкцій щодо участі в цьому проєкті, будь ласка, зверніться до файлу [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Він містить важливу інформацію про наш процес розробки, конвенції повідомлень комітів і процедури релізів. Ваші внески цінні для нас, і ми вдячні за ваші зусилля з покращення цього проєкту!

Зробіть свій внесок на [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) або [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Дякуємо за підтримку

Якщо вам подобається Intlayer, поставте нам ⭐ на GitHub. Це допомагає іншим дізнатися про проєкт! [Дізнайтеся, чому зірки на GitHub важливі](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Діаграма історії зірок](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
