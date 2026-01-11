<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Логотип Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : Open-source, гнучкий i18n toolkit з AI-підтримуваним перекладом та CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Документація</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF&cacheSeconds=86400" alt="Версія npm" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700&cacheSeconds=86400" alt="Зірки GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Щомісячні завантаження" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Ліцензія"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="останній коміт"/>
  </a>
</p>

<!-- новий рядок для перевірки healthcheck  -->

![Перегляньте відео](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Що таке Intlayer?

Більшість бібліотек для i18n занадто складні, занадто жорсткі або не створені для сучасних фреймворків.

Intlayer — це **сучасне рішення для i18n** для веб- та мобільних застосунків.  
Воно незалежне від фреймворку, **AI-powered**, і включає безкоштовний **CMS та візуальний редактор**.

Завдяки **файлам контенту для кожної локалі**, **автодоповненню TypeScript**, **tree-shakable словникам** та **інтеграції CI/CD**, Intlayer робить інтернаціоналізацію **швидшою, чистішою та розумнішою**.

## Ключові переваги Intlayer:

| Особливість                                                                                                                                             | Опис                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                              | **Підтримка кількох фреймворків**<br><br>Intlayer сумісний з усіма основними фреймворками та бібліотеками, включно з Next.js, React, Vite, Vue.js, Nuxt, Preact, Express та іншими.                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Особливість" width="700">       | **Керування контентом за допомогою JavaScript**<br><br>Використовуйте гнучкість JavaScript, щоб ефективно визначати та керувати своїм контентом. <br><br> - [Оголошення контенту](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Особливість" width="700"> | **Файл декларації контенту для кожної локалі**<br><br>Прискорте розробку, задекларувавши ваш контент лише один раз перед автоматичною генерацією.<br><br> - [Файл декларації контенту для кожної локалі](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Функція" width="700">                          | **Типобезпечне середовище**<br><br>Використовуйте TypeScript, щоб гарантувати, що ваші визначення контенту та код позбавлені помилок, а також отримувати автозаповнення в IDE.<br><br> - [Налаштування TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Функція" width="700">                             | **Спрощене налаштування**<br><br>Швидко запустіть проект з мінімальною конфігурацією. Легко налаштовуйте параметри інтернаціоналізації, маршрутизації, AI, збірки та обробки контенту. <br><br> - [Дізнайтеся про інтеграцію Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Особливість" width="700">                   | **Спрощене отримання контенту**<br><br>Не потрібно викликати вашу функцію `t` для кожного фрагмента контенту. Отримуйте весь контент безпосередньо за допомогою одного hook.<br><br> - [Інтеграція з React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                        | **Послідовна реалізація серверних компонентів**<br><br>Ідеально підходить для серверних компонентів Next.js: використовуйте одну й ту саму реалізацію як для клієнтських, так і для серверних компонентів — немає потреби передавати вашу функцію `t` через кожний серверний компонент. <br><br> - [Серверні компоненти](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Функція" width="700">                               | **Організована codebase**<br><br>Тримайте свій codebase більш організованим: 1 компонент = 1 словник у тій самій папці. Переклади поруч із відповідними компонентами підвищують підтримуваність і зрозумілість. <br><br> - [Як працює Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Функція" width="700">                             | **Покращена маршрутизація**<br><br>Повна підтримка маршрутизації застосунків, що безшовно адаптується до складних структур додатків для Next.js, React, Vite, Vue.js тощо.<br><br> - [Дізнатися про інтеграцію з Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Функція" width="700">                                | **Підтримка Markdown**<br><br>Імпортуйте та інтерпретуйте локалізовані файли і віддалений Markdown для багатомовного контенту, такого як політики конфіденційності, документація тощо. Інтерпретуйте та робіть метадані Markdown доступними у вашому коді.<br><br> - [Файли контенту](https://intlayer.org/doc/concept/content/file)                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Функція" width="700">                           | **Безкоштовний візуальний редактор та CMS**<br><br>Для авторів контенту доступні безкоштовний візуальний редактор та CMS, що усуває потребу в окремій платформі локалізації. Підтримуйте синхронізацію контенту за допомогою Git або зовнішньо розміщуйте його повністю чи частково через CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                                  | **Tree-shakable контент**<br><br>Tree-shakable контент, що зменшує розмір фінального бандла. Завантажує контент на рівні компонента, виключаючи будь-який невикористаний контент із вашого бандла. Підтримує lazy loading для підвищення ефективності завантаження застосунку. <br><br> - [Оптимізація збірки додатка](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                        | **Статичний рендеринг**<br><br>Не блокує статичний рендеринг. <br><br> - [Інтеграція з Next.js](https://intlayer.org/doc/uk/environment/nextjs)                                                                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Особливість" width="700">                      | **AI-оптимізований переклад**<br><br>Перетворіть свій вебсайт на 231 мову всього за один клік, використовуючи розширені AI-інструменти перекладу Intlayer з вашим власним постачальником AI / ключем API. <br><br> - [Інтеграція CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Автозаповнення](https://intlayer.org/doc/concept/auto-fill)                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Функція" width="700">                                     | **Інтеграція сервера MCP**<br><br>Надає сервер MCP (Model Context Protocol) для автоматизації IDE, що дозволяє безперешкодне керування контентом та i18n-робочі процеси безпосередньо у вашому середовищі розробки. <br><br> - [Сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Функція" width="700">                        | **Розширення для VSCode**<br><br>Intlayer надає розширення для VSCode, яке допомагає керувати вашим контентом та перекладами, створювати словники, перекладати ваш контент та інше. <br><br> - [Розширення для VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Функція" width="700">                        | **Сумісність**<br><br>Забезпечує сумісність з react-i18next, next-i18next, next-intl та react-intl. <br><br> - [Intlayer і react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer і next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer і next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                              |

---

## 📦 Встановлення

Почніть свою подорож з Intlayer сьогодні та відчуйте більш плавний і потужний підхід до інтернаціоналізації.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
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

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Отримайте повне керівництво → </a>

## 🎥 Відеоурок на YouTube

[![Як інтернаціоналізувати ваш застосунок за допомогою Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Зміст

Ознайомтеся з повною документацією, щоб почати працювати з Intlayer та дізнатися, як інтегрувати його у ваші проєкти.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Початок роботи</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Чому Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Вступ</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Концепція</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Як працює Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Конфігурація</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">AI-провайдер</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Словник</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Файл декларації контенту для кожної локалі</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Переклад</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Перелічення</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Умова</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Вкладення</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Отримання через функцію</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Вставка</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Файл</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Середовище</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer з Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Початок з TanStack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Блог</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/what_is_internationalization.md">Що таке i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n та SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer та i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer та react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer і next-intl</a></li>
</ul>
</details>

## 🌐 Readme іншими мовами

[Англійська](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[Спрощена китайська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Російська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[Японська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Французька](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[Корейська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Іспанська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Німецька](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[Арабська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Італійська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[Англійська (Велика Британія)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/readme.md) •
[Португальська](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[Гінді](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Турецька](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Спільнота

Intlayer створено спільнотою і для спільноти — нам дуже важлива ваша думка!

- Маєте пропозицію? [Відкрийте issue](https://github.com/aymericzip/intlayer/issues)
- Знайшли помилку або маєте пропозицію щодо покращення? [Надішліть PR](https://github.com/aymericzip/intlayer/pulls)
- Потрібна допомога або хочете зв'язатися? [Приєднатися до нашого Discord](https://discord.gg/7uxamYVeCk)

Ви також можете стежити за нами на:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer у Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer на LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer у Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer в Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer у X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer на YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer у TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Внесок

Для детальніших інструкцій щодо участі в цьому проєкті, будь ласка, зверніться до файлу [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Він містить важливу інформацію про наш процес розробки, конвенції повідомлень комітів і процедури релізів. Ваші внески цінні для нас, і ми вдячні за ваші зусилля з покращення цього проєкту!

Долучайтесь на [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) або [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Дякуємо за підтримку

Якщо вам подобається Intlayer, поставте нам ⭐ на GitHub. Це допомагає іншим дізнатися про проєкт!

[![Діаграма історії зірок](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
