<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Логотип Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: открытый, гибкий набор инструментов i18n с переводом на базе ИИ и CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Документация</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="версия npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Звезды GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="ежемесячные загрузки" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="лицензия"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="последний коммит"/>
  </a>
</p>

![Смотреть видео](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Начать-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Что такое Intlayer?

Большинство библиотек i18n либо слишком сложны, либо слишком жестки, либо не созданы для современных фреймворков.

Intlayer — это **современное решение i18n** для веб- и мобильных приложений.  
Он не зависит от фреймворка, **использует ИИ** и включает бесплатную **CMS и визуальный редактор**.

С помощью **файлов контента для каждой локали**, **автодополнения TypeScript**, **дерево-устойчивых словарей** и **интеграции CI/CD** Intlayer делает интернационализацию **быстрее, чище и умнее**.

## Ключевые преимущества Intlayer:

| Особенность                                                                                                                                         | Описание                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Поддержка нескольких фреймворков**<br><br>Intlayer совместим со всеми основными фреймворками и библиотеками, включая Next.js, React, Vite, Vue.js, Nuxt, Preact, Express и другие.                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **Управление контентом на основе JavaScript**<br><br>Используйте гибкость JavaScript для эффективного определения и управления вашим контентом. <br><br> - [Объявление контента](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Файл объявления контента для каждого языка**<br><br>Ускорьте разработку, объявляя ваш контент один раз до автоматической генерации.<br><br> - [Файл объявления контента для каждого языка](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Безопасная типизация среды**<br><br>Используйте TypeScript, чтобы гарантировать отсутствие ошибок в определениях контента и коде, а также получать автозаполнение в IDE.<br><br> - [Конфигурация TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Упрощённая настройка**<br><br>Быстрый старт с минимальной конфигурацией. Легко настраивайте параметры интернационализации, маршрутизации, ИИ, сборки и обработки контента.<br><br> - [Изучите интеграцию с Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Упрощённый доступ к контенту**<br><br>Не нужно вызывать функцию `t` для каждого элемента контента. Получайте весь ваш контент напрямую с помощью одного хука.<br><br> - [Интеграция с React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Единообразная реализация серверных компонентов**<br><br>Идеально подходит для серверных компонентов Next.js, используйте одну и ту же реализацию как для клиентских, так и для серверных компонентов, нет необходимости передавать функцию `t` через каждый серверный компонент.<br><br> - [Серверные компоненты](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Организованный код**<br><br>Поддерживайте ваш код более организованным: 1 компонент = 1 словарь в той же папке. Переводы находятся рядом с соответствующими компонентами, что улучшает сопровождаемость и ясность.<br><br> - [Как работает Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Расширенная маршрутизация**<br><br>Полная поддержка маршрутизации приложений, плавно адаптирующаяся к сложным структурам приложений для Next.js, React, Vite, Vue.js и других.<br><br> - [Изучите интеграцию с Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Поддержка Markdown**<br><br>Импорт и интерпретация локализованных файлов и удалённого Markdown для многоязычного контента, такого как политики конфиденциальности, документация и прочее. Интерпретируйте и делайте метаданные Markdown доступными в вашем коде.<br><br> - [Файлы контента](https://intlayer.org/doc/concept/content/file)                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Бесплатный визуальный редактор и CMS**<br><br>Для контент-райтеров доступен бесплатный визуальный редактор и CMS, что устраняет необходимость в платформе локализации. Сохраняйте синхронизацию контента с помощью Git или полностью/частично выносите его с помощью CMS.<br><br> - [Редактор Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Контент с поддержкой tree-shaking**<br><br>Контент с поддержкой tree-shaking, уменьшающий размер итогового бандла. Загружает контент по компонентам, исключая неиспользуемый контент из вашего бандла. Поддерживает ленивую загрузку для повышения эффективности загрузки приложения. <br><br> - [Оптимизация сборки приложения](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Статическая отрисовка**<br><br>Не блокирует статическую отрисовку. <br><br> - [Интеграция с Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Перевод с использованием ИИ**<br><br>Преобразуйте ваш сайт на 231 язык всего одним кликом с помощью передовых инструментов перевода на базе ИИ от Intlayer, используя вашего собственного поставщика ИИ / API ключ. <br><br> - [Интеграция CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Автозаполнение](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Интеграция MCP сервера**<br><br>Обеспечивает MCP (Model Context Protocol) сервер для автоматизации IDE, позволяя бесшовно управлять контентом и рабочими процессами i18n непосредственно в вашей среде разработки. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Расширение VSCode**<br><br>Intlayer предоставляет расширение для VSCode, которое поможет вам управлять вашим контентом и переводами, создавать словари, переводить контент и многое другое. <br><br> - [Расширение VSCode](https://intlayer.org/doc/ru/vs-code-extension)                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Взаимодействие**<br><br>Обеспечивает взаимодействие с react-i18next, next-i18next, next-intl и react-intl. <br><br> - [Intlayer и react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer и next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer и next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                 |

---

## 📦 Установка

Начните свое путешествие с Intlayer уже сегодня и ощутите более плавный и мощный подход к интернационализации.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Быстрый старт (Next.js)

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

<a href="https://intlayer.org/doc/environment/nextjs"> Получить полное руководство → </a>

## 🎥 Прямой урок на YouTube

[![Как интернационализировать ваше приложение с помощью Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/ru/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Содержание

Изучите нашу подробную документацию, чтобы начать работу с Intlayer и узнать, как интегрировать его в ваши проекты.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Начало работы</summary>
<ul>
  <li><a href="https://intlayer.org/doc/ru/why">Почему Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc/ru">Введение</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Концепция</summary>
<ul>
  <li><a href="https://intlayer.org/doc/ru/concept/how-works-intlayer">Как работает Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/configuration">Конфигурация</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/ai">Поставщик ИИ</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/editor">Редактор Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/ru/concept/content">Словарь</a>
    <ul>
      <li><a href="https://intlayer.org/doc/ru/concept/content/per-locale-file">Файл декларации контента для каждой локали</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/translation">Перевод</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/enumeration">Перечисление</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/condition">Условие</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/nesting">Вложенность</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/function-fetching">Вызов функции</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/insertion">Вставка</a></li>
      <li><a href="https://intlayer.org/doc/ru/concept/content/file">Файл</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Окружение</summary>
<ul>
  <li><a href="https://intlayer.org/doc/ru/environment/nextjs">Intlayer с Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/ru/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/ru/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/ru/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/ru/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/ru/environment/vite-and-react/tanstack-start">Начало работы с Tanstack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/ru/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/ru/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Блог</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/what_is_internationalization.md">Что такое i18n</a></li>
  <li><a href="https://intlayer.org/blog/ru/SEO-and-i18n">i18n и SEO</a></li>
  <li><a href="https://intlayer.org/blog/ru/intlayer-with-next-i18next">Intlayer и i18next</a></li>
  <li><a href="https://intlayer.org/blog/ru/intlayer-with-react-i18next">Intlayer и react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer и next-intl</a></li>
</ul>
</details>

## 🌐 Readme на других языках

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

## 🤝 Сообщество

Intlayer создан для сообщества и вместе с сообществом, и мы будем рады вашему участию!

- Есть предложение? [Откройте issue](https://github.com/aymericzip/intlayer/issues)
- Нашли ошибку или улучшение? [Отправьте PR](https://github.com/aymericzip/intlayer/pulls)
- Нужна помощь или хотите связаться? [Присоединяйтесь к нашему Discord](https://discord.gg/7uxamYVeCk)

Вы также можете следить за нами на :

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Вклад в проект

Для получения более подробных рекомендаций по внесению вклада в этот проект, пожалуйста, обратитесь к файлу [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). В нем содержится важная информация о нашем процессе разработки, соглашениях по сообщениям коммитов и процедурах выпуска. Ваш вклад очень ценен для нас, и мы благодарны за ваши усилия по улучшению этого проекта!

### Спасибо за поддержку

Если вам нравится Intlayer, поставьте нам ⭐ на GitHub. Это помогает другим узнать о проекте!

[![График истории звезд](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
